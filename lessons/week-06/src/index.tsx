import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { Information } from './information/information';
import { Counter } from './counter/counter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Information age={28} firstName='David' lastName='Karolyi' />
    <Counter />
  </React.StrictMode>
);
