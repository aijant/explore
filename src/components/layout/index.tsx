import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import SideBar from "./side-bar";

const Layout: FC<PropsWithChildren> = () => {
  return (
    <div className="flex items-start w-full bg-[#121a20]">
      <SideBar />
      <div className="w-[calc(100vw_-_250px)] flex flex-col">
        <Header />
        <main className="w-full min-h-[calc(100vh_-_65px)] h-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
