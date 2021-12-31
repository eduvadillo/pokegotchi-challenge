import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import "./LogIn.css";

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      console.log(`soy el res data de user!`, res.data.user);

      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGELOGIN);
    });
  }

  return (
    <div className='login-page-conteiner'>
      <div className='login-container'>
        <h1>Log In</h1>
        <form onSubmit={handleFormSubmission} className='signup__form'>
          <div className='user-name-div'>
            <input
              id='input-username'
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={handleInputChange}
              required
            />

            <div className='user-name-div'></div>
            <input
              id='input-password'
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={handleInputChange}
              required
              minLength='8'
            />
            {error && (
              <div className='error-block'>
                <p>There was an error submiting the form:</p>
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <button className='button-submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
