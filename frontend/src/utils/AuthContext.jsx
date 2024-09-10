import axios from "axios"
import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUserStatus()
  }, [])

  const signInUser = async (userInfo) => {
    setLoading(true)
    try {
      let res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        userInfo
      )
      setUser(res.data.user)
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const signOutUser = async () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/signin")
  }

  const signUpUser = async (userInfo) => {
    setLoading(true)
    try {
      let res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        userInfo
      )
      setUser(res.data.user)
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const checkUserStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Error signing in. No token found")

      let res = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      setUser(res.data.user)
      navigate("/")
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const contextData = {
    user,
    signInUser,
    signOutUser,
    signUpUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}

//Custom Hook
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
