import React, { useRef } from 'react';
import MovieResultCard from './Moviecardresult';
import {  useLocation } from 'react-router-dom';
import { AppBar,Button } from '@mui/material';
import emailjs from 'emailjs-com';


const MySelectedMoviesPage = () => {

  const location = useLocation();
  const { selectedMovies } = location.state || {};
  // const [open, setOpen] = useState(false);
  // const handleBuyClick = () => {
  //   setOpen(true);
    
  // };
  const templateParams = {
    moviesData: selectedMovies.map((movie) => ({
        keyId: movie.imdbID,
        title: movie.Title,
        imageUrl: movie.Poster,
        description: movie.Year
    }))
};
 // const form = useRef();
  
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   console.log(templateParams);

  //   emailjs.send('gmail', 'My_user290412345', templateParams, 'rmJKMDRdpaN-whrvN')
  //     .then((result) => {
  //         console.log(result.text);
  //     }, (error) => {
  //         console.log(error.text);
  //     });
     
  // };

  const sendEmail = async () => {
    const templateParams = {
      to_email: 'recipient@example.com',
      from_name: 'Your Name',
      message: 'Hello, this is a test email.'
      // Add any other template parameters as needed
    };
  
    
    try {
      const response = await emailjs.send(
        'My_user290412345',  // Replace with your service ID
        'template_smx4xgo', // Replace with your template ID
        templateParams,
        'rmJKMDRdpaN-whrvN'     // Replace with your user ID
      );
  
      console.log('Email sent:', response);
    } catch (error) {
      console.error('Email error:', error);
    }
  };
  

  if (!selectedMovies || selectedMovies.length === 0) {
    return <p>No selected movies to display.</p>;
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    marginBottom: '50px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#0056b3'
    }
  };


  const appBarStyle = {
    backgroundColor: '#915F6D',  // Purple color
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
    position: 'fixed',           // Changed from 'static' to 'fixed'
    top: '0',                    // To position it at the top
    left: '0',                   // To position it at the left
    right: '0',                  // To span the full width
    zIndex: '1000'               // To ensure it stays above other elements
  };

  const movieStyle ={
    marginTop: '80px',
  }

 
return (
  <>
       <div style={{ textAlign: 'center', maxWidth: 'auto', margin: 'auto' }}>
      <AppBar style={appBarStyle}>
        <h1>Movie Store</h1>
      </AppBar>

      <div style={movieStyle}>
        {selectedMovies.map((movie) => (
          <MovieResultCard
            keyId={movie.imdbID}
            title={movie.Title}
            imageUrl={movie.Poster}
            description={movie.Year}
          />
        ))}
      </div>
      <form>
    <Button onClick={sendEmail} variant="contained" color="primary" style={{ marginTop: '20px', marginBottom: '50px' }}>
        Buy Movies
    </Button>
      </form>
  </div>
  </>
  );
};



export default MySelectedMoviesPage;
 
