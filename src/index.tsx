import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {store} from "./Redux/store";
import {StateType} from "./Redux/reducer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const rerenderEntireTree=(state:StateType)=>{
    root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
    )}
rerenderEntireTree(store.getState())
store.subscribe(()=>{
    let state:StateType=store.getState()
    rerenderEntireTree(state)
})
reportWebVitals();
