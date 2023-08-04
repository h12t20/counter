import React, {ChangeEvent, useCallback} from 'react';
import s from './Set.module.css'
import {Button} from "../button/Button";
import {Input} from "../input/Input";
import {useDispatch, useSelector} from "react-redux";
import {maxTitleChangeAC, minTitleChangeAC, setHandlerAC, StateType} from "../redux/reducer";

export const Set = () => {
    console.log('set');
    const inputMinTitle = useSelector<StateType, number>(state =>
        state.inputMinTitle);
    const inputMaxTitle = useSelector<StateType, number>(state =>
        state.inputMaxTitle);
    const error = useSelector<StateType, string>(state => state.error,
        (last,next)=>last===next || (Number(next)>=0 && last.slice(0,2)!=='Er'));
    const disable = useSelector<StateType, boolean>(state =>
        state.disable);
    const dispatch = useDispatch();
    return (
        <div className={s.set}>
            <div className={s.blockInputs}>
                <div className={s.input1}>
                    <Input title={inputMaxTitle} name='max value'
                           className={error === 'Err1' ?
                               s.error : s.input} callback={useCallback((e: ChangeEvent<HTMLInputElement>) =>
                        dispatch(maxTitleChangeAC(e.currentTarget.value)),[dispatch])}/>
                </div>
                <div className={s.input2}>
                    <Input title={inputMinTitle} name='start value'
                           className={error.slice(0, 2) === 'Er' ?
                               s.error : s.input} callback={useCallback((e: ChangeEvent<HTMLInputElement>) =>
                        dispatch(minTitleChangeAC(e.currentTarget.value)),[dispatch])}/>
                </div>
            </div>
            <div className={s.buttonBlock}>
                <Button disable={(!!error && error.slice(0, 2) === 'Er') || disable}
                        callback={useCallback(() => dispatch(setHandlerAC()),[dispatch])}
                        name='set' className={s.button}></Button>
            </div>
        </div>
    );
}

