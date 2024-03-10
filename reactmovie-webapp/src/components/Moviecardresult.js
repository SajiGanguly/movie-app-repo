import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { RiAddCircleFill } from "react-icons/ri";

const MovieResultCard = ({keyId,title, imageUrl, description,handleSelectedMovies }) => {
 
    const posterStyle = {
    width: '250px',   
    height: '100%',
    objectFit: 'cover',
    
  };
  
  const typoStyle = {
    width: '100px',  
    overflow: 'hidden',
    verticalAlign: 'top',
  }
 
  const cardStyle = {
    marginTop: "30px",
    width: '250px',
    marginBottom: '10px',
    marginLeft: '60px',
    backgroundColor: '#e6e6fa',
    display: 'inline-block',
    marginRight: '10px',
    verticalAlign: 'top', 

  };

  const titleStyle = {
    fontSize: '1.2rem',      // Adjust the font size as needed
    lineHeight: '1.4',       // Adjust the line height to control spacing between lines
    // overflow: 'hidden',      // Prevent overflow if the title exceeds the available space
    whiteSpace: 'nowrap',    // Prevent wrapping of the title
    textOverflow: 'ellipsis' // Show ellipsis (...) if the title exceeds the available space
  };

  return (
    <Card sx={cardStyle}>
      <img src={imageUrl} alt={title} style={posterStyle} />
      <CardContent>
      
        <Typography variant="h5" component="div" style={{ ...typoStyle, ...titleStyle }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={typoStyle}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={typoStyle}>
         Movie ID: {keyId}
        </Typography >
        <br></br>
        <Typography style={typoStyle}>
         <RiAddCircleFill onClick={() => handleSelectedMovies(keyId)}/>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieResultCard;
