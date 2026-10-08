# next-practice

Next.js(App Router, JavaScript) 메모 앱입니다. `create-next-app`으로 만든 프로젝트에 수업 코드를 적용했습니다.

## 실행 방법 (Windows CMD)

```
cd next-practice
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다. 개발 서버는 `Ctrl+C`로 종료합니다.

운영 방식으로 확인하려면 개발 서버를 종료한 뒤 실행합니다.

```
npm run build
npm run start
```

## 사용한 시작 자료와 직접 수정한 부분

- 시작 자료: `npx create-next-app@latest` (JavaScript, App Router, src 폴더 없음, Tailwind·ESLint 없음)
- 직접 작성: `app/layout.js`, `app/page.js`, `app/notes/page.js`, `components/Counter.js`, `components/Notes.js`, `app/globals.css`

| 위치 | 내용 |
| --- | --- |
| `app/layout.js` | 공통 화면. 홈·메모 이동 `Link` |
| `app/page.js` | 홈 화면. `Counter` 연결 |
| `app/notes/page.js` | 메모 화면. `Notes` 연결 |
| `components/Counter.js` | 숫자 증가·초기화 (Client Component) |
| `components/Notes.js` | 메모 등록·수정·삭제 (Client Component) |

## 개념 정리

**Next.js와 React의 관계.** React는 화면을 컴포넌트로 만드는 라이브러리이고, Next.js는 그 위에 파일 기반 라우팅, 서버 렌더링, 빌드·실행 도구를 더한 프레임워크입니다. 화면을 만드는 방식은 React 그대로이고, `app` 폴더의 파일 구조가 주소가 됩니다.

**page.js와 layout.js의 역할.** `page.js`는 해당 주소(`/`, `/notes`)에서 보이는 내용을 담당합니다. `layout.js`는 여러 페이지가 함께 쓰는 틀(상단 이동 링크, `<html>`, `<body>`)이며, 페이지 내용이 `children` 자리에 들어갑니다. 페이지를 이동해도 layout은 유지됩니다.

**"use client"를 붙인 컴포넌트와 이유.** `Counter.js`와 `Notes.js`입니다. 이 컴포넌트들은 `useState`로 값을 기억하고 버튼 클릭·입력 같은 브라우저 이벤트를 처리합니다. Next.js의 컴포넌트는 기본적으로 서버에서 실행되는 Server Component라서 state와 이벤트를 쓸 수 없습니다. 그래서 파일 맨 위에 `"use client"`를 적어 브라우저에서 동작하는 Client Component로 만듭니다. `layout.js`와 `page.js`는 state가 필요 없어 Server Component로 둡니다.

**새로고침하면 초기 상태로 돌아오는 이유.** 메모는 브라우저 메모리의 React state에만 있습니다. 새로고침하면 페이지 코드가 다시 실행되어 `useState`의 초기값(초기 메모 두 개)으로 돌아갑니다. DB에 저장하면 서버에 데이터가 남아 새로고침해도, 다른 브라우저에서도 유지됩니다.

## 메모 기능

- 메모는 고유한 `id`와 `text`로 구분하고, 목록은 `map()`으로 표시하며 `key`에 `id`를 사용합니다.
- 등록: 입력한 내용을 목록 끝에 추가합니다. 공백만 있으면 오류 안내를 보여 주고 등록하지 않습니다.
- 수정: `수정`을 누르면 기존 내용이 입력칸에 채워집니다. 저장하면 같은 `id`의 메모만 바뀌고, 취소하면 원래 내용이 유지됩니다.
- 삭제: `삭제`를 누르면 확인 줄이 나타납니다. 취소하면 남고, 확인하면 해당 `id`만 삭제됩니다. 수정 중인 메모를 삭제하면 폼이 등록 상태로 돌아갑니다.
- 메모가 없으면 빈 목록 안내를 보여 줍니다.

## 동작 확인 결과

`npm run build` 후 `npm run start`로 실행해 다음을 확인했습니다.

1. 홈에서 숫자를 2로 올린 뒤 초기화하여 0이 되고, 링크로 메모 화면에 이동합니다.
2. 같은 내용의 메모 두 개를 등록하고 첫 번째만 수정하면 한쪽만 바뀝니다. (ID로 구별)
3. 수정 취소 시 원래 내용이 유지되고, 공백만 입력하면 오류 안내와 함께 기존 메모가 유지됩니다.
4. 삭제 취소 시 메모가 남고, 확인 시 해당 메모만 삭제됩니다. 수정 중인 메모를 삭제하면 입력칸이 비고 버튼이 `등록`으로 돌아옵니다.
5. 모든 메모를 삭제하면 빈 목록 안내가 나오고, 새로고침하면 초기 메모 두 개로 돌아옵니다.
