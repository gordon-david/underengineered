---
title: Tree Traversal and Recursion
---



## Tree Traversal, Inorder LNR
``` python
def traverse(node):
    if node is None:
        return
    # recurse into left children, in order
    for i in node.left_children:
        
    visit(node)
    #recurse into right children, in order
```

## Depth-First Traversal, Leaves to Root

**Recursive**
``` python
def traverse(node):
    if node is None:
        return
    
    # recurse into all children
    for child in node.children:
        traverse(child)
    
    visit(node)
```
