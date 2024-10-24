import React from "react";

import Navigate from "./Navigate";

export default function Wrapper({ children }) {
 
  return (
    <>
      <div className="container-fluid">
        <Navigate />
        {children}
      </div>
    </>
  );
}
