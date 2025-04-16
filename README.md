# KKBlog Client

# 기술 스택

- Next.js 14.2 (App Router)
- React Query v5
- Tailwind CSS v4.1
- React-hook-form
- Zod

# 실행 방법

1. Install dependencies

> yarn

2. Run on dev mode

> yarn dev

# 디렉토리 구조

/src

- app: 실제 페이지들
- common: 범용적으로 재사용 가능한 파일들
- components: 컴포넌트들
- features: 관심사별로 분리한 기능들
  - api: API 엔드포인트에 대한 요청 함수
  - hooks: 해당 관심사에 해당하는 재사용 가능한 훅
  - schema: 폼이나 필터에 사용되는 zod 스키마
  - types: 관심사 데이터 모델 및 타입 정의
- routes: 실제 페이지에 사용할 경로 데이터 객체
- theme: 프로젝트 내에서 폰트 설정을 위해 사용
- types: 프로젝트 내에서 타입 지원이나 설정을 위해 설정된 파일들
