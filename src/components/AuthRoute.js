const { getToken } = require("@/apis");
const { Navigate } = require("react-router-dom");

export default function AuthRoute({ children }) {
    return getToken() ? <>{children}</> : <Navigate to={'/login'} replace></Navigate>
}

