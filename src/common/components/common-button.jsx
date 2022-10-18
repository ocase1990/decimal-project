import React, { memo, useMemo } from "react";
import { Button, Text } from "grommet";
import styled from "styled-components";


export const CommonButton = memo((props) => {
  const { title, onClick } = props;

  return (
    <>
      <StyledButton label={title} onClick={onClick}></StyledButton>
    </>
  );
});

const StyledButton = styled(Button)`
  min-width: 100px;
  background-color: #ee5940;
  font-weight: 400;
  border-radius: 4px;
  color: #fff;
  font-size: 15px;
  border: none;
`;
