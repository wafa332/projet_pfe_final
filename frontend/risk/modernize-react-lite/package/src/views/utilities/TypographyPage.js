import React, { useState } from 'react';
import { Typography, Grid, CardContent, Box, Button, Alert, Paper, LinearProgress } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { FileUpload } from 'primereact/fileupload'; // Ensure you have installed PrimeReact
import $ from 'jquery';

const TypographyPage = () => {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileBlob, setFileBlob] = useState(null); // To store the processed file

  const handleFileUpload = (e) => {
    setError(null);
    setUploading(true);
    setUploadProgress(0);
    setFileUploaded(false);
    setFileBlob(null);
  
    const file = e.files[0];
  
    // Validate file format
    if (!file || !(file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setError('Invalid file format. Please upload a .csv, .xls, or .xlsx file.');
      setUploading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://127.0.0.1:8000/risque_operationnel/upload/', true);
  
    let simulatedProcessingProgress = 0; // Simulated backend processing progress
    let processingInterval;
  
    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const uploadProgress = Math.round((event.loaded / event.total) * 50); // Upload progress is 50%
        setUploadProgress(uploadProgress);
      }
    };
  
    // Once upload completes
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        setFileBlob(blob);
  
        // Simulate backend processing progress
        processingInterval = setInterval(() => {
          simulatedProcessingProgress += 5;
          setUploadProgress(50 + simulatedProcessingProgress); // Backend processing adds 50%
          if (simulatedProcessingProgress >= 50) {
            clearInterval(processingInterval);
            setFileUploaded(true);
            setUploading(false);
            setUploadProgress(100); // Finalize progress bar at 100%
          }
        }, 200); // Increment backend progress every 200ms
      } else {
        setError('Failed to process the file.');
        setUploading(false);
      }
    };
  
    // Error handling
    xhr.onerror = () => {
      setError('An error occurred while uploading the file.');
      setUploading(false);
    };
  
    // Set response type to blob
    xhr.responseType = 'blob';
  
    // Start the file upload
    xhr.send(formData);
  };
  
  
  
  
  

  return (
    <PageContainer title="Operational Risk" description="Upload a file for risk calculation">
      <Grid 
        container 
        spacing={3} 
        justifyContent="center" 
        alignItems="center" 
        sx={{backgroundColor: 'white',flexDirection:'row', display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Change 1: Apply background color directly here
      >
        <Grid 
        container 
        spacing={3} 
        justifyContent="center" 
        alignItems="center" 
        sx={{ flexGrow: 1 }} // Change 2: Flex-grow to allow for centering without extra scrolling
      >
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
                Operational Risk Analysis
              </Typography>
              <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
                Please upload your file for operational risk calculation. The file should be in .csv, .xls, or .xlsx format.
              </Typography>

              {/* File Upload Component */}
              <Box my={3}>
                <FileUpload
                  name="demo[]"
                  url={'/api/upload'}
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
                      borderRadius: '8px' 
                    } 
                  }} 
                  uploadOptions={{ 
                    style: { 
                      fontSize: '1rem', 
                      padding: '10px 20px', 
                      marginRight: '10px', 
                      borderRadius: '8px' 
                    } 
                  }} 
                  cancelOptions={{ 
                    style: { 
                      fontSize: '1rem', 
                      padding: '10px 20px', 
                      borderRadius: '8px' 
                    } 
                  }} 
                />
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '8px', fontSize: '1rem' }}>
                  {error}
                </Alert>
              )}

              {/* Loading Indicator and Progress Bar */}
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


              {/* Success Message and Download Link */}
              {fileUploaded && !uploading && (
                <>
                  <Alert 
                    severity="success" 
                    sx={{ mb: 1, borderRadius: '8px', fontSize: '1rem', textAlign: 'center' }}
                  >
                    File processed successfully.
                  </Alert>
                  <Button
  onClick={() => {
    if (fileBlob) {
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'operationnel_results.xlsx'; // File name
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }}
  variant="contained"
  color="primary"
  sx={{ display: 'block', mx: 'auto', mt: 2, borderRadius: '8px' }}
>
  Download Processed File
</Button>

                </>
              )}

              {/* Instructions */}
              <Typography
  variant="body2"
  color="textSecondary"
  align="center"
  sx={{ mt: 6 }} // Ajustez la valeur pour déplacer plus ou moins
>
  Make sure the uploaded file meets the column requirements.
</Typography>

            </CardContent>
          </Paper>
        </Grid>
        <div className="footer-band"></div>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55px', backgroundColor: '#dc6900' }} /> 
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
