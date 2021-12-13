---
title: "Global Modal Hook with React Context API"
excerpt: "Example design of globally available 'useModal' hook that renders a modal with a message supplied by the hook consumer."
tags: [programming, react, snippets, typescript, javascript]
date: "2021-12-13"
---

**Requirements:**
- Provide a means of handling messages that must be read by the user.
- The messages should be creatable from any component in the system, but handled in one place.
- The context for this design is an 'Error Modal', that could supply input error messages to the user from any form on the site.

**Benefits of this Design:**
- Is globally available and generally straightforward to use.
- All error messages can be handled in a consistent manner (i.e. consistent styling and UX flow).

**Drawback:**
- Because we make use of a stateful hook, provide it through the context api, any consumer of the hook will potentially rerender on use. This rerendering can be stopped with memoization if needed.
- We use a singleton to make a single context instance available. This bears all the benefits and drawbacks with Singletons.

## Code

**Context and Provider**

Here we're using the module pattern as the example code could all rest in a single file. Obviously we could just as easily place this in its own module file if we're targeting modern javascript with babel.

```tsx
import "./index.css"
const { useErrorModal, ErrorContextProvider } = (() => {
    // private context
    const ErrorContext = createContext
        <undefined | { addError: ({ message: string }) => void }>
        (undefined)

    function ErrorContextProvider({ children }: { children: React.ReactNode }) {

        const [errors, setErrors] = useState<any[]>([])

        // sent to hook consumers to add an error
        const addError = ({ message }: { message: string }) => {
            setErrors(prev => [...prev, { message }])
        }

        // sent to our error modal view component
        // to close individual errors
        const closeError = (id: number) => {
            setErrors(errors => errors.filter((val, index) => index !== id))
        }

        return (
            <ErrorContext.Provider value={{ addError }}>
                <ErrorModalView closeError={closeError} errors={errors} />
                {children}
            </ErrorContext.Provider>
        );
    }

    function ErrorModalView({ errors, closeError }) {
        return <Fragment>
            {errors.map((e, id) =>
                <div className="error-modal">
                    <div className="content">
                        <button onClick={() => closeError(id)} >close</button>
                        {JSON.stringify(e)}
                    </div>
                </div>
            )}
        </Fragment>
    }

    function useErrorModal() {
        const context = useContext(ErrorContext)

        if (context === undefined) {
            throw new Error("Error Context Is Undefined")
        }
        return context
    }

    return { useErrorModal, ErrorContextProvider }
})()
```

**Error Modal Consumer**

A very simple component that uses the modal

```tsx
function ErrorTester() {
    const { addError } = useErrorModal()

    useEffect(() => {
        console.log("rendered");
    })
    return <button onClick={() => addError({ message: "test error" })}>
        add error
    </button>
}
```