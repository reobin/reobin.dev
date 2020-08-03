---
title: How to change a git commit author
date: "2020-08-01T22:12:03.284Z"
description: Googling this yet again?
---

## 0. Preface

Switching between work and personal environments can lead to mistakes like this.

I try to automate the switch by having scripts setting up different looks on my terminal for each environment I'm working. Sometimes I just forget though. If you're in this situation, you probably forgot something similar not long ago, and are trying to fix it.

Since I never seem to remember the command to change back a git commit author, and google it everytime, here is my attempt at remembering it for good by writing a post about it.

## 1. Interactive rebase

First thing to do is rebasing your git history. You have a couple of choices to enter interactive rebase. My favorite one is using a commit count from `head`.

For example, if I want to change the author of the last 3 commits, I can use:

```bash
git rebase -i HEAD~3
```

This will give you a similar list:

```bash
pick 42e5f88 Commit #1
pick f0674a1 Commit #2
pick 376b59c Commit #3
```

For now, just change `pick` to `edit` on the commits you would like to change the author of.

```bash
edit 42e5f88 Commit #1
pick f0674a1 Commit #2
edit 376b59c Commit #3
```

Notice the change on the first and the third commits.

To rebase, you could also use the hash of a commit directly:

```bash
git rebase -i 42e5f88
```

## 2. Actually changing the author

After saving the open git interactive rebase document is when the rebasing actually starts.

Editing commits is an action that happens one commit at a time. So if you chose to edit `n` commits, you will need to execute the next commands `n` times.

```bash
git commit --amend --author="Author Name <email@address.com>"
```

Since you are still rebasing after this command, execute this next command:

```bash
git rebase --continue
```

The `--continue` command will either end the whole rebasing, or enter the edit mode for the next commit you need to edit.

Once you have edited all your commits, make your changes live by force pushing them to your repository:

```bash
git push --force
```
