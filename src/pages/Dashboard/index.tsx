import { Sidebar } from '../../components/sidebar'
import { Filters } from '../../interfaces/filters'
import Container from '../../components/container'
import isAuthenticated from '../../utils/auth'
import Avaliacoes from './charts/avaliacoes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Temas from './charts/temas'
import Tags from './charts/tags'
import Filtros from './Filtros'
import './index.css'

export default function Dashboard() {
    const navigate = useNavigate();

    const [filters, setFilters] = useState<Filters>({
        dateRange: undefined,
        categories: [],
        selectedOptions: []
    })  

    useEffect(() => {
        const auth = isAuthenticated()        

        if (auth === false) {
            navigate('/')
        }
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
                            <Tags filters={ filters }/>
                            <Temas filters={ filters }/>
                        </section>
                    </div>
                </div>
            </Container>
        </>
    )
}