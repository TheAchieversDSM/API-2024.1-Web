import Box from "../../../components/box";
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Filters } from "../../../interfaces/filters";
import url from "../../../services/config";
import axios from "axios";

export default function TagsNegativas({ filters }: { filters: Filters }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [isFilterSelected, setIsFilterSelected] = useState(false);

    useEffect(() => {
        setIsFilterSelected(filters.selectedOptions.length > 0);
        console.log(filters)
    }, [filters.selectedOptions]);

    useEffect(() => {
        if (isFilterSelected) {
            let formattedOptions = '';

            if (Array.isArray(filters.selectedOptions)) {
                formattedOptions = filters.selectedOptions.map(option => option.id).join(', ');
                console.log(formattedOptions)
            }

            axios.get(`${url.baseURL}/summary/getAllByProduct/${formattedOptions}`)
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    const labelsSet = new Set();
                    const dataMap = new Map();

                    
                    data.forEach((item: { sentiment_review: string; text: unknown; amount: any; }) => {
                        if (item.sentiment_review === "negativa") {
                            if (!labelsSet.has(item.text)) {
                                labelsSet.add(item.text);
                                dataMap.set(item.text, item.amount);
                            } else {
                                const currentAmount = dataMap.get(item.text) || 0;
                                dataMap.set(item.text, currentAmount + item.amount);
                            }
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
                                    "#de4449", 
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
            <Box titulo="Sumário por tags negativas">
                <div className="card flex justify-content-center" >
                    <Chart type="bar" data={chartData} options={chartOptions} style={{height: '40vh', width: '30vw'}}/>
                </div>
            </Box>
        </>
    )
}