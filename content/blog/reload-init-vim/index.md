---
title: Reload init.vim without restarting neovim
date: "2020-09-01T22:12:03.284Z"
description: "The road to the perfect vim/nvim configuration continues..."
---

> Note: Most of the information below is also true for vim and its `.vimrc`

The road to the perfect vim/nvim configuration is addictive. I have come to accept that the time I spend configuring my setup will always be greater (much greater) than the time I save using nvim over other text editors. I like to think that I don't use neovim for productivity as much as it makes editing text fun for me, so it all evens out in the end.

It hurts a little to think about it now, but I used to restart nvim everytime I made a change to my `init.vim`. I recently start using a key mapping to reload my nvim config, and it made everything smoother.

Pursuing the inachievable goal that is to stop editing my nvim setup has never been easier.

## `$MYVIMRC`

First of all, the key mapping has to be callabled from whatever file you are in, not just from inside `init.vim`. This will be useful when quickly editing the config while having a project open in a different nvim instance.

Comes `$MYVIMRC`. Both in vim and nvim, `$MYVIMRC` is an environment variable set to the path of your custom configuration file.

Test it by running `:echo $MYVIMRC` inside of vim or nvim.

The output should look like this:

```bash
# nvim
/Users/<user>/.config/nvim/init.vim

# vim
/Users/<user>/.vimrc
```

## Sourcing `$MYVIMRC`

After editing your `init.vim`, you can use the `$MYVIMRC` variable to make nvim load the configuration again, instead of quitting and restarting.

```vim
:source $MYVIMRC
```

A simple key mapping can be created to run that very command. I set mine to 2 times `<Leader>`, which is space in my case.

```vim
nnoremap <Leader><Leader> :source $MYVIMRC<cr>
```

Every time I'm done editing my configuration, I can tap space twice in any open nvim instance, and the results can be noticed instantly.

## Other useful key mappings

### Edit `$MYVIMRC`

The `$MYVIMRC` variable can also be used to quickly open the file in a new buffer.

```vim
:e $MYVIMRC
```

Personally, I use `<Leader>v` as the key mapping to open the file.

```vim
nnoremap <Leader>v :e $MYVIMRC<cr>
```

It could also be `:split` or `:vsplit` instead of `:e` to open the file in a split, not closing the currently open file.

### Reload `$MYVIMRC` and the autoload directory

I like to separate my nvim configuration into multiple self-contained files. For example, I created a file in the `autoload` directory for my customized status line that I call using `all statusline#_init()` in my `init.vim`.

When editing a file in the `autoload` directory, sourcing `$MYVIMRC` is not enough to instantly see the changes made to the edited file. Its the file itself that needs to be sourced.

My solution was to create a `SourceConfig` function in my `init.vim` file that I can call instead when I want to reload all my config.

```vim
if (!exists('*SourceConfig'))
  function SourceConfig() abort
    source ~/.config/nvim/autoload/*
    source $MYVIMRC
  endfunction
endif
```

The `if` condition checks for an already existing `SourceConfig` function. The check is important because otherwise, the function tries to redefine itself (while sourcing `$MYVIMRC`) when it is already in use.

The rest is pretty simple. All files inside of the `autoload` directory (path will be different on vim) as well as the `$MYVIMRC` are sourced.

I updated my key mapping to call the function instead:

```vim
nnoremap <Leader><Leader> :call SourceConfig()<cr>
```
