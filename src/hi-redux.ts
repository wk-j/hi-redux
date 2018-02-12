import { createStore } from "redux"

type Action =
    | { type: "Increment" }
    | { type: "Decrement" }

function counter(state = 0, action: Action) {
    switch (action.type) {
        case "Increment": {
            return state + 1
        }
        case "Decrement": {
            return state - 1
        }
    }
}

let store = createStore(counter)

store.dispatch({ type: "Increment" })
store.dispatch({ type: "Increment" })
store.dispatch({ type: "Increment" })

console.log(store.getState() === 3)