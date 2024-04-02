import { IDatepicker } from '../../interfaces/datepicker';
import { DateRangePicker, CustomProvider } from 'rsuite';
import { IntlProvider } from 'react-intl';
import ptBR from 'rsuite/locales/pt_BR';

import './index.css'

export default function Datepicker(props: IDatepicker) {
return (
    <div className='card flex justify-content-center'>
        <span>Data</span>

        <IntlProvider locale="pt-BR">
            <CustomProvider locale={ptBR}>
                <DateRangePicker
                    format='dd/MM/yyyy'
                    placeholder={props.placeholder}
                    value={props.value}
                    onShortcutClick={props.onShortcut}
                    onOk={props.onOk}
                    onClean={() => 'limpando'}
                    cleanable={true}
                />
            </CustomProvider>
        </IntlProvider>
    </div>
);
}