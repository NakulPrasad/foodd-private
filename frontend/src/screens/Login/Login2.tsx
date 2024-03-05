import React from "react";
import emailIcon from "../../assets/email.png";
import passwordIcon from "../../assets/password.png";
import personIcon from "../../assets/person.png";
import "./Login2.css";

const Login2 = () => {
  return (
    <section className="container flexbox" id="login">
      <div className="form-container">
        <div className="header flexbox">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={personIcon} alt="person" />
            <input type="text" placeholder="Name" />
          </div>
          <div className="input">
            <img src={emailIcon} alt="email" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="password" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
      </div>

      <div className="forgot-password">
        Lost Password ? <span> Click Here </span>
      </div>
      <div className="submit-container flexbox">
        <button className="submit">Sign Up</button>
        <button className="submit">Login</button>
      </div>
    </section>
  );
};

export default Login2;
