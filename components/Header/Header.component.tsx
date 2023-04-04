import { Navbar } from "reactstrap"
import Image from "next/image"
import Link from "next/link"

import HeaderStyle from "./style"
import Logo from '../../public/logo-chs.png'

const Header = () => {
  return (
    <HeaderStyle>
      <Navbar>
        <div className="d-flex justify-content-center w-100">
          <Link href="/">
            <Image src={Logo} alt="Covercare logo" priority={true} width={120} />
          </Link>
        </div>
      </Navbar>
    </HeaderStyle>
  )
}

export default Header