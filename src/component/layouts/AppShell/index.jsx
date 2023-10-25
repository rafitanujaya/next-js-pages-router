import { useRouter } from "next/router"
import Navbar from "../Navbar"

const disableNavbar = ["/auth/login", "/auth/register", "/404"]

const AppShell = ({children}) => {
    const { pathname } = useRouter()
  return (
    <main>
        {!disableNavbar.includes(pathname) && <Navbar/>}
        {children}
    </main>
  )
}

export default AppShell
