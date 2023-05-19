import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { base_url } from "../utils/base_url";
import LoadingImage from "../images/loading-gif.gif";
import BotAvatar from "../images/bot-avatar.png";

const Chatbot = () => {
  let steps = [
    {
      id: "1",
      message: "Hello! My name is Chunnu. Welcome to Q&AI!",
      trigger: "2",
    },
    {
      id: "2",
      message: "I'm your friendly neighbourhood AI! <3",
      trigger: "3",
    },
    {
      id: "3",
      message: "Your question please...",
      trigger: "search",
    },
    {
      id: "search",
      user: true,
      trigger: "4",
    },
    {
      id: "4",
      component: <AIResult />,
      asMessage:true,
      waitAction: true,
      trigger: "5",
    },
    {
        id:'5',
        message: 'anything else?',
        trigger:'search'
    }
  ];
  return (
    <>
      <ChatBot
        steps={steps}
        width="95%"
        height="650px"
        userDelay={0}
        customDelay={0}
        botAvatar={BotAvatar}
      />
    </>
  );
};

const AIResult = ({ steps, triggerNextStep }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`${base_url}/api/v1/chatbot/${steps.search.value}`)
        .then((response) => {
            // console.log(response.data.message)
          setLoading(false);
          setAnswer(response.data.message);
          triggerNextStep();
        })
        .catch((error) => {
          setLoading(false);
          setAnswer("Server issue. Try again.");
          console.error(error);
          triggerNextStep();
        });
    } catch (e) {
      console.log(e.message);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Box width={"150px"} height={"150px"}>
          <img src={LoadingImage} alt="loading-data" />
        </Box>
      ) : (
        <>
          <Typography>{answer}</Typography>
        </>
      )}
    </>
  );
};

export default Chatbot;
