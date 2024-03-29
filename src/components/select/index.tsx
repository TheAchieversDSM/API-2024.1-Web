import { MultiSelect } from 'primereact/multiselect';
import { ISelect } from '../../interfaces/select';
import './index.css'

export default function Select(props: ISelect) {
    return (
        <div className='card flex justify-content-center'>
            <span>{props.name}</span>
            
            <MultiSelect
                value={props.value}
                options={props.options}
                onChange={props.onChange}
                optionLabel='name'
                multiple={props.multiple}
                filter placeholder={props.placeholder}
                maxSelectedLabels={props.maxSelected}
                style={{ width: props.width || '250px' }}
            />
        </div>
    )
}