# GIT_WORK.md

Git 협업 실습 기록입니다. 한 PC와 한 GitHub 계정(M-YH01)으로 민수·지윤 역할을 나누어 진행했습니다.

- 저장소 주소: https://github.com/M-YH01/git-practice
- 민수 폴더: `C:\work\git-practice-minsu`
- 지윤 폴더: `C:\work\git-practice-jiyun`
- 전략: GitHub Flow 기반의 `main`과 작업 브랜치. 작업 브랜치에서 커밋하고 PR로 검토한 뒤 `main`에 병합하며, 각 폴더의 `main`에서 pull로 결과를 받는다.

| PR | 작성자 | 브랜치 → base | 작업 내용 | 주소 |
| --- | --- | --- | --- | --- |
| PR #1 | 민수 | feature/minsu → main | minsu.md 추가, UTF-8 수정, 보완 커밋 | https://github.com/M-YH01/git-practice/pull/1 |
| PR #2 | 지윤 | feature/jiyun → main | jiyun.md 추가, UTF-8 수정 | https://github.com/M-YH01/git-practice/pull/2 |
| PR #3 | 지윤 | feature/checklist → main | checklist.md(점검표) 추가 | https://github.com/M-YH01/git-practice/pull/3 |

세 PR 모두 **Create a merge commit**으로 병합했습니다. (`git log`의 `Merge pull request #N` 커밋으로 확인)

## 1. 폴더 준비 (C:\work)

GitHub에서 README를 포함한 저장소 `git-practice`를 만든 뒤, 같은 저장소를 두 폴더에 받았습니다.

```
C:\work>git clone https://github.com/M-YH01/git-practice.git git-practice-minsu
Cloning into 'git-practice-minsu'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (3/3), done.

C:\work>git clone https://github.com/M-YH01/git-practice.git git-practice-jiyun
Cloning into 'git-practice-jiyun'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (3/3), done.
```

## 2. 작업 브랜치 만들기와 첫 커밋

### 민수 폴더 (C:\work\git-practice-minsu) — `main`에서 `feature/minsu` 생성

```
C:\work\git-practice-minsu>git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

C:\work\git-practice-minsu>git switch -c feature/minsu
Switched to a new branch 'feature/minsu'

C:\work\git-practice-minsu>echo 민수의 첫 작업 > minsu.md

C:\work\git-practice-minsu>git status
On branch feature/minsu
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        minsu.md

nothing added to commit but untracked files present (use "git add" to track)

C:\work\git-practice-minsu>git add minsu.md

C:\work\git-practice-minsu>git commit -m "민수 작업 파일 추가"
[feature/minsu bc92230] 민수 작업 파일 추가
 1 file changed, 1 insertion(+)
 create mode 100644 minsu.md

C:\work\git-practice-minsu>git log --oneline
bc92230 (HEAD -> feature/minsu) 민수 작업 파일 추가
87c3001 (origin/main, origin/HEAD, main) Initial commit
```

### 지윤 폴더 (C:\work\git-practice-jiyun) — `main`에서 `feature/jiyun` 생성

```
C:\work\git-practice-jiyun>git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

C:\work\git-practice-jiyun>git switch -c feature/jiyun
Switched to a new branch 'feature/jiyun'

C:\work\git-practice-jiyun>echo 지윤의 첫 작업 > jiyun.md

C:\work\git-practice-jiyun>git add jiyun.md

C:\work\git-practice-jiyun>git commit -m "지윤 작업 파일 추가"
[feature/jiyun 384cf88] 지윤 작업 파일 추가
 1 file changed, 1 insertion(+)
 create mode 100644 jiyun.md

C:\work\git-practice-jiyun>git log --oneline
384cf88 (HEAD -> feature/jiyun) 지윤 작업 파일 추가
87c3001 (origin/main, origin/HEAD, main) Initial commit
```

두 폴더는 같은 `Initial commit`(87c3001)에서 각자 갈라져 나왔고, 서로의 파일이 보이지 않습니다.

## 3. 브랜치 전환과 파일 차이 확인 (각자 자기 폴더에서)

### 민수 폴더에서 `main` ↔ `feature/minsu` 전환

```
C:\work\git-practice-minsu>git diff main..feature/minsu
diff --git a/minsu.md b/minsu.md
new file mode 100644
index 0000000..ce3f984
--- /dev/null
+++ b/minsu.md
@@ -0,0 +1 @@
+<B9>μ<F6><C0><C7> ù <C0>۾<F7>

C:\work\git-practice-minsu>git switch main
Switched to branch 'main'
C:\work\git-practice-minsu>dir        (main: README.md만 있음)
C:\work\git-practice-minsu>git switch feature/minsu
Switched to branch 'feature/minsu'
C:\work\git-practice-minsu>dir        (feature/minsu: minsu.md, README.md)
```

`main`에는 `minsu.md`가 없고 `feature/minsu`에는 있습니다. 브랜치를 바꾸면 폴더 안의 파일이 바뀝니다.

### 지윤 폴더에서 `main` ↔ `feature/jiyun` 전환

```
C:\work\git-practice-jiyun>git diff main..feature/jiyun
diff --git a/jiyun.md b/jiyun.md
new file mode 100644
index 0000000..b94097d
--- /dev/null
+++ b/jiyun.md
@@ -0,0 +1 @@
+<C1><F6><C0><B1><C0><C7> ù <C0>۾<F7>
```

`main`에는 `jiyun.md`가 없고 `feature/jiyun`에는 있습니다.

> 위 diff의 `<B9>μ<F6>...` 표시는 CMD의 `echo`가 파일을 한글 윈도우 인코딩(CP949)으로 저장했기 때문입니다. GitHub는 UTF-8을 기대하므로 아래 4번에서 UTF-8로 다시 저장했습니다.

## 4. 로컬 merge (방향: 작업 브랜치 → main)

각 폴더에서 `main`으로 이동한 뒤 자기 작업 브랜치를 merge했습니다. 변경을 **받는 쪽은 `main`**(현재 위치한 브랜치)이고, 작업 브랜치는 그대로입니다.

```
C:\work\git-practice-minsu>git switch main
C:\work\git-practice-minsu>git merge feature/minsu
Updating 87c3001..bc92230
Fast-forward
 minsu.md | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 minsu.md

C:\work\git-practice-minsu>git log --oneline
bc92230 (HEAD -> main, feature/minsu) 민수 작업 파일 추가
87c3001 (origin/main, origin/HEAD) Initial commit
```

```
C:\work\git-practice-jiyun>git switch main
C:\work\git-practice-jiyun>git merge feature/jiyun
Updating 87c3001..384cf88
Fast-forward
 jiyun.md | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 jiyun.md

C:\work\git-practice-jiyun>git log --oneline
384cf88 (HEAD -> main, feature/jiyun) 지윤 작업 파일 추가
87c3001 (origin/main, origin/HEAD) Initial commit
```

이 merge는 내 컴퓨터의 `main`만 바꿉니다. 로컬 `main`이 `origin/main`보다 앞서면 이후 PR 병합 결과를 pull할 때 두 `main`이 갈라지므로, 확인 후 `origin/main`으로 되돌렸습니다. 작업 커밋은 작업 브랜치에 남아 있습니다.

```
C:\work\git-practice-minsu>git switch main
Already on 'main'
Your branch is ahead of 'origin/main' by 1 commit.
C:\work\git-practice-minsu>git reset --hard origin/main
HEAD is now at 87c3001 Initial commit
C:\work\git-practice-minsu>git log --oneline
87c3001 (HEAD -> main, origin/main, origin/HEAD) Initial commit

C:\work\git-practice-jiyun>git reset --hard origin/main
HEAD is now at 87c3001 Initial commit
```

### 한글 인코딩 수정 (UTF-8)

```
C:\work\git-practice-minsu>git switch feature/minsu
C:\work\git-practice-minsu>py -c "open('minsu.md','w',encoding='utf-8').write(...)"
C:\work\git-practice-minsu>git commit -m "minsu.md를 UTF-8로 수정"
[feature/minsu c27396d] minsu.md를 UTF-8로 수정
 1 file changed, 1 insertion(+), 1 deletion(-)
C:\work\git-practice-minsu>git log --oneline
c27396d (HEAD -> feature/minsu) minsu.md를 UTF-8로 수정
bc92230 민수 작업 파일 추가
87c3001 (origin/main, origin/HEAD, main) Initial commit

C:\work\git-practice-jiyun>git switch feature/jiyun
C:\work\git-practice-jiyun>git commit -m "jiyun.md를 UTF-8로 수정"
[feature/jiyun 9a64ab8] jiyun.md를 UTF-8로 수정
 1 file changed, 1 insertion(+), 1 deletion(-)
C:\work\git-practice-jiyun>git log --oneline
9a64ab8 (HEAD -> feature/jiyun) jiyun.md를 UTF-8로 수정
384cf88 지윤 작업 파일 추가
87c3001 (origin/main, origin/HEAD, main) Initial commit
```

(CMD의 `type` 출력이 깨져 보이는 것은 파일이 아니라 CMD 화면의 인코딩 때문이며, GitHub 웹에서는 한글이 정상으로 보였습니다.)

## 5. push와 PR

- 각 폴더에서 자기 작업 브랜치를 push했습니다. (`git push -u origin feature/minsu`, `git push -u origin feature/jiyun`)
- GitHub에서 base `main` ← compare `feature/minsu`(PR #1), base `main` ← compare `feature/jiyun`(PR #2)로 PR을 하나씩 만들었습니다.
- 각 PR의 **Files changed**를 직접 읽고, 확인한 내용을 PR 댓글에 남겼습니다.
  - PR #1: `minsu.md` 1개 파일 추가, 한글이 UTF-8로 정상 표시됨.
  - PR #2: `jiyun.md` 1개 파일 추가, 한글이 UTF-8로 정상 표시됨.

### 민수의 보완 커밋 (같은 작업 브랜치 → 기존 PR #1에 반영)

`feature/minsu`에 커밋을 추가하고 push해서 기존 PR #1에 반영했습니다. 새 PR은 만들지 않았습니다. 보완 커밋은 `06ac4a8 minsu.md 내용 보완`이고, PR #1의 Commits 탭에서 3개 커밋(작업 파일 추가, UTF-8 수정, 내용 보완)을 확인했습니다. 병합 후 `git log`에서도 이 커밋이 보입니다.

```
2a9f086 Merge pull request #1 from M-YH01/feature/minsu
06ac4a8 (origin/feature/minsu, feature/minsu) minsu.md 내용 보완
c27396d minsu.md를 UTF-8로 수정
bc92230 민수 작업 파일 추가
```

## 6. 두 PR 병합 후 pull

GitHub에서 PR #1, PR #2를 모두 **Create a merge commit**으로 병합한 뒤, 두 폴더의 `main`에서 pull했습니다. PR 병합은 GitHub(원격)의 `main`만 바꾸므로 각 폴더에서 `git pull`을 해야 로컬 `main`에 반영됩니다.

```
C:\work\git-practice-minsu>git switch main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

C:\work\git-practice-minsu>git pull
From https://github.com/M-YH01/git-practice
   87c3001..eacd9a4  main          -> origin/main
 * [new branch]      feature/jiyun -> origin/feature/jiyun
Updating 87c3001..eacd9a4
Fast-forward
 jiyun.md | 1 +
 minsu.md | 2 ++
 2 files changed, 3 insertions(+)
 create mode 100644 jiyun.md
 create mode 100644 minsu.md

C:\work\git-practice-minsu>git log --oneline
eacd9a4 (HEAD -> main, origin/main, origin/HEAD) Merge pull request #2 from M-YH01/feature/jiyun
2a9f086 Merge pull request #1 from M-YH01/feature/minsu
06ac4a8 (origin/feature/minsu, feature/minsu) minsu.md 내용 보완
9a64ab8 (origin/feature/jiyun) jiyun.md를 UTF-8로 수정
c27396d minsu.md를 UTF-8로 수정
384cf88 지윤 작업 파일 추가
bc92230 민수 작업 파일 추가
87c3001 Initial commit

C:\work\git-practice-minsu>dir
2026-10-08  오후 03:52                21 jiyun.md
2026-10-08  오후 03:52                43 minsu.md
2026-10-08  오후 03:35                14 README.md
```

```
C:\work\git-practice-jiyun>git switch main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

C:\work\git-practice-jiyun>git pull
From https://github.com/M-YH01/git-practice
   87c3001..eacd9a4  main          -> origin/main
 * [new branch]      feature/minsu -> origin/feature/minsu
Updating 87c3001..eacd9a4
Fast-forward
 jiyun.md | 1 +
 minsu.md | 2 ++
 2 files changed, 3 insertions(+)
 create mode 100644 jiyun.md
 create mode 100644 minsu.md

C:\work\git-practice-jiyun>git log --oneline
eacd9a4 (HEAD -> main, origin/main, origin/HEAD) Merge pull request #2 from M-YH01/feature/jiyun
2a9f086 Merge pull request #1 from M-YH01/feature/minsu
06ac4a8 (origin/feature/minsu) minsu.md 내용 보완
9a64ab8 (origin/feature/jiyun, feature/jiyun) jiyun.md를 UTF-8로 수정
c27396d minsu.md를 UTF-8로 수정
384cf88 지윤 작업 파일 추가
bc92230 민수 작업 파일 추가
87c3001 Initial commit

C:\work\git-practice-jiyun>dir
2026-10-08  오후 03:52                21 jiyun.md
2026-10-08  오후 03:52                43 minsu.md
2026-10-08  오후 03:36                14 README.md
```

양쪽 폴더 모두 `minsu.md`와 `jiyun.md`가 있고, 두 폴더의 `main` 최신 커밋이 `eacd9a4`로 같습니다.

## 7. feature/checklist (지윤 폴더에서 작업)

지윤 폴더의 최신 `main`에서 `feature/checklist`를 만들고 `checklist.md`(점검표)를 추가한 뒤, push해서 PR #3을 만들었습니다. PR #3의 Files changed를 읽고 확인한 내용을 댓글로 남긴 뒤 **Create a merge commit**으로 병합했습니다.

- 점검표 커밋: `a55f571 점검표 추가`
- 병합 커밋: `51bb211 Merge pull request #3 from M-YH01/feature/checklist`

병합 후 두 폴더에서 다시 pull했습니다.

```
C:\work\git-practice-minsu>git switch main
Already on 'main'
Your branch is up to date with 'origin/main'.

C:\work\git-practice-minsu>git pull
From https://github.com/M-YH01/git-practice
   eacd9a4..51bb211  main              -> origin/main
 * [new branch]      feature/checklist -> origin/feature/checklist
Updating eacd9a4..51bb211
Fast-forward
 checklist.md | 6 ++++++
 1 file changed, 6 insertions(+)
 create mode 100644 checklist.md

C:\work\git-practice-minsu>git log --oneline -5
51bb211 (HEAD -> main, origin/main, origin/HEAD) Merge pull request #3 from M-YH01/feature/checklist
a55f571 (origin/feature/checklist) 점검표 추가
eacd9a4 Merge pull request #2 from M-YH01/feature/jiyun
2a9f086 Merge pull request #1 from M-YH01/feature/minsu
06ac4a8 (origin/feature/minsu, feature/minsu) minsu.md 내용 보완

C:\work\git-practice-minsu>dir
2026-10-08  오후 03:56               184 checklist.md
2026-10-08  오후 03:52                21 jiyun.md
2026-10-08  오후 03:52                43 minsu.md
2026-10-08  오후 03:35                14 README.md
```

```
C:\work\git-practice-jiyun>git switch main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

C:\work\git-practice-jiyun>git pull
From https://github.com/M-YH01/git-practice
   eacd9a4..51bb211  main       -> origin/main
Updating eacd9a4..51bb211
Fast-forward
 checklist.md | 6 ++++++
 1 file changed, 6 insertions(+)
 create mode 100644 checklist.md

C:\work\git-practice-jiyun>git log --oneline -5
51bb211 (HEAD -> main, origin/main, origin/HEAD) Merge pull request #3 from M-YH01/feature/checklist
a55f571 (origin/feature/checklist, feature/checklist) 점검표 추가
eacd9a4 (이하 동일)

C:\work\git-practice-jiyun>dir
2026-10-08  오후 03:56               184 checklist.md
2026-10-08  오후 03:52                21 jiyun.md
2026-10-08  오후 03:52                43 minsu.md
2026-10-08  오후 03:36                14 README.md
```

## 8. 완료한 작업 브랜치 정리

병합이 끝난 브랜치만 지워 주는 `git branch -d`로 각 폴더의 자기 브랜치를 정리했습니다.

```
C:\work\git-practice-minsu>git branch
  feature/minsu
* main
C:\work\git-practice-minsu>git branch -d feature/minsu
Deleted branch feature/minsu (was 06ac4a8).
C:\work\git-practice-minsu>git branch
* main

C:\work\git-practice-jiyun>git branch
  feature/checklist
  feature/jiyun
* main
C:\work\git-practice-jiyun>git branch -d feature/jiyun
Deleted branch feature/jiyun (was 9a64ab8).
C:\work\git-practice-jiyun>git branch -d feature/checklist
Deleted branch feature/checklist (was a55f571).
C:\work\git-practice-jiyun>git branch
* main
```

GitHub에 남아 있던 병합 완료 브랜치도 삭제했습니다. PR 기록과 커밋은 브랜치를 지워도 남아 있습니다.

```
C:\work\git-practice-jiyun>git push origin --delete feature/minsu feature/jiyun feature/checklist
To https://github.com/M-YH01/git-practice.git
 - [deleted]         feature/checklist
 - [deleted]         feature/jiyun
 - [deleted]         feature/minsu

C:\work\git-practice-jiyun>git fetch --prune

C:\work\git-practice-minsu>git fetch --prune
From https://github.com/M-YH01/git-practice
 - [deleted]         (none)     -> origin/feature/checklist
 - [deleted]         (none)     -> origin/feature/jiyun
 - [deleted]         (none)     -> origin/feature/minsu

C:\work\git-practice-minsu>git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
```

## 질문 답변

1. **`main`에서 `git merge feature/minsu`를 실행하면 어느 브랜치가 변경을 받는가?**  
   현재 위치한 브랜치인 `main`이 `feature/minsu`의 변경을 받습니다. `feature/minsu`는 그대로 남습니다.

2. **GitHub에서 PR을 병합한 뒤에도 각 폴더에서 pull해야 하는 이유는 무엇인가?**  
   PR 병합은 GitHub(원격 저장소)의 `main`만 바꿉니다. 내 컴퓨터의 로컬 `main`은 자동으로 바뀌지 않으므로, `git pull`로 원격의 병합 결과를 받아 와야 두 폴더가 같은 최신 상태가 됩니다.
