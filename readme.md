# :see_no_evil: Gwylio

⊂(ↁ_ↁ)つ  Watch files for changes and copy them somewhere else

## Installation

TBD

## Command Line Usage

```shell
$ cd my/project/dir
$ gwylio --src my/src --dest ~/gwylio-test  --files my.md,**/*.css,**/*.js
```

### Options

* Source (````--src -s````) - The folder to watch, relative to current file path
* Dest (````--dest -d````) - The dir to copy to (can be rel or a full path - eg: c:/desktop/my/folder)
* Files (````--files -f````) - A comma seperated list of files or globs to watch (eg: app.js, styles/\*.css, \*\*/\*.html)

## Why?
* Windows/.Net front-end pain
* Fun
