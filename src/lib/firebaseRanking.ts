// Firebase Firestore에서 랭킹 데이터 가져오기
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';
import type { UserData } from './firebaseAuth';

export type RankingUser = {
  id: string;
  email: string;
  bestScore: number;
  bestCompare: number;
  totalPlays: number;
  finalScore: number;
  rank: number;
};

/**
 * 모든 사용자의 랭킹 데이터 가져오기
 */
export async function getAllUsersRanking(): Promise<RankingUser[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const users: RankingUser[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as UserData;
      const bestScore = data.bestScore || 0;
      const bestCompare = data.bestCompare || 0;
      const totalPlays = data.totalPlays || 0;

      // finalScore 계산 (bestScore × bestCompare)
      const finalScore = bestScore * bestCompare;

      users.push({
        id: data.id,
        email: data.email,
        bestScore,
        bestCompare,
        totalPlays,
        finalScore,
        rank: 0, // 나중에 계산
      });
    });

    // finalScore 기준으로 내림차순 정렬
    users.sort((a, b) => b.finalScore - a.finalScore);

    // 순위 계산
    users.forEach((user, index) => {
      user.rank = index + 1;
    });

    return users;
  } catch (error) {
    console.error('랭킹 데이터 로드 실패:', error);
    return [];
  }
}
