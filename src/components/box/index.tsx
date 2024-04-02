import { ReactNode } from "react";
import './index.css';

interface BoxProps {
    children: ReactNode;
    titulo: string;
}

export default function Box({ children, titulo }: BoxProps) {
    return (
        <div className="box">
            <h3 className="titulo">{titulo}</h3>
            {children}
        </div>
    )
}