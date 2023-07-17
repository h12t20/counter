import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import './index.module.css';
import {store} from "./Redux/store";
import {StateType} from "./Redux/reducer";
import s from './index.module.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const rerenderEntireTree = (state: StateType) => {
    root.render(
        <React.StrictMode>
            <div className={s.index}>
                <App/>
            </div>
        </React.StrictMode>
    )
}
rerenderEntireTree(store.getState())
store.subscribe(() => {
    let state: StateType = store.getState()
    rerenderEntireTree(state)
})
reportWebVitals();
