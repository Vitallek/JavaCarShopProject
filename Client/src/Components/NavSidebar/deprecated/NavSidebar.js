/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useNavigate } from "react-router-dom";
import '@fontsource/roboto/400.css';
import React from "react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const NavSidebar = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navigation
          // you can use your own router's api to get pathname
          onSelect={({itemId}) => {
            navigate(itemId);
            console.log(itemId)
          }}
          items={[
            {
              title: 'Home',
              itemId: '/',
            },
            {
              title: 'Склад',
              itemId: '/warehouse',
            },
            {
              title: 'Корзина',
              itemId: '/cart',
            },
            {
              title: 'Wildberries',
              itemId: '/wb',
              subNav: [
                {
                  title: "Склад",
                  itemId: "/wb/warehouse"
                },
                {
                  title: "Поставка",
                  itemId: "/wb/sell"
                },
              ]
            },
            {
              title: 'Собрать заказ (Все товары)',
              itemId: '/create_reserve_from_pricelist',
            },
            {
              title: 'Собрать заказ (Каталог)',
              itemId: '/create_reserve_from_catalog',
            },
            {
              title: 'Tradeicsbel B2B API',
              itemId: '/tradeicsbel',
              subNav: [
                {
                  title: "Резервы",
                  itemId: "/tradeicsbel/get_reserves"
                },
              ]
            },
          ]}
        />
    </>
  );
}

export default NavSidebar