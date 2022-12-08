import { Home } from './src/pages/Home';
import React from 'react';
import {StatusBar} from 'react-native';

export default function App(){
  return(
    <>
      <StatusBar barStyle='light-content'/>
      <Home/>
    </>
  );
}