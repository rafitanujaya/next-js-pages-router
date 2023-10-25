import style from "@/styles/navbar.module.css"
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  console.log(style);

  const {data} = useSession()
  console.log(data);
  return (
    <div className={style.navbar}>
        <div>Navbar</div>
        <div className="flex justify-between">
          <div className="mx-2">
          {data && data.user.fullname}
          </div>
          {data? (
            <button onClick={() => signOut()}>Log out</button>
          ) : (
            <button onClick={() => signIn()}>Log in</button>
          )}
        </div>
    </div>
  )
}

export default Navbar
