import React, {ChangeEvent} from "react";
import s from './Input.module.css'
export type InputPropsType = {
    name: string
    className: string
    title: number
    callback: (e: ChangeEvent<HTMLInputElement>) => void
    onClickHandler: () => void
    onMouseOut: () => void
}
export const Input = (props: InputPropsType) => {
    return (
        <label className={s.label}>{props.name}: <input id='1' value={props.title} name={props.name} className={props.className}
                                    type='number' onChange={props.callback} onMouseOver={props.onClickHandler}
                                    onMouseOut={props.onMouseOut}/></label>
    );
}