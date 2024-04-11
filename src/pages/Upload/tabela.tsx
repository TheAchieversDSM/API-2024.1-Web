import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import url from "../../services/config";
import { IFile } from "../../interfaces/file";

export default function TabelaUpload(){
    const [file, setFile] = useState<IFile[]>([]); 

    useEffect(() => {
        axios.get<IFile[]>(`${url.baseURL}/base-importer/allBases`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    createdAt: formatDateString(item.createdAt),
                    status: item.status === 'success' ? 'Concluído!' : 'Erro ao enviar arquivo'
                }));
                setFile(formattedData);
            })
            .catch(error => {
                console.error('Erro ao obter dados:', error);
            });
    }, []);

    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return(
        <>
            <div className="cont-table">
                <DataTable value={file} stripedRows tableStyle={{ minWidth: '50rem' }} size={"normal"}>
                    <Column field="createdAt" header="Data da importação"></Column>
                    <Column field="fileName" header="Nome do arquivo"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </div>
        </>
    )
}