# Fairy Park Backend

공공데이터 API를 활용한 주차장 검색 서비스의 백엔드 서버입니다.  
주차장 조회, 검색, 위치 기반 조회, 사용자 인증, 즐겨찾기, 최근 기록, 검색 기록 기능을 제공합니다.

## 기술 스택

- Node.js
- Express
- Prisma ORM
- PostgreSQL / Neon
- JWT
- bcrypt
- cookie-parser
- axios
- fast-xml-parser
- node-cron
- Swagger

## 주요 기능

### 인증

- 회원가입
- 로그인
- Access Token 발급
- Refresh Token 발급 및 저장
- Access Token 재발급
- 로그아웃
- 내 정보 조회

### 주차장

- 공공데이터 API 연동
- XML 응답 JSON 변환
- 주차장 목록 조회
- 주차장 상세 조회
- 키워드 검색
- 위치 기반 주변 주차장 조회
- 무료 / 운영중 필터
- 이름순 / 거리순 정렬

### 사용자 기능

- 즐겨찾기 등록 / 삭제 / 조회
- 최근 조회 기록 저장 / 조회 / 삭제
- 검색 기록 저장 / 조회 / 삭제
- 인기 검색어 조회

### 성능 개선

- 공공데이터 전체 조회 결과 메모리 캐싱
- node-cron 기반 캐시 자동 갱신

## 프로젝트 구조

```txt
src/
├── config/
├── constants/
├── controllers/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

### API 문서

Swagger 문서:

```
http://localhost:5000/api-docs
```

### 환경 변수

`.env`

```
PORT=5000

DATABASE_URL="postgresql://..."

JWT_SECRET="..."
REFRESH_SECRET="..."

PARKING_API_URL="..."
PARKING_API_KEY="..."
```

### 설치 및 실행

```
npm install
npx prisma migrate dev
npm run dev
```

## API 목록

### Auth

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

### Parking

```
GET /api/parkings
GET /api/parkings/:id
GET /api/parkings/nearby
```

### Favorite

```
GET    /api/favorites
POST   /api/favorites/:parkingId
DELETE /api/favorites/:parkingId
```

### History

```
GET    /api/history
POST   /api/history/:parkingId
DELETE /api/history/:parkingId
DELETE /api/history
```

### Search History

```
GET    /api/search-history/popular
GET    /api/search-history
POST   /api/search-history
DELETE /api/search-history/:id
DELETE /api/search-history
```

## 개발 포인트

- 공공데이터 API의 XML 응답을 백엔드에서 JSON으로 변환하여 프론트엔드의 데이터 처리 부담을 줄였습니다.
- 전국 단위 검색 시 반복적인 외부 API 호출이 발생하지 않도록 메모리 캐싱을 적용했습니다.
- 캐시 데이터의 최신성을 유지하기 위해 node-cron으로 자동 갱신 스케줄러를 구현했습니다.
- JWT Access Token과 HttpOnly Cookie 기반 Refresh Token을 분리하여 인증 흐름을 구성했습니다.
- Prisma ORM을 활용해 사용자, 즐겨찾기, 최근 조회 기록, 검색 기록 데이터를 관리했습니다.
