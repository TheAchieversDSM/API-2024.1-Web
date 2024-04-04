import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function TabelaUpload(){
    const products = [
        { data: 'DD/MM/AAAA', name: 'Arquivo.csv', size: '50 MB', status: "Pré-processamento" },
        { data: 'DD/MM/AAAA', name: 'Arquivo.csv 2', size: '40 MB', status: "Pré-processamento" },
        { data: 'DD/MM/AAAA', name: 'Arquivo.csv 3', size: '100 MB', status: "Processando" },
        { data: 'DD/MM/AAAA', name: 'Arquivo.csv 4', size: '80 MB', status: "Concluído" },
        // Adicione mais produtos conforme necessário
    ];
    return(
        <>
            <div className="cont-table">
                <DataTable value={products} stripedRows tableStyle={{ minWidth: '50rem' }} size={"normal"}>
                    <Column field="data" header="Data da importação"></Column>
                    <Column field="name" header="Nome do arquivo"></Column>
                    <Column field="size" header="Tamanho"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </div>
        </>
    )
}