---
title: "Consuming Models in React"
excerpt: "Patterns for maintaining separate View and Model concerns."
date: "2021-12-4"
tags: [programming, javascript, typescript, react, snippets]
---

These are example designs to use when separating pure model modules from React components. In each case, we define React components as consumers of instances of a 'model'. There are many ways to design our components while keeping the models themselves unchanged. There are benefits to this style of design, but each of the below examples will add extra layers of abstraction and complexity to the project.

It's important to remember that Reacts 'diff'-ing algorithm should be treated as if it uses simple shallow equality (`===`) to determine whether a component should update. If our model instances alter over time we should take care to either use immutable instance or have some other reconciliation pattern (i.e. using redux, mobx, or any other intermediatary that consumers can listen to for 'mutation events'). I've opted for having my consuming components treat the model as if it were immutable, making for straight-forward examples.

**Example Model**
```ts
class Model {
  name: string;
  value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
```

**Single Level Composition**
```tsx
export function OneLevel(props) {
  const [model, setModel] = useState(new Model("test", 42));

  console.log(model.value);
  console.log(new Model("test", 12) == new Model("test", 12));

  return (
    <div>
      <button
        onClick={() => {
          setModel(new Model(model.name, (model.value += 1)));
        }}
      >
        OneLevel
      </button>
      {JSON.stringify(model, null, 2)}
    </div>
  );
}
```

**Multi-Level Composition**
```tsx
export function MultiLevel() {
  // serves as container
  const [model, setModel] = useState(new Model("test", 42));

  const increment = (e) => {
    e.preventDefault();
    setModel(new Model(model.name, (model.value += 1)));
  };

  return <MultiLevel_Child increment={increment} model={model} />;
}

function MultiLevel_Child(props) {
  // serves as 'renderer'

  return (
    <div>
      <button onClick={(e) => props.increment(e)}>MultiLevel</button>
      {JSON.stringify(props.model, null, 2)}
    </div>
  );
}
```

**Sibling Components with Context Hooks**

```tsx
/* 
 * Hooks, passing hook context between siblings.
 * This context, even though it is 'defined' at the
 * module scope, will still differ on the HookContext
 * component scope. That is, two HookContext instances
 * will not provide the same vales.
 */

/** Top Level Component **/
// Composes a Provider with it's child-consumers
export function HookContext() {
  return (
    <ModelProvider>
      <div>
        <SiblingA /> <SiblingB />
      </div>
    </ModelProvider>
  );
}

/** Components that reference the same type of context **/

// presents alterations to model
function SiblingA() {
  const {increment} = useModel()
  return <button onClick={increment}>HookContext</button>;
}

// displays model
function SiblingB() {
  const state = useModel();

  return <div>{JSON.stringify(state, null, 2)}</div>;
}

/**********************************/
/** Context and Hook Definitions **/
/**********************************/

// begin as undefined, requires instantiation by a Provider
const ModelContext = 
  createContext<{model: any, increment: () => void} | undefined>(undefined);

function ModelProvider({children}) {
  // instantiate a new default instance for each Provider instance
  const [model, setModel] = useState(new Model("test", 42));

  const increment = () => {
    setModel(new Model(model.name, model.value += 1))
  }

  const value = {model, increment}

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}

function useModel() {
  const context = useContext(ModelContext);

  if(context === undefined){
    throw new Error("useModel but be used within a ModelProvider")
  }
  return context
}
```