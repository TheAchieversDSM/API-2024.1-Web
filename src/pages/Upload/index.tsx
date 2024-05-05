import { RefObject, useEffect, useRef, useState } from "react";
import Container from "../../components/container";
import { Sidebar } from "../../components/sidebar";
import { FileUpload } from "primereact/fileupload";
import isAuthenticated from "../../utils/auth";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import Box from "../../components/box";
import TabelaUpload from "./tabela";
import "./index.css"

export default function Upload() {
    const navigate = useNavigate();

    const [uploadedFile, setUploadedFile] = useState(null);
    const toast = useRef<Toast | null>(null);

    const onUpload = async (event: any) => {
        const file = event.files[0];
        setUploadedFile(file);
        if (toast.current) { 
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Upload do arquivo realizado com sucesso!' });
        }
    };

    useEffect(() => {
        const auth = isAuthenticated()        

        if (auth === false) {
            navigate('/')
        }
    })

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
                        url="http://localhost:8000/pln/execute"
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