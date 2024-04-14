import { useSelector } from 'react-redux'

export default function Layout() {
    const { token } = useSelector(state => state.user)
    return (
        <div>
            layout : {token}
        </div>
    )
}