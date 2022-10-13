import { format, parseISO } from "date-fns";

export const formatData = (invoices, accounts, tenants, skus) => {
  //This helper takes props and formats a final return with collected datathat the display can use
  //TODO: refactor efficiently?

  let accountsKey = {};
  let tenantsKey = {};
  let skusKey = {};

  //accounts
  for (let i = 0; i < accounts.accounts.length; i++) {
    let idKey = accounts.accounts[i].id;
    accountsKey[idKey] = accounts.accounts[i].name;
  }

  //tenants
  for (let i = 0; i < tenants.tenants.length; i++) {
    let idKey = tenants.tenants[i].id;
    tenantsKey[idKey] = tenants.tenants[i].name;
  }

  //skus
  for (let i = 0; i < skus.skus.length; i++) {
    let idKey = skus.skus[i].id;
    let duration = skus.skus[i].schedule
      ? `(${skus.skus[i].schedule.duration}) ${skus.skus[i].schedule.units}(s)`
      : "";
    skusKey[idKey] = `${skus.skus[i].name} ${duration}`;
  }

  //format invoices
  invoices.invoices = invoices.invoices.map((invoice) => {
    let formattedTotal = 0;
    // sku format
    invoice.line_items = invoice.line_items.map((item) => {
      formattedTotal += item.amount;
      return {
        ...item,
        sku_name: skusKey[item.sku],
      };
    });

    // return final invoice format
    var formattedDate = format(parseISO(invoice.created_date), "dd/MM/yyyy");

    return {
      ...invoice,
      account_name: accountsKey[invoice.account_id],
      tenant_name: tenantsKey[invoice.tenant_id],
      invoice_total: formattedTotal,
      created_date: formattedDate,
    };
  });
  return invoices;
};
