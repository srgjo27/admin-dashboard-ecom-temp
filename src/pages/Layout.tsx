import { useEffect } from "react";
import MainPage from "../shared/ui/MainPage";
import NavBar from "../shared/ui/NavBar";
import SideBar from "../shared/ui/SideBar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    const location = useLocation();

    useEffect(() => {
        import("flowbite").then((module) => module.initFlowbite());
        console.log("Layout rendered");
    }, [location]);

    return (
        <div className="antialiased dark:bg-gray-900">
            <NavBar />
            <SideBar />
            <MainPage>{children}</MainPage>
        </div>
    );
}

export default Layout;
