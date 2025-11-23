export default {
  translation: {
    // Common
    common: {
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      home: '홈',
      login: '로그인',
      logout: '로그아웃',
      signup: '회원가입',
      profile: '프로필',
      ranking: '랭킹',
      email: '이메일',
      password: '비밀번호',
      submit: '제출',
      cancel: '취소',
      confirm: '확인',
      next: '다음',
      pleaseWait: '잠시만 기다려주세요',
    },

    // Header
    header: {
      exactGame: '정확히 맞추기',
      compareGame: '비교하기',
    },

    // Home Page
    home: {
      title: '회사 직원 수 퀴즈',
      subtitle: '한국 대기업의 직원 수를 맞춰보세요',
      exactGameTitle: '정확히 맞추기',
      exactGameDesc: '회사의 정확한 직원 수를 추측하세요\n오차가 적을수록 높은 점수',
      exactGameRounds: '10라운드',
      compareGameTitle: '비교하기',
      compareGameDesc: '두 회사 중 어느 회사의 직원이 더 많을까요?\n연속으로 맞춰보세요',
      compareGameRounds: '무제한',
      startGame: '시작하기',
      rankingTitle: '랭킹',
      rankingDesc: '다른 플레이어들과 경쟁하세요',
      viewRanking: '랭킹 보기',
      loginRequired: '랭킹 참여는 로그인이 필요합니다',
      loginSignup: '로그인 / 회원가입',
      stats: {
        companies: '한국 대기업',
        realtime: '실시간',
        api: 'API 데이터',
        firebase: 'Firebase',
        cloudStorage: '클라우드 저장',
      },
    },

    // Sign In Page
    signin: {
      title: '로그인',
      signupTitle: '회원가입',
      emailLabel: '이메일',
      emailPlaceholder: 'example@email.com',
      passwordLabel: '비밀번호',
      passwordPlaceholder: '최소 6자',
      processing: '처리 중...',
      loginButton: '로그인',
      signupButton: '회원가입',
      switchToSignup: '계정이 없으신가요? 회원가입',
      switchToLogin: '이미 계정이 있으신가요? 로그인',
      errors: {
        invalidEmail: '올바른 이메일 형식을 입력하세요',
        passwordTooShort: '비밀번호는 최소 6자 이상이어야 합니다',
      },
    },

    // Profile Page
    profile: {
      title: '프로필',
      loginRequired: '로그인이 필요합니다',
      exactScore: '정확히 맞추기 누적 점수',
      compareScore: '비교 게임 최고 점수',
      totalPlays: '총 플레이 횟수',
      finalScore: '최종 점수',
      deleteAccount: '회원 탈퇴',
      deleteConfirm: '정말로 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.',
      deleteSuccess: '계정이 성공적으로 삭제되었습니다',
      deleteError: '계정 삭제 중 오류가 발생했습니다',
    },

    // Ranking Page
    ranking: {
      title: '랭킹',
      formula: '최종 점수 = 정확히 맞추기 누적 점수 × 비교 게임 최고 점수',
      rank: '순위',
      exactScoreColumn: '정확히 맞추기',
      compareScoreColumn: '비교 최고',
      finalScoreColumn: '최종 점수',
      noPlayers: '등록된 플레이어가 없습니다',
    },

    // Game Exact
    gameExact: {
      loadingCompanies: '회사 정보를 불러오는 중...',
      question: '이 회사의 직원 수는 몇 명일까요?',
      round: '라운드',
      cumulativeScore: '누적 점수',
      inputLabel: '직원 수를 입력하세요',
      inputPlaceholder: '예: 50000',
      submitButton: '제출',
      nextButton: '다음 문제',
      nextButtonWithKey: '다음 문제 (스페이스바)',
      enterNumber: '숫자를 입력해주세요',
      correct: '정답입니다!',
      answer: '정답은',
      gainedScore: '획득 점수',
      gameOver: '게임 종료',
      totalScore: '총 누적 점수',
      viewProfile: '프로필 보기',
      playAgain: '다시하기',
    },

    // Game Compare
    gameCompare: {
      loadingCompanies: '회사 정보를 불러오는 중...',
      currentScore: '현재 점수',
      leftCompany: '왼쪽 회사',
      rightCompany: '오른쪽 회사',
      employees: '직원 수',
      compareQuestion: '왼쪽 회사와 비교하면?',
      more: '더 많다',
      less: '더 적다',
      correct: '정답!',
      incorrect: '오답',
      tie: '동점입니다.',
      left: '왼쪽',
      right: '오른쪽',
      people: '명',
      score: '점수',
      gameEnded: '게임이 종료되었습니다',
      playAgain: '다시하기',
      nextQuestion: '다음 문제',
      skipQuestion: '문제 건너뛰기',
    },
  },
};
