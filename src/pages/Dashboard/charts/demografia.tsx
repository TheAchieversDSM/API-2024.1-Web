import { Chart } from "primereact/chart"
import { useEffect, useState } from "react"
import Box from "../../../components/box"
import { Filters } from "../../../interfaces/filters";
import axios from "axios";
import url from "../../../services/config";

export default function Demografia({ filters }: { filters: Filters }) {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    
    async function generateData(id: string, stateId: any) {
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

                console.log(values)
    
                const formattedData = {
                    Masculino: [] as { x: number; y: number }[],
                    Feminino: [] as { x: number; y: number }[]
                };

                values.forEach((item: any) => {
                    if (item.gender === 'M') {
                        formattedData.Masculino.push({ x: item.age, y: item.rating });
                    } else {
                        formattedData.Feminino.push({ x: item.age, y: item.rating });
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
                let data = await generateData(option.id, filters.estado);
                return data;
            });

            Promise.all(promises).then((formattedDatas) => {
                const chartData = {
                    datasets: [
                        {
                            label: 'Masculino',
                            data: formattedDatas.flatMap(data => data ? data.Masculino.map(({ x, y }) => ({ x, y })) : []),
                            backgroundColor: '#0A3D5D'
                        },
                        {
                            label: 'Feminino',
                            data: formattedDatas.flatMap(data => data ? data.Feminino.map(({ x, y }) => ({ x, y })) : []),
                            backgroundColor: '#C47F44' 
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
            });
        }
    }, [filters.dateRange, filters.selectedOptions, filters]);

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