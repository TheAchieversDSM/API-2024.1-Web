import { Chart } from "primereact/chart"
import { useEffect, useState } from "react"
import Box from "../../../components/box"
import { Filters } from "../../../interfaces/filters";
import axios from "axios";
import url from "../../../services/config";

export default function Demografia({ filters }: { filters: Filters }) {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    console.log(filters)
    async function generateData(id: string, stateId: any, productName: string) {
        try {
            if (filters.dateRange) {
                const formattedStartDate = new Date(filters.dateRange[0]).toISOString().slice(0, 10)
                const formattedEndDate = new Date(filters.dateRange[1]).toISOString().slice(0, 10)

                const res = await axios.get(`${url.baseURL}/products/getProductDemography/${id}/${stateId}`, {
                    params: {
                        "startDate": formattedStartDate,
                        "endDate": formattedEndDate
                    }
                })

                const values = res.data;

                const formattedData = {
                    [`${productName} - Masculino`]: [] as { x: number; y: number }[],
                    [`${productName} - Feminino`]: [] as { x: number; y: number }[]
                };

                values.forEach((item: { gender: string; age: any; rating: any; }) => {
                    if (item.gender === 'M') {
                        formattedData[`${productName} - Masculino`].push({ x: item.age, y: item.rating });
                    } else {
                        formattedData[`${productName} - Feminino`].push({ x: item.age, y: item.rating });
                    }
                });


                return formattedData;
            }
        } catch (error) {
            console.error('Erro ao obter dados da API:', error)
        }
    }

    useEffect(() => {
        if (filters.dateRange && filters.selectedOptions.length > 0) {
            const promises = filters.selectedOptions.map(async (option) => {
                let data = await generateData(option.id, filters.estado, option.name);
                return data;
            });

            Promise.all(promises).then((formattedDatas) => {
                const datasets = formattedDatas.flatMap((data, index) => {
                    const pointStyle = index % 2 === 0 ? 'rectRounded' : 'triangle'; // Alternando estilos por produto

                    return [
                        {
                            label: `${filters.selectedOptions[index].name} - Masculino`,
                            data: data ? data[`${filters.selectedOptions[index].name} - Masculino`] : [],
                            backgroundColor: 'rgba(10, 61, 93, 0.8)',
                            pointStyle
                        },
                        {
                            label: `${filters.selectedOptions[index].name} - Feminino`,
                            data: data ? data[`${filters.selectedOptions[index].name} - Feminino`] : [],
                            backgroundColor: 'rgba(196, 127, 68, 0.8)',
                            pointStyle
                        }
                    ];
                });

                const chartData = { datasets };
                
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
            });
        }
    }, [filters.dateRange, filters.selectedOptions, filters.estado]);


    return(
        <>
            <Box titulo="Sumário por idade e gênero">
                <div className="demografia-chart-div" style={{ height: '40vh'}}>
                    <Chart type="scatter" data={chartData} options={chartOptions} style={{height: '40vh', width: '66vw'}} />
                </div>
            </Box>
        </>
    )
}