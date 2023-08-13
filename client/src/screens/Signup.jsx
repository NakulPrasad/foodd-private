import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//copy bootstrap snippet
//added      <form onSubmit={handleSubmit}>
//handelSubmit calls backend
//after adding buttons we create signup logic using handleSubmit
//create variable to set and get empty states.
//submit not work, go to index.js and headers
//now copy sigup to login
//add login route in CreateUser.js, remove validator
//on clicking sign in, ridirect to homepage

const Signup = () => {
  let navigate = useNavigate();
  // default state blank, can access varible via credentials
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    //synthethic envent asked in react interview
    e.preventDefault(); // learn yourself
    //post request using fetch
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/createuser`,
      {
        //as its post method in backend, we have to send dataBody
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //this should be same in backend like, in backend we use location and here geoloaction:credenta... this error
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      }
    );
    const json = await response.json();

    if (!json.success) {
      alert("Enter vaild credentials");
    }
    if (json.success) {
      alert("User Created !!\nTry Login !!");
      navigate("/");
    }
  };
  const onChange = (event) => {
    //this should be added to all input feilds
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="container mt-5">
      {/* on clicking submite call handlesubmit function */}
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Enter Name
          </label>
          {/* we define name property & value={credentials.name} 
                     onChange={onChange} this call method onChange which defined above whever its state changes from default */}
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>

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

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example4">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
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
          Sign Up
        </button>
        <Link to="/login" className="btn btn-danger btn-block m-3">
          Already a user?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
