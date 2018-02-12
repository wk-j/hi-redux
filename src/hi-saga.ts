import { createStore } from "redux"
import { applyMiddleware } from "redux";
import { delay, takeEvery } from "redux-saga"
import createSagaMiddleware from "redux-saga"
import { put } from "redux-saga/effects"

// saga
export function* incrementAsync() {
    yield delay(1000)
    yield put({ type: "Increment" });
}

export default function* rootSaga() {
    yield takeEvery("INCREMENT_ASYNC", incrementAsync)
}

// reducers
type Action =
    | { type: "Increment" }
    | { type: "Decrement" }

function counter(state = 0, act: Action) {
    switch (act.type) {
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

const action = (act: Action) => store.dispatch(act);

action({ type: "Increment" });
action({ type: "Decrement" });
action({ type: "Decrement" });
action({ type: "Decrement" });

console.log(store.getState());