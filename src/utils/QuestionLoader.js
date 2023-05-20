import React from 'react'
import LoaderComponent from '../images/loader-component-gif.gif'
import { Box } from '@mui/material'

const QuestionLoader = () => {
  return (
    <Box sx={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      width:'50vw',
      height:'70vh'
    }}>
      <Box sx={{
        width:'200px',
        height:'200px'
      }}>
        <img src={LoaderComponent} alt='loading....'/>
      </Box>
    </Box>
  )
}

export default QuestionLoader
