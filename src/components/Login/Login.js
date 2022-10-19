import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Box, Keyboard } from "grommet";

import { sendLoginUser } from "../../api/services";
import { CommonButton } from "../../common/components/common-button";

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
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <Keyboard onEnter={(e) => handleSubmit(e)}>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Keyboard>
      </label>
      <Box>
        <CommonButton title="Submit" onClick={(e) => handleSubmit(e)} />
      </Box>
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
