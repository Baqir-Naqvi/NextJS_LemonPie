import Footer from "../Footer/Footer.component"
import Header from "../Header/Header.component"
import LayoutStyle from "./style"

type LayoutProps = {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyle>
  )
}