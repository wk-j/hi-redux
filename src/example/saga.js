// thunk
const getPromotions = () => async (dispatch) => {
    try {
        dispatch(fetchPromotions()) // {type: FETCH_PROMOTION}
        const response = await api.post('/get.promotion')
        const result = response.data.result
        dispatch(fetchPromotionsSuccess(result))
        // {type: FETCH_PROMOTION_SUCCESS, payload: result}

    } catch (error) {
        const message = error.value || 'Unknown Fail'
        dispatch(fetchPromotionsFailure(message))
        // {type: FETCH_PROMOTION_FAILURE, payload: message}
    }
}

// saga
function* getPromotions() {
    yield take('FETCH_PROMOTIONS')
    yield put({ type: 'SHOW_LOADING_INDICATOR' })
    try {
        const response = yield call(api.post, '/get.promotion')
        yield put({ type: 'FETCH_PROMOTION_SUCCESS', payload: response.data.result })
        yield put({ type: 'HIDE_LOADING_INDICATOR' })
    } catch (error) {
        yield put({ type: 'FETCH_PROMOTION_FAILURE', payload: error })
        yield put({ type: 'HIDE_LOADING_INDICATOR' })
    }
}

// saga v2
// Watcher
function* watchFetchPromotions() {
    while (true) {
        const action = yield take('FETCH_PROMOTION')
        yield fork(fetchPromotions)
    }
}

// Worker
function* fetchPromotions() {
    try {
        const response = yield call(api.post, '/get.promotion')
        yield put({
            type: 'FETCH_PROMOTION_SUCCESS'
            , payload: response.data.result
        })
    } catch (error) {
        yield put({
            type: 'FETCH_PROMOTION_FAILURE'
            , payload: error
        })
    }
}