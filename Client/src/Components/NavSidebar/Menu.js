import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import React from 'react';

export const menu = [
  {
    icon: <HomeRoundedIcon />,
    title: 'Home',
    to: '/',
    items: []
  },
  {
    icon: <HomeRoundedIcon />,
    title: 'Wheels',
    to: '/wheels',
    items: []
  },
  {
    icon: <HomeRoundedIcon />,
    title: 'BodyKits',
    to: '/bodyKit',
    items: []
  },
  {
    icon: <HomeRoundedIcon />,
    title: 'Consumables',
    to: '/consumables',
    items: []
  },
  {
    icon: <HomeRoundedIcon />,
    title: 'Calipers',
    to: '/calipers',
    items: []
  },

  // {
  //   icon: <WarehouseRoundedIcon />,
  //   title: 'Склад',
  //   to: '/warehouse',
  //   items: [
  //     {
  //       title: 'Склад',
  //       to: '/warehouse/main',
  //       items: []
  //     },
  //     {
  //       title: 'История',
  //       to: '/warehouse/history',
  //       items: []
  //     },
  //     {
  //       title: 'МультиПоиск',
  //       to: '/warehouse/multi-search',
  //       items: []
  //     },
  //   ]
  // },
  // {
  //   icon: <img src='https://mstatic.wbstatic.net/suppliers-portal-root/v1.21.5/icons/ios/20.png'/>,
  //   title: 'Wildberries',
  //   to: '/wb',
  //   items: [
  //     {
  //       title: 'Склад',
  //       to: '/wb/warehouse',
  //       items: []
  //     },
  //     {
  //       title: 'Поставка',
  //       to: '/wb/supply',
  //       items: []
  //     },
  //     {
  //       title: 'Отчёты и накладные',
  //       to: '/wb/orders_invoices_comparison',
  //       items: []
  //     },
  //     {
  //       title: 'Аналитика',
  //       to: '/wb/analytics',
  //       items: []
  //     },
  //   ]
  // },
  // {
  //   icon: <ShoppingCartRoundedIcon />,
  //   title: 'Корзина',
  //   to: '/cart',
  //   items: []
  // },
  // {
  //   // icon: <LocalLibraryOutlinedIcon />,
  //   title: 'Tradeicsbel B2B API',
  //   to: '/tradeicsbel',
  //   items: [
  //     {
  //       title: 'Резервы',
  //       to: '/tradeicsbel/get_reserves',
  //       items: []
  //     },
  //     {
  //       title: 'Собрать заказ (Все товары)',
  //       to: '/tradeicsbel/create_reserve_from_pricelist',
  //       items: []
  //     },
  //     {
  //       title: 'Собрать заказ (Каталог)',
  //       to: '/tradeicsbel/create_reserve_from_catalog',
  //       items: []
  //     },
  //   ]
  // },
];
