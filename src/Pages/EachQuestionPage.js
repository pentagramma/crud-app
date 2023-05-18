import React, { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [answerHelperText, setAnswerHelperText] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === "") {
      setAnswerHelperText("Answer cannot be empty");
    } else {
      setAnswerHelperText("");
      setModalLoader(true);
      axios
        .patch(``)
        .then((response) => {
          setModalLoader(false);
        })
        .catch((err) => {
          console.log(err);
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
        overflow: "hidden",
        width: "100vw",
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
          height: "70vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          width: "fit-content",
        }}
      >
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                modi soluta molestiae aliquid repellendus at voluptates repellat
                minima, tenetur earum nihil, eum cum est consequatur ipsa,
                architecto nam dignissimos quia?
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
                  54
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
                  15/4/2023
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
                What is you name absajbsf kasjfbkasbf kasjfbkajbfkjasbfajsflaf
                fjkasbf aksfajbfkjasfbkafbkasfbkasbfkasfask kjabfkjabsfkbfajkb
                asfnaks jasbfjkabfjb jasfjasbfjabf jasfkjafbasf
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
          4 community answers
        </Typography>
        {arr.map((each) => {
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
                    {each.postedBy.slice(0, 1)}
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
                    {each.postedBy} says...
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
                    {each.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default EachQuestionPage;
