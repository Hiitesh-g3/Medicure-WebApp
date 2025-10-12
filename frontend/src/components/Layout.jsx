import React from "react";
import Header from "./Header";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
