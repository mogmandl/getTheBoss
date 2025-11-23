// Firebase Authentication 헬퍼 함수
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export type UserData = {
  id: string;
  email: string;
  bestScore?: number;
  bestCompare?: number;
  totalPlays?: number;
  createdAt?: string;
  lastLogin?: string;
};

/**
 * 회원가입
 */
export async function signUpWithEmail(email: string, password: string): Promise<UserData> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에 사용자 데이터 저장
    const userData: UserData = {
      id: user.uid,
      email: user.email || email,
      bestScore: 0,
      bestCompare: 0,
      totalPlays: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    return userData;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
}

/**
 * 로그인
 */
export async function signInWithEmail(email: string, password: string): Promise<UserData> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에서 사용자 데이터 가져오기
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      throw new Error('사용자 데이터를 찾을 수 없습니다.');
    }

    // 마지막 로그인 시간 업데이트
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date().toISOString(),
    });

    return userDoc.data() as UserData;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
}

/**
 * 로그아웃
 */
export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error('로그아웃에 실패했습니다.');
  }
}

/**
 * Exact 게임 결과 기록
 */
export async function recordGameResult(userId: string, score: number): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const userData = userDoc.data() as UserData;
    const newTotalPlays = (userData.totalPlays || 0) + 1;
    const newBestScore = (userData.bestScore || 0) + score;

    await updateDoc(userRef, {
      totalPlays: newTotalPlays,
      bestScore: newBestScore,
    });
  } catch (error: any) {
    console.error('게임 결과 기록 실패:', error);
    throw new Error('게임 결과 기록에 실패했습니다.');
  }
}

/**
 * Compare 게임 최고 점수 기록
 */
export async function recordBestCompareScore(userId: string, score: number): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const userData = userDoc.data() as UserData;
    const currentBest = userData.bestCompare || 0;

    // 현재 점수가 최고 점수보다 높을 때만 업데이트
    if (score > currentBest) {
      await updateDoc(userRef, {
        bestCompare: score,
      });
    }
  } catch (error: any) {
    console.error('최고 점수 기록 실패:', error);
    throw new Error('최고 점수 기록에 실패했습니다.');
  }
}

/**
 * 현재 로그인한 사용자 데이터 가져오기
 */
export async function getCurrentUserData(): Promise<UserData | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) return null;

    return userDoc.data() as UserData;
  } catch (error) {
    console.error('사용자 데이터 로드 실패:', error);
    return null;
  }
}

/**
 * 회원탈퇴 (계정 삭제) - DELETE CRUD
 */
export async function deleteAccount(): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('로그인된 사용자가 없습니다.');
    }

    const userId = user.uid;

    // 1. Firestore에서 사용자 데이터 삭제
    await deleteDoc(doc(db, 'users', userId));

    // 2. Firebase Authentication에서 사용자 계정 삭제
    await deleteUser(user);
  } catch (error: any) {
    console.error('계정 삭제 실패:', error);
    throw new Error('계정 삭제에 실패했습니다.');
  }
}

/**
 * Firebase 에러 메시지 한글화
 */
function getErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/invalid-email':
      return '잘못된 이메일 형식입니다.';
    case 'auth/operation-not-allowed':
      return '이메일/비밀번호 로그인이 비활성화되어 있습니다.';
    case 'auth/weak-password':
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    case 'auth/user-disabled':
      return '비활성화된 계정입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 사용자입니다.';
    case 'auth/wrong-password':
      return '비밀번호가 틀립니다.';
    case 'auth/invalid-credential':
      return '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 'auth/too-many-requests':
      return '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
    default:
      return `인증 오류가 발생했습니다: ${code}`;
  }
}
