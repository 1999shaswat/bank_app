import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { useAuth } from "../utils/AuthContext"

export function Signin() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const { signInUser } = useAuth()

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUserName(e.target.value)}
            label={"Email"}
            placeholder={"john@email.com"}
            type={"email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"password"}
            type={"password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign In"}
              onClick={() => signInUser({ username, password })}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  )
}
