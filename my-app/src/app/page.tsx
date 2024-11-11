"use client";
import React from 'react';
import DailyView from './components/DailyView';
import {usePathname} from 'next/navigation';
import Nav from './components/Nav';


const Page: React.FC = () => {
  const pathname = usePathname();
  console.log("current path:" + pathname);

  return (
    <div>
      <Nav changeView="/login" />
      <DailyView />
    </div>
  );
};

export default Page;
