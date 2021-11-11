---
title: "Git Usage and Examples"
tags: [git, programming]
excerpt: "Snippets, workflows, and examples"
date: "2021-10-29"
---

### Typical Workflow

Workflows vary by team and project, but generally...

@startuml
skinparam backgroundcolor transparent
:Make a new branch for development (git checkout -b <feature_development_branch>);
:Make changes to project;
:push changes to remote;
:pull changes to local main (I prefer --rebase);
:push the merged changes to remote/main;
@enduml

```bash
# PS1 => (<current_branch>)
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