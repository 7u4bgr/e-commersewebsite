import React from 'react';
import Category from '../../components/category';
import SalesToday from '../../components/sales';
import BrowseCategory from '../../components/browse';
import MonthSales from '../../components/months';
import Enhance from '../../components/enhance';
import OurProducts from '../../components/ourproducts';
import Featured from '../../components/featured';
import Delivery from '../../components/delivery';

const Home = () => {
  return (

    <div>
      <Category/>
      <SalesToday/>
      <BrowseCategory/>
      <MonthSales/>
      <Enhance/>
      <OurProducts/>
      <Featured/>
      <Delivery/>
    </div>
    )

};

export default Home;
