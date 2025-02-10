

/**
 * NavigationBar component that renders a header section for the Dashboard App.
 * It includes a logo, title, and a nested Navbar component for navigation links.
 * The header is styled with a shadow and rounded corners.
 */

const NavigationBar = () => {
  return (
        <header className="w-full m-0 flex-sart text-center border grid  rounded-lg">
            <div className="w-[1920px] h-20 p-5 bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] justify-center items-center gap-5 inline-flex overflow-hidden">  
                <DashboardCompnent></DashboardCompnent>  
                <div className="bg-white justify-center items-center gap-10 flex">
                    <Navbar></Navbar>
                </div>
            </div>
        </header>
        );
};
const DashboardCompnent=() => {
    return(
        <>
            <div className="w-10 h-10 bg-black/10 rounded-[100px]"></div>
            <div className="grow shrink basis-0 text-black text-[28px] font-medium font-['Roboto'] leading-9">Escape Dashboard</div>
        </>
    );
}
/**
 * Header component that displays a header section with a title and navigation.
 * It includes a Navigation component, and styles the header to be centered
 * with a specific height.
 */

const Header = () => {
    return(
        <header className="float-end">
            
            <div>
                <NavigationBar />
            </div>
        </header>
    )
}

export default Header

/**
 * Navbar component that displays a navigation bar with links to different pages.
 * It includes a set of links to different pages, and styles the navigation bar to be centered
 * with a specific height.
 */
const Navbar = () => {
    return(
        <div className="h-[50px] px-[13px] py-[7px] bg-white justify-center items-center gap-5 inline-flex">
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a href="/">Home</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a href="">Dashboard</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a>EscapeGame</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a>Organisation</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a href="">
                Analytics</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a href="">Settings</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a href="">Profile</a>
        </div>
        <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
            <a href="/contact">Contact</a>
        </div>
        <div className="h-9 p-2 rounded-md border border-black/10 justify-end items-center gap-1 flex">
        <div className="grow shrink basis-0 text-black/50 text-sm font-normal font-['Roboto'] leading-tight">
        <label htmlFor="search"></label>
            <input id="Search" placeholder="search" />
        </div>
        <div className="w-5 h-5 pl-[1.67px] pr-[1.35px] pt-[1.67px] pb-[1.37px] justify-center items-center flex"></div>
  </div>
</div>
    );
}