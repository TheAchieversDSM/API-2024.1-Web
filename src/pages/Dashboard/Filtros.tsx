import { DateRange } from "rsuite/esm/DateRangePicker";
import Multiselect from '../../components/multiselect';
import Datepicker from "../../components/datepicker";
import { Filters } from "../../interfaces/filters";
import Select from '../../components/select';
import Btn from "../../components/button";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../services/config";

type FilterChangeHandler = (filters: Filters) => void;

interface FiltrosProps {
    onFilterChange: FilterChangeHandler;
}

export default function Filtros({ onFilterChange }: FiltrosProps) {
    const [category, setCategory] = useState<{ id: string, name: string }>();
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [optionsList, setOptionsList] = useState<{ id: string, name: string, catId: number }[]>([]);
    const [options, setOptions] = useState<{ id: string, name: string, catId: number }[]>([]);
    const [date, setDate] = useState<DateRange | undefined>();    

    const categoriesList = [
        { name: 'Produtos', id: '1' },
        { name: 'Categorias', id: '2' }
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

    useEffect(() => {
        axios.get(`${url.baseURL}/products/allProducts`).then((res) => {
            const products = res.data;

            const categoriesList: { id: string, name: string, catId: number }[] = [];
            const productsList: { id: string, name: string, catId: number }[] = [];
        
            products.forEach((p: any, index: number) => {       
                const cat = categoriesList.some(category => category.name === p.category);
        
                if (!cat) {
                    categoriesList.push({
                        id: index.toString(),
                        name: p.category,
                        catId: 2
                    });
                }

                const prod = productsList.some(product => product.name === p.name);
        
                if (!prod) {
                    productsList.push({
                        id: p.id,
                        name: p.name,
                        catId: 1
                    });
                }
            });
        
            const options = [...categoriesList, ...productsList];
        
            setOptionsList(options);
        })         
    }, [])

    return (
        <>
            <div className="filters-container">
                <Datepicker
                    placeholder={"Selecione uma data"}
                    value={date}
                    onShortcut={handleShortcut}
                    onClean={() => setDate(undefined)}
                    onOk={(date: any) => setDate(date)}
                />

                <Select
                    value={categories}
                    options={categoriesList}
                    name={'Grupo'}
                    placeholder={'Selecione o grupo'}
                    onChange={(e) => {
                        if (e.value) {
                            setCategories(e.value);
                            setCategory({ name: e.value.name, id: e.value.id });
                        } else {
                            setCategories([]);
                            setCategory(undefined);
                        }
                    }}
                />

                <Multiselect
                    value={options}
                    options={category ? optionsList.filter(option => option.catId === parseInt(category.id)) : optionsList}
                    name={'Opções'}
                    placeholder={'Selecione as opções'}
                    width={300}
                    maxSelected={2}
                    onChange={(e) => setOptions(e.value)}
                />

                <Btn
                    label="Buscar"
                    icon='pi pi-search'
                    onClick={() => {
                        onFilterChange({ dateRange: date, categories, selectedOptions: options });
                    }}
                />
            </div>
        </>
    )
}