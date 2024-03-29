import { PrimeReactProvider } from 'primereact/api';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { router } from './routes';
import React from 'react';

import 'rsuite/dist/rsuite.min.css';
import "primereact/resources/themes/saga-blue/theme.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);