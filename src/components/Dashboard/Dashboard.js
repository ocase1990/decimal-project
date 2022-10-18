import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Box, Button } from "grommet";
import {
  getListAccounts,
  getListInvoices,
  getListSkus,
  getListTenants,
  getListWorkflows,
} from "../../api/services";
import Table from "./components/Table";
import { formatData } from "../../helpers/formatInvoiceData";
import InvoiceDetails from "./components/invoice-details";
import WorkflowDetails from "./components/workflow-details";
import { CommonButton } from "../../common/components/common-button";

export default function Dashboard({ userType }) {
  const [invoices, setInvoices] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(false);
  const [currentDetailedInvoice, setCurrentDetailedInvoice] = useState("");
  const [workflows, setWorkflows] = useState();
  const [currentWorkflow, setCurrentWorkflow] = useState();

  const DetailsButton = ({ guid }) => {
    const handleButtonClick = () => {
      // Takes guid of click invoice to find full invoice in invoices array
      // returns with formatted invoice for display
      // shows modal
      let currentDetailedInvoice = invoices.invoices.find(
        (invoice) => invoice.id == guid
      );
      setCurrentDetailedInvoice(currentDetailedInvoice);
      setShowDetails(true);
    };

    return <CommonButton title="Details" onClick={() => handleButtonClick()} />;
  };

  const handleWorkflowDetailButtonClick = (workflow) => {
    setCurrentWorkflow(workflow);
    setShowWorkflowDetails(true);
  };

  const columns = useMemo(() => [
    {
      Header: "Invoices",
      columns: [
        {
          Header: "Account Name",
          accessor: "account_name",
        },
        {
          Header: "Tenant Name",
          accessor: "tenant_name",
        },
        {
          Header: "Created Date",
          accessor: "created_date",
        },
        {
          Header: "View Details",
          accessor: "id",
          Cell: ({ value }) => <DetailsButton guid={value} />,
        },
        { Header: "Total", accessor: "invoice_total" },
      ],
    },
  ]);

  // DATA COLLECTION ```````````
  //sends api data to be formatted for easier use by display
  const handleGetInvoiceData = async () => {
    const [
      invoicesResult,
      accountResult,
      tenantResult,
      skusResult,
      workflowResults,
    ] = await Promise.all([
      getListInvoices(),
      getListAccounts(),
      getListTenants(),
      getListSkus(),
      getListWorkflows(),
    ]);

    const formattedDataResult = formatData(
      invoicesResult,
      accountResult,
      tenantResult,
      skusResult
    );
    setInvoices(formattedDataResult);
    setWorkflows(workflowResults.workflows);
  };

  useEffect(() => {
    (async () => {
      await handleGetInvoiceData();
    })();
  }, []);
  // DATA COLLECTION ```````````

  return (
    <DashboardWrapper>
      {showDetails && (
        <InvoiceDetails
          setShowDetails={setShowDetails}
          currentDetailedInvoice={currentDetailedInvoice}
          workflows={workflows}
        />
      )}
      {showWorkflowDetails && (
        <WorkflowDetails
          setShowWorkflowDetails={setShowWorkflowDetails}
          workflow={currentWorkflow}
        />
      )}
      <h2>Dashboard</h2>
      <h2>Welcome {userType}</h2>
      {invoices.invoices && (
        <Table columns={columns} data={invoices.invoices} />
      )}
      {userType == "admin" && (
        <div>
          <h4>Available Workflows</h4>
          <div>
            {workflows?.map((workflow) => {
              return (
                <CommonButton
                  title={workflow.name}
                  onClick={() => handleWorkflowDetailButtonClick(workflow)}
                  key={workflow.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled(Box)`
  padding-left: 10px;
  padding-right: 10px;
  border: 4px solid #ee5940;
  padding-bottom: 20px;
  background-color: #f2ebe5;
`;
