import React, { useEffect, useState } from "react";
import { Box, Avatar, Divider, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

function UserAnswers({ answers }) {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (answers.length > 0) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, []);
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
    answers.map((answer) => (
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
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
                {answer.question}
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
                  {answer.likes}
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
                  {each.postedBy.firstName?.slice(0, 1)}
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
        ))}
      </Box>
    ))
  );
}

export default UserAnswers;
