import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/auth-slice/index";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success or error

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch the loginUser action
    dispatch(loginUser(formValues)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        // Show success snackbar
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        // Navigate to homepage after a short delay
        setTimeout(() => {
          navigate("/shop/home"); // or whatever page you want to redirect to after login
        }, 3500);
      } else {
        // Show error snackbar
        setSnackbarMessage("Login failed. Please check your credentials.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
      console.log(data);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          margin: "0 auto",
          mt: 5,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </Box>

      {/* Snackbar for success or error notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
