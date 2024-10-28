export const getAllMisc = "SELECT * FROM misc";

export const getDataByMisc = `
  SELECT * FROM weekly_report_misc wrm 
  WHERE misc_id = $1 AND status='Active'
  ORDER BY weekstarttime
`;

export const addUpdateMiscData = (miscData) => {
  let returnStr = "";
  console.log(miscData);

  if (miscData.report_id === 0) {
    // Insert query for a new weekly report
    returnStr = `INSERT INTO weekly_report_misc 
    (misc_id, top_highlights, top_lowlights, help_needed_ongoing, next_steps, upcoming_milestones, upload_weekly_presentation, weekstarttime, weekendtime) 
    VALUES (
      ${miscData.misc_id}, 
      '${miscData.top_highlights}', 
      '${miscData.top_lowlights}', 
      '${miscData.help_needed_ongoing}', 
      '${miscData.next_steps}', 
      '${miscData.upcoming_milestones}', 
      '${miscData.attachedDoc}',
      '${miscData.weekstarttime}',
      '${miscData.weekendtime}'
    )`;
  } else {
    // Update query for an existing weekly report
    returnStr = `UPDATE weekly_report_misc 
    SET 
      top_highlights = '${miscData.top_highlights}', 
      top_lowlights = '${miscData.top_lowlights}', 
      help_needed_ongoing = '${miscData.help_needed_ongoing}', 
      next_steps = '${miscData.next_steps}', 
      upcoming_milestones = '${miscData.upcoming_milestones}', 
      upload_weekly_presentation = '${miscData.attachedDoc}' 
    WHERE report_id = ${miscData.report_id}`;
  }
  returnStr += " RETURNING *";
  console.log(returnStr);
  return returnStr;
};

export const getAllMiscData = `SELECT * FROM weekly_report_misc WHERE status='Active' ORDER BY misc_id`;
export const addNewMisItem = `INSERT INTO misc(misc_name, status) VALUES($1, 'Active') RETURNING *`;


