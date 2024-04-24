
import { InputText } from "primereact/inputtext";
import { IInput } from "../../interfaces/input";

export default function Input(props: IInput) {
    return (
        <div className="card flex justify-content-center">
            <InputText
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                style={{
                    width: props.width || '375px', 
                    height: props.height || '50px',
                    marginTop: props.marginTop || '30px',
                    fontSize: props.fontSize || '18px',
                    borderRadius: 5
                }}
            />
        </div>
    )
}
