---
title: "Python Project Structure and Setup"
date: "2021-10-27"
excerpt: "The average setup steps for a new Python project"
tags: [python, programming]
---

**Resources**
- [Hitchhiker's Guide to Python: Structuring Your Project](https://docs.python-guide.org/writing/structure/)

## General Use Case Steps

1. Directory Setup:
  
```txt
./docs/ {documentation directory}
./project/ {application code directory}
./tests/ {tests, separated (see below for importing application code)}
./readme.md
./setup.py
./LICENSE
./requirements.txt
```

2. Python Development Environment
  
- **Creation** 

```bash
python -m venv venv
```

- **Activation**

```bash
source ./venv/bin/activate
```

- **Deactivation**
  
```bash
deactivate
```

- **Package Installation**
```bash
pip install x, y, z
```

- **Output Installed Package Information to requirements.txt File**
```bash
pip freeze >> requirements.txt
```

- **Package Installation From requirements.txt**

```bash
pip install -r requirements.txt
```

1. Python Testing Setup

- **Importing Application Module Into Tests**

*./tests/context.py*
```python
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import project # application code module name
```

*./tests/test_project.py*
```python
from .context import project
```