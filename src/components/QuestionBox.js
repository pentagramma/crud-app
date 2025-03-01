import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Divider, Typography, IconButton, Button, Modal, TextField, Select, MenuItem } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import axios from "axios";
import { base_url } from "../utils/base_url";
import UserPopover from "./UserPopover";
import LikesPopover from "./LikesPopover";
import { loginActions } from "../redux/Login/loginActions";
import Cookies from "js-cookie";
import { triggerAnswerReload } from "../redux/Extras/extraActions";
import QuestionLoader from "../utils/QuestionLoader";
import EditIcon from "@mui/icons-material/Edit";
import { fetchQuestions } from "../redux/Questions/questionsActions";
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';

function QuestionBox({ each, onQuestionDelete }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [numberOfQuestions, setNoq] = useState(0);
  const [numberOfAnswers, setNoa] = useState(0);
  const [popoverLoader, setPopoverLoader] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [checkLike, setCheckLike] = useState(false);
  const [likeCount, setLikeCount] = useState(each.likes.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerHelperText, setAnswerHelperText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Store original question data separately from editing version
  const [displayedQuestion, setDisplayedQuestion] = useState(each.question);
  const [displayedCategory, setDisplayedCategory] = useState(each.category);
  const [displayedImage, setDisplayedImage] = useState(each.imageUrl);

  // Separate state for editing
  const [editedQuestion, setEditedQuestion] = useState(each.question);
  const [editedCategory, setEditedCategory] = useState(each.category);
  const [editedImage, setEditedImage] = useState(null);

  const [answerCount, setAnswerCount] = useState(each.answers.length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCheckLike(user.likedQuestions.includes(each._id));
  }, [user, each._id]);

  useEffect(() => {
    setAnswerCount(each.answers.length);
  }, [each]);

  useEffect(() => {
    // Update displayed values when the question prop changes
    setDisplayedQuestion(each.question);
    setDisplayedCategory(each.category);
    setDisplayedImage(each.imageUrl);
  }, [each]);

  useEffect(() => {
    return () => {
      if (editedImage instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(editedImage));
      }
    };
  }, [editedImage]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getTimeAgo = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt));
    if (distance === "less than a minute") return "Just now";
    const arr = distance.split(" ");
    if (arr.length === 2) {
      return `${arr[0]} ${arr[1]} ago`;
    }
    return `${arr[1]} ${arr[2]} ago`;
  };

  const fetchLikedUsers = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/likes/${each._id}`
      );
      setPopoverLoader(false);
      setLikedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuestionsByUserId = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/questions/${each.postedBy._id}`
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
        `${base_url}/api/v1/questions/answers/user?userId=${each.postedBy._id}`
      );
      setPopoverLoader(false);
      setNoa(response.data.length);
    } catch (error) {
      console.error("Error fetching answers:", error);
      return 0;
    }
  };

  const userInfloClickHandler = (event) => {
    event.stopPropagation();
    setPopoverLoader(true);
    fetchQuestionsByUserId();
    fetchAnswersByUserId();
    setAnchorElUser(event.currentTarget);
  };

  const nextPageHandler = () => {
    navigate("/each-question", { state: each._id });
  };

  const handleOpenPopover = (event) => {
    event.stopPropagation();
    setPopoverLoader(true);
    fetchLikedUsers();
    setAnchorEl(event.currentTarget);
  };

  const handleLikeQuestion = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        `${base_url}/api/v1/questions/${each._id}/like`,
        {
          userId: user._id,
        }
      );
      dispatch(loginActions(response.data.user));
      Cookies.set("user", JSON.stringify(response.data.user));
      setLikeCount(response.data.question.likes.length);
      setCheckLike(response.data.question.likes.includes(user._id));
    } catch (error) {
      console.error("Error liking question:", error);
    }
  };

  const handleOpenCommentModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsModalOpen(false);
    setAnswer("");
    setAnswerHelperText("");
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (answer === "") {
      setAnswerHelperText("Answer cannot be empty");
    } else {
      setAnswerHelperText("");
      setModalLoader(true);
      try {
        await axios.patch(`${base_url}/api/v1/questions/answers/${each._id}`, {
          answer: answer,
          postedBy: user._id,
        });
        setAnswer("");
        setModalLoader(false);
        setIsModalOpen(false);
        setAnswerCount(prevCount => prevCount + 1); // Increment the answer count
        dispatch(triggerAnswerReload());
        nextPageHandler();
      } catch (err) {
        console.log(err);
        setModalLoader(false);
      }
    }
  };

  const handleOpenEditModal = (event) => {
    event.stopPropagation();
    // Initialize the edit state with the current displayed values
    setEditedQuestion(displayedQuestion);
    setEditedCategory(displayedCategory);
    setEditedImage(null);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // Reset edited values without changing displayed values
    setEditedQuestion(displayedQuestion);
    setEditedCategory(displayedCategory);
    setEditedImage(null);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditedImage(event.target.files[0]);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setModalLoader(true);

    let imageBase64 = null;
    if (editedImage instanceof File) {
      imageBase64 = await convertImageToBase64(editedImage);
    } else if (typeof editedImage === 'string') {
      imageBase64 = editedImage;
    }

    const editData = {
      question: editedQuestion,
      category: editedCategory,
      image: imageBase64,
      _id: user._id
    };

    try {
      await axios.patch(
        `${base_url}/api/v1/questions/edit/${each._id}`,
        editData,
      );

      // Update the displayed values only after successful API call
      setDisplayedQuestion(editedQuestion);
      setDisplayedCategory(editedCategory);
      if (imageBase64) {
        setDisplayedImage(imageBase64);
      }

      const response = await axios.get(`${base_url}/api/v1/questions?skip=1&limit=10`);

      dispatch(fetchQuestions(response.data.questions));

      setModalLoader(false);
      setIsEditModalOpen(false);

    } catch (error) {
      console.error("Error updating question:", error);
      setModalLoader(false);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDeleteQuestion = async (event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await axios.delete(`${base_url}/api/v1/questions/${each._id}`);
        onQuestionDelete(each._id); // Call the function passed from parent to update state
        handleCloseEditModal();
        // Optionally, add a toast notification here
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("An error occurred while deleting the post. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  useEffect(() => {
    console.log(each)
    console.log("each")
  },[each])

  return (
    <Box
      sx={{
        width: "50vw",
        backgroundColor: "white",
        display: "flex flex-col",
        gap: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        transition: "height 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
        },
      }}
    >
     <Box sx={{ display: "flex", alignItems: "center", mb: 1, ml: 2 }}>
        <Avatar 
          src={each.postedBy?.imageUrl} 
          sx={{ 
            cursor: "pointer", 
            backgroundColor: "#9c27b0", 
            width: "50px", 
            height: "50px", 
            marginRight: "15px",
            transition: "transform 0.2s ease-in-out", 
            "&:hover": { 
              transform: "scale(1.1)", 
            }, 
          }} 
          onClick={userInfloClickHandler}
        >
          {each.postedBy?.firstName?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h1" sx={{ fontSize: "1.2rem", fontWeight: "normal" }}>
            <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              {each.postedBy?.firstName}
            </span>{" "}
           
            <span style={{ fontSize: "1rem" }}>
            in{" "} {each?.category ? each.category.charAt(0).toLowerCase() + each.category.slice(1) : ''} says
            </span>
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
            {getTimeAgo(each.createdAt)}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h2" sx={{ fontSize: "1.5rem", fontWeight: "500", my: 2, ml: 2 }}>
        {displayedQuestion}
      </Typography>

      {displayedImage && (
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
            src={displayedImage}
            alt="Question"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              cursor: "pointer"
            }}
            onClick={nextPageHandler}
          />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleLikeQuestion} size="small">
            {checkLike ? (
              <FavoriteIcon fontSize="small" color="secondary" />
            ) : (
              <FavoriteBorderIcon fontSize="small" color="action" />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>

          <IconButton onClick={handleOpenCommentModal} size="small">
            <QuestionAnswerIcon fontSize="small" color="action" />
          </IconButton>
          <Typography>{answerCount}</Typography>

          {user._id === each.postedBy._id && (
            <IconButton onClick={handleOpenEditModal} size="small">
              <EditIcon fontSize="small" color="action" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleCloseCommentModal}
        onClick={(e) => e.stopPropagation()}
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
              <CircularProgress size={50} />
            </Box>
          </Box>
        ) : (
          <Box
            component={"form"}
            onSubmit={handleSubmitComment}
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
            <Typography>{displayedQuestion}</Typography>
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
      <Modal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onClick={(e) => e.stopPropagation()}
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
            <Box width={"150px"} height={"150px"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={50} />
            </Box>
          </Box>
        ) : (
          <Box
            component={"form"}
            onSubmit={handleSubmitEdit}
            sx={{
              width: "auto",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              overflowY: "auto",
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Edit Post</Typography>
              <IconButton
                color="error"
                aria-label="delete question"
                onClick={handleDeleteQuestion}
                disabled={isDeleting}
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  }
                }}
              >
                {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
              </IconButton>
            </Box>
            <TextField
              select
              label="Hashtags"
              value={editedCategory || ""}
              onChange={(e) => setEditedCategory(e.target.value)}
              fullWidth
              color="secondary"
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Philosophy">Philosophy</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
            {displayedImage && !editedImage && (
              <img src={displayedImage} alt="Current" style={{ maxWidth: "100%", maxHeight: "200px" }} />
            )}
            {editedImage && (
              <img
                src={editedImage instanceof File ? URL.createObjectURL(editedImage) : editedImage}
                alt="New"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}

            <TextField
              label="Caption..."
              value={editedQuestion || ""}
              onChange={(e) => setEditedQuestion(e.target.value)}
              fullWidth
              color="secondary"
            >
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Modal>
      <UserPopover
        numberOfAnswers={numberOfAnswers}
        numberOfQuestions={numberOfQuestions}
        each={each}
        popoverLoader={popoverLoader}
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
      />
      {each.likes.length !== 0 && (
        <LikesPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          likedUsers={likedUsers}
          popoverLoader={popoverLoader}
        />
      )}
    </Box>
  );
}

export default QuestionBox;