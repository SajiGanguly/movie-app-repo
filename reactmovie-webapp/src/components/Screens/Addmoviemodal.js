import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Button, Modal, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';


   const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
   };

  const addButtonStyle ={
    color:'#FFF',
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid  #DDA0DD',
    boxShadow: 24,
    p: 4,
  };

  const modalData ={
    Title:"",
    Description:"",
    ReleaseYear:"",
    LanguageID:""
  }

  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'release_year', headerName: 'Release Year', width: 150 },
    { field: 'language_id', headerName: 'Language ID', width: 120 },
  ];

const AddNewMovieModal = () => {
    const[open,setOpen]=useState(false);
    const [formData, setFormData] = useState({
      id: '', // Make sure to set the correct ID when you load the data
      updatedTitle: '',
      updatedDescription: '',
      updatedReleaseYear: '',
      updatedLanguageId: '',
    })
    const [snackbarOpen,setSnackbarOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [updateData,setUpdateData] =useState(false);


    const handleClose = () => {
        setOpen(false);
        setFormData({});
      };


      const validateForm =()=>{
        const errors ={};

        if(!formData.title){
          errors.title = "Important Fiekd";
        }

        if(!formData.description) {
          errors.description ="Complete this field"
        }
        if(!formData.release_year) {
          errors.release_year ="Dont forget this field"
        }
        if(!formData.language_id) {
          errors.language_id ="Hey dont leave this empty!"
        }
        return errors;
      }
    
      const handleSave = async () => {
        try {
          const errors = validateForm();

          if(Object.keys(errors).length === 0){
          console.log('Form data:', formData);
          console.log('Modal data:', modalData);
          const response = await axios.post('http://localhost:5000/sendmodaldata', formData);
          console.log('Server response:', response);

          handleClose(); 
        }else{
          setSnackbarOpen(true);
          console.error('Validation Errors:', errors);
        }
        } catch (error) {
          console.error('Axios Error:', error);
        }
      };
    
      
      // const handleUpdate = async ()=>{
      //     try {
      //       await axios.put('/updatemodaldata',formData);
      //       console.log('Data updated SUccesssfully!!')
      //     }catch(error){
      //       console.error('Error updataing data:', error);
      //     }
      // }
      
      
  return (
   <>
      <Button style={addButtonStyle} onClick={handleOpen}>Add Movie <AddToPhotosIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalStyle}
      >
       
          <Box sx={style}>
          <Typography>
            <b>Add new data below</b>
          </Typography>


          {columns.map((column) => (
            <TextField
              key={column.field}
              label={column.headerName}
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData[column.field] || ''}
              onChange={(e) => setFormData({ ...formData, [column.field]: e.target.value })}
            />
          ))}

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: 16 }}
          >
            Save
          </Button>
          </Box>
        
      </Modal>
      <Snackbar open={snackbarOpen}  onClose={() => setSnackbarOpen(false)}>
            <MuiAlert elevation={9} variant="filled" onClose={() => setSnackbarOpen(false)} severity='error'>
                 Your credentials arent filled up!
            </MuiAlert>
      </Snackbar>
      </>
  );
};

export default AddNewMovieModal ;
