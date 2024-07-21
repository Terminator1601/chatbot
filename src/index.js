import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './components/ReduxManagement/store'
import Homepage from './components/PrimaryComponents/Homepage';
import "./App.css";
import './App'
import "./static/More.css";
import "./static/Modal.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);