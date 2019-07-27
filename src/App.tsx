import React from 'react';
import './App.css';
import { LeanExcel } from './components/leanExcel/LeanExcel';
import {Expressions} from './expressions/Expressions';

const App: React.FC = () => {
  return (
      <LeanExcel expressions={new Expressions()}/>
  );
};

export default App;
