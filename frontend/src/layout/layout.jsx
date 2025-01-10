import { Footer } from "../pages/footer"
import { Header } from "../pages/header"
import {Outlet} from 'react-router-dom'

export const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}