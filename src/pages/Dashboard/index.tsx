import { DateRange } from "rsuite/esm/DateRangePicker";
import Datepicker from "../../components/datepicker";
import { Sidebar } from "../../components/sidebar"
import Container from "../../components/container"
import Select from '../../components/select';
import Btn from "../../components/button";
import { useState } from "react";
import './index.css';

export default function Dashboard() {
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [options, setOptions] = useState<{ id: string, name: string }[]>([]);
    const [date, setDate] = useState<DateRange | undefined>();

    const categoriesList = [
        { name: 'Produtos', id: '1' },
        { name: 'Categorias', id: '2' }
    ];

    const optionsList = [
        { name: 'Categoria 1', id: '1' },
        { name: 'Categoria 2', id: '2' },
        { name: 'Categoria 3', id: '3' },
        { name: 'Categoria 4', id: '4' },
        { name: 'Categoria 5', id: '5' }
    ];

    function handleShortcut(shortcut: any) {        
        if (shortcut.label === 'today') {           
            const today = new Date();
            setDate([today, today]);

        } else if (shortcut.label === 'yesterday') {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            setDate([yesterday, yesterday]);

        } else if (shortcut.label === 'last7Days') {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 6);
            setDate([startDate, endDate]);
        }
    }

    return (
        <>
            <Sidebar />

            <Container>
                <h1>Dashboard</h1>

                <div className="filter-container">
                    <Datepicker
                        placeholder={"Selecione uma data"}
                        value={date}
                        onShorcut={handleShortcut}
                        onOk={(date: any) => {
                            setDate(date);
                            console.log("Data selecionada:", date);
                        }}
                    />

                    <Select
                        value={categories}
                        options={categoriesList}
                        name={"Grupo"}
                        multiple={false}
                        placeholder={"Selecione o grupo"}
                        onChange={(e) => setCategories(e.value)}
                    />

                    <Select
                        value={options}
                        options={optionsList}
                        name={"Opções"}
                        multiple={true}
                        placeholder={"Selecione as opções"}
                        width={300}
                        maxSelected={2}
                        onChange={(e) => setOptions(e.value)}
                    />

                    <Btn
                        label="Buscar"
                        icon='pi pi-search'
                        onClick={() => console.log(date, categories, options)}
                    />
                </div>
            </Container>
        </>
    )
}