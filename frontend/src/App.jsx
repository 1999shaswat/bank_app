import { BrowserRouter } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { RecoilRoot } from "recoil"
import { PrivateRoutes } from "./utils/PrivateRoutes"
import { AuthProvider } from "./utils/AuthContext"

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/send" element={<SendMoney />} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
