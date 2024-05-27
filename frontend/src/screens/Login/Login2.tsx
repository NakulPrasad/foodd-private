import React, { ChangeEvent, useState } from "react";
import emailIcon from "../../assets/email.png"; // @ts-ignore
import passwordIcon from "../../assets/password.png"; // @ts-ignore
import personIcon from "../../assets/person.png";
import "./Login2.css";
// import useFetchData from "../../hooks/useFetchData";
import { URLs } from "../../configs/URLs";
import usePostData from "../../hooks/usePostData";

const Login2 = () => {
  const [action, setAction] = useState("Sign Up");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { responseData, loading, error, postData } = usePostData(
    URLs.loginUser,
    {
      email: credentials.email,
      password: credentials.password,
    }
  );

  const handleClick = () => {
    setAction("Sign Up");
  };
  const handleSubmit = async () => {
    try {
      await postData().then((responseData) => console.log(responseData));
    } catch (error) {
      console.error(error);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  return (
    <section className="flex-container flexbox" id="login">
      <div className="form-container">
        <div className="header flexbox">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={personIcon} alt="person" />
              <input type="text" placeholder="Name" />
            </div>
          )}

          <div className="input">
            <img src={emailIcon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
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
          {action === "Sign Up" && (
            <div className="input">
              <img src={passwordIcon} alt="password" />
              <input type="text" placeholder="Address" />
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
