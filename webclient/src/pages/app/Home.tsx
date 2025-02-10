import { SwitchformPropsComponent } from '@/components/factory/AnimationComponent/TransformComponent';

import '/src/styles/home.scss';

/**
 * Home renders the home page with a hero section and a background image.
 * The hero section contains a welcome header, search bar, and links to settings and create new pages.
 * @returns {React.ReactElement} The home component
 */
const Home:React.FC = () => {
    return(
        <div className="homebg">
            <HomeHeroComponent />
        </div>
    )
}

export default Home;

/**
 * HomeHeroComponent renders a hero section for the home page with a welcome header, search bar, and links to settings and create new pages.
 * @returns {React.ReactElement} The hero component
 */
const HomeHeroComponent = () => {
  return (
    <div className="h-[336px] flex flex-col items-center gap-6">
      <h1 className="text-white text-4xl font-bold">
        Welcome to the Organization Dashboard
      </h1>
      <p className="text-white text-base">
        Track your progress and manage your tasks efficiently
      </p>
      <div className="flex flex-col items-start gap-1">
        <div className="self-stretch px-3 py-2 bg-white rounded-md border border-black/10 flex items-center gap-1">
          <p className="grow shrink basis-0 text-black/50 text-sm">
            Search for data
          </p>
        </div>
      </div>


      < SwitchformPropsComponent
             firstChild={ <HomeHeroTabsComponent />}
             secondChild={<HomeHeroLinksComponent />}
            className="" />
    </div>
  );
};

/**
 * HomeHeroLinksComponent renders a component with two links to settings and create new pages.
 * It styles the links with a rounded border and a background color.
 * @returns {React.ReactElement} The links component
 */
function HomeHeroLinksComponent() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-60 p-3 rounded-lg border border-white flex flex-col items-center">
        <p className="text-white text-base font-medium ">Settings</p>
      </div>
      <div className="w-60 p-3 bg-black rounded-lg flex flex-col items-center">
        <p className="text-white text-base font-medium">Create New</p>
      </div>
    </div>
  );
}

/**
 * HomeHeroTabsComponent renders a series of tabs for navigation
 * within the home page's hero section. Each tab is styled with a
 * rounded border and a semi-transparent background, displaying
 * relevant section names such as Overview, Tasks, and Team.
 * It enhances user interaction by providing quick access to different
 * parts of the dashboard.
 * @returns {React.ReactElement} The tabs component
 */

function HomeHeroTabsComponent() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[120px] p-2 bg-[#d8d8d8]/50 rounded-md flex flex-col items-center gap-1">
        <p className="self-stretch text-center text-white text-sm">
            <button>Overview</button>
        </p>
      </div>
      <div className="w-[120px] p-2 bg-[#d8d8d8]/50 rounded-md flex flex-col items-center gap-1">
        <p className="self-stretch text-center text-white text-sm">
          Tasks
        </p>
      </div>
      <div className="w-[120px] p-2 bg-[#d8d8d8]/50 rounded-md flex flex-col items-center gap-1">
        <p className="self-stretch text-center text-white text-sm">
          Team
        </p>
      </div>
      </div>
  );
}