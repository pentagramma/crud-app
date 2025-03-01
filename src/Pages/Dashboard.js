import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Box, TextField, MenuItem, Typography } from "@mui/material";
import QuestionList from "../components/QuestionList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Footer from "../components/Footer";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetSearch, triggerQuestionReload } from "../redux/Extras/extraActions";
import NoResult from '../images/no-result-found.jpg'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [searchCheck,setSearchCheck] = useState(false)
  const [searchResultCheck,setSearchResultCheck] = useState(false)
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [category,setCategory] = useState("")
  const backPageHandler = () => {
    if (page > 1) {
      setPage((x) => x - 1);
    }
  };
  const nextPageHandler = () => {
    if (page < pageCount) {
      setPage((x) => x + 1);
    }
  };
  const changeCategoryHandler = (e)=>{
    setCategory(e.target.value)
    setPage(1)
  }
  const backHandler = ()=>{
    dispatch(triggerQuestionReload())
    setSearchCheck(false)
    dispatch(resetSearch())
  }
  return (
    <Box
      bgcolor={"#ecf0f1"}
      sx={{
        bottom: "0",
        top: "0",
        position: "absolute",
        width: "100vw",
      }}
    >
      <Navbar page={true} setSearchCheck={setSearchCheck} setSearchResultCheck={setSearchResultCheck}/>

      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          overflowY: "auto",
          minHeight: "100px",
          width: "100vw",
          padding: "25px",
          display: "flex",
        }}
      >
        {searchCheck?
        <Box sx={{
          cursor:'pointer',
          ':hover':{
            color:'#9c27b0'
          },
          fontSize:'20px'
        }}
        onClick={backHandler}
        >
          <ArrowBack/> Back to home 
        </Box>
        :
        <>
        <Box width={"16vw"} bgcolor={"white"}>
          <TextField
            color={"secondary"}
            label="Select hashtag"
            select
            fullWidth
            value={category}
            onChange={changeCategoryHandler}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </TextField>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            width: "10vw",
            height: "8vh",
            position: "absolute",
            marginLeft: "44vw",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            borderRadius: "25px",
            border: "2px solid #9c27b0",
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={backPageHandler}
          />
          <Box
            sx={{
              height: "100%",
              width: "5vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>
              {page} of {pageCount}
            </Typography>
          </Box>
          <ArrowForwardIosIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={nextPageHandler}
          />
        </Box>
        </>}
      </Box>
      <Box
        sx={{
          padding: "20px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          display: "flex",
          flexDirection: "column",
          marginLeft: "25vw",
          height: "70vh",
          width: "fit-content",
          marginBottom:'30px'
        }}
      >
        {searchResultCheck?
        <Box sx={{
          width:'50vw',
          display:'flex',
          justifyContent:'center'
        }}>
          <img style={{width:'300px'}} src={NoResult} alt="No Result found"/>
        </Box>
        :
        <QuestionList page={page} setPageCount={setPageCount} category={category}/>
        }
        </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
