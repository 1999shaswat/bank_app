import { useAuth } from "../utils/AuthContext"

export function Appbar({ userName }) {
  const { signOutUser } = useAuth()

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex pl-4 items-center">PayTM App</div>
      <div className="flex">
        <div className="flex items-center pr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
          <div className="text-xl">{userName[0]}</div>
        </div>
        <button onClick={signOutUser}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
