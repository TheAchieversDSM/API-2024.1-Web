import { DateRange } from "rsuite/esm/DateRangePicker"
import Multiselect from '../../components/multiselect'
import Datepicker from "../../components/datepicker"
import { Filters } from "../../interfaces/filters"
import Select from '../../components/select'
import Btn from "../../components/button"
import { useEffect, useState } from "react"
import axios from "axios"
import url from "../../services/config"

type FilterChangeHandler = (filters: Filters) => void

interface FiltrosProps {
    onFilterChange: FilterChangeHandler
}

interface OptionsProps {
    id: string
    name: string
    catId: number
}

export default function Filtros({ onFilterChange }: FiltrosProps) {
    const [estadoSelected, setEstadoSelected] = useState<{ id: string, name: string }[]>([]);

    const [categorias, setCategorias] = useState<{ id: string, name: string }[]>([]);
    const [categoriaSelected, setCategoriaSelected] = useState<{ id: string, name: string }>({ id: '', name: '' });

    const [produtosList, setProdutosList] = useState<OptionsProps[]>([]);
    const [produtos, setProdutos] = useState<OptionsProps[]>([]);

    const [date, setDate] = useState<DateRange | undefined>();

    const estados = [
        { id: 'AC', name: 'Acre'},
        { id: 'AL', name: 'Alagoas'},
        { id: 'AP', name: 'Amapá'},
        { id: 'AM', name: 'Amazonas'},
        { id: 'BA', name: 'Bahia'},
        { id: 'CE', name: 'Ceará'},
        { id: 'ES', name: 'Espírito Santo'},
        { id: 'GO', name: 'Goiás'},
        { id: 'MA', name: 'Maranhão'},
        { id: 'MT', name: 'Mato Grosso'},
        { id: 'MS', name: 'Mato Grosso do Sul'},
        { id: 'MG', name: 'Minas Gerais'},
        { id: 'PA', name: 'Pará'},
        { id: 'PR', name: 'Paraná'},
        { id: 'PE', name: 'Pernambuco'},
        { id: 'PI', name: 'Piauí'},
        { id: 'RJ', name: 'Rio de Janeiro'},
        { id: 'RN', name: 'Rio Grande do Norte'},
        { id: 'RS', name: 'Rio Grande do Sul'},
        { id: 'RO', name: 'Rondônia'},
        { id: 'RR', name: 'Roraima'},
        { id: 'SC', name: 'Santa Catarina'},
        { id: 'SP', name: 'São Paulo'},
        { id: 'SE', name: 'Sergipe'},
        { id: 'TO', name: 'Tocantins'},
        { id: 'DF', name: 'Distrito Federal'},
    ]

    // const [searchTerm, setSearchTerm] = useState('');

    function handleShortcut(shortcut: any) {
        if (shortcut.label === 'today') {
            const today = new Date()
            setDate([today, today])

        } else if (shortcut.label === 'yesterday') {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            setDate([yesterday, yesterday])

        } else if (shortcut.label === 'last7Days') {
            const endDate = new Date()
            const startDate = new Date()
            startDate.setDate(endDate.getDate() - 6)
            setDate([startDate, endDate])
        }
    }

    // const handleSearch = (e: any) => {        
    //     const searchTerm = e.filter.toLowerCase();
    //     setSearchTerm(searchTerm);
    
    //     if (searchTerm === '') {
    //         const length: number = catLength ? catLength + 10 : 10;
    //         const list = optionsList.slice(0, length);
    
    //         setFilteredOptions(list);
    //     } else {
    //         const filtered = optionsList.filter((opt: any) =>
    //             opt.name.toLowerCase().includes(searchTerm) ||
    //             (opt.category && opt.category.toLowerCase().includes(searchTerm))
    //         );
        
    //         setFilteredOptions(filtered);
    //     }
    // };

    useEffect(() => {
        axios.get(`${url.baseURL}/products/categories`).then((res) => {
            const categories = res.data;
    
            const categoriesList = categories
                .filter((c: any) => c !== null && c !== undefined)
                .map((c: string, index: number) => ({
                    id: index.toString(),
                    name: c,
                }))
                .slice(1);
    
            setCategorias(categoriesList);
        });
    }, []);

    useEffect(() => {
        if (categoriaSelected && categoriaSelected.name) {
            axios.get(`${url.baseURL}/products/allProducts`).then((res) => {
                const products = res.data;
    
                const productsList = products
                    .filter((p: any) => p.category === categoriaSelected.name && p.name !== null && p.name !== undefined)
                    .map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        catId: 1
                    }))
                    .sort((a: any, b: any) => a.name.localeCompare(b.name));
    
                    console.log(productsList)
                setProdutos(productsList);
            });
        }
    }, [categoriaSelected]);

    return (
        <>
            <div className="filters-container">
                <Select
                    value={estadoSelected}
                    options={estados}
                    name={'Estado'}
                    placeholder={''}
                    onChange={(e) => setEstadoSelected(e.value)}
                    width={100}
                />

                <Datepicker
                    placeholder={"Selecione uma data"}
                    value={date}
                    onShortcut={handleShortcut}
                    onClean={() => setDate(undefined)}
                    onOk={(date: any) => setDate(date)}
                />

                <Select
                    value={categoriaSelected}
                    options={categorias}
                    name={'Categoria'}
                    placeholder={'Selecione a categoria'}
                    onChange={(e) => setCategoriaSelected(e.value)}
                    width={240}
                />

                <Multiselect
                    value={produtosList}
                    options={produtos} 
                    name={'Produtos'}
                    placeholder={'Selecione os produtos'}
                    width={300}
                    maxSelected={2}
                    onChange={(e) => setProdutosList(e.value)}
                />

                <Btn
                    label="Buscar"
                    icon='pi pi-search'
                    onClick={() => {
                        onFilterChange({ dateRange: date, categories: categoriaSelected, selectedOptions: produtosList, estado: estadoSelected })
                    }}
                />
            </div>
        </>
    )
}