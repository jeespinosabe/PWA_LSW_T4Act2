import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './share/css/allPages.css'
import AppAllModules from './AppAllModules';
// FIC: For Redux
import { Provider } from "react-redux";
import store from '../src/security/redux/store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
        <AppAllModules />
    </Provider>
  </React.StrictMode>,
);