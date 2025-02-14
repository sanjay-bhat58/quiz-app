import styled from "styled-components";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginBackgroundImage from "../../assets/login-bg-image.jpg";
import { useCallback, useState } from "react";
import { useLoading } from "../../contexts/loaderContext/loaderHook";
import { useAxios } from "../../contexts/axiosContext/axiosHook";
import { decodeJWT } from "../../utils/functions/decodeJwt";
import { useAuth } from "../../contexts/authContext/authHook";
import { useNavigate } from "react-router";
import { useSnackbar } from "../../contexts/snackbarContext/snackbarHook";

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${LoginBackgroundImage}) no-repeat center center/cover;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  max-width: 400px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.95) !important;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem !important;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem !important;
  background-color: #8e24aa !important;
  color: white !important;
  &:hover {
    background-color: #7b1fa2 !important;
  }
`;

const LoginPage = () => {
  // hooks
  const { setLoading } = useLoading();
  const { axiosInstance } = useAxios();
  const { setUserName, setUserRole } = useAuth();
  const { handleSnackbarOpen } = useSnackbar();
  const navigate = useNavigate();

  // state variables
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  // functions
  const handleLogin = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        if (axiosInstance) {
          const response = await axiosInstance.post("userLogin", {
            email: email,
            password: password,
          });
          localStorage.setItem("token", response.data.data.token);
          const decodedToken = decodeJWT(response.data.data.token);
          handleSnackbarOpen(response.data.message, "success");
          setUserRole(decodedToken.userRole);
          setUserName(decodedToken.userName);
          navigate("/");
        }
      } catch (err) {
        if (err.response?.data?.message) {
          handleSnackbarOpen(err.response.data.message, "error");
        } else {
          handleSnackbarOpen("Something went wrong", "error");
        }
      } finally {
        setLoading(false);
      }
    },
    [
      setLoading,
      axiosInstance,
      setUserRole,
      setUserName,
      navigate,
      handleSnackbarOpen,
    ]
  );

  const handleSignUp = useCallback(
    async (fullName, email, employeeId, password) => {
      setLoading(true);
      try {
        if (axiosInstance) {
          const response = await axiosInstance.post("createAccount", {
            name: fullName,
            email,
            employeeId,
            password,
          });
          handleSnackbarOpen(response.data.message, "success");
          setSignUpOpen(false);
        }
      } catch (err) {
        if (err.response?.data?.message) {
          handleSnackbarOpen(err.response.data.message, "error");
        } else {
          handleSnackbarOpen("Something went wrong", "error");
        }
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, handleSnackbarOpen, setLoading]
  );

  return (
    <LoginPageWrapper>
      <Container maxWidth="sm" sx={{ width: "auto" }}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" fontWeight="bold" color="#6a1b9a">
            Welcome to Tech Expo - Feb, 2025
          </Typography>
          <Typography variant="subtitle1" color="gray" gutterBottom>
            Sign In to continue to the quiz
          </Typography>

          <StyledTextField
            fullWidth
            label="Email ID"
            variant="outlined"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <StyledTextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <StyledButton
            fullWidth
            variant="contained"
            onClick={() => handleLogin(loginEmail, loginPassword)}
          >
            Sign In
          </StyledButton>
          <StyledButton
            fullWidth
            variant="contained"
            onClick={() => setSignUpOpen(true)}
          >
            Sign Up
          </StyledButton>
        </StyledPaper>
      </Container>

      {/* Sign-Up Dialog */}
      <Dialog open={isSignUpOpen} onClose={() => {}} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#6a1b9a">
            Register to participate in the quiz
          </Typography>
          <IconButton onClick={() => setSignUpOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ marginTop: "1rem" }}>
          <StyledTextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <StyledTextField
            fullWidth
            label="Employee ID"
            variant="outlined"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <StyledTextField
            fullWidth
            label="Email ID"
            variant="outlined"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <StyledTextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          />

          <StyledButton
            fullWidth
            variant="contained"
            onClick={() =>
              handleSignUp(fullName, signUpEmail, employeeId, signUpPassword)
            }
          >
            Register
          </StyledButton>
        </DialogContent>
      </Dialog>
    </LoginPageWrapper>
  );
};

export default LoginPage;
