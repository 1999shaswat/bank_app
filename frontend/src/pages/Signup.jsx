import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { useAuth } from "../utils/AuthContext"

export function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const { signUpUser } = useAuth()

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={"John"}
            type={"text"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={"Doe"}
            type={"text"}
          />
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
              label={"Sign Up"}
              onClick={() => {
                signUpUser({
                  username,
                  firstName,
                  lastName,
                  password,
                })
              }}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  )
}
