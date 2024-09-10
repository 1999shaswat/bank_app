import { useState } from "react"
import { Button } from "./Button"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { sendMoneyAtom } from "../atoms/sendMoneyAtom"

let debounceTimer

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([])
  const [filter, setUserFilter] = useState("")
  useEffect(() => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      axios
        .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => setUsers(res.data.users))
    }, 1000)
  }, [filter])

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setUserFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  )
}

function User({ user }) {
  const navigate = useNavigate()
  const setSendMoneyAtom = useSetRecoilState(sendMoneyAtom)

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
          <div className="flex items-center text-xl">{user.firstName[0]}</div>
        </div>

        <div className="flex items-center">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div>
        <Button
          label={"Send Money"}
          onClick={() => {
            setSendMoneyAtom(user)
            navigate("/send")
          }}
        />
      </div>
    </div>
  )
}
