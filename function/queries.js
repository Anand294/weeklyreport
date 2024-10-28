export const getAllFunctions = "SELECT * from functions";
export const getDataByFunction = `
  SELECT * FROM weekly_report_function wrf 
  WHERE function_id = $1 AND status='Active'
  ORDER BY weekstarttime
`;
export const addUpdateFunctionData = (functionData) => {
  let returnStr = "";

  if (functionData.report_id == 0) {
    // Insert query for a new weekly report
    returnStr = `INSERT INTO weekly_report_function 
    (function_id, top_highlights, top_lowlights, help_needed_ongoing, next_steps, upcoming_milestones, upload_weekly_presentation, weekstarttime, weekendtime) 
    VALUES (
      ${functionData.function_id}, 
      '${functionData.top_highlights}', 
      '${functionData.top_lowlights}', 
      '${functionData.help_needed_ongoing}', 
      '${functionData.next_steps}', 
      '${functionData.upcoming_milestones}', 
      '${functionData.attachedDoc}',
      '${functionData.weekstarttime}',
      '${functionData.weekendtime}'
    )`;
  } else {
    // Update query for an existing weekly report
    returnStr = `UPDATE weekly_report_function 
    SET 
      top_highlights = '${functionData.top_highlights}', 
      top_lowlights = '${functionData.top_lowlights}', 
      help_needed_ongoing = '${functionData.help_needed_ongoing}', 
      next_steps = '${functionData.next_steps}', 
      upcoming_milestones = '${functionData.upcoming_milestones}', 
      upload_weekly_presentation = '${functionData.attachedDoc}' 
    WHERE report_id = ${functionData.report_id}`;
  }
  returnStr += " RETURNING *";

  return returnStr;
};
export const getAllFunctionData = `SELECT * FROM weekly_report_function WHERE status='Active' ORDER BY function_id`;

