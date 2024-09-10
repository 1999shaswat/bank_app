import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useAuth } from "./AuthContext"

export function PrivateRoutes() {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/signin" />
}
