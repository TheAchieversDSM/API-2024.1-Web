import { Filters } from '../../../interfaces/filters'
import { useState, useEffect } from 'react'
import url from '../../../services/config'
import Box from '../../../components/box'
import { Chart } from 'primereact/chart'
import axios from 'axios'

export default function Avaliacoes({ filters }: { filters: Filters }) {
    const [chartOptions, setChartOptions] = useState({})
    const [chartData, setChartData] = useState({})
    const [datasets, setDatasets] = useState<any[]>([])
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if (filters.dateRange) {
            const newLabels = generateLabels(filters.dateRange[0], filters.dateRange[1])
            setLabels(newLabels)

            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#333',
                            fontSize: 18,
                            padding: 40
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#666',
                            maxTicksLimit: 15,
                        },
                        grid: {
                            color: '#ccc'
                        },
                    },
                    y: {
                        ticks: {
                            color: '#666'
                        },
                        grid: {
                            color: '#ccc'
                        }
                    }
                }
            };

            setChartOptions(options);
        }

        setChartData({})
    }, [filters])

    useEffect(() => {
        updateChartData(labels, datasets)
    }, [labels, datasets, filters])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = filters.selectedOptions.map(async (option, index) => {
                    let data;
                    if (option.catId === 2) {
                        data = await generateRandomData(option.name, option.catId);
                    } else {
                        data = await generateRandomData(option.id, option.catId);
                    }

                    return {
                        label: option.name,
                        data: data,
                        fill: false,
                        borderColor: getRandomColor(index),
                        tension: 0.4
                    };
                });

                const resolvedDatasets = await Promise.all(promises);

                setDatasets(resolvedDatasets);
            } catch (error) {
                console.error('Erro ao criar datasets:', error);
            }
        };

        fetchData();
    }, [filters.selectedOptions]);

    function updateChartData(labels: string[], datasets: any[]) {
        const data = {
            labels: labels,
            datasets: datasets
        }
        
        setChartData(data)
    }

    function generateLabels(startDate: Date, endDate: Date) {
        const labels = []
        const currentDate = new Date(startDate)

        while (currentDate <= endDate) {
            labels.push(new Date(currentDate).toLocaleDateString('pt-BR'))
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return labels
    }

    async function generateRandomData(id: string, catId: number) {
        if (catId === 2) {
            try {
                if (filters.dateRange) {
                    const formattedStartDate = new Date(filters.dateRange[0]).toISOString().slice(0, 10)
                    const formattedEndDate = new Date(filters.dateRange[1]).toISOString().slice(0, 10)

                    const res = await axios.get(`${url.baseURL}/products/averageRatingByCategory/${id}`, {
                        params: {
                            "startDate": formattedStartDate,
                            "endDate": formattedEndDate
                        }
                    })

                    const values = res.data.data
                    const data: any = []

                    const dateValueMap: Record<string, number> = {}
                    
                    values.forEach((d: any) => {
                        const date = formatDate(new Date(d.date))
                        dateValueMap[date] = d.averageRating
                    })

                    labels.forEach((label: string) => {
                        if (dateValueMap[label] !== undefined) {
                            data.push(dateValueMap[label])
                        } else {
                            data.push(0)
                        }
                    })

                    return data
                }
            } catch (error) {
                console.error('Erro ao obter dados da API:', error)
                return []
            }
        }
        else {
            try {
                if (filters.dateRange) {
                    const formattedStartDate = new Date(filters.dateRange[0]).toISOString().slice(0, 10)
                    const formattedEndDate = new Date(filters.dateRange[1]).toISOString().slice(0, 10)

                    const res = await axios.get(`${url.baseURL}/products/averageRating/${id}`, {
                        params: {
                            "startDate": formattedStartDate,
                            "endDate": formattedEndDate
                        }
                    })

                    const values = res.data
                    const data: any = []

                    const dateValueMap: Record<string, number> = {}

                    values.forEach((d: any) => {
                        const date = formatDate(new Date(d.date))
                        dateValueMap[date] = d.averageRating
                    })

                    labels.forEach((label: string) => {
                        if (dateValueMap[label] !== undefined) {
                            data.push(dateValueMap[label])
                        } else {
                            data.push(0)
                        }
                    })

                    return data
                }
            } catch (error) {
                console.error('Erro ao obter dados da API:', error)
                return []
            }
        }

        return []
    }

    function formatDate(date: Date) {
        const day = (date.getDate() + 1).toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    function getRandomColor(index: any) {
        const colors = [
            "#C47F44",
            "#D78C4B",
            "#DFA36F",
            "#E4B286",
            "#8FA9B9",
            "#5C8198",
            "#3C6985",
            "#0B4366",
            "#0A3D5D", 
        ]
        return colors[index % colors.length]
    }

    return (
        <Box titulo="Média de avaliações">
            <Chart type="line" data={chartData} options={chartOptions} />
        </Box>
    )
}