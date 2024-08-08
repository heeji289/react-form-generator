# 페이지

## 1. 설문지 응답 페이지

### 1-1. 설문지 페이지 `/form/:id`

- [x] 설문지 데이터를 받아 동적으로 form들을 그린다.
- [x] form input들을 각 각 조작할 수 있다.
- [x] required 항목은 표시해주고 유효성 검사한다. (입력 안했을 시, 제출 불가)
- [x] 제출 버튼 클릭시, 설문지 응답 결과 노출한다.
  - 제출 결과 페이지로 이동
- [x] 이전, 다음 버튼으로 섹션을 오갈 수 있다.
  - [x] 마지막 섹션 페이지에서는 "다음" 대신 "제출" 버튼 노출
  - [x] 첫 번째 섹션 페이지에서는 "이전" 버튼 비활성화 (혹은 미노출)

### 1-2. 설문지 결과 페이지 `/form/:id/submit`

- [x] formID에 맞는 설문지 결과를 불러온다.

### 1-3. 추가 기능

- [x] 양식 지우기 기능
- [x] 불러오기 기능
  - 로컬 스토리지 / 세션 스토리지를 활용해 데이터 저장
  - 페이지 새로고침 시 저장된 데이터 불러오기

## 2. 설문지 목록 페이지

## 3. 설문지 생성/수정 (+통계) 페이지

### 3-1.주요 기능

설문지 생성

- [ ] 설문 제목, 설명 수정 기능
- [ ] 질문 추가/수정/삭제 기능
- [ ] 질문 타입 변경 기능
- [ ] 옵션 추가/수정/삭제 기능 (radio, checkbox)
- [ ] 설문지 저장 기능 (매번? 자동?)
  - 사용자가 몇 초 동안 변경을 하지 않으면 서버에 저장 요청하는 방식으로
  - 아니면, 저장 버튼 같은 걸 둬서 저장하도록
- [ ] 유효성 검사

설문지 응답 통계

# 데이터 모델과 API 설계

`survey`

```
type Survey = {
  id: string // primary key
  title: string
  description: string
  questions: dd
}
```

`response`

```
type Response = {
  id: string // primary key
  surveyID: string // foreign key
  answers: dd
}
```

## 1. 설문지 관련 API

- [ ] 설문지 목록 조회: GET /api/surveys
- [ ] 설문지 생성: POST /api/surveys
- [ ] 설문지 상세 조회: GET /api/surveys/:id
- [ ] 설문지 전체 업데이트: PUT /api/surveys/:id
- [ ] 설문지 삭제: DELETE /api/surveys/:id

## 2. 설문 응답 관련 API

- [ ] 응답 제출: POST /api/surveys/:id/responses
- [ ] 응답 조회: GET /api/surveys/:id/responses
- [ ] 통계 조회: GET /api/surveys/:id/statistics

# 상태관리

- 고민: React Context 같은 전역 상태 관리 툴 필요?
