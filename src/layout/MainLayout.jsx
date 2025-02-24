import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = ({ setSelectedHashtag }) =>{
    const location = useLocation();

    useEffect(() =>{
        document.title = location.pathname.slice(1);
    }, [location]);

    return(
        <>
        <Navbar setSelectedHashtag={setSelectedHashtag} />
        <Outlet/>
        <Footer></Footer>

        </>
    )
}