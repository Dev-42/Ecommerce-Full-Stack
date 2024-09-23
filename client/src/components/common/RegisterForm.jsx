import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice/index";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log("Form Values:", formValues);
    // once the user is logged in navigate the user to the login page
    dispatch(registerUser(formValues)).then((data) => console.log(data));
  };

  return (
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
        Register
      </Typography>
      <TextField
        label="Username"
        name="username"
        value={formValues.username}
        onChange={handleChange}
        fullWidth
        required
      />
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
        Submit
      </Button>
    </Box>
  );
};

export default RegisterForm;
