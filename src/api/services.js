import axios from "axios";

export async function getListAccounts() {
  try {
    const res = await axios.get(`list-accounts.json`);
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getListInvoices() {
  try {
    const res = await axios.get(`list-invoices.json`);
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getListSkus() {
  try {
    const res = await axios.get(`list-skus.json`);
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getListTenants() {
  try {
    const res = await axios.get(`list-tenants.json`);
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getListWorkflows() {
  try {
    const res = await axios.get(`list-workflows.json`);
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getWorkflowResult() {
  try {
    const res = await axios.get(`workflow-result.json`);
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function sendLoginUser(credentials) {
  try {
    const res = await axios.post(`http://localhost:8080/login`, {
      credentials,
    });
    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
}
