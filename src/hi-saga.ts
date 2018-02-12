import { createStore } from "redux"
import { applyMiddleware } from "redux";
import { delay, takeEvery } from "redux-saga"
import createSagaMiddleware from "redux-saga"
import { put } from "redux-saga/effects"

// saga
export function* incrementAsync() {
    yield delay(100)
    yield put({ type: "Increment" })
}

export default function* rootSaga() {
    yield takeEvery("IncrementAsync", incrementAsync)
}

// reducers
type Action =
    | { type: "Increment" }
    | { type: "Decrement" }
    | { type: "IncrementAsync" }

function counter(state = 0, act: Action) {
    switch (act.type) {
        case "Increment": {
            return state + 1
        }
        case "Decrement": {
            return state - 1
        } default: {
            return state
        }
    }
}

// store
const sagaMiddleware = createSagaMiddleware()
let store = createStore(counter, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

const action = (act: Action) => store.dispatch(act)

action({ type: "IncrementAsync" })
action({ type: "IncrementAsync" })
action({ type: "IncrementAsync" })

setTimeout(() => {
    console.log(store.getState())
}, 1000);