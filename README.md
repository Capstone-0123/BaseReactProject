# 🧪 BaseReactProject

> [Nextify](https://github.com/Capstone-0123/Nextify)의 **마이그레이션 결과를 비교·검증하기 위한 기준 프로젝트 모음**

같은 React 프로젝트를 서로 다른 방식으로 Next.js에 옮긴 결과를 나란히 두고 비교합니다.

<br>

## 왜 필요한가

마이그레이션 도구가 "잘 동작한다"를 주장하려면 **비교 대상**이 있어야 합니다.
이 저장소는 동일한 원본을 세 가지 경로로 옮겨, Nextify의 결과물이 사람이 손으로 한 것과 다른 AI 도구가 한 것에 비해 어떤지 확인하는 용도입니다.

<br>

## 구성

| 디렉터리 | 내용 |
|---|---|
| `netflix-clone3/` | **원본** — React + Vite + TypeScript + Tailwind |
| `netflix-clone3-nextified/` | **Nextify CLI로 변환한 결과** |
| `mig_seongwon/Manual migration/` | **사람이 직접 마이그레이션한 기준선** |
| `mig_seongwon/migrated-by-cursor/` | **Cursor AI로 마이그레이션한 비교군** |

```
원본(netflix-clone3)
   ├─→ 사람이 직접        →  Manual migration      ← 정답에 가까운 기준선
   ├─→ Cursor AI          →  migrated-by-cursor    ← 경쟁 도구
   └─→ Nextify CLI        →  netflix-clone3-nextified
```

<br>

## 원본 프로젝트

넷플릭스 클론 UI입니다. 마이그레이션에서 까다로운 지점을 고루 포함하도록 구성되어 있습니다.

- `components/` — Navbar · Hero · MovieRow · MovieCard (CSS Modules)
- `pages/` — Browse
- `hooks/useMovies.ts` — 데이터 패칭 훅
- Tailwind + PostCSS 설정, TypeScript 프로젝트 레퍼런스(`tsconfig.app.json` / `tsconfig.node.json`)

CSS Modules, 라우팅, 데이터 패칭 훅, Tailwind 설정 — Next.js로 넘어갈 때 각각 다른 처리가 필요한 요소들입니다.

<br>

## 실행

각 디렉터리는 독립된 프로젝트입니다.

```bash
cd netflix-clone3          # 또는 netflix-clone3-nextified 등
yarn install
yarn dev
```

<br>

## 관련 저장소

- [Capstone-0123/Nextify](https://github.com/Capstone-0123/Nextify) — 마이그레이션 자동화 CLI 본체

<br>

## 팀

| GitHub |
|---|
| [@seongwwww](https://github.com/seongwwww) |
| [@hyeryunYou](https://github.com/hyeryunYou) |
| [@coldgeon](https://github.com/coldgeon) |
