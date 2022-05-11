import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);

  let navigate = useNavigate();


  const getUser = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };

  const location = useLocation();

  const redirectPath = location.state?.path || '/'

  let submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let validateLoginFormMessage = validateLoginForm(user);

    if (validateLoginFormMessage.error) {
      setIsLoading(false);
      setErrorList(validateLoginFormMessage.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        props.getUserData();
        setIsLoading(false);
        navigate(redirectPath);
        
      } else {
        setIsLoading(false);
        setError(data.message);
      }
    }
  };

  let validateLoginForm = (user) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      password: Joi.string()
        .pattern(/^[A-Z][a-z]{3,9}$/)
        .required(),
    });

    return schema.validate(user, { abortEarly: false });
  };

  return (
    <>
      <h2 className="py-4">Login</h2>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      {errorList
        ? errorList.map((error, index) => {
            if (error.path[0] === "password") {
              return (
                <div key={index} className="alert alert-danger">
                  Password InValid
                </div>
              );
            } else {
              return (
                <div key={index} className="alert alert-danger">
                  {error.message}
                </div>
              );
            }
          })
        : ""}
      <form className="py-4" onSubmit={submitLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
            onChange={getUser}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={getUser}
            autoComplete="false"
          />
        </div>

        <button type="submit" className="btn btn-outline-primary">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </>
  );
}
