import { FC } from "react";
import { Outlet } from "react-router";
import {Navbar} from "@components/general/layouts/navbar";

const MainLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/*<Footer />*/}
    </>
  );
};

export default MainLayout;
