import React from "react";
import { Layer } from "grommet";
import styled from "styled-components";

export default function WorkflowDetails({ setShowWorkflowDetails, workflow }) {
  return (
    <StyledLayer
      onEsc={() => setShowWorkflowDetails(false)}
      onClickOutside={() => setShowWorkflowDetails(false)}
    >
      <div>Workflow Name: {workflow.name}</div>
      <div>Workflow Description: {workflow.description}</div>
      <div>
        Workflow Steps:{" "}
        {workflow.steps.map((step) => {
          return (
            <div key={step.order}>
              {step.order}. {step.name}
            </div>
          );
        })}
      </div>
    </StyledLayer>
  );
}
const StyledLayer = styled(Layer)`
  padding: 20px;
`;
