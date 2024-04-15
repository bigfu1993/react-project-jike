import { request } from '@/apis'
import { createSlice } from '@reduxjs/toolkit'

const userStore = createSlice({
    name: 'userStore',
    initialState: {
        token: 'abc'
    },
    reducers: {
        setToken(state, actions) {
            state.token = actions.payload
        }
    }
})

const { setToken } = userStore.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}

const reducer = userStore.reducer

export { setToken, fetchLogin }
export default reducer