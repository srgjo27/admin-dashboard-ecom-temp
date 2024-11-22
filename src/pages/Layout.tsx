import MainPage from "../components/ui/MainPage";
import NavBar from "../components/ui/NavBar";
import SideBar from "../components/ui/SideBar";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <NavBar /> 
            <SideBar /> 
            <MainPage>{children}</MainPage>
        </div>
    );
}

export default Layout;
