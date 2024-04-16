import { useState, useEffect } from 'react'
import { getChannelAPI, createArticleAPI } from '@/apis/modules/article'

function useChannel() {
    // channel
    const [channels, setChannels] = useState([])
    useEffect(() => {
        async function fetchChannels() {
            let res = await getChannelAPI()
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, [])
    return { channels }
}

export { useChannel }