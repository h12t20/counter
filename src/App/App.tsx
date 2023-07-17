import React, {ChangeEvent, useEffect, useMemo} from 'react';
import s from './App.module.css';
import {Counter} from "../Counter/Counter";
import {Set} from "../Set/Set";
import {Logo} from '../Logo/Logo';
import {
    incHandlerAC,
    maxTitleChangeAC,
    minTitleChangeAC,
    resetAC,
    setHandlerAC,
} from "../Redux/reducer";
import {store} from "../Redux/store";
function App() {
    const state = store.getState()
    useEffect(() => localStorage.setItem('counterMinValue', state.minValue.toString()), [state.minValue])
    useEffect(() => localStorage.setItem('counterMaxValue', state.maxValue.toString()), [state.maxValue])
    useEffect(() => localStorage.setItem('counterValue', state.value.toString()), [state.value])

    const inputMinChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        store.dispatch(minTitleChangeAC(e.currentTarget.value));
    }
    const inputMaxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        store.dispatch(maxTitleChangeAC(e.currentTarget.value));
    }
    const setHandler = () => {
        store.dispatch(setHandlerAC());
    }
    const incHandler = () => {
        store.dispatch(incHandlerAC());
    }
    const resetHandler = () => {
        localStorage.removeItem('counterValue')
        store.dispatch(resetAC());
    }
    const counterProps = useMemo(() => ({
        error: state.error,
        value: state.value,
        incHandler: incHandler,
        resetHandler: resetHandler
    }), [state.error, state.value]);
    const setProps = useMemo(() => ({
        setHandler: setHandler,
        inputMinChangeHandler: inputMinChangeHandler,
        inputMaxChangeHandler: inputMaxChangeHandler,
        inputMinTitle: state.inputMinTitle,
        inputMaxTitle: state.inputMaxTitle,
        error: state.error,
        disable: state.disable
    }), [state.error, state.disable, state.inputMinTitle, state.inputMaxTitle])
    return (
        <div className={s.App}>
            <Logo/>
            <div className={s.body}>
                <Set {...setProps}/>
                <Counter {...counterProps}/>
            </div>
        </div>
    );
}
export default App;
