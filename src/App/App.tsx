import React from 'react';
import s from './App.module.css';
import {Logo} from '../Logo/Logo';
import {CounterContainer} from "../Counter/CounterContainer";
import {SetContainer} from "../Set/SetContainer";

function App() {
    return (
        <div className={s.App}>
            <Logo/>
            <div className={s.body}>
                <SetContainer/>
                <CounterContainer/>
            </div>
        </div>
    );
}

export default App;
