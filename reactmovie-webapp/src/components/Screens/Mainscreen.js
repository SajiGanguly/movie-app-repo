import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaShoppingCart } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import {
  Button,
  ClickAwayListener,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";
import yourImage from "../../assets/yourImage.png";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MovieResultCard from "../Moviecardresult";
import { FaBoxOpen } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import MySelectedMoviesPage from "../Mymovies";
import MuiAlert from "@mui/material/Alert";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddNewMovieModal from "./Addmoviemodal";


const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const buttonContainer = {
  display: "flex",
  gap: "10px", // Adjust the value to set the desired gap between buttons
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const buttonStyle = {
  backgroundColor: "#9370DB",
};

const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row": {
            backgroundColor: "#f3e5f5",
            "&:hover": {
              backgroundColor: "#C3B1E1",
            },
          },
          "& .MuiDataGrid-colHeader": {
            backgroundColor: "#880085",
          },
        },
      },
    },
  },
});
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [movies, setMovies] = useState([]);

  const [showCard, setShowCard] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [tooltipData, setTooltipData] = useState([]);
  const[tooltipContent,setTooltipContent]=useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [updatedMovie, setUpdatedMovie] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [responseMovies, setResponseMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [addMovieModalOpen, setAddMovieModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [showSelectedMovies, setShowSelectedMovies] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const navigate = useNavigate();

  // const handleSearch = async () =>{
  //   try{
  //     const response = await axios.get(`http://localhost:5000/films`)
  //     console.log('API Response:', response.data);
  //     if(response.data.Search){
  //     setMovies(response.data.Search)
  //     setMovieDetails(response.data.Search[0]);
  //   } else {
  //     setMovies([]);
  //     setMovieDetails(null);
  //   }
  //   } catch(error) {
  //     console.error('Error fetching movie details:', error)
  //   }
  // }

  // useEffect(() => {
  //   if (searchTerm) {
  //     handleSearch();
  //   }
  // }, [searchTerm]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/films");
      console.log("API Response:", response);

      if (response.data && response.data.length > 0) {
        setResponseMovies(response.data);
        setMovieDetails(response.data[0]); // Update with the first movie, adjust as needed
      } else {
        setResponseMovies([]);
        setMovieDetails(null);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      axios
        .post("http://localhost:5000/search", { title: searchTerm })
        .then((response) => {
          console.log("Response from server:", response.data);
          setSearchResults(response.data.movies || []);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("Search term is empty.");
    }
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMovies(searchResults);
    } else {
      setMovies(responseMovies);
    }
  }, [searchResults, responseMovies]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies(); // Load films when the component mounts
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/films/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // const handleClickShowCard = async (id) => {
  //   try {

  //     const response = await axios.get(`http://localhost:5000/fetchCardDetails/${id}`);

  //     if(response.status === 200){
  //       console.log("API is working fine!");
  //       // const showCardDetails = response.data;
  //       // console.log(`Showing Details of the Card for ${id}:`,showCardDetails);

  //     //   setShowCard(showCardDetails);
  //     //   console.log(`Showing Card details for ${id}:`,showCardDetails)
  //     // }else {
  //       console.error('Unexpected response status:', response.status);
  //     }
  //   } catch(error){
  //     console.error('Error updating movie:', error);
  //   }
  // }

  // const handleOnRowClick = ()=>{
  //   setShowCard=true;
  //   handleClickShowCard();
  // }

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/updatemodaldata",
        updatedMovie
      );
      if (response.status === 200) {
        console.log("API update Successful");

        setUpdatedMovie(updatedMovie);
        console.log(`Updated Movie with ID ${id}:`, updatedMovie);

        setEditRowsModel((prevEditRowsModel) => ({
          ...prevEditRowsModel,
          [id]: false,
        }));
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleEdit = (id) => {
    setEditRowsModel((prevEditRowsModel) => ({
      ...prevEditRowsModel,
      [id]: true,
    }));
  };

  const handleCancelEdit = (id) => {
    setEditRowsModel((prevEditRowsModel) => ({
      ...prevEditRowsModel,
      [id]: false,
    }));
  };

  const handleEditCellValue = (id, field, value) => {
    // Implement logic to handle changes in the edited cell
    console.log(
      `Editing cell value for movie id ${id}, field ${field}, new value: ${value}`
    );
    const editedRow = {
      id,
      field,
      value,
    };
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    { film_id: 1, field: "id", headerName: "ID", width: 40, editable: true },
    {
      film_id: 2,
      field: "film_id",
      headerName: "Film ID",
      width: 130,
      editable: true,
    },
    {
      film_id: 3,
      field: "title",
      headerName: "Title",
      width: 200,
      field: "title",
      editable: true,
    },
    {
      film_id: 4,
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      film_id: 5,
      field: "release_year",
      headerName: "Release Year",
      width: 150,
      editable: true,
    },
    {
      film_id: 6,
      field: "language_id",
      headerName: "Language ID",
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={buttonContainer}>
          {editRowsModel[params.id] ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSave(params.id)}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelEdit(params.id)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(params.id)}
            >
              Edit
            </Button>
          )}
        </div>
      ),
    },
  ];

 
  const fetchDataFromApi = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/fetchCardDetails/${id}`);
        
        if (response.status === 200) {
        
        console.log('Axios Response:', response);
        setTooltipData(response.data);
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log("Error in fetching data!!:", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  
  // const handleRowClickOn = async (params) => {
  //   const id = params.row.id;
  //   console.log('Cell clicked. Row data:', params.row);
  //   fetchDataFromApi(id);
  //   console.log('Id selected is:',params.id);
  // };

  const handleRowClick = async (params) => {
    const movieId = params.row.film_id;  // Assuming 'film_id' is the primary key
    console.log('Row clicked. Fetching data for ID:', movieId);
    fetchDataFromApi(movieId);
  };

  // const handleRowClick = async (params) => {
  //   const filmId = params.row.film_id;
  //   const rowId = params.row.id;  
  
  //   console.log('Row clicked. Fetching data for Film ID:', filmId, 'and Row ID:', rowId);
  //   fetchDataFromApi(filmId, rowId);
  // };
  

  const handleRowClickOut = () => {
    setTooltipContent(null);
  };

  const handleSelectedMovies = (keyId) => {
    const selectedMovie = movies.find((movie) => movie.imdbID === keyId);

    if (selectedMovie) {
      setSelectedMovies((prevSelectedMovies) => [
        ...prevSelectedMovies,
        { ...selectedMovie },
      ]);
      setSelectedMovieTitle(selectedMovie.Title);
      setIsSnackbarOpen(true);
    }
    console.log("Selected Movies:", selectedMovies);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSavedMovieClick = () => {
    console.log(selectedMovies);

    navigate("/mymovies", { state: { selectedMovies } });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowSelectedMovies(false);
  };

  const handleAddMovieModalOpen = () => {
    setAddMovieModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "20px",
        marginTop: "60px",
        // backgroundColor: "#d8bfd8",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: "#966fd6",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={yourImage}
            alt="Your Image"
            style={{ width: "130px", height: "60px" }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon onClick={handleSearch} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Enter movie title"
                inputProps={{ "aria-label": "search" }}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </Search>
          </div>
          <Button variant="primary" color="inherit" sx={{ marginLeft: "auto" }}>
            <FaSignOutAlt />
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <List>
              {["Saved Movies", "Customer Care"].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "black",
                      }}
                    >
                      {index % 2 === 0 ? (
                        <FaBoxOpen onClick={handleSavedMovieClick} />
                      ) : (
                        <RiCustomerService2Fill />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* {showSelectedMovies && (
  <MySelectedMoviesPage selectedMovies ={selectedMovies}/>
)} */}
        </Drawer>
        {/* <div style={{
      width: "100%",
      marginLeft: "50%",
     
    }}>
        <h1 >FILMS</h1>
        </div>
       */}
        <div
          style={{
            width: "70%",
            marginLeft: "100px",
            marginTop: "30px",
          }}
        >
          <div>
            <Button style={buttonStyle} onClick={handleAddMovieModalOpen}>
              <AddNewMovieModal />
            </Button>
          </div>
          <br></br>
          <ThemeProvider theme={purpleTheme}>
            <div style={{ width: "120%", height: 440 }}>
              
              <DataGrid
                rows={movies}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row.film_id}
                editRowsModel={editRowsModel}
                onEditCellChange={(params) =>
                  handleEditCellValue(
                    params.id,
                    params.field,
                    params.props.value
                  )
                }
                onCellClick={handleRowClick}
              />
              {tooltipData && (
                <Tooltip title={`Data from API: ${JSON.stringify(tooltipData)}`}>
                  <div>
                    <tooltipContent/>
                  </div>

                </Tooltip>
              )}
              {/* <ClickAwayListener onClickAway={handleHoverOut}>
                <div>
                  {movies.map((movie) => (
                    <Tooltip
                      key={movie.film_id}
                      onClose={handleHoverOut}
                      title={hoveredRow === movie.film_id ? tooltipData : ""}
                    >
                      <div
                        onMouseEnter={() => handleHoverIn(movie.film_id)}
                        onMouseLeave={handleHoverOut}
                        style={{ cursor: "pointer" }}
                      ></div>
                    </Tooltip>
                  ))}
                </div>
              </ClickAwayListener> */}
            </div>
          </ThemeProvider>
        </div>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={3}
          variant="filled"
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
        >
          {`Successfully added "${selectedMovieTitle}" to cart`}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
