import React from 'react';
import s from './Counter.module.css';
import {Button} from "../Button/Button";

import {INF_MESSAGE} from "../App/Reducer";

export type PropsType = {
    error: string
    incHandler: () => void
    resetHandler: () => void
    value: number
    storageMinValueAsString:string | null
    storageMaxValueAsString:string | null
}

export function Counter(props: PropsType) {
    return (
        <div className={s.counter}>
            <div className={s.inputBlock}>
                <h1 className={!props.error ? s.value : props.error.slice(0, 2) === 'En' ?
                    s.valueTxt : props.error.slice(0, 2) === 'Er' ? s.errorTxt : s.error}>
                    {props.error && props.error.slice(0, 2) === 'Er' ?
                        'Incorrect value!' : props.error.slice(0, 2) === 'En' ?
                            INF_MESSAGE : props.value}
                </h1>
            </div>
            <div className={s.buttonBlock}>
                <Button disable={!!props.error} callback={props.incHandler}
                        name='inc' className={s.button}></Button>
                <Button disable={false} callback={props.resetHandler} name='reset'
                        className={s.button}></Button>
            </div>
        </div>
    );
}

