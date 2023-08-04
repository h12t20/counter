import React, {useCallback} from 'react';
import s from './Counter.module.css';
import {Button} from "../button/Button";
import {incHandlerAC, INF_MESSAGE, resetAC, StateType} from "../redux/reducer";
import {useDispatch, useSelector} from "react-redux";

export const Counter=()=>{
    const value = useSelector<StateType, number>(state =>
        state.value);
    const error = useSelector<StateType, string>(state =>
        state.error);
    const dispatch=useDispatch();
    return (
        <div className={s.counter}>
            <div className={s.inputBlock}>
                <h1 className={!error ? s.value : error.slice(0, 2) === 'En' ?
                    s.valueTxt : error.slice(0, 2) === 'Er' ? s.errorTxt : s.error}>
                    {error && error.slice(0, 2) === 'Er' ?
                        'Incorrect value!' : error.slice(0, 2) === 'En' ?
                            INF_MESSAGE : value}
                </h1>
            </div>
            <div className={s.buttonBlock}>
                <Button disable={!!error} callback={useCallback(() => dispatch(incHandlerAC()),
                    [dispatch])} name='inc' className={s.button}></Button>
                <Button disable={false} callback={useCallback(() => dispatch(resetAC()),
                    [dispatch])} name='reset' className={s.button}></Button>
            </div>
        </div>
    );
}

