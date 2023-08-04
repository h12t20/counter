import React from 'react';
import s from './App.module.css';
import {Logo} from '../logo/Logo';
import {Counter} from "../counter/Counter";
import {Set} from "../set/Set";

function App() {
    document.title='Counter';
    return (
        <div className={s.App}>
            <Logo/>
            <div className={s.body}>
                <Set/>
                <Counter/>
            </div>
        </div>
    );
}
export default App;
