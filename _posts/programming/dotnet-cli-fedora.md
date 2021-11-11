---
title: Dotnet CLI on Fedora
date: '2021-11-3'
---

## Package Management

The `dotnet` cli, as well as the sdk, dotnet runtime, and asp runtime for 3.1 and 5.0 are all available under the Fedora's standard "updates" repository.

**installation**

```bash
$ dnf install\
dotnet\
dotnet-runtime-5.0\
aspnetcore-runtime-5.0
```

