---
title: "Architectures For Separating Model Concerns in Frontend Web Applications"
excerpt: "A very basic example of separating domain model concerns from view-layer logic."
tags: [programming, react, typescript, javascript, snippets]
date: "2021-12-8"
---



## Separate 'ViewModel' from 'ViewController'

In some instances we may want an extra layer of abstraction between a Model and whatever is managing state for the frontend (a Service, a Context, a useState declaration, etc.). It can be argued this just makes for too much obtuse abstraction, a simpler example is provided below without this extra layer.

A ViewModel generally handles initialization, updates, and lifecycle concerns for one or more instances of a Model. A ViewController will handle similar concerns as a ViewModel, but within the context or language of your View. Your View references a ViewController, a ViewController references a ViewModel, and your ViewModel references a Model.

**Types**
```ts
export interface IModel {
  name: string;
}

interface Serializable<T> {
  toJson: () => T;
}

interface IModelActions {
  updateName: (name: string) => void;
}
```

**Model**
```tsx
class Model implements IModel, Serializable<IModel> {
  toJson(): IModel {
    return { name: this.name };
  }
  name: string = "";
  constructor() {}
}
```
**ViewModel**
```tsx
class ViewModel implements IModelActions {
  private instance: IModel;

  // to be clear about the intended initialization of a ViewModel,
  // we hide the constructor and use named factory methods
  // 'create' and 'update'
  private constructor(model: IModel) {
    this.instance = model;
  }

  updateName(name: string): void {
    this.instance.name = name;
  }

  // creating a new instance
  static create() {
    return new ViewModel(new Model());
  }

  // make a new instance of the ViewModel,
  // reusing the model instance
  update() {
    return new ViewModel(this.instance);
  }

  // get plain object that represents the model
  // in its current form
  get data(): IModel {
    return this.instance.toJson();
  }
}
```

**ViewController**
```tsx
function useModel(): {model: IModel} & IModelActions{
  const [viewModel, setViewModel] = useState<ViewModel>(ViewModel.create());
  const [model, setModel] = useState<IModel>(viewModel.data);

  // when viewModel updates,
  // we update model data used by
  // consuming Views
  useEffect(() => {    
    setModel(viewModel.data)
  }, [viewModel])

  const actions: IModelActions = {
    updateName: function (name: string): void {
      viewModel.updateName(name)
      setViewModel(viewModel.update())
    }
  }

  return {
    model, ...actions
  }
}
```

**View**
```tsx
export function View() {
  const {model, updateName} = useModel()

  return (
    <div>
      {JSON.stringify(model, null, 2)}
      <button
        onClick={() => {
          updateName('test');
        }}
      >
        click
      </button>
    </div>
  );
}
```
Here is a rough diagram of the above to help sort through the code.

@startuml

interface IModelActions {
  updateName(name: string)
}

interface IModel {
 + name: string
}

class Model {
  + name: string
}

class ViewModel {
  + create()
  + update()
  + data() : IModel
}

object useModel <<function>> {
  returns an object that is a Union type of
  IModel and IModelActions
  ..
  + model: IModel
  + updateName(name: string)
  ---
  - model : Model
  - viewModel : ViewModel
}

object View<<ReactNode>> {
  useModel
}

Model ..|> IModel
useModel ..|> IModel
useModel ..|> IModelActions
ViewModel ..|> IModelActions

useModel --* ViewModel
ViewModel --* Model
View --* useModel

@enduml

### Fluid ViewModel API

Many alternatives exist for this style of design. A fluid architecture may make more sense for consumers of the viewmodel if you expect to recieve an 'updated reference' to your model after every mutation.

```ts
interface IModelFluidActions {
  updateName: (name: string) => IViewModel
  updateValue: (value: number) => IViewModel
}
```

This allows you to have context functions like so:

```ts
function updateName(name: string){
  this.setViewModel(viewModel.updateName(name))
}
```

## Merging 'ViewModel' and 'ViewController'

Because both ViewModel and 'useModel' implement IModelActions, it is possible to merge both entities into a single unit. In React terms, we would use something like a Context provider to serve as our ViewModel. The point of this exercise is to hide the actual instance of Model and expose a more framework specific entity for the View to consume. We do this by providing 'read' capability with toJson() and 'write' capability through implementations of IModelActions. This gives a useful state machine that can more easily be integrated with frontend libraries like React.

```tsx
function useModel() : {model: IModel} & IModelActions {
  // our private instance
  // singletons might instead be declared
  // in module scope
  const [instance, setInstance] = useState(new Model())

  // our publicly accessable model data
  const [model, setModel] = useState(instance.toJson())

  // actions through which we mutate the instance
  const actions: IModelActions {
    updateName: function(name: string) {
      instance.name = name

      // we update the data that will be
      // read by consumers
      setModel(instance.toJson())
    }
  }

  return {
    model,
    ...actions
  }
}
```