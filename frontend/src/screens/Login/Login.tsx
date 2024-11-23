import { ChangeEvent, useState } from "react";
import emailIcon from "../../assets/email.png";
import passwordIcon from "../../assets/password.png";
import personIcon from "../../assets/person.png";
import "./Login.css";
import URLs from "../../configs/URLs";
import usePostData from "../../hooks/usePostData";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  authToken: string;
}

const Login2 = () => {
  let navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [errorMsg, setErrorMsg] = useState("");
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
  const [isLoading, postData, responseData] = usePostData<LoginResponse>();

  const handleClick = () => {
    setAction("Sign Up");
    // console.log(action);
  };

  const handleSubmit = async () => {
    console.log(credentials);
    if (action === "Login") {
      try {
        const response = await postData(URLs.loginUser, {
          email: credentials.email,
          password: credentials.password,
        });
        // debugger;
        if (!isLoading && response) {
          // console.log(response);
          localStorage.setItem("authToken", response.authToken);

          localStorage.setItem("userEmail", credentials.email);

          navigate("/");
        }
      } catch (error) {
        setErrorMsg("Invalid Cred");
        console.error(error);
      }
    } else if (action === "Sign Up") {
      try {
        const response = await postData(URLs.addUser, credentials);
        // debugger;
        // console.log(response);
        if (!isLoading && response) {
          try {
            const response = await postData(URLs.loginUser, {
              email: credentials.email,
              password: credentials.password,
            });
            // debugger;
            if (!isLoading && response) {
              // console.log(response);
              localStorage.setItem("authToken", response.authToken);

              localStorage.setItem("userEmail", credentials.email);

              navigate("/");
            }
          } catch (error) {
            setErrorMsg("Invalid Cred");
            console.error(error);
          }
        }
      } catch (error) {
        setErrorMsg("Invalid Cred");
        console.error(error);
      }
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
