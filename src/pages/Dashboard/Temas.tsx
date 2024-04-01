import Box from "../../components/box";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Temas() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Tema 1', 'Tema 2', 'Tema 3'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        "#FFC160", 
                        "#FF8556", 
                        "#3FC5FA"
                    ],
                    hoverBackgroundColor: [
                        "#FFC160", 
                        "#FF8556", 
                        "#3FC5FA"
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    return(
        <>
            <Box titulo="Temas">
                <div className="chart-div" style={{ width: '25vw'}}>
                    <Chart type="pie" data={chartData} options={chartOptions} style={{height: '35vh'}} />
                </div>
            </Box>
        </>
    )
}