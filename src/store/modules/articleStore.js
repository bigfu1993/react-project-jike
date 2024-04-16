import { createSlice } from '@reduxjs/toolkit'
import { getChannelAPI, createArticleAPI } from '@/apis/modules/article'

const articleStore = createSlice({
    name: 'articleStore',
    initialState: {
        channelsList: []
    },
    reducers: {
        setChannelsList: (state, actions) => {
            state.channelsList = actions.payload
        }
    }
})
const fetchChannels = () => {
    return async (dispatch) => {
        let res = await getChannelAPI()
        dispatch(setChannelsList(res.data.channels))
    }
}
const { setChannelsList } = articleStore.actions
const articleReducer = articleStore.reducer

export { setChannelsList, fetchChannels }
export default articleReducer