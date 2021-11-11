---
title: 'Basic AWK Notes'
author: 'David Gordon'
excerpt: 'Basic AWK usage and notes...'
date: "2021-10-16"
tags: ["linux"]
---

**AWK**

> a scripting language used for manipulating data and generating reports.

**Resources**
- [AWK User's Guide](https://www.gnu.org/software/gawk/manual/gawk.html)
- [AWK Man Page](https://linux.die.net/man/1/awk)

**Features:**
- variables, numeric functions, string function, logical operators
- define text patterns to be searched for and actions to be taken on matches
- pattern scanning and processing

While `sed` is a stream editor (streams on a per-line basis, primative language features of goto loops and simple conditionals), `awk` is oriented toward a per-line basis with more robust language features.

**Syntax**

`awk options 'selection_criteria {action }' input-file > output-file`

**Print Lines Matching a Pattern**

`awk '/myregex/ {print}' input.txt`

**Splitting a Line Into Fields**

`awk '{print $1,$4} input.txt` : prints word 1 and 4 per line

**pipeline**: `'input line' => [# record][# fields] =actions=> [output-records][output-fields]`

**Built In Variables**
- NR: current number of input records (usually lines)
- NF: number of fields in current record
- FS: field separator used to divide fields in input line, default 'whitespace'
- RS: stores record seporator, default is 'newline'
- OFS: output field seporator, separats when awk outputs, default is blank space. if `print` has several inputs, places OFS between each.
- ORS: output record seporator, `print` places at the end of each output record.