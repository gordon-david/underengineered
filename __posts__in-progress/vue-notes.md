---
title: Vue
---

## Components

**script tag embeded in html**
``` javascript
Vue.component('component-name', {
    ...key value attributes,
    template:`<div></div>` 
})
```

**es6 modules, single file components**
``` jsx
<template>
</template>
<script>
</script>
<style>
</style>
```

**Component Composition**: import component, register in components vue attribute in container component.

### Component Input
*Props*
``` jsx
// component registers item as a property, feeds into data option
Vue.component('product', {
    template:`
        <div>
            Product name {{ item.name }}
        </div>
    `,
    props: ['item']
})

// usage
<product v-bind:item="{name:'our product name'}" />

//OR
<product :item="..." />
```

Proptype/input validation
``` jsx
props:{
    title: {
        type: String,
        required: true
    },
    product_default: {
        default: function(){
        return {name: 'unknown'}
        }
    },
    age_validator: {
        type: Number,
        validator: function(value){
            return value >=18
        }
    }
}
```

### Component Output

*Propagation*: parent method, parent uses child with @eventname, child emits eventname event.
``` html
// parent
<template>
    <child :product="my_product" #save="handleSave" />
</template>
<script>
export default {
    data: () => ({my_product: {name: 'something'}}),
    methods: {
        handleSave(payload){
            console.log('called from child', payload)
        }
    }
}
</script>

// child
<template>
    product name {{ item }}
    <button v-on:click"$emit('save', someData)">Save</button>
</template>
<script>
export default {
    data: () => ({someData: Object.assign({}, this.item)}),
    props: ['item']
}
</script>
```

### Watched Property and Computed Property

``` js
<div id="demo">{{ fullName }}</div>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})

// The above code is imperative and repetitive. Compare it with a computed property version:
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

## Routing

```js
// simple routing
const routes = [
    {path: '/products', component: Product}
]

const router = new VueRouter({
    routes
})
```

### Viewport

```html
<router-outlet/>
```

Named Router views

## Testing

Constructing a Unit Test
- constructor reference
- instantiate constructor
- call mount
- element query 
- assert


With props, events, query selector
```js
import Vue from 'vue'
import MyComp from '../wherevever/MyComp.vue'

describe('MyComp.vue', () => {
  it('xyz', () => {
    const Constructor = Vue.extend(MyComp)
    const vm = new Constructor((propsData:{title: 'abc'})).$mount()
    expect(vm.$el.querySelector('.test h1').textContent)
      .to.equal('Testing...')
      
    const clickEvent = new window.Event('click')
    vm.$el.querySelector('.change-button').dispatchEvent(clickEvent)
    vm._watcher.run() // need to be here, might be propagating event watchers through mounted component tree
    
  })
})
```

## Complex Slotting

**Named Slots**
- named using slot.name="etcetera"
- fallback, default unamed slot
- used with nested template tag in slot container tag


`definition, base-layout.vue`
```html
<template>
  <header>
    <slot name="header"/>
  </header>
  <slot name="main"></slot>
</template>
```

`usage`
```html
<template>
  <base-layout>
    <template v-slot:header>
      <!-- header contents of slot here -->
    </template>
  </base-layout>
</template>
```

## Vue Patterns
YouTube: 7 secret patterns Vue... by Chris Fitts

### Smarter Watchers

```js
created(){
  this.fetchUserList()
},
watch: {
  searchText(){
    this.fetchUserList()
  }
}
```
fetch on created, then watch

watchers can take a string as a value instead of a function, accept method names
```js
watch: {
  searchText: 'fetchUserList'
```

watchers can call themselves
```js
watch:{
  searchText:{
    handler: 'fetchUserList',
    immediate: true //called as soon as component is ready
  }
}```

### Component Registration
typically, import, then register under 'component', then using in template.

`components/_globals.js`: globally register components, `Vue.component(componentName)`, then import this in main(top level) entrypoint to application.


