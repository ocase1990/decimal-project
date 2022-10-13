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

// export async function getProducts() {
//     try {
//         const res = await axios.get(`/rest/product/getProducts`);
//         return res.data
//     } catch (error) {
//         console.error('Error: ', error)
//     }
// }

// export async function getProductsById(productUUID) {
//     try {
//         const res = await axios.get(`/rest/product/getProduct/${productUUID}`);
//         return res.data
//     } catch (error) {
//         console.error('Error: ', error)
//     }
// }

// export async function addProduct(productObj) {
//     try {
//         const res = await axios.post(`/rest/product/createProduct`, productObj);
//         return res.data
//     } catch (error) {
//         console.error('Error: ', error)
//     }
// }

// export async function updateProduct(productObj) {
//     try {
//         const res = await axios.put(`/rest/product/updateProduct`, productObj);
//         return res.data
//     } catch (error) {
//         console.error('Error: ', error)
//     }
// }

// export async function deleteProduct(productUUID) {
//     try {
//         const res = await axios.delete(`/rest/product/deleteProduct/${productUUID}`);
//         return res.data
//     } catch (error) {
//         console.error('Error: ', error)
//     }
// }
