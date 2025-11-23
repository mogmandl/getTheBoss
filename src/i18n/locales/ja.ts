export default {
  translation: {
    // Common
    common: {
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      home: 'ホーム',
      login: 'ログイン',
      logout: 'ログアウト',
      signup: '会員登録',
      profile: 'プロフィール',
      ranking: 'ランキング',
      email: 'メール',
      password: 'パスワード',
      submit: '送信',
      cancel: 'キャンセル',
      confirm: '確認',
      next: '次へ',
      pleaseWait: 'お待ちください',
    },

    // Header
    header: {
      exactGame: '正確に当てる',
      compareGame: '比較する',
    },

    // Home Page
    home: {
      title: '会社従業員数クイズ',
      subtitle: '韓国大企業の従業員数を当ててみましょう',
      exactGameTitle: '正確に当てる',
      exactGameDesc: '会社の正確な従業員数を推測してください\n誤差が少ないほど高得点',
      exactGameRounds: '10ラウンド',
      compareGameTitle: '比較する',
      compareGameDesc: '2つの会社のうち、どちらの従業員が多いでしょうか？\n連続で当ててみましょう',
      compareGameRounds: '無制限',
      startGame: 'スタート',
      rankingTitle: 'ランキング',
      rankingDesc: '他のプレイヤーと競争してください',
      viewRanking: 'ランキングを見る',
      loginRequired: 'ランキング参加はログインが必要です',
      loginSignup: 'ログイン / 会員登録',
      stats: {
        companies: '韓国大企業',
        realtime: 'リアルタイム',
        api: 'APIデータ',
        firebase: 'Firebase',
        cloudStorage: 'クラウド保存',
      },
    },

    // Sign In Page
    signin: {
      title: 'ログイン',
      signupTitle: '会員登録',
      emailLabel: 'メール',
      emailPlaceholder: 'example@email.com',
      passwordLabel: 'パスワード',
      passwordPlaceholder: '最低6文字',
      processing: '処理中...',
      loginButton: 'ログイン',
      signupButton: '会員登録',
      switchToSignup: 'アカウントをお持ちでないですか？ 会員登録',
      switchToLogin: 'すでにアカウントをお持ちですか？ ログイン',
      errors: {
        invalidEmail: '正しいメール形式を入力してください',
        passwordTooShort: 'パスワードは最低6文字以上である必要があります',
      },
    },

    // Profile Page
    profile: {
      title: 'プロフィール',
      loginRequired: 'ログインが必要です',
      exactScore: '正確に当てる累積スコア',
      compareScore: '比較ゲーム最高スコア',
      totalPlays: '総プレイ回数',
      finalScore: '最終スコア',
      deleteAccount: '退会する',
      deleteConfirm: '本当にアカウントを削除しますか？\nこの操作は元に戻せません。',
      deleteSuccess: 'アカウントが正常に削除されました',
      deleteError: 'アカウント削除中にエラーが発生しました',
    },

    // Ranking Page
    ranking: {
      title: 'ランキング',
      formula: '最終スコア = 正確に当てる累積スコア × 比較ゲーム最高スコア',
      rank: '順位',
      exactScoreColumn: '正確に当てる',
      compareScoreColumn: '比較最高',
      finalScoreColumn: '最終スコア',
      noPlayers: '登録されたプレイヤーがいません',
    },

    // Game Exact
    gameExact: {
      loadingCompanies: '会社情報を読み込み中...',
      question: 'この会社の従業員数は何人でしょうか？',
      round: 'ラウンド',
      cumulativeScore: '累積スコア',
      inputLabel: '従業員数を入力してください',
      inputPlaceholder: '例: 50000',
      submitButton: '送信',
      nextButton: '次の問題',
      nextButtonWithKey: '次の問題 (スペースキー)',
      enterNumber: '数字を入力してください',
      correct: '正解です！',
      answer: '正解は',
      gainedScore: '獲得スコア',
      gameOver: 'ゲーム終了',
      totalScore: '総累積スコア',
      viewProfile: 'プロフィールを見る',
      playAgain: 'もう一度',
    },

    // Game Compare
    gameCompare: {
      loadingCompanies: '会社情報を読み込み中...',
      currentScore: '現在のスコア',
      leftCompany: '左の会社',
      rightCompany: '右の会社',
      employees: '従業員数',
      compareQuestion: '左の会社と比較すると？',
      more: '多い',
      less: '少ない',
      correct: '正解！',
      incorrect: '不正解',
      tie: '同点です。',
      left: '左',
      right: '右',
      people: '人',
      score: 'スコア',
      gameEnded: 'ゲームが終了しました',
      playAgain: 'もう一度',
      nextQuestion: '次の問題',
      skipQuestion: '問題をスキップ',
    },
  },
};
