import { useRouter } from "next/router"
import Navbar from "../Navbar"
import { Roboto } from "next/font/google"

const disableNavbar = ["/auth/login", "/auth/register", "/404"]
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400']
})

const AppShell = ({children}) => {
    const { pathname } = useRouter()
  return (
    <main className={roboto.className}>
        {!disableNavbar.includes(pathname) && <Navbar/>}
        {children}
    </main>
  )
}

export default AppShell
