import { useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useAuth } from "../utils/AuthContext"
import { useEffect } from "react"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { sendMoneyAtom } from "../atoms/sendMoneyAtom"

export function Dashboard() {
  const { user } = useAuth()
  const [balance, setBalance] = useState(0)

  // cleanup
  const resetSendMoneyUser = useSetRecoilState(sendMoneyAtom)
  resetSendMoneyUser(null)

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setBalance(res.data.balance))
  }, [])

  return (
    <div>
      <Appbar userName={user.firstName} />
      <div className="p-4">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}
