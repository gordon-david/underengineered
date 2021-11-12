---
title: "Git Usage and Examples"
tags: [git, programming]
excerpt: "Snippets, workflows, and examples"
date: "2021-10-29"
---

### Typical Workflow

Workflows vary by team and project, but generally...

```bash
# PS1 = '(<current_branch>) $'
(main) $ git checkout -b dev
(dev) $ # make changes to project
# commiting and pushing changes as you work
(dev) $ git add . && git commit -m "..." 
(dev) $ git checkout main
# rebase pulls other branch changes to tip of current
# working history
(main) $ git pull origin dev --rebase
(main) $ git push
```
**Caveats:**
- feature branch will likely need to pull changes made to "main" branch as they diverge. If there's more than one developer it is a good habit to pull these changes just before the last feature branch commit and push.

### Delete Local and Remote Branch
**Resources:**
- [StackOverflow Discussion](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-locally-and-remotely)
- ["git branch -d <...>" Documentation](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--d)
- ["git push <...> -d <...>" Documentation](https://git-scm.com/docs/git-push#Documentation/git-push.txt--d)

```bash
# Delete Remote Branch
git push <remote_name> -d <branch_name>

# Delete Local Branch (-D for force deletion if unmerged)
git branch -d <branch_name>
```

### Resolving Merge Conflicts

**Resources**
- [docs.github: resolving merge conflicts](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)
- [git-merge documentation](https://git-scm.com/docs/git-merge)
- [atlassian tutorials: Git Merge Conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)

### Squashing Branch Commit Histories

If you have a habit of adding 'partial updates' or messy commits you can squash these commits down into a more logical and readable commit history for others to follow using various approaches.

All of these methods are not recommended if these are public commits, pushed to a shared repository, and especially if anyone is basing their work on your commits as it creates a complicated and confusing situation for them.

#### Squash Commits Interactively Down To Root

 (impractical for many commits)

```bash
git rebase --interactive --root
```

#### Soft Reset Feature Branch According to Another Branch

This works best if you want to reset your commit history back to the root of your current branch (i.e. if 'feature_branch' is based on 'main', reset history back to branch-root).

**Resources**:
- [Stack Overflow: How to squash all commits on a branch](https://stackoverflow.com/questions/25356810/git-how-to-squash-all-commits-on-branch)

```bash
# checkout branch to squash
$ git checkout feature_branch
$ git reset --soft main
$ git add... <...add files here, watch for .gitignore etc.>
$ git commit...
```

Alternatively, soft reset to a specified root commit hash and commit
```bash
$ git branch beforeReset
$ git reset --soft <root>
$ git commit --amend

# Verify that new amended root is not different
# than previous branch state
$ git diff beforeReset
```

#### Create a Derived Orphan Branch and Overwrite

```bash
# an orphan forms an initial tip of a
# new and unrelated commit history tree
$ git checkout --orphan new-main main
$ git commit -m "message"
# overwrite the old main with the new one
$ git branch -M new-main main
```