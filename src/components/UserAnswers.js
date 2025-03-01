import React, { useEffect, useState } from "react";
import { Box, Avatar, Divider, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useSelector } from "react-redux";

function UserAnswers({ answers }) {
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (answers.length > 0) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, []);

  useEffect(() => {
    console.log(answers)
    console.log("answers")
  },[answers])
  return !flag ? (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "4px",
        marginLeft: "3%",
      }}
    >
      <Typography variant="h5" align="center">
        Oops!! No Answers Posted yet!!
      </Typography>
    </Box>
  ) : (
    <Box>
      {answers.map((answer) => (
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            // border:"1rem solid white",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            marginLeft: "3%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                  src={answer.question.postedBy?.imageUrl}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#9c27b0",
                  }}
                >
                  {answer.question.postedBy?.firstName?.charAt(0).toUpperCase()}
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
                  {answer.question}
                </Typography>
              </Box>
            </Box>
            {answer.imageUrl && (
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "300px",
                  overflow: "hidden",
                  marginBottom: "15px",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={answer.imageUrl}
                  alt="Imavge"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
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
                    {answer.likes?.length}
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
                    {answer.createdAt}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {answer.answers.map((each) => (
            <Box
              sx={{
                width: "50vw",
                height: "auto",
                backgroundColor: "white",
                gap: "10px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              {each.postedBy._id === user._id && (
                <>
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
                        src={each.postedBy.imageUrl}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "#9c27b0",
                        }}
                      >
                        {each.postedBy.firstName?.slice(0, 1)}
                      </Avatar>
                    </Box>
                    <Box
                      sx={{
                        marginLeft: "20px",
                        marginTop: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "550",
                          marginBottom: "10px",
                        }}
                        variant={"h5"}
                      >
                        
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
                          {each.likes?.length}
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
                </>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default UserAnswers;
