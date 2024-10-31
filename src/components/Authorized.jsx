import React from "react";
import { Outlet } from "react-router-dom";

export const Authorized = () => {
  return (
    <div>
      {/* Render child routes for authorized users */}
      <Outlet />
    </div>
  );
};
