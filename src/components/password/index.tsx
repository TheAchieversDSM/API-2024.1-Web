
import React, { useState } from "react";
import { Password } from 'primereact/password';
import { IInput } from "../../interfaces/input";
import './index.css'

export default function InputPassword(props: IInput) {
    const [value, setValue] = useState<string>('');

    return (
        <div className="card flex justify-content-center">
            <Password
                toggleMask
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                feedback={false}
                inputStyle={{
                    width: props.width || '375px',
                    height: props.height || '50px',
                    borderRadius: 5
                }}
                style={{
                    marginTop: props.marginTop || '30px',
                    fontSize: props.fontSize || '18px',
                }}
            />
        </div>
    )
}