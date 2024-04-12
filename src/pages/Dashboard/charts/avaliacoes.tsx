import { Filters } from '../../../interfaces/filters';
import { useState, useEffect } from 'react';
import url from '../../../services/config';
import Box from '../../../components/box';
import { Chart } from 'primereact/chart';
import axios from 'axios';

interface IOption {
    id: string,
    name: string,
    catId: number
}

export default function Avaliacoes({ filters }: { filters: Filters }) {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const [values, setValues] = useState([])
    let labels: string[] = []

    // labels ✨
    function generateLabels(startDate: Date, endDate: Date) {
        const labels = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            labels.push(new Date(currentDate).toLocaleDateString('pt-BR'));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return labels;
    }

    if (filters.dateRange) {
        labels = generateLabels(filters.dateRange[0], filters.dateRange[1]);
    }

    // datasets ✨
    const datasets = filters.selectedOptions.map((option, index) => {
        return {
            label: option.name,
            data: option.catId === 2 ? generateRandomData(option.name, option.catId) : generateRandomData(option.id, option.catId),
            fill: false,
            borderColor: getRandomColor(index),
            tension: 0.4
        };
    });    

    function generateRandomData(id: string, catId: number) {
        if (catId === 2) {
            axios.get(`${url.baseURL}/products/averageRatingByCategory/${id}`).then((res) => {
                let values = res.data
                const data: any = [];

                const dateValueMap: Record<string, number> = {};
                values.forEach((d: any) => {
                    const date = new Date(d.date).toLocaleDateString('pt-br');
                    dateValueMap[date] = d.averageRating;
                });

                labels.forEach((label: string) => {
                    if (dateValueMap[label] !== undefined) {
                        data.push(dateValueMap[label]);
                    } else {
                        data.push(0);
                    }
                });

                setValues(data)                
            })
        }
        
        return values
    }

    function getRandomColor(index: any) {
        const colors = ['#3BAEDA', '#BC6CDD', '#FF5733', '#FFC300', '#FF33E9', '#33FF7D', '#3388FF'];
        return colors[index % colors.length];
    }

    const updateChart = (filters: Filters) => {
        const data = {
            labels: labels,
            datasets: datasets
        };        

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

        setChartData(data);
        setChartOptions(options);
    };

    useEffect(() => {
        updateChart(filters);
        setValues([])
    }, [filters])

    return (
        <Box titulo="Avaliações">
            <Chart type="line" data={chartData} options={chartOptions} />
        </Box>
    )
}