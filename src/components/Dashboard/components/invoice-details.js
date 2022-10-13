import React, { useEffect, useState } from "react";
import { Layer, Button, Box } from "grommet";
import styled from "styled-components";
import { getWorkflowResult } from "../../../api/services";

export default function InvoiceDetails({
  currentDetailedInvoice,
  setShowDetails,
  workflows,
}) {
  const [workflowResults, setWorkflowResults] = useState();
  const [expandSymbol, setExpandSymbol] = useState("+");
  const [showWorkflowResults, setShowWorkflowResults] = useState(false);

  const handleExpandButtonClick = () => {
    setExpandSymbol(expandSymbol == "-" ? "+" : "-");
    setShowWorkflowResults(!showWorkflowResults);
  };

  // DATA COLLECTION ```````````
  // This handles getting the workflows and seeing if theres a match
  const handleGetWorkflowResults = async () => {
    const { results } = await getWorkflowResult();

    // gets workflow results and tries to find if current invoice has a matching workflow
    let invoiceWorkflowResults = results.find(
      (result) => result.inputs[0].value == currentDetailedInvoice.id
    );

    if (invoiceWorkflowResults) {
      let workflowUsed = workflows.find(
        (workflow) => workflow.id == invoiceWorkflowResults.workflow
      );
      invoiceWorkflowResults = {
        ...invoiceWorkflowResults,
        workflowUsed: workflowUsed,
      };
      setWorkflowResults(invoiceWorkflowResults);
    }
  };

  useEffect(() => {
    (async () => {
      await handleGetWorkflowResults();
    })();
  }, []);
  // DATA COLLECTION ```````````

  return (
    <StyledLayer
      onEsc={() => setShowDetails(false)}
      onClickOutside={() => setShowDetails(false)}
    >
      <div>Account Name: {currentDetailedInvoice.account_name}</div>
      <div>Tenant Name: {currentDetailedInvoice.tenant_name}</div>
      <div>Created Date: {currentDetailedInvoice.created_date}</div>
      <div>
        Items:
        <div>
          {currentDetailedInvoice.line_items.map((item) => {
            return (
              <div key={item.sku}>
                <div>Item Name: {item.sku_name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>Total: {currentDetailedInvoice.invoice_total}</div>
      <br />
      {/* TODO: Refactor?  */}
      {workflowResults && (
        <div>
          <WorkflowResultsTitleBox>
            <div>Workflow Results</div>
            <ExpandButton
              label={expandSymbol}
              onClick={() => {
                handleExpandButtonClick();
              }}
            />
          </WorkflowResultsTitleBox>
          {showWorkflowResults && (
            <div>
              <div>Workflow Name: {workflowResults.workflowUsed.name}</div>
              <div>
                {workflowResults.output[1].results.schedules.map((entry) => {
                  return (
                    <div>
                      Sku: {entry.sku}
                      <div>
                        {entry.schedule.map((skuEntry) => {
                          return (
                            <EntryBox>
                              Date: {skuEntry.date} Amount: {skuEntry.amount}
                            </EntryBox>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <Button label="close" onClick={() => setShowDetails(false)} />
    </StyledLayer>
  );
}

const StyledLayer = styled(Layer)`
  padding: 20px;
`;

const EntryBox = styled(Box)`
  padding: 2px;
`;

const WorkflowResultsTitleBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 20px;
`;

const ExpandButton = styled(Button)`
  margin-top: -5px;
`;
