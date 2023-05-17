import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../redux/Questions/questionsActions';
import QuestionLoader from '../utils/QuestionLoader';
import axios from 'axios';
import { base_url } from '../utils/base_url';

const QuestionList = () => {
    const questionArray = useSelector(state => state.questions.questionArray)
    const questionReloadTrigger = useSelector(state => state.extras.trigger)
    const dispatch = useDispatch()
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        axios.get(`${base_url}/api/v1/questions?skip=${1}&limit=10`)
        .then((response)=>{
            dispatch(fetchQuestions(response.data.questions))
            setLoader(false)
        }).catch(e=>{
            console.log(e)
        })
    },[questionReloadTrigger])

  return (
    <>
      {loader?<QuestionLoader/> : questionArray.map((each) => {
          return (
            <Box key={each._id} sx={{
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
                    }}>{each.postedBy.firstName.slice(0,1)}</Avatar>
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
                            color:'#9c27b0',
                            textDecoration:'underline'
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
                        }}>{}</Typography>
                    </Box>
                </Box>
            </Box>
          );
        })}
    </>
  )
}

export default QuestionList
