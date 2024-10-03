import React from 'react';
import AppNavigation from './src/navigation';
import Header from './src/components/layout/Header';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

    <Header /> 
<AppNavigation /> 
</>

  );
}
