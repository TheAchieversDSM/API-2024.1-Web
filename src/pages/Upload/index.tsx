import { RefObject, useRef } from "react";
import Box from "../../components/box";
import Container from "../../components/container";
import { Sidebar } from "../../components/sidebar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import "./index.css"
import TabelaUpload from "./tabela";

export default function Upload() {
    const toast: RefObject<any> = useRef();

    const onUpload = () => {
        toast.current?.show?.({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
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
                        name="upload_file"
                        url="/api/upload"
                        accept=".csv"
                        maxFileSize={1000000}
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