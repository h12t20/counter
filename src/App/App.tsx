import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './App.module.css';
import {Counter} from "../Counter/Counter";
import {Set} from "../Set/Set";
import {Logo} from '../Logo/Logo'

function App() {
    const storageMinValueAsString = localStorage.getItem('counterMinValue');
    const storageMinValue = storageMinValueAsString ? +storageMinValueAsString : 0;
    const storageMaxValueAsString = localStorage.getItem('counterMaxValue');
    const storageMaxValue = storageMaxValueAsString ? +storageMaxValueAsString : 10;
    const storageValueAsString = localStorage.getItem('counterValue');
    const [value, setValue] = useState(() => {
        return storageValueAsString && storageMinValueAsString ?
            Math.max(+storageValueAsString, +storageMinValueAsString) : storageValueAsString ?
                +storageValueAsString : storageMinValueAsString ? +storageMinValueAsString : 0
    });
    const [minValue, setMinValue] = useState(() => storageMinValue);
    const [maxValue, setMaxValue] = useState(() => storageMaxValue);
    const [error, setError] = useState('')
    const [inputMinTitle, setInputMinTitle] = useState(storageMinValue)
    const [inputMaxTitle, setInputMaxTitle] = useState(storageMaxValue)
    const [disable, setDisable] = useState(true)
    const INF_MESSAGE = "Enter values and press 'set'" // информационное сообщение при наведении курсора
    useEffect(() => localStorage.setItem('counterMinValue', minValue.toString()), [minValue])
    useEffect(() => localStorage.setItem('counterMaxValue', maxValue.toString()), [maxValue])
    useEffect(() => {
        localStorage.setItem('counterValue', value.toString()) //сохранение текущего значения счетчика
        if (storageMaxValueAsString && value === +storageMaxValueAsString) {
            setError(value.toString()) // "ошибка" при достижении счетчиком макс. значения
        }
    }, [value, storageMaxValueAsString])
    useEffect(() => { // выявление ошибок и добавление их в локальный стейт
        if (inputMinTitle >= inputMaxTitle || (inputMinTitle < 0 && inputMaxTitle < 1) ||
            (inputMinTitle < 0 && value > inputMaxTitle)) {
            setError('Er1')
        } else if (inputMinTitle < 0)
            setError('Er2')
        else if (value >= maxValue) {
            setError(value.toString())
        } else if (error !== INF_MESSAGE) {
            setError('')
        }
    }, [inputMinTitle, inputMaxTitle, value, error, maxValue]);
    useEffect(() => localStorage.setItem('errorStatus', error ? error.toString() :
        ''), [error]) // отслеживание и сохранение выявленных ошибок в local storage

    const inputMinChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMinTitle(+e.currentTarget.value)
        setDisable(false) // дизейбл кнопки set
    }
    const inputMaxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMaxTitle(+e.currentTarget.value);
        setDisable(false) // дизейбл кнопки set
    }
    const setHandler = () => { //обработчик кнопки set
        setMinValue(inputMinTitle) // сохраняем минимальное значение в стейт
        setMaxValue(inputMaxTitle) // сохраняем максимальное значение в стейт
        setValue(inputMinTitle); // сброс счетчика на сохраняемое минимальное
        setDisable(true) // дизейбл кнопки set
        setError(error === INF_MESSAGE ? '' : error) // если нет ошибки сброс инф. сообщения
    }
    const incHandler = () => { //обработчик кнопки inc
        setValue(value + 1);
    }
    const resetHandler = () => { //обработчик кнопки reset
        localStorage.removeItem('counterValue') // удаление сохраненного значения счетчика
        setValue(storageMinValueAsString ? +storageMinValueAsString : 0) // сброс счетчка
        setInputMinTitle(storageMinValueAsString ? +storageMinValueAsString : 0)
        setInputMaxTitle((storageMaxValueAsString ? +storageMaxValueAsString : 10))
        setDisable(true) // дизэйбл кнопки set
    }
    let timerID: NodeJS.Timer
    const onMouseOver = () => {
        setError(INF_MESSAGE) // инф. сообщение при наведении курсора на левый блок
        clearTimeout(timerID)
    }
    const onMouseOut = () => timerID = setTimeout(() => setError(''), 200)
// сброс информационного сообщения с задержкой 200 мс
    return (
        <div className={s.App}>
            <Logo/>
            <div className={s.body}>
                <Set setHandler={setHandler} inputMinChangeHandler={inputMinChangeHandler}
                     inputMaxChangeHandler={inputMaxChangeHandler} inputMinTitle={inputMinTitle}
                     inputMaxTitle={inputMaxTitle} error={error} onMouseOver={onMouseOver}
                     disable={disable} onMouseOut={onMouseOut}/>
                <Counter value={value} resetHandler={resetHandler} error={error} incHandler={incHandler}/>
            </div>
        </div>
    );
}

export default App;
