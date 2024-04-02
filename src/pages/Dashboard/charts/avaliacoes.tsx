import { Filters } from '../../../interfaces/filters';
import { useState, useEffect } from 'react';
import Box from '../../../components/box';
import { Chart } from 'primereact/chart';

export default function Avaliacoes({ filters }: { filters: Filters }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
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
            data: generateRandomData(),
            fill: false,
            borderColor: getRandomColor(index),
            tension: 0.4
        };
    });

    function generateRandomData() {
        const data = [];
        for (let i = 0; i < labels.length; i++) {
            data.push(Math.floor(Math.random() * 100));
        }
        return data;
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
    }, [filters])

    return (
        <Box titulo="Avaliações">
            <Chart type="line" data={chartData} options={chartOptions} />
        </Box>
    )
}