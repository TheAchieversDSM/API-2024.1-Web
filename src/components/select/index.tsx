import { Dropdown } from 'primereact/dropdown';
import { ISelect } from '../../interfaces/select';
import './index.css'

export default function Select(props: ISelect) {
    return (
        <div className='card flex justify-content-center dropdown'>
            <span>{props.name}</span>

            <Dropdown 
                value={props.value} 
                onChange={props.onChange} 
                options={props.options} 
                optionLabel='name' 
                placeholder={props.placeholder}
                checkmark={true}
                highlightOnSelect={false}
                name={props.name}
                showClear
                filter
                style={{ width: props.width || '250px' }}
            />
        </div>
    )
}