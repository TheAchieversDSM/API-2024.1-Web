import Box from "../../../components/box";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Temas() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: [
                        "#E97947",
                        "#FF8556",
                        "#FF9F75",
                        "#6AD1FC",
                        "#3FC5FA",
                        "#5C96F7",
                        "#4F88DB",
                    ],
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
            ]
        };
        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return(
        <>
            <Box titulo="Tags">
                <div className="card flex justify-content-center" style={{ width: '40vw'}}>
                    <Chart type="bar" data={chartData} options={chartOptions} style={{height: '33vh'}}/>
                </div>
            </Box>
        </>
    )
}