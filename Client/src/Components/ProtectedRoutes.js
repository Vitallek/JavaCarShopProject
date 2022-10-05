import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
//routes
import HomePage from "./HomePage/HomePage";
// import CreateReserveFromPricelist from "./CreateReserveFromPricelist/CreateReserveFromPricelist";
// import TradeicsbelMain from "./Tradeicsbel/TradeicsbelMain";
// import { GetCart } from "./Utility/CallCart";
// import WbWarehouse from "./Wildberries/Warehouse/WbWarehouse";
// import WarehouseMain from "./Warehouse/WarehouseMain";
// import WbSupply from "./Wildberries/Supply/WbSupply";
// import AnalyticsComponent from "./Wildberries/Analytics/AnatylicsComponent";
// import IWBC from "./Wildberries/InvoiceWbComparison/IWBC_Main";
// import UnderConstructionTemplate from "./UnderConstructionTemplate/UnderConstructionTemplate";

const ProtectedRoutes = () => {
  // const getCartURL = `https://${process.env.REACT_APP_SERVER_ADDR}/get_cart`
  // const [cart, setCart] = useState([])

  // useEffect(() => {
  //   console.log('get cart')
  //   GetCart(getCartURL, JSON.parse(Cookies.get('credentials')).username).then((response) => {
  //     if(typeof response === 'undefined' || response.length === 0 ) {
  //       setCart([])
  //       return
  //     }
  //     setCart(response)
  //   })
  // }, [])

  return (
    <>
        <Route path="/adm" element={<HomePage />} />

        {/* <Route path="/cart" element={<UnderConstructionTemplate/>}/>


        <Route path="/warehouse">
          <Route index element={<HomePageAuthorized/>}/>
          <Route path="/warehouse/main" element={<WarehouseMain/>}/>
          <Route path="/warehouse/history" element={<UnderConstructionTemplate/>}/>
          <Route path="/warehouse/multi-search" element={<UnderConstructionTemplate/>}/>
        </Route>

        <Route path="/wb">
          <Route index element={<HomePageAuthorized />}/>
          <Route path="/wb/warehouse" element={<WbWarehouse/>}/>
          <Route path="/wb/supply" element={<WbSupply/>}/>
          <Route path="/wb/analytics" element={<AnalyticsComponent/>}/>
          <Route path="/wb/orders_invoices_comparison" element={<IWBC/>}/>
        </Route> */}

    </>

  );
};

export default ProtectedRoutes;
