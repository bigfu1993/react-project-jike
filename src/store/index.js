import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/userStore'
import articleReducer from './modules/articleStore'

const store = configureStore({
    reducer: {
        user: userReducer,
        article: articleReducer
    }
})

export default store