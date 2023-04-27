import React from 'react'
import Navbar from './Navbar'
import { Box, Card, CardContent, Typography } from '@mui/material'
let arr = [{
    q: "how are you?",
    a: "I'm good"
}]
const Dashboard = () => {
  return (
    <>
     <Navbar/>
     <Box sx={{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        gap:'10px',
        marginTop: '20px'
     }}>
     {
        arr.map(each => {
            return (
                <Card sx={{
                    width: '50vw',
                    height: '20vh'
                }}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component={'div'}>
                            {each.q}
                        </Typography>
                        <Typography gutterBottom variant='h5' component={'div'}>
                            {each.a}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })
     }
     </Box>
    </>
  )
}

export default Dashboard
