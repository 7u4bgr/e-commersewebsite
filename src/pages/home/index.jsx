import React from 'react';
import Category from '../../components/category';
import SalesToday from '../../components/sales';
import BrowseCategory from '../../components/browse';
import MonthSales from '../../components/months';

const Home = () => {
  return (

    <div>
      <Category/>
      <SalesToday/>
      <BrowseCategory/>
      <MonthSales/>
    </div>
    )

};

export default Home;
