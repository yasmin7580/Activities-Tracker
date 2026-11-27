import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import auth from "../../firebase.init"
import AuthContext from "./AuthContext"

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })

    }, [])
    const allData = {
        user,
        loading
    }
    return (
        <AuthContext value={allData}>{children}</AuthContext>
    )

}
export default AuthProvider