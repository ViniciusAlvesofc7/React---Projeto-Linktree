import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"

import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"

const Header = () => {

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="flex items-center justify-between w-full h-12 px-2 bg-gray-100 rounded-md">
                <div className="flex items-center gap-4 text-lg font-medium text-gray-900">
                    <Link className="border-b-2 border-transparent hover:border-b-2 hover:border-[#db2629] " to="/" >
                        Home
                    </Link>
                    <Link className="border-b-2 border-transparent hover:border-b-2 hover:border-[#db2629] " to="/admin" >
                        Links
                    </Link>
                    <Link className="border-b-2 border-transparent hover:border-b-2 hover:border-[#db2629] " to="/admin/social" >
                        Redes Sociais
                    </Link>
                </div>

                <button onClick={handleLogout}>
                    <BiLogOut size={28} color="#db2629" />
                </button>
            </nav>
        </header>
    )
}

export default Header
