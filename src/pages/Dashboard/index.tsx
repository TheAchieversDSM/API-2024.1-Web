import { Sidebar } from "../../components/sidebar"
import Container from "../../components/container"
import Filtros from "./Filtros";
import Temas from "./Temas";
import Tags from "./Tags";
import './index.css';

export default function Dashboard() {


    return (
        <>
            <Sidebar />
            <Container>
                <h1>Dashboard</h1>
                <Filtros/>
                <div className="graficos-container">
                    <div className="flex-container">
                        <Tags/>
                        <Temas/>
                    </div>
                </div>
            </Container>
        </>
    )
}