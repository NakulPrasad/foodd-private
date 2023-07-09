import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    //synthethic envent asked in react interview
    e.preventDefault(); // learn yourself
    //post request using fetch
    const response = await fetch("https://crazy-snaps-ray.cyclic.app/api/loginuser", {
      //as its post method in backend, we have to send dataBody
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //this should be same in backend like, in backend we use location and here geoloaction:credenta... this error

        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (!json.success) {
      alert("Enter vaild credentials");
    }
    //after signin redirect to homepage
    if (json.success) {
      //saving to local storage
      localStorage.setItem("authToken", json.authToken);
      //saving email in local storage
      localStorage.setItem("userEmail", credentials.email);

      // console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    //this should be added to all input feilds
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div className="container mt-5">
        {/* on clicking submite call handlesubmit function */}
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example3">
              Email address
            </label>
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <div className="row mb-4">
            <div className="col">
              <Link to="#!">Forgot password?</Link>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block m-3">
            Login
          </button>
          <Link to="/createuser" className="btn btn-danger btn-block m-3">
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
