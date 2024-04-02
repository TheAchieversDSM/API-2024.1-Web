import { Sidebar } from '../../components/sidebar'
import Container from '../../components/container'
import Avaliacoes from './charts/avaliacoes';
import Temas from './charts/temas';
import Tags from './charts/tags';
import { useState } from 'react';
import Filtros from './filtros';
import './index.css';
import { Filters } from '../../interfaces/filters';


export default function Dashboard() {
    const [filters, setFilters] = useState<Filters>({
        dateRange: undefined,
        categories: [],
        selectedOptions: []
    })   

    return (
        <>
            <Sidebar />
            <Container>
                <h1>Dashboard</h1>
                <Filtros onFilterChange={ (filters) => setFilters(filters) } />
                <div className='graficos-container'>
                    <div className='flex-container'>
                        <Avaliacoes filters={ filters }/>
                        <section className='bottom-charts'>
                            <Tags />
                            <Temas />
                        </section>
                    </div>
                </div>
            </Container>
        </>
    )
}