import Box from "../../../components/box";
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Filters } from "../../../interfaces/filters";
import url from "../../../services/config";
import axios from "axios";

export default function Tags({ filters }: { filters: Filters }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [isFilterSelected, setIsFilterSelected] = useState(false);

    useEffect(() => {
        setIsFilterSelected(filters.selectedOptions.length > 0);
    }, [filters.selectedOptions]);

    useEffect(() => {
        if (isFilterSelected) {
            let formattedOptions = '';

            if (Array.isArray(filters.categories)) {
                formattedOptions = filters.categories.map(option => option.name).join(', ');
            } else {
                formattedOptions = filters.categories.name;
            }

            axios.get(`${url.baseURL}/summary/getAllByCategories/tag/${formattedOptions}`)
                .then(response => {
                    const data = response.data;
                    const labelsSet = new Set();
                    const dataMap = new Map();

                    data.forEach((item: { text: unknown; amount: any; }) => {
                        if (!labelsSet.has(item.text)) {
                            labelsSet.add(item.text);
                            dataMap.set(item.text, item.amount);
                        } else {
                            const currentAmount = dataMap.get(item.text) || 0;
                            dataMap.set(item.text, currentAmount + item.amount);
                        }
                    });

                    const sortedData = Array.from(dataMap.entries()).sort(([, a], [, b]) => b - a);
                const labels = sortedData.map(([label]) => label);
                const dataValues = sortedData.map(([, value]) => value);

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
    }, [isFilterSelected, filters]);

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
                    <Chart type="bar" data={chartData} options={chartOptions} style={{height: '40vh', width: '66vw'}}/>
                </div>
            </Box>
        </>
    )
}