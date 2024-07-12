import { signIn } from "@/apis/mock/user"
import { useRequest } from "ahooks"
import { Button, App } from "antd"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { message } = App.useApp();
  const navigate = useNavigate()

  const { run, loading } = useRequest(signIn, {
    manual: true,
    onSuccess: () => {
      message.success("Sign in successful.", 3);
      navigate("/", { replace: true })
    },
    onError: (error) => {
      message.error(error.message);
    },
  })

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div style={{ backgroundImage: `url('${'/favicon.png'}')` }} className="h-32 w-32 bg-cover" />
      <h1 className="text-xl">Login Page</h1>
      <div>
        <Button
          type="primary"
          loading={loading}
          onClick={run}
        >SIGN IN
        </Button>
      </div>
    </div>
  )
}

export default Login