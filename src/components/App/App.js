import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import styled from "styled-components";
import { CommonButton } from "../../common/components/common-button.jsx";

function App() {
  const [userType, setUserType] = useState("");

  if (!userType) {
    return <Login setUserType={setUserType} />;
  }

  return (
    <AppWrapper>
      <StyledTop>
        <StyledTitle>Decimal</StyledTitle>
        <CommonButton title={"Logout"} onClick={() => setUserType("")} />
        {/* <StyledButton label="Logout" onClick={() => setUserType("")} /> */}
      </StyledTop>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard userType={userType} />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  background-color: #ffffff;
  padding: 50px;
`;
const StyledTitle = styled.div`
  display: inline-block;
  font-size: 30px;
  color: #102e58;
  font-family: Bagnard;
`;
const StyledTop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
