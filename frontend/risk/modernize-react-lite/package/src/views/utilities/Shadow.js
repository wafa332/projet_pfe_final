import React, { useState } from 'react';
import { Typography, Grid, CardContent, Box, Button, Alert, Paper, LinearProgress } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { FileUpload } from 'primereact/fileupload';
import $ from 'jquery';

const Shadows = () => {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileBlob, setFileBlob] = useState(null);

  const handleFileUpload = (e) => {
    setError(null);
    setUploading(true);
    setUploadProgress(0);
    setFileUploaded(false);
    setFileBlob(null);
  
    const file = e.files[0];
  
    // Valider le format du fichier
    if (!file || !(file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setError('Invalid file format. Please upload a .csv, .xls, or .xlsx file.');
      setUploading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://127.0.0.1:8000/risque_credit/upload/', true);
  
    let simulatedProcessingProgress = 0; // Progression simulée côté backend
    let processingInterval;
  
    // Progression de l'upload
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const uploadProgress = Math.round((event.loaded / event.total) * 50); // Upload = 50%
        setUploadProgress(uploadProgress);
      }
    };
  
    // Une fois l'upload terminé
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        setFileBlob(blob);
  
        // Simuler la progression du traitement côté backend
        processingInterval = setInterval(() => {
          simulatedProcessingProgress += 5;
          setUploadProgress(50 + simulatedProcessingProgress); // Ajout de la progression du traitement
  
          if (simulatedProcessingProgress >= 50) {
            clearInterval(processingInterval);
            setFileUploaded(true);
            setUploading(false);
            setUploadProgress(100); // Finalisation à 100%
          }
        }, 200); // Incrémente la progression toutes les 200ms
      } else {
        setError('Failed to process the file.');
        setUploading(false);
      }
    };
  
    // Gestion des erreurs
    xhr.onerror = () => {
      setError('An error occurred while uploading the file.');
      setUploading(false);
    };
  
    // Définir le type de réponse en blob
    xhr.responseType = 'blob';
  
    // Envoyer le fichier
    xhr.send(formData);
  };
  
  return (
    <PageContainer title="Credit Risk" description="Upload a file for credit risk calculation">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: 'white', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: '50px',
              padding: 5,
              backgroundColor: 'white',
              border: `1px solid ${theme => theme.palette.grey[200]}`,
              boxShadow: `20px 30px 0px ${theme => theme.palette.grey[300]}`,
              marginTop: '100px',
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom color="primary" align="center" sx={{ mb: 4 }}>
                Credit Risk Analysis
              </Typography>
              <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
                Please upload your file for credit risk calculation. The file should be in .csv, .xls, or .xlsx format.
              </Typography>

              {/* File Upload */}
              <Box my={3}>
                <FileUpload
                  name="demo[]"
                  accept=".csv,.xls,.xlsx"
                  maxFileSize={10000000000}
                  emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                  customUpload
                  uploadHandler={handleFileUpload}
                  chooseLabel="Choose"
                  cancelLabel="Cancel"
                  uploadLabel="Upload"
                  style={{ width: '100%' }}
                  chooseOptions={{
                    style: {
                      fontSize: '1rem',
                      padding: '10px 20px',
                      marginRight: '10px',
                      borderRadius: '8px',
                    },
                  }}
                  uploadOptions={{
                    style: {
                      fontSize: '1rem',
                      padding: '10px 20px',
                      marginRight: '10px',
                      borderRadius: '8px',
                    },
                  }}
                  cancelOptions={{
                    style: {
                      fontSize: '1rem',
                      padding: '10px 20px',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '8px', fontSize: '1rem' }}>
                  {error}
                </Alert>
              )}

              {/* Progress Bar */}
              {uploading && (
                <Box sx={{ mb: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{ mb: 2, borderRadius: '5px' }}
                  />
                  <Typography align="center">Uploading... {uploadProgress}%</Typography>
                </Box>
              )}

              {/* Success and Download Button */}
              {fileUploaded && !uploading && (
                <>
                  <Alert severity="success" sx={{ mb: 2, borderRadius: '8px', textAlign: 'center' }}>
                    File processed successfully.
                  </Alert>
                  <Button
                    onClick={() => {
                      if (fileBlob) {
                        const url = window.URL.createObjectURL(fileBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'credit_results.xlsx';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      }
                    }}
                    variant="contained"
                    color="primary"
                    sx={{
                      display: 'block',
                      mx: 'auto',
                      mt: 2,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      padding: '10px 20px',
                    }}
                  >
                    Download Processed File
                  </Button>
                </>
              )}

<Typography
  variant="body2"
  color="textSecondary"
  align="center"
  sx={{ mt: 5 }} // Ajustez la valeur pour déplacer plus ou moins
>
  Make sure the uploaded file meets the column requirements.
</Typography>

            </CardContent>
          </Paper>
        </Grid>
        {/* Orange Band at the Bottom */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55px', backgroundColor: '#dc6900' }} />
      </Grid>
    </PageContainer>
  );
};

export default Shadows;
