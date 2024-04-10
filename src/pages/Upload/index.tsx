import { RefObject, useRef, useState } from "react";
import Box from "../../components/box";
import Container from "../../components/container";
import { Sidebar } from "../../components/sidebar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import "./index.css"
import TabelaUpload from "./tabela";
import axios from "axios";
import url from "../../services/config";

export default function Upload() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const toast = useRef<Toast | null>(null);

    const onUpload = async (event: any) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        try {
            const response = await axios.post(`${url.baseURL}/base-importer/import`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setUploadedFile(file);
                if (toast.current) { 
                    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
                }
            } else {
                console.log("Erro de upload")
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return(
        <>
        <div className="upload">
            <Sidebar />
                <Container>
                    <h1>Upload de arquivos</h1>
                    <Box titulo="">
                    <Toast ref={toast}></Toast>
                    <FileUpload
                        mode="basic"
                        name="file"
                        url="http://localhost:1313/base-importer/import"
                        accept=".csv"
                        maxFileSize={1000000000}
                        onUpload={onUpload}
                        chooseLabel="Escolha um arquivo"
                        style={{
                            width: 'fit-content',
                            height: '40px',
                            background: '#0B4366',
                            color: '#fff',
                            borderRadius: 5,
                            paddingRight: '16px'
                        }}
                    />
                    <TabelaUpload/>
                    </Box>
                </Container>
        </div>
        </>
    )
}