import { Chart } from "primereact/chart"
import { useEffect, useState } from "react"
import Box from "../../../components/box"

export default function Demografia() {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        const chartData = {
            datasets: [
                {
                    label: 'Feminino',
                    data: [
                        { x: 20, y: 5 },
                        { x: 25, y: 4 },
                        { x: 55, y: 2 },
                        { x: 18, y: 3 },
                        { x: 35, y: 5 },
                        { x: 25, y: 2 },
                        { x: 60, y: 1 },
                        { x: 45, y: 4 },
                        { x: 40, y: 3 },
                    ],
                    backgroundColor: '#D78C4B'
                },
                {
                    label: 'Masculino',
                    data: [
                        { x: 30, y: 5 },
                        { x: 45, y: 4 },
                        { x: 60, y: 2 },
                        { x: 21, y: 3 },
                        { x: 46, y: 5 },
                        { x: 29, y: 2 },
                        { x: 40, y: 1 },
                        { x: 85, y: 4 },
                        { x: 50, y: 3 },
                    ],
                    backgroundColor: '#3C6985'
                }
            ]
        };

        const options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Idade'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Notas das avaliações'
                    },
                    min: 0,
                    max: 5, 
                    ticks: {
                        stepSize: 1 
                    }
                }
            }
        };

        setChartData(chartData);
        setChartOptions(options);
    }, []);

    return(
        <>
            <Box titulo="Sumário por idade e gênero">
                <div className="demografia-chart-div" style={{ height: '40vh'}}>
                    <Chart type="scatter" data={chartData} options={chartOptions} style={{height: '40vh'}} />
                </div>
            </Box>
        </>
    )
}