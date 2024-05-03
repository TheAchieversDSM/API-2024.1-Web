import Box from "../../../components/box";
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Filters } from "../../../interfaces/filters";

export default function Temas({ filters }: { filters: Filters }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [isFilterSelected, setIsFilterSelected] = useState(false);

    useEffect(() => {
        setIsFilterSelected(filters.selectedOptions.length > 0);
    }, [filters.selectedOptions]);

    useEffect(() => {
        if (isFilterSelected) {
            const formattedOptions = filters.selectedOptions.map(option => option.name.replace(/\s/g, '')).join(',');

            fetch(`http://localhost:1313/summary/getAllByCategories/comments/${formattedOptions}`)
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
        const options = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        };

        setChartOptions(options);
    }, []);
    return(
        <>
            <Box titulo="Temas por tags">
                <div className="chart-div" style={{ width: '25vw'}}>
                    <Chart type="pie" data={chartData} options={chartOptions} style={{height: '35vh'}} />
                </div>
            </Box>
        </>
    )
}