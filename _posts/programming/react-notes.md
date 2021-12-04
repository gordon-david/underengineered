---
title: React Notes
excerpt: "General React usage and notes."
tags: [programming, javascript, typescript, react, snippets]
date: "2021-11-29"
---

## Component Scopes and Rendering Lifecycle

```jsx
console.log("Module Scope, Run on Mount")
function Component(){
  console.log("Component Scope, Run on every render before Render Scope")

  const {state, setState} = useState()

  useEffect(() => {
    console.log("Effect Scope, Run after every Render")
    return () => console.log("Run before next effect trigger")
  })
  useEffect(() => {
    console.log("Effect Scope, Run after first Render")
    return () => console.log("Effect Scope, Run before unmount")
  }, [])
  useEffect(() => {
    console.log("Effect Scope, Conditionally run on diff")
    return () => console.log("Effect Scope, Conditionally run before this effect")
  }, [state])
  
  return (
    <div>My Component Display</div>
    {console.log("Render Scope, run every render")}
  )
}
```