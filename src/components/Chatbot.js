import { Box, Typography } from '@mui/material'
import React from 'react'
import ChatBot from 'react-simple-chatbot'

const Chatbot = () => {
    
    let steps = [
        {
            id:'1',
            message: "Welcome to Q&AI! I'm your FrIeNdLy NeIgHbOuRhOoD AI!",
            trigger:'2'
        },
        {
            id:'2',
            message: "Your question please...",
            trigger:'search'
        },
        {
            id:'search',
            user:true,
            trigger:'3'
        },
        {
            id:'3',
            component:<AIResult/>,
            waitAction: true,
            trigger:'2'

        }
    ]
  return (
    <>
      <ChatBot steps={steps} width='95%' height='650px' />
    </>
  )
}

const AIResult = ({steps,triggerNextStep})=>(
            <Box>
                <Typography>{steps.search.value}</Typography>
            </Box>
        )

export default Chatbot
