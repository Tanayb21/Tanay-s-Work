import React, { useState } from "react";
import {Dialog,IconButton,Typography,InputBase,Box,Button,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { uploadFile } from "../../../services/api.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const dialogstyle = {
  height: "70%",
  width: "50%",
  margin: "20px",
  marginLeft: "400px",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
  zIndex: 500,
};

const StyledBox = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledSelectContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 12px 5px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
`;

const ConversionDialog = ({open,onClose,setFile,setConversionDialogOpen,setValue,setImage, value, file}) => {

  const [dialogSelectedFileName, setDialogSelectedFileName] = useState("");
  const [selectedFileFormat, setSelectedFileFormat] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  


  const convertJpgToPng = async (jpgFile) => {
    // Create a Blob from the JPG file
    const blob = new Blob([jpgFile], { type: "image/jpeg" });

    // Read the Blob as a data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Create an image element
        const img = new Image();
        img.onload = () => {
          // Create a canvas element
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0);

          // Convert canvas to a PNG Blob
          canvas.toBlob((pngBlob) => {
            const newFileName = dialogSelectedFileName.replace(/\.[^.]+$/, ".png");
            setNewFileName(newFileName); // Update the newFileName state
            resolve(pngBlob);
          }, "image/png");
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleConversion = async () => {
    if (dialogSelectedFileName && selectedFileFormat === "Png") {
      if (selectedFile) {
        try {
          // Call your function to convert JPG to PNG
          const pngBlob = await convertJpgToPng(selectedFile);
          // Generate a new file name with the new format
          const newFileName = dialogSelectedFileName.replace(/\.[^.]+$/, ".png");
          setNewFileName(newFileName)
          console.log("Newly converted file name:", newFileName);
          
  
          // Create FormData and append the converted file
          const formData = new FormData();
          formData.append("file", pngBlob);
          formData.append("name", newFileName);
          // Upload the FormData to the server
          const response = await uploadFile(formData);
          console.log("File uploaded successfully:", response);
          setImage(response.data);
          setFile(pngBlob);
          

  
          // Now, you can send the uploaded file to the chat
          // You'll need to implement this part based on your chat implementation
          // You can call a function or API to send the file to the chat
          // For example: sendFileToChat(response); // Replace with your actual chat function
        } catch (error) {
          console.error("Error while converting/uploading file:", error);
        }
      }
    }
  };
  const handleSend =()=>{
    if(file){
      setValue(newFileName);
      setConversionDialogOpen(false);
    }
    else{
      alert("value and file is null");
    }
  }
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDialogSelectedFileName(file.name);
      setSelectedFile(file); // Update selectedFile state
    } else {
      setDialogSelectedFileName("");
    }
  };

//handles the file displayed
  const handleFormatChange = (event) => {
    setSelectedFileFormat(event.target.value);
  };

  

  return (
    <Dialog
      open={open}
      PaperProps={{ sx: dialogstyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 1000 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" align="center" mt={2}>
        Convert Your Files Here!
      </Typography>
      <StyledBox mt={3}>
        <InputBase
          placeholder="Choose Your File"
          value={dialogSelectedFileName}
          readOnly
          sx={{
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "5px 10px",
            width: "50%",
          }}
        />

        <label htmlFor="fileInput2">
          <input
            type="file"
            id="fileInput2"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <Typography variant="body2" color="textSecondary">
            Upload a file...
          </Typography>
        </label>

        <StyledSelectContainer>
          <StyledSelect
            value={selectedFileFormat}
            onChange={handleFormatChange}
          >
            <option value="" disabled>
              Select format
            </option>
            <option value="Png">PNG</option>
            <option value="Jpg">JPG</option>
            <option value="Pdf">PDF</option>
          </StyledSelect>
        </StyledSelectContainer>

        <InputBase
          id="ConvertedFileName"
          placeholder="Converted File Name"
          readOnly
          sx={{
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "5px 10px",
            width: "50%",
          }}
          value={newFileName}
        />

        <Box
          mt={2}
          display="flex"
          justifyContent="space-evenly"
          width="50%"
          marginTop="40px"
        >
           <Button variant="contained" color="primary" onClick={handleConversion}>
            Convert
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </StyledBox>
    </Dialog>
  );
};

export default ConversionDialog;
