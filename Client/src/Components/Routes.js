import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import { RoleContext } from "../RoleContext";
import HomePageAuthorized from "./HomePage/HomePageAuthorized";
import AllProductsComponent from "./AllProductsComponent/AllProductsComponent";

const CustomRoutes = ({}) => {
  const props = useContext(RoleContext)
  const allProducts = useRoutes([
    { path:"/bodyKit", element: <AllProductsComponent type={'bodyKit'}/> },
    { path: "/wheels", element: <AllProductsComponent type={'wheels'}/> },
    { path: "/consumables", element: <AllProductsComponent type={'consumables'}/> },
    { path: "/calipers", element: <AllProductsComponent type={'calipers'}/> }
  ])
  useEffect(() => {
    console.log(props)
  },[props])
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageAuthorized />} />
        <Route path="/bodyKit" element={<AllProductsComponent type={'bodyKit'}/>} />
        <Route path="/wheels" element={<AllProductsComponent type={'wheels'}/>} />
        <Route path="/consumables" element={<AllProductsComponent type={'consumables'}/>} />
        <Route path="/calipers" element={<AllProductsComponent type={'calipers'}/>} />
        {props.role === 'admin' ? <ProtectedRoutes/> : null}
      </Routes>
    </>
  );
};

export default CustomRoutes;
