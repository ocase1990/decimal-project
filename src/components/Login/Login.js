import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { sendLoginUser } from "../../api/services";

export default function Login({ setUserType }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userType } = await sendLoginUser({
      username,
      password,
    });
    setUserType(userType);
  };
  return (
    <LoginWrapper>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </LoginWrapper>
  );
}

Login.propTypes = {
  setUserType: PropTypes.func.isRequired,
};
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 80px;
`;
