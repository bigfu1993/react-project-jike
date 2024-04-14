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
export { setToken }

const reducer = userStore.reducer
export default reducer