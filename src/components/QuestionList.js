import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../redux/Questions/questionsActions';
import QuestionLoader from '../utils/questionLoader';
import axios from 'axios';
import { base_url } from '../utils/base_url';

let arr = [
    {
      question: "how are you? what is you name? how many fishes? how do you define dgsdgsd dsggsdgsdgs dsgsdgsdgsd sdgsdgsdgsdg",
      gpt_answer: "I'm good sfabfasfb asjfbkafs kjabsfabfkba jaksbfkajsbfkabf jkasjbfkajsbfkajbf jasbfkjabkfajb",
      name:"Hema",
      id: 1,
      ans_count: '4',
      likes: 56,
      timeStamp: '4 hours',
      category: 'technology'
    },
    {
      question: "how are you?",
      gpt_answer: "I'm good",
      id: 2,
      name: 'Bharat',
      ans_count: '5',
      likes: 56,
      timeStamp: '1 day',
      category: 'business'
    },
  ];
const QuestionList = () => {
    const questionArray = useSelector(state => state.questions)
    const dispatch = useDispatch()
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        axios.get(``)
        .then((response)=>{
            dispatch(fetchQuestions(response.data))
            setLoader(false)
        })
        .catch()
    },[])

  return (
    <>
      {loader?<QuestionLoader/> : questionArray.map((each) => {
          return (
            <Box key={each.id} sx={{
                width:'50vw',
                height:'150px',
                backgroundColor:'white',
                display:'flex',
                gap:'10px',
                padding:'10px',
                marginBottom:'20px',
            }}>
                <Box sx={{
                    marginRight:'5px',
                    width:'3vw',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Avatar sx={{
                        cursor:'pointer'
                    }}>{each.name.slice(0,1)}</Avatar>
                </Box>
                <Divider orientation='vertical'/>
                <Box sx={{
                    marginLeft:'20px',
                    marginTop:'10px',
                    width:'35vw',
                    height:'100%'
                }}>
                    <Typography sx={{
                        fontWeight:'500',
                        marginBottom:'10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        cursor:'pointer',
                        '&:hover':{
                            color:'#9c27b0'
                        }
                    }} variant={'h5'}>{each.question}</Typography>
                    <Typography sx={{
                        whiteSpace:'nowrap',
                        textOverflow:'ellipsis',
                        overflow:'hidden',
                        color:'#aeacbb'
                    }} variant={'h6'}>{each.gpt_answer}</Typography>
                </Box>
                <Divider orientation='vertical'/>
                <Box sx={{
                    width:'5vw',
                    height:'100%',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
                    justifyContent:"center",
                    gap:'5px'
                }}>
                    <Box sx={{
                        display:'flex'
                    }}>
                        <QuestionAnswerIcon/>
                        <Typography gutterBottom sx={{
                            marginLeft:'10px',
                            fontSize:'12px'
                        }}>{each.ans_count}</Typography>
                    </Box>
                    <Box sx={{
                        display:'flex'
                    }}>
                        <FavoriteIcon/>
                        <Typography gutterBottom sx={{
                            marginLeft:'10px',
                            fontSize:'12px'
                        }}>{each.likes}</Typography>
                    </Box>
                    <Box sx={{
                        display:'flex'
                    }}>
                        <AccessTimeFilledIcon/>
                        <Typography gutterBottom sx={{
                            marginLeft:'10px',
                            fontSize:'12px'
                        }}>{each.timeStamp}</Typography>
                    </Box>
                </Box>
            </Box>
          );
        })}
    </>
  )
}

export default QuestionList
