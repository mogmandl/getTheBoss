===========================================
GetTheBoss - UI 스타일 가이드
===========================================

프로젝트명: GetTheBoss (회사 직원 수 퀴즈 게임)
작성일: 2025
버전: 1.0

===========================================
1. 디자인 철학
===========================================

이 프로젝트는 미니멀리즘과 명확성을 핵심 가치로 합니다.
- 선(Line) 기반 디자인: 그라데이션, 그림자, 아이콘을 사용하지 않음
- 명확한 경계: 모든 요소는 border로 구분
- 단순함: 불필요한 장식 없이 기능에 집중
- 가독성: 충분한 여백과 명확한 타이포그래피

===========================================
2. 컬러 팔레트
===========================================

주요 색상:
-----------
• Primary (파란색)
  - Blue-600: #2563EB
  - 용도: 주요 버튼, 강조 텍스트, 로고, 점수 표시
  - 예시: className="text-blue-600", "bg-blue-600", "border-blue-600"

• Neutral (회색 계열)
  - White: #FFFFFF (배경)
  - Gray-300: #D1D5DB (테두리)
  - Gray-600: #4B5563 (보조 텍스트)
  - Gray-900: #111827 (주요 텍스트)
  - 용도: 텍스트, 테두리, 보조 요소

• Accent (빨간색 - 경고용)
  - Red-600: #DC2626
  - Red-50: #FEF2F2 (배경)
  - 용도: 회원탈퇴, 오류 메시지, 경고 알림

배경 색상:
-----------
• 기본 배경: 흰색 (#FFFFFF)
• 모든 페이지는 bg-white 사용
• 투명도나 그라데이션 사용 금지

===========================================
3. 타이포그래피
===========================================

폰트 패밀리:
-----------
• 시스템 기본 폰트 사용 (Tailwind CSS 기본값)
• font-sans: system-ui, -apple-system, sans-serif

폰트 크기:
-----------
• 페이지 제목 (H1): text-4xl (36px) + font-bold
• 섹션 제목 (H2): text-2xl (24px) + font-bold
• 서브 제목 (H3): text-xl (20px) + font-bold
• 본문 텍스트: text-base (16px)
• 보조 텍스트: text-sm (14px) + text-gray-600
• 점수/숫자 강조: text-3xl 또는 text-4xl + font-bold + text-blue-600

폰트 굵기:
-----------
• font-bold: 제목, 강조 텍스트, 점수
• font-medium: 레이블, 버튼 텍스트
• font-normal: 일반 텍스트 (기본값)

===========================================
4. 버튼 스타일
===========================================

Primary 버튼 (파란색 배경):
-----------
className="border-2 border-blue-600 bg-blue-600 text-white px-6 py-2 hover:bg-blue-700"
• 용도: 주요 액션 (로그인, 회원가입, 제출)
• 상태: hover시 bg-blue-700
• Disabled: disabled:opacity-50

Secondary 버튼 (파란색 테두리):
-----------
className="border-2 border-blue-600 text-blue-600 px-6 py-2 hover:bg-blue-50"
• 용도: 부가 액션 (랭킹 보기, 프로필 보기)
• 상태: hover시 bg-blue-50

Neutral 버튼 (회색 테두리):
-----------
className="border border-gray-300 px-6 py-2 hover:bg-gray-100"
• 용도: 일반 액션 (로그아웃, 다음 문제, 건너뛰기)
• 상태: hover시 bg-gray-100

Danger 버튼 (빨간색):
-----------
className="border border-red-600 text-red-600 px-6 py-2 hover:bg-red-50"
className="border-2 border-red-600 bg-red-600 text-white px-6 py-2 hover:bg-red-700"
• 용도: 위험한 액션 (회원탈퇴, 삭제)
• 상태: hover시 bg-red-50 또는 bg-red-700

버튼 공통 규칙:
-----------
• 최소 패딩: px-6 py-2
• 항상 border 사용 (그림자 없음)
• 텍스트 중앙 정렬
• hover 상태 필수
• disabled 상태: disabled:opacity-50

===========================================
5. 입력 필드 스타일
===========================================

텍스트 입력:
-----------
className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-600"
• 기본: 1px gray-300 테두리
• Focus: border-blue-600으로 변경
• outline 제거 (focus:outline-none)
• 패딩: px-4 py-2

숫자 입력:
-----------
동일한 스타일 + type="number"

Label:
-----------
className="block mb-2 font-medium"
• 입력 필드 위에 배치
• font-medium로 강조

Placeholder:
-----------
• text-gray-600
• 예시 값 제공 (예: "example@email.com", "예: 50000")

===========================================
6. 레이아웃 및 간격
===========================================

컨테이너:
-----------
• 최대 너비: max-w-4xl 또는 max-w-7xl
• 중앙 정렬: mx-auto
• 좌우 패딩: px-6
• 상하 패딩: py-20 (페이지), py-12 (섹션)

카드/박스:
-----------
• 기본 테두리: border-2 border-gray-300
• 패딩: p-8 또는 p-12
• 그림자 사용 금지
• 배경: 투명 또는 흰색

간격 시스템:
-----------
• 요소 간 작은 간격: mb-4, gap-4
• 요소 간 중간 간격: mb-6, gap-6, mb-8
• 섹션 간 큰 간격: mb-12, mb-16, mb-20
• Grid gap: gap-6

반응형 그리드:
-----------
• 2열 그리드: grid md:grid-cols-2 gap-6
• 3열 그리드: grid grid-cols-3 gap-4
• 모바일: 기본 1열, md (768px) 이상에서 2열 이상

===========================================
7. 테두리 (Borders)
===========================================

테두리 굵기:
-----------
• border: 1px (기본, 일반 요소)
• border-2: 2px (강조, 주요 컨테이너)

테두리 색상:
-----------
• border-gray-300: 일반 테두리
• border-blue-600: 강조 테두리
• border-red-600: 경고 테두리

테두리 위치:
-----------
• border: 전체
• border-b: 하단만 (테이블 행, 헤더)
• border-t: 상단만 (구분선)

===========================================
8. 상태 표시
===========================================

로딩 상태:
-----------
• 중앙 정렬된 박스
• className="border-2 border-gray-300 p-12 text-center text-gray-600"
• 텍스트: "로딩 중..." / "Loading..."

빈 상태:
-----------
• 동일한 스타일
• 텍스트: "등록된 플레이어가 없습니다" 등

오류 상태:
-----------
• className="border border-red-600 text-red-600 px-4 py-2"
• 빨간색 테두리 + 빨간색 텍스트

성공 상태:
-----------
• 파란색 강조
• className="text-blue-600 font-bold"

===========================================
9. 네비게이션
===========================================

헤더 (일반 페이지):
-----------
• 고정되지 않음 (static)
• border-b border-gray-300
• 로고 왼쪽, 네비게이션 오른쪽
• 간격: gap-6
• Hover: hover:text-blue-600

게임 페이지 네비게이션:
-----------
• 중앙 정렬: justify-center
• 현재 페이지 강조: font-bold text-blue-600
• border-b border-gray-300

===========================================
10. 언어 전환 (Language Switcher)
===========================================

스타일:
-----------
className="flex items-center gap-2 border border-gray-300 p-1"
• 버튼: px-3 py-1 text-sm
• 선택된 언어: bg-blue-600 text-white
• 미선택 언어: text-gray-600 hover:bg-gray-100

위치:
-----------
• 헤더 네비게이션 내부
• 로그인 버튼 옆

===========================================
11. 테이블 스타일
===========================================

테이블 컨테이너:
-----------
className="border-2 border-gray-300"

테이블 헤더:
-----------
• className="border-b-2 border-gray-300"
• font-bold
• 좌측 정렬 (텍스트): text-left
• 우측 정렬 (숫자): text-right
• 패딩: p-4

테이블 행:
-----------
• 마지막 행 제외 border-b
• 패딩: p-4
• Hover 효과 없음 (미니멀 유지)

===========================================
12. 다국어 지원
===========================================

지원 언어:
-----------
• 한국어 (ko): 기본 언어
• 일본어 (ja): 추가 언어

번역 원칙:
-----------
• 모든 UI 텍스트 번역
• 데이터베이스 데이터(회사명, 이메일 등)는 번역하지 않음
• 숫자 포맷팅: toLocaleString() 사용

===========================================
13. 컴포넌트 구조
===========================================

재사용 가능한 컴포넌트:
-----------
• Logo.tsx: 로고 컴포넌트 (크기 변경 가능)
• LanguageSwitcher.tsx: 언어 전환 컴포넌트
• header.tsx: 공통 헤더
• QuestionPanel.tsx: 게임 질문 패널
• GuessForm.tsx: 게임 입력 폼

페이지 컴포넌트:
-----------
• Home.tsx: 홈페이지
• SignIn.tsx: 로그인/회원가입
• Profile.tsx: 프로필 (회원탈퇴 포함)
• Ranking.tsx: 랭킹 테이블
• GameExact.tsx: 정확히 맞추기 게임
• GameCompare.tsx: 비교하기 게임

===========================================
14. 반응형 디자인
===========================================

브레이크포인트:
-----------
• sm: 640px
• md: 768px
• lg: 1024px
• xl: 1280px

반응형 규칙:
-----------
• 모바일 우선 (Mobile First)
• Grid: grid md:grid-cols-2
• 패딩: px-6 (모바일), px-8 (데스크톱)
• 폰트: 모바일에서도 가독성 유지

===========================================
15. 접근성 (Accessibility)
===========================================

• 명확한 label 제공
• placeholder로 예시 제공
• focus 상태 명확히 표시
• disabled 상태 시각적 표시
• 충분한 색상 대비
• 키보드 네비게이션 지원 (스페이스바 등)

===========================================
16. 사용 예시
===========================================

페이지 컨테이너:
```jsx
<div className="min-h-screen bg-white">
  <main className="max-w-4xl mx-auto px-6 py-20">
    <h1 className="text-4xl font-bold mb-12">제목</h1>
    {/* 내용 */}
  </main>
</div>
```

카드:
```jsx
<div className="border-2 border-gray-300 p-8">
  <h2 className="text-2xl font-bold mb-4">제목</h2>
  <p className="text-gray-600">설명</p>
</div>
```

Primary 버튼:
```jsx
<button className="border-2 border-blue-600 bg-blue-600 text-white px-6 py-2 hover:bg-blue-700">
  클릭
</button>
```

입력 필드:
```jsx
<div>
  <label className="block mb-2 font-medium">라벨</label>
  <input
    type="text"
    className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-600"
    placeholder="입력하세요"
  />
</div>
```

===========================================
17. 금지 사항
===========================================

❌ 사용하지 않는 것들:
• 그라데이션 (gradient)
• 그림자 (shadow, drop-shadow)
• 아이콘 (icon libraries)
• 복잡한 애니메이션
• 투명도 (opacity) - disabled 제외
• 둥근 모서리 (rounded) - 사용 안 함
• 배경 이미지

===========================================
18. 개발 참고사항
===========================================

CSS 프레임워크:
• Tailwind CSS v4 사용
• 추가 CSS 파일 최소화
• Utility-first 방식

파일 구조:
• src/pages/: 페이지 컴포넌트
• src/components/: 재사용 컴포넌트
• src/i18n/: 다국어 설정
• src/lib/: 유틸리티 함수
• src/contexts/: Context API

===========================================
