import Box from "../../../components/box";
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Filters } from "../../../interfaces/filters";
import url from "../../../services/config";
import axios from "axios";

export default function TagsPositivas({ filters }: { filters: Filters }) {
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

            axios.get(`${url.baseURL}/products/getAllRecomendation/${formattedOptions}`)
                .then(response => {
                    const data = response.data;
                    const labels: any[] = [];
                    const recommendedCounts: any[] = [];
                    const notRecommendedCounts: any[] = [];

                    data.forEach((item: { productName: any; recommendedCount: any; notRecommendedCount: any; }) => {
                        labels.push(item.productName);
                        recommendedCounts.push(item.recommendedCount);
                        notRecommendedCounts.push(item.notRecommendedCount);
                    });

                    const chartData = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Sim',
                                backgroundColor: '#7bb755',
                                data: recommendedCounts
                            },
                            {
                                label: 'Não',
                                backgroundColor: '#de4449',
                                data: notRecommendedCounts
                            }
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
            indexAxis: 'x',
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
                        display: false,
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
            <Box titulo="Você recomendaria este produto?">
                <div className="card flex justify-content-center" >
                    <Chart type="bar" data={chartData} options={chartOptions} style={{height: '40vh', width: '25vw'}}/>
                </div>
            </Box>
        </>
    )
}