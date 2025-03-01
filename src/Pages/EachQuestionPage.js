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
import { loginActions } from "../redux/Login/loginActions";
import EachAnswer from "../components/EachAnswer";
import Cookies from "js-cookie";
import UserPopover from "../components/UserPopover";

const EachQuestionPage = () => {
  const location = useLocation();
  const [questionData, setQuestionData] = useState({
    question: "",
    ans_count: 0,
    category: "",
    gpt_answer: "",
    likes: [],
    postedBy: {
      firstName: "",
    },
    answers: [
      {
        answer: "",
        postedBy: {
          firstName: "",
        },
        likes: [],
        timestamp: "",
      },
    ],
  });
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [answerHelperText, setAnswerHelperText] = useState("");
  const [answer, setAnswer] = useState("");
  const [checkLike,setCheckLike] = useState(false)
  const [like,setLike] = useState(0)
  const user = useSelector((state) => state.user.user);
  const answerTrigger = useSelector((state) => state.extras.triggerAnswer);
  const dispatch = useDispatch();
  const [numberOfQuestions, setNoq] = useState(0);
  const [numberOfAnswers, setNoa] = useState(0);
  const [popoverLoader, setPopoverLoader] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  

  const userInfloClickHandler = (event) => {
    setPopoverLoader(true);
    fetchQuestionsByUserId();
    fetchAnswersByUserId();
    setAnchorElUser(event.currentTarget);
  };

  const fetchQuestionsByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/user?userId=${questionData.postedBy._id}`
      );
      setNoq(response.data.questions.length);
    } catch (error) {
      console.error("Error fetching questions:", error);
      return 0;
    }
  };

  const fetchAnswersByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/answers/user?userId=${questionData.postedBy._id}`
      );
      setPopoverLoader(false);
      setNoa(response.data.length);
    } catch (error) {
      console.error("Error fetching answers:", error);
      return 0;
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchQuestion();
  }, [answerTrigger]);

  useEffect(()=>{
    if(user.likedQuestions.includes(location.state)){
      setCheckLike(true)
    }
    else{
      setCheckLike(false)
    }
  },[])

  
  const fetchQuestion = async () => {
  try {
    const response = await axios.get(`${base_url}/api/v1/questions/${location.state}`);
    setQuestionData(response.data.question);
    setLike(response.data.question.likes.length);
    setLoader(false);
  } catch (error) {
    console.error("Error fetching question:", error);
    setLoader(false);
    // You might want to set some error state here and display a message to the user
  }
};

  const handleLikeQuestion = async () => {
    const response = await axios.post(
      `${base_url}/api/v1/questions/${questionData._id}/like`,
      {
        userId: user._id,
      }
    );
    // console.log(response.data);
    dispatch(loginActions(response.data.user))
    Cookies.set("user",JSON.stringify(response.data.user))
    setLike(response.data.question.likes.length);
    if(response.data.question.likes.includes(user._id)){
      setCheckLike(true)
    }
    else{
      setCheckLike(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === "") {
      setAnswerHelperText("Answer cannot be empty");
    } else {
      setAnswerHelperText("");
      setModalLoader(true);
      axios
        .patch(`${base_url}/api/v1/questions/answers/${questionData._id}`, {
          answer: answer,
          postedBy: user._id,
        })
        .then((response) => {
          setAnswer("");
          setModalLoader(false);
          setIsModalOpen(false);
          dispatch(triggerAnswerReload());
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
        height: "fit-content",
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
            <Typography>{questionData.question}</Typography>
            <TextField
              multiline={true}
              rows={9}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              sx={{ marginTop: "10px" }}
              placeholder="Write something here..."
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
              Send
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
          marginBottom: "40px",
        }}
      >
        {loader ? (
          <QuestionLoader />
        ) : (
          <>
            <Box
              sx={{
                width: "50vw",
                backgroundColor: "white",
                gap: "10px",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Box sx={{ display: "flex", marginBottom: "15px" }}>
                <Avatar
                  src={questionData?.postedBy.imageUrl}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#9c27b0",
                    marginRight: "15px",
                  }}
                  onClick={userInfloClickHandler}
                >
                  {questionData?.postedBy.firstName?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {questionData?.postedBy.firstName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(questionData.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "550",
                  marginBottom: "15px",
                }}
              >
                {questionData.question}
              </Typography>
              {questionData.imageUrl && (
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "400px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    borderRadius: "4px",
                  }}
                >
                  <img
                    src={questionData.imageUrl}
                    alt="Question"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
              <Divider sx={{ marginY: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {checkLike ? (
                    <ThumbUpAltIcon
                      sx={{
                        cursor: "pointer",
                        color: "#9c27b0",
                        marginRight: "5px",
                      }}
                      onClick={handleLikeQuestion}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      sx={{
                        cursor: "pointer",
                        color: "#9c27b0",
                        marginRight: "5px",
                      }}
                      onClick={handleLikeQuestion}
                    />
                  )}
                  <Typography color="textSecondary">{like}</Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add a comment!
                </Button>
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "550",
                marginBottom: "20px",
              }}
            >
              {questionData.answers.length} community{" "}
              {questionData.answers.length === 1 ? "answer" : "answers"}
            </Typography>
            {questionData.answers.map((each) => (
              <EachAnswer key={each._id} questionData={questionData} each={each} />
            ))}
          </>
        )}
      </Box>
      <UserPopover
        numberOfAnswers={numberOfAnswers}
        numberOfQuestions={numberOfQuestions}
        each={questionData}
        popoverLoader={popoverLoader}
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
      />
      <Footer />
    </Box>
  );
};

export default EachQuestionPage;
