import Box from "../../../components/box";
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Filters } from "../../../interfaces/filters";
import url from "../../../services/config";

export default function Tags({ filters }: { filters: Filters }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [isFilterSelected, setIsFilterSelected] = useState(false);

    useEffect(() => {
        setIsFilterSelected(filters.selectedOptions.length > 0);
    }, [filters.selectedOptions]);

    useEffect(() => {
        if (isFilterSelected) {
            const formattedOptions = filters.selectedOptions.map(option => option.name.replace(/\s/g, '')).join(',');

            fetch(`http://localhost:1313/summary/getAllByCategories/tag/${formattedOptions}`)
                .then(response => response.json())
                .then(data => {
                    const labelsSet = new Set<string>();
                    const dataMap = new Map<string, number>();

                    data.forEach((item: { text: string, amount: number }) => {
                        if (!labelsSet.has(item.text)) {
                            labelsSet.add(item.text);
                            dataMap.set(item.text, item.amount);
                        } else {
                            const currentAmount = dataMap.get(item.text) || 0;
                            dataMap.set(item.text, currentAmount + item.amount);
                        }
                    });

                    const labels = Array.from(labelsSet);
                    const dataValues = Array.from(dataMap.values());

                    const chartData = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Quantidade',
                                backgroundColor: [
                                    "#C47F44",
                                    "#D78C4B",
                                    "#DFA36F",
                                    "#E4B286",
                                    "#8FA9B9",
                                    "#5C8198",
                                    "#3C6985",
                                    "#0B4366",
                                    "#0A3D5D",  
                                ],
                                data: dataValues
                            },
                        ]
                    };

                    setChartData(chartData);
                })
                .catch(error => {
                    console.error('Erro ao chamar a rota:', error);
                });
        }
    }, [isFilterSelected]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
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

        setChartOptions(options);
    }, []);

    return(
        <>
            <Box titulo="Sumário por tags">
                <div className="card flex justify-content-center" >
                    <Chart type="bar" data={chartData} options={chartOptions} style={{height: '40vh', width: '35vw'}}/>
                </div>
            </Box>
        </>
    )
}