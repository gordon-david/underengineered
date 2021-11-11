---
title: Vue and D3
---

## Simplest Example

```
<template>
    <svg>
        <circle r="10"
            v-for="(item, index) in dataset"
            :cx="item[0]
            :cy="item[1]
            :key="index"
            fill="#fff" />
    </svg>
</template>
<script>
    import dataset from 'dataset'
    export default{
        data: () => ({dataset})
    }
</script>
```