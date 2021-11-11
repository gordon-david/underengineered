---
title: "Load Files Using Node"
author: "David Gordon"
date: "2021-10-17"
excerpt: "Node file operation examples"
tags: ["programming", "web development", "node", "javascript"]
---

**Resources:**
- [Node File System Documentation](https://nodejs.org/api/fs.html)
- [Node Path Documentation](https://nodejs.org/api/path.html)

## Load Files Using Node, Synchronous API

Reading directory contents can be done synchronously with `fs.readdirSync(path[,options])`. This function returns an array of filenames associated with files in the directory (excluding '.' and '..'). This functionality is based on the POSIX `readdir()` function ([readdir(3) documentation](https://man7.org/linux/man-pages/man3/readdir.3.html))

Reading the contents of files is as simple as passing the full file path of the file to `fs.readFileSync(path[,options])`. This function returns a buffer of the contents, if you want the contents encoded as a string you need to pass an encoding option with the call; e.g. `fs.readFileSync(path, 'utf-8')`.

These examples are synchronous and blocking, which is often fine if used as a build or compile-time step. However, as will be seen further down, the asynchronous api doesn't add much complexity overhead and may result in more efficient file processing. Because many of Node's filesystem functions call external system calls we don't need our application to hang around while waiting for the system call to return. This is especially beneficial for system calls that take a long time to complete (such as reading massive directories or reading very large files).

```javascript
import fs from 'fs'
import path from 'path'

/* Returns a String Array of file names in the directory given */
export function getFilesIn(directory){
  return fs.readirSync(directory)
}

/* Returns a list of file contents */
export function getAllFileContents(directory){
  return getFilesIn(directory)
    // we us path.join() to join the directory path with the filename
    // again, many of the file system functions require the full path
    .map(filename => path.join(directory, filename)) 
    .map(file => fs.readFileSync(file))
}
```

## Load Files Using Node, Asynchronous Promise API

```javascript
import path from 'path'
import { readdir, readFile } from 'fs/promises'

// returns a promise whose resolved value is
// an array of filenames
function getFilesIn(directory){
  return readdir(directory)
}

// returns an promise whose resolved value is
// an array of file contents
async function getAllFileContents(directory){
  const filenames = await getfileIn(directory)

  const paths = filenames.map(filename => path.join(directory, filename))

  // Promise.all receives an array of promises and wraps them in a single promise
  // whose resolved value is an array of the original promises resolved values
  return Promise.all(paths.map(_path => readFile(_path, 'utf-8')))
}
