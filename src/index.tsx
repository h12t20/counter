import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import './index.module.css';
import {store} from "./Redux/store";
import s from './index.module.css'
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <div className={s.index}>
            <Provider store={store}>
                <App/>
            </Provider>
        </div>
    </React.StrictMode>
)

reportWebVitals();
