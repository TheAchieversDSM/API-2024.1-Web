import { DateRange } from "rsuite/esm/DateRangePicker";
import Datepicker from "../../components/datepicker";
import { Sidebar } from "../../components/sidebar"
import Container from "../../components/container"
import Select from '../../components/select';
import Btn from "../../components/button";
import { useState } from "react";
import './index.css';
import Box from "../../components/box";
import Filtros from "./Filtros";
import Temas from "./Temas";
import Tags from "./Tags";

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