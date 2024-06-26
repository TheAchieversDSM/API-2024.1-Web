import { IButton } from '../../interfaces/button';
import { Button } from 'primereact/button';
import './index.css'
        
export default function Btn(props: IButton) {
    return (
        <Button 
            label={props.label} 
            icon={props.icon} 
            onClick={props.onClick}
            disabled={props.disabled || false}
            name={props.name}
            style={{ 
                width: props.width || '140px', 
                height: props.height || '46px',
                marginTop: props.marginTop || '30px',
                background: props.bg || '#0B4366',
                color: props.color || '#fff',
                borderRadius: 5
            }}
        />
    )
}