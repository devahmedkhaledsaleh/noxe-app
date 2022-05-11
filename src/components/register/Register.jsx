import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
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

  let submitRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let validateRegisterFormMessage = validateRegisterForm(user);

    if (validateRegisterFormMessage.error) {
      setIsLoading(false);
      setErrorList(validateRegisterFormMessage.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      if (data.message === "success") {
        setIsLoading(false);
        console.log("User Registered");
        navigate("/login");
      } else {
        setIsLoading(false);
        setError(data.message);
      }
    }
  };

  let validateRegisterForm = (user) => {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),

      last_name: Joi.string().alphanum().min(3).max(10).required(),

      age: Joi.number().integer().min(16).max(60).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),
    });

    return schema.validate(user, { abortEarly: false });
  };

  return (
    <>
      <h2 className="py-4">Register</h2>
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
      <form className="py-4" onSubmit={submitRegister}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="First Name"
            name="first_name"
            onChange={getUser}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Last Name"
            name="last_name"
            onChange={getUser}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Age"
            name="age"
            onChange={getUser}
          />
        </div>

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
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </>
  );
}
