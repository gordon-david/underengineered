---
title: "Trees"
excerpt: "Notes on trees and tree-like structures"
date: "2021-10-29"
tags: ["computer science", "programming"]
---

For the following tree:

@startuml
skinparam backgroundcolor transparent
left to right direction
(1) --> (2)
1 --> (3)
2 --> (4)
2 --> (5)
3 --> (6)
3 --> (7)
@enduml

- Branching Factor ($b$): constant or variable, the number of branches of a particular node in a tree (e.g. 2)
- Nodes ($n$): the number of nodes contained in a tree (e.g. 7)
- Depth ($d$): the number of edges from the root node to some node (node 2 is at depth 1).
  - Maximum depth of a tree of constant $b$, aka height: $d=floor(log_b n)$, this holds for a fully saturated tree of constant branching (a typical b-tree, binary tree, etc.).

## Breadth First

```python
def bfs(root, val):
  queue = []
  queue.append(root)
  while len(queue) > 0:
    node = queue.pop()
    if node.val == val:
      return node
    for child in node.children:
      queue.append(child)
```

A recursive solution will need to pass a queue through the call stack as an auxillary data structure. However, a queue frontier and the value being searched for are the least number of parameters needed for this solution (unless you outsource 'value' matching to some other `traverse(val)` function).

```python
# called as bfs([root], 'my_value')
def bfs(queue, val):
  if queue:
    node = queue.pop()
    if node.val == val:
      return node
    for child in node.children:
      queue.append(child)
    bfs(queue, val)
```

## Depth First

```python
def dfs(root, val):
  stack = []
  stack.insert(0, root)
  while len(stack) > 0:
    node = stack.pop()
    if node.val == val:
      return node
    for child in node.children:
      stack.insert(0, child)
```

```python
def dfs(node, val):
  if node.val == val:
    return node
  for child in node.children:
    dfs(child, val)
```