import React, {ChangeEvent} from 'react';
import s from './Set.module.css'
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

export type SetPropsType = {
    inputMinTitle: number;
    inputMaxTitle: number;
    inputMinChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    inputMaxChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    setHandler: () => void
    error: string
    onMouseOver: () => void
    disable: boolean
    onMouseOut: () => void
}

export function Set(props: SetPropsType) {
    return (
        <div className={s.set} onMouseOver={props.onMouseOver} //обрабочик курсора на внешний div
             onMouseOut={props.onMouseOut}>
            <div className={s.blockInputs}>
                <div className={s.input1}>
                    <Input title={props.inputMaxTitle} name='max value'
                           className={props.error === 'Er1' ?
                               s.error : s.input} callback={props.inputMaxChangeHandler}/>
                </div>
                <div className={s.input2}>
                    <Input title={props.inputMinTitle} name='start value'
                           className={props.error.slice(0,2) === 'Er'?
                               s.error : s.input} callback={props.inputMinChangeHandler}/>
                </div>
            </div>
            <div className={s.buttonBlock}>
                <Button disable={(!!props.error && props.error !== "Enter values and press 'set'") || props.disable}
                        callback={props.setHandler} name='set' className={s.button}></Button>
            </div>
        </div>
    );
}

