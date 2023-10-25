import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const {push, query} = useRouter()

  const callbackUrl = query.callback || "/"
  const handleSubmit = async (e) => {
    setIsLoading(true)
    setError("")
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try{
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl
      })
      if(!res?.error) {
        setIsLoading(false)
        push(callbackUrl)
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect")
      }
    } catch(err) {
      setIsLoading(false);
      setError("Email or Password is incorrect")
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="text-3xl mb-8">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-2/5 shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="p-3 bg-slate-200 rounded"
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="p-3 bg-slate-200 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-800 text-white w-full rounded p-3 mt-4"
          >
            {isLoading? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p className="m-3">
        Don{"'"}t have an account? Sign Up{" "}
        <Link href="/auth/register" className="text-slate-500 font-bold">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
