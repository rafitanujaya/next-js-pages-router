import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const {push} = useRouter()

  const handleSubmit = async (e) => {
    setIsLoading(true)
    setError("")
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      fullname: e.target.fullname.value,
      password: e.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if(result.status === 201) {
      e.target.reset();
      setIsLoading(false)
      push("/auth/login")
      console.log("ini dijalankan");
    } else {
      setIsLoading(false)
      setError(result.status === 400? "Email alredy exists" : "")
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="text-3xl mb-8">Register</h1>
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
            <label htmlFor="email">Fullname</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="fullname"
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
            {isLoading? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className="m-3">
        Have an account? Sign In{" "}
        <Link href="/auth/login" className="text-slate-500 font-bold">
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
