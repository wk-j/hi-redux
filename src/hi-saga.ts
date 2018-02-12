import { createStore } from "redux"
import { takeEvery, delay } from "redux-saga"
import createSagaMiddleware from 'redux-saga'
import { put } from "redux-saga/effects"
import { applyMiddleware } from "redux";

// saga
export function* incrementAsync() {
    yield delay(1000)
    yield put({ type: "Increment" })
}

export default function* rootSaga() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// reducers
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

// store
const sagaMiddleware = createSagaMiddleware()
let store = createStore(counter, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({ type });

action("Increment")
action("Decrement")
action("Decrement")
action("Decrement")

console.log(store.getState());
