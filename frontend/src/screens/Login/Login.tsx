import { ChangeEvent, useState } from "react";
import emailIcon from "../../assets/icons/email.png";
import passwordIcon from "../../assets/icons/password.png";
import personIcon from "../../assets/icons/person.png";
import "./Login.css";
import URLs from "../../configs/URLs";
import usePostData from "../../hooks/usePostData";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../../hooks/useCookie";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";

interface LoginResponse {
  authToken: string;
}

const Login2 = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [errorMsg, setErrorMsg] = useState("");
  const { addUser } = useUser();
  const { setItem } = useCookie();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [isLoading, postData] = usePostData<LoginResponse>();

  const handleClick = () => {
    setAction("Sign Up");
    // console.log(action);
  };

  const handleSubmit = async () => {
    // console.log(credentials);
    if (action === "Login") {
      await handleLogin();
    } else if (action === "Sign Up") {
      await handleSignUp();
    }
  };

  function openGoogleAuthPopup() {
    const googleAuthUrl = "http://localhost:3000/auth/google"; // Replace with your Google Auth endpoint
    const width = 500; // Desired popup width
    const height = 600; // Desired popup height
    const left = window.screenX + (window.outerWidth - width) / 2; // Center horizontally
    const top = window.screenY + (window.outerHeight - height) / 2; // Center vertically

    // Open a new window for the Google Auth
    const authWindow = window.open(
      googleAuthUrl,
      "GoogleAuthPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`
    );

    if (!authWindow) {
      alert("Popup blocked! Please allow popups for this website.");
    }
  }

  const handleSignUp = async () => {
    const response = await postData(URLs.addUser, credentials);
    if (response) {
      console.log("User Registered Successfully");
      toast.success("User Registered Successfully");
    }
  };

  const handleLogin = async () => {
    const response = await postData(URLs.loginUser, {
      email: credentials.email,
      password: credentials.password,
    });
    if (!isLoading && response) {
      // console.log(response);
      const user = {
        email: credentials.email,
      };
      setItem("authToken", response.authToken);
      addUser(user);
      console.log("User Login Successfully");
      navigate("/");
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Basic validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: isValidEmail ? "" : "Invalid email format",
      }));

      // Only update the credentials if the email is valid
      if (isValidEmail) {
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          email: value,
        }));
      }
    } else if (name === "password") {
      const isValidPassword = value.length >= 8;
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: isValidPassword
          ? ""
          : "Password must be at least 8 characters",
      }));

      // Only update the credentials if the password meets the criteria
      if (isValidPassword) {
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          password: value,
        }));
      }
    } else if (name === "name") {
      const isValidName = value.length >= 1;
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        name: isValidName ? "" : "Name must be at least 1 characters",
      }));

      // Only update the credentials if the password meets the criteria
      if (isValidName) {
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          name: value,
        }));
      }
    }

    // Update the credentials state regardless of validation for other fields
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <section className="flex-container flexbox" id="login">
      {/* {isLoading && <div>isLoading...</div>} */}
      {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}

      <div className="form-container">
        <div className="header flexbox">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={personIcon} alt="person" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                onChange={onChange}
              />
            </div>
          )}
          {validationErrors.name && (
            <p className="error">{validationErrors.name}</p>
          )}

          <div className="input">
            <img src={emailIcon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              required
              onChange={onChange}
            />
          </div>
          {validationErrors.email && (
            <p className="error">{validationErrors.email}</p>
          )}
          <div className="input">
            <img src={passwordIcon} alt="password" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          {validationErrors.password && (
            <p className="error">{validationErrors.password}</p>
          )}
          {action === "Sign Up" && (
            <div className="input">
              <img src={passwordIcon} alt="password" />
              <input
                type="text"
                placeholder="Location"
                name="location"
                onChange={onChange}
              />
            </div>
          )}
        </div>
        <button className="submit center" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {action === "Sign Up" && (
        <div className="forgot-password">
          Lost Password ? <span> Click Here </span>
        </div>
      )}
      <div
        id="g_id_onload"
        data-client_id="270412715554-h83o5vmfdh24q9hkc6efse6d95ihaaa6.apps.googleusercontent.com"
        data-login_uri="http://localhost:5173/login"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
      <button
        onClick={openGoogleAuthPopup}
        style={{
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: "#4285F4",
          color: "white",
          padding: "10px 20px",
          textDecoration: "none",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          style={{
            width: "18px",
            height: "18px",
            marginRight: "8px",
          }}
        />
        Login with Google
      </button>

      <div className="submit-container flexbox">
        <button
          className={action === "Login" ? "gray submit" : "submit"}
          onClick={handleClick}
        >
          Sign Up
        </button>
        <button
          className={action === "Sign Up" ? "gray submit" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Login2;
