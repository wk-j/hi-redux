import { createStore } from "redux"
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"

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

let store = createStore<number>(counter, applyMiddleware(thunk))

store.dispatch((dp) => dp({ type: "Increment" }))
store.dispatch((dp) => dp({ type: "Increment" }))
store.dispatch((dp) => dp({ type: "Increment" }))
store.dispatch((dp) => dp({ type: "Decrement" }))

console.log(store.getState() === 2)