import React, {ChangeEvent, useEffect, useReducer} from 'react';
import s from './App.module.css';
import {Counter} from "../Counter/Counter";
import {Set} from "../Set/Set";
import {Logo} from '../Logo/Logo';

export const INF_MESSAGE = "Enter values and press 'set'"
export type StateType = {
    value: number
    minValue: number
    maxValue: number
    error: string
    inputMinTitle: number
    inputMaxTitle: number
    disable: boolean
}

export const reducer = (state: StateType, action: ReducerType): StateType => {
    switch (action.type) {
        case 'RESET': {
            return {
                ...state,
                value: state.minValue ? state.minValue : 0,
                inputMinTitle: state.minValue ? state.minValue : 0,
                inputMaxTitle: state.maxValue ? state.maxValue : 10,
                disable: true,
                error: ''
            }
        }
        case 'MIN_TITLE': {
            return {
                ...state,
                inputMinTitle: +action.payload.value <= state.inputMaxTitle &&
                +action.payload.value >= -1 ?
                    +action.payload.value : state.inputMinTitle,
                disable: false,
                error: +action.payload.value >= state.inputMaxTitle ? 'Err1' :
                    +action.payload.value < 0 ? 'Err2' : state.value >= state.maxValue ? state.value.toString() : INF_MESSAGE
            }
        }
        case 'MAX_TITLE': {
            return {
                ...state,
                inputMaxTitle: +action.payload.value >= state.inputMinTitle &&
                +action.payload.value >= 0 ?
                    +action.payload.value : state.inputMaxTitle,
                disable: false,
                error: +action.payload.value <= state.inputMinTitle ? 'Err1' :
                    state.value >= state.maxValue ? state.value.toString() : INF_MESSAGE
            }
        }
        case 'SET_HANDLER': {
            return state.error.slice(0, 2) !== 'Er' ? {
                ...state,
                minValue: state.inputMinTitle,
                maxValue: state.inputMaxTitle,
                value: state.inputMinTitle,
                disable: true,
                error: state.error === INF_MESSAGE ? '' : state.error
            } : state
        }
        case 'INC_HANDLER': {
            return state.error.slice(0, 2) !== 'Er' ? {
                ...state,
                value: state.value < state.maxValue ? state.value + 1 : state.maxValue,
                error: !state.error && state.value >= state.maxValue - 1 ? state.value.toString() : state.error
            } : state
        }
        default:
            return state
    }
}
type ReducerType = ResetACType | MinTitleChangeACType | MaxTitleChangeACType | SetHandlerACType | IncHandlerACType
type ResetACType = ReturnType<typeof resetAC>
type MinTitleChangeACType = ReturnType<typeof minTitleChangeAC>
type MaxTitleChangeACType = ReturnType<typeof maxTitleChangeAC>
type SetHandlerACType = ReturnType<typeof setHandlerAC>
type IncHandlerACType = ReturnType<typeof incHandlerAC>
export const resetAC = () => {
    return {
        type: 'RESET'
    } as const
}
export const minTitleChangeAC = (value: string) => {
    return {
        type: 'MIN_TITLE',
        payload: {value}
    } as const
}
export const maxTitleChangeAC = (value: string) => {
    return {
        type: 'MAX_TITLE',
        payload: {value}
    } as const
}
export const setHandlerAC = () => {
    return {
        type: 'SET_HANDLER'
    } as const
}
export const incHandlerAC = () => {
    return {
        type: 'INC_HANDLER'
    } as const
}

function App() {

    const storageMinValueAsString = localStorage.getItem('counterMinValue');
    const storageMinValue = storageMinValueAsString ? +storageMinValueAsString : 0;
    const storageMaxValueAsString = localStorage.getItem('counterMaxValue');
    const storageMaxValue = storageMaxValueAsString ? +storageMaxValueAsString : 10;
    const storageValueAsString = localStorage.getItem('counterValue');
    const initialState: StateType = {
        value: storageValueAsString && storageMinValueAsString ?
            Math.max(+storageValueAsString, +storageMinValueAsString) : storageValueAsString ?
                +storageValueAsString : storageMinValueAsString ? +storageMinValueAsString : 0,
        minValue: storageMinValue,
        maxValue: storageMaxValue,
        error: storageValueAsString && storageMaxValueAsString && (+storageValueAsString >=
            +storageMaxValueAsString) ? storageValueAsString : '',
        inputMinTitle: storageMinValue,
        inputMaxTitle: storageMaxValue,
        disable: true
    }
    const [state, dispatchState] = useReducer(reducer, initialState)

    useEffect(() => localStorage.setItem('counterMinValue', state.minValue.toString()), [state.minValue])
    useEffect(() => localStorage.setItem('counterMaxValue', state.maxValue.toString()), [state.maxValue])
    useEffect(() => localStorage.setItem('counterValue', state.value.toString()), [state.value])

    const inputMinChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchState(minTitleChangeAC(e.currentTarget.value));
    }
    const inputMaxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchState(maxTitleChangeAC(e.currentTarget.value));
    }
    const setHandler = () => {
        dispatchState({
            type: 'SET_HANDLER'
        });
    }
    const incHandler = () => {
        dispatchState({
            type: 'INC_HANDLER',
        });
    }
    const resetHandler = () => {
        localStorage.removeItem('counterValue') // удаление сохраненного значения счетчика
        dispatchState(resetAC());
    }
    return (
        <div className={s.App}>
            <Logo/>
            <div className={s.body}>
                <Set setHandler={setHandler} inputMinChangeHandler={inputMinChangeHandler}
                     inputMaxChangeHandler={inputMaxChangeHandler} inputMinTitle={state.inputMinTitle}
                     inputMaxTitle={state.inputMaxTitle} error={state.error}
                     disable={state.disable}/>
                <Counter value={state.value} resetHandler={resetHandler} error={state.error}
                         incHandler={incHandler} storageMinValueAsString={storageMinValueAsString}
                         storageMaxValueAsString={storageMaxValueAsString}/>
            </div>
        </div>
    );
}

export default App;
