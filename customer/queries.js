export const getAllCustomers = "SELECT * FROM customer";

export const getDataByCustomer = `
  SELECT * FROM weekly_report_customer wrc 
  WHERE customer_id = $1 AND status='Active'
  ORDER BY weekstarttime DESC
`;

export const addUpdateCustomerData = (customerData) => {
  let returnStr = "";

  if (customerData.report_id === 0) {
    // Insert query for a new weekly report
    returnStr = `INSERT INTO weekly_report_customer 
    (customer_id, top_highlights, top_lowlights, help_needed_ongoing, next_steps, upcoming_milestones, upload_weekly_presentation, weekstarttime, weekendtime) 
    VALUES (
      ${customerData.customer_id}, 
      '${customerData.top_highlights}', 
      '${customerData.top_lowlights}', 
      '${customerData.help_needed_ongoing}', 
      '${customerData.next_steps}', 
      '${customerData.upcoming_milestones}', 
      '${customerData.attachedDoc}',
      '${customerData.weekstarttime}',
      '${customerData.weekendtime}'
    )`;
  } else {
    // Update query for an existing weekly report
    returnStr = `UPDATE weekly_report_customer 
    SET 
      top_highlights = '${customerData.top_highlights}', 
      top_lowlights = '${customerData.top_lowlights}', 
      help_needed_ongoing = '${customerData.help_needed_ongoing}', 
      next_steps = '${customerData.next_steps}', 
      upcoming_milestones = '${customerData.upcoming_milestones}', 
      upload_weekly_presentation = '${customerData.attachedDoc}' 
    WHERE report_id = ${customerData.report_id}`;
  }

  returnStr += " RETURNING *";
  console.log(returnStr);
  return returnStr;
};

export const getAllCustomerData = `SELECT * FROM weekly_report_customer WHERE status='Active' ORDER BY customer_id`;

