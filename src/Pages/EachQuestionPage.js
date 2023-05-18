import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Avatar,
  Divider,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import BotAvatar from "../images/bot-avatar.png";
import LoadingImage from "../images/loading-gif.gif";
import axios from "axios";
import { useLocation } from "react-router";
import { base_url } from "../utils/base_url";
import QuestionLoader from "../utils/QuestionLoader";
import { useSelector, useDispatch } from "react-redux";
import { triggerAnswerReload } from "../redux/Extras/extraActions";
import Footer from "../components/Footer";


let arr = [
  {
    answer: "I'm good",
    postedBy: "name",
    time: "2 days ago",
    likes: 32,
  },
  {
    answer: "I'm good",
    postedBy: "name",
    time: "2 days ago",
    likes: 32,
  },
  {
    answer: "I'm good",
    postedBy: "name",
    time: "2 days ago",
    likes: 32,
  },
];

const EachQuestionPage = () => {
  const location = useLocation();
  const [questionData, setQuestionData] = useState({
    question:"",
    ans_count:0,
    category:"",
    gpt_answer:"",
    likes:0,
    postedBy:{
      firstName:""
    },
    answers:[{
      answer:"",
      postedBy:{
        firstName:""
      },
      likes:"",
      timestamp:""
    }]
  });
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [answerHelperText, setAnswerHelperText] = useState("");
  const [answer, setAnswer] = useState("");
  const user = useSelector((state) => state.user.user);
  const answerTrigger = useSelector((state)=>state.extras.triggerAnswer)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoader(true);
    fetchQuestion();
  }, [answerTrigger]);

  const fetchQuestion = async () => {
    await axios
      .get(`${base_url}/api/v1/questions/${location.state}`)
      .then((response) => {
        setQuestionData(response.data.question);
        setLoader(false);
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === "") {
      setAnswerHelperText("Answer cannot be empty");
    } else {
      setAnswerHelperText("");
      setModalLoader(true);
      axios
        .patch(`${base_url}/api/v1/questions/answers/${questionData._id}`,{
          answer:answer,
          postedBy:user._id
        })
        .then((response) => {
          setAnswer("")
          setModalLoader(false);
          setIsModalOpen(false);
          dispatch(triggerAnswerReload())
        })
        .catch((err) => {
          console.log(err);
          setModalLoader(false);
        });
    }
  };
  return (
    <Box
      bgcolor={"#ecf0f1"}
      sx={{
        bottom: "0",
        top: "0",
        position: "absolute",
        width: "100vw",
        height: "fit-content"
      }}
    >
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        {modalLoader ? (
          <Box
            sx={{
              width: "50vw",
              height: "60vh",
              backgroundColor: "white",
              borderRadius: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box width={"150px"} height={"150px"}>
              <img src={LoadingImage} alt="loading-data" />
            </Box>
          </Box>
        ) : (
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
              width: "50vw",
              height: "60vh",
              backgroundColor: "white",
              borderRadius: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              padding: "20px",
            }}
          >
            <TextField
              multiline={true}
              rows={10}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              sx={{ marginTop: "10px" }}
              placeholder="Type your Answer..."
              variant="outlined"
              color="secondary"
              fullWidth
              helperText={answerHelperText}
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                position: "absolute",
                right: "0",
                bottom: "0",
                marginRight: "20px",
                marginBottom: "40px",
              }}
            >
              Add Answer
            </Button>
          </Box>
        )}
      </Modal>
      <Navbar />
      <Box
        sx={{
          marginLeft: "25vw",
          marginTop: "7vh",
          height: "80vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          width: "fit-content",
          marginBottom:'40px'
        }}
      >
        {loader ? (
          <QuestionLoader />
        ) : (
          <>
            <Box
              sx={{
                width: "50vw",
                height: "fit-content",
                backgroundColor: "white",
                gap: "10px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    marginRight: "5px",
                    marginTop: "10px",
                    width: "3vw",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "#9c27b0",
                    }}
                  >
                    h
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "550",
                      marginBottom: "10px",
                    }}
                    variant={"h5"}
                  >
                    {questionData.question}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  width: "100%",
                  height: "7vh",
                  backgroundColor: "white",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginRight: "30px",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <ThumbUpOffAltIcon
                      sx={{
                        cursor: "pointer",
                        color: "#9c27b0",
                      }}
                    />
                    <Typography
                      sx={{
                        marginLeft: "10px",
                        fontSize: "12px",
                        color: "#9c27b0",
                      }}
                    >
                      {questionData.likes}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <AccessTimeFilledIcon />
                    <Typography
                      sx={{
                        marginLeft: "10px",
                        fontSize: "12px",
                      }}
                    >
                      {questionData.createdAt}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Answer this question
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "50vw",
                height: "fit-content",
                backgroundColor: "white",
                gap: "10px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    marginRight: "5px",
                    marginTop: "10px",
                    width: "3vw",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "#9c27b0",
                    }}
                    src={BotAvatar}
                    alt="bot-avatar"
                  />
                </Box>
                <Box
                  sx={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "550",
                      marginBottom: "10px",
                    }}
                    variant={"h5"}
                  >
                    Answer by AI
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      marginBottom: "10px",
                    }}
                    variant={"h6"}
                  >
                    {questionData.gpt_answer}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "550",
                marginBottom: "10px",
              }}
            >
              {questionData.answers.length} community {questionData.answers.length<2?"answer":"answers"}
            </Typography>
            {questionData.answers.map((each) => {
              return (
                <Box
                  sx={{
                    width: "50vw",
                    height: "fit-content",
                    backgroundColor: "white",
                    gap: "10px",
                    padding: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        marginRight: "5px",
                        marginTop: "10px",
                        width: "3vw",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "#9c27b0",
                        }}
                      >
                        {each.postedBy.firstName.slice(0, 1)}
                      </Avatar>
                    </Box>
                    <Box
                      sx={{
                        marginLeft: "20px",
                        marginTop: "10px",
                        height: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "550",
                          marginBottom: "10px",
                        }}
                        variant={"h5"}
                      >
                        {each.postedBy.firstName} says...
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          marginBottom: "10px",
                        }}
                        variant={"h6"}
                      >
                        {each.answer}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      width: "100%",
                      height: "7vh",
                      backgroundColor: "white",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        marginLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          marginRight: "30px",
                          height: "100%",
                          alignItems: "center",
                        }}
                      >
                        <ThumbUpOffAltIcon
                          sx={{
                            cursor: "pointer",
                            color: "#9c27b0",
                          }}
                        />
                        <Typography
                          sx={{
                            marginLeft: "10px",
                            fontSize: "12px",
                            color: "#9c27b0",
                          }}
                        >
                          {each.likes}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <AccessTimeFilledIcon />
                      <Typography
                        sx={{
                          marginLeft: "10px",
                          fontSize: "12px",
                        }}
                      >
                        {each.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </Box>
      <Footer/>
    </Box>
  );
};

export default EachQuestionPage;
