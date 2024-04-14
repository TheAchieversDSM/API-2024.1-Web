import { MultiSelect } from 'primereact/multiselect';
import { ISelect } from '../../interfaces/select';
import './index.css'

export default function Multiselect(props: ISelect) {
    return (
        <div className='card flex justify-content-center dropdown'>
            <span>{props.name}</span>
            
            <MultiSelect
                value={props.value}
                onFilter={props.onFilter}
                options={props.options}
                onChange={props.onChange}
                optionLabel='name'
                filter placeholder={props.placeholder}
                maxSelectedLabels={props.maxSelected}
                selectedItemsLabel='{0} itens selecionados'
                showClear
                style={{ width: props.width || '250px' }}
            />
        </div>
    )
}