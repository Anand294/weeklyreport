// Importing necessary modules using ES6 syntax
import nodemailer from 'nodemailer';

// SMTP configuration
const SMTP_HOST = "smtp.office365.com";
const SMTP_PORT = 587;
const SMTP_AUTH = true; // Typically true for authentication
const SMTP_STARTTLS = true; // True if you want to use STARTTLS

const USERNAME = "ecrn_system@mindacorporation.com";
const PASSWORD = "hprznqxxlwqbdbky"; // Keep this secure and not exposed in public code

// Function to send report email
const sendReportEmail = async (reportData) => {
    const customerTable = exeCustomerMailer(reportData);
    const functionTable = exeFunctionMailer(reportData);
    const miscTable = exeMiscMailer(reportData);

    const htmlContent = `
        <html>
            <head>
                <style>
                    table { border: 1px solid black; width: 100%; margin-bottom: 20px; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    h2 { color: #333; text-align:center;}
                </style>
            </head>
            <body><center>
                <h3>Weekly Report ${reportData.selectedWeek}</h3></center>
                ${customerTable}
                ${functionTable}
                ${miscTable}
            </body>
        </html>
    `;

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false, // Use false for non-secure connections
        auth: {
            user: USERNAME,
            pass: PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false, // Allow self-signed certificates (for development)
        }
    });

    const mailOptions = {
        from: USERNAME,
        to: 'anand.kumar1@mindacorporation.com', // Dynamic recipient
        subject: `PROJECT WEEKLY REPORT: ${reportData.selectedWeek.toUpperCase()}`,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error(error.stack);
    }
};

// Function to create customer mailer table
const exeCustomerMailer = (reportData) => {
    const customerData = reportData.customerReportData || []; // Ensure customerData is an array
    let returnStr = "<table style='border-collapse: collapse; width: 100%;'>"
        + "<thead>"
        + "<tr><th colSpan='4' style='text-align: center; background-color: #4CAF50;'>Customer Highlights</th></tr>"
        + "<tr>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>#</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Customer Name</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>SPOC</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Highlights/Summary of the Week</th>"
        + "</tr>"
        + "</thead>"
        + "<tbody>";

    customerData.forEach((customer, index) => {
        const serialNumber = index + 1;

        returnStr += '<tr>';
        returnStr += `<td style="border: 1px solid black;">${serialNumber}</td>`;
        returnStr += `<td style="border: 1px solid black;">${customer.customer_name || "N/A"}</td>`;
        returnStr += '<td style="border: 1px solid black;">Anand Kumar</td>';
        returnStr += '<td style="border: 1px solid black;">';
        returnStr += `<h4>Highlights</h4><p>${(customer.top_highlights || "N/A").replace(/\n/g, "<br>")}</p>`;
        returnStr += `<h4>Next Steps</h4><p>${(customer.upcoming_milestones || "N/A").replace(/\n/g, "<br>")}</p>`;
        returnStr += `<h4>Help Needed</h4><p>${(customer.help_needed_ongoing || "N/A").replace(/\n/g, "<br>")}</p>`;
        returnStr += '</td>';
        returnStr += '</tr>';
    });

    returnStr += '</tbody></table>';
    return returnStr;
};

// Function to create function mailer table
const exeFunctionMailer = (reportData) => {
    const functionData = reportData.functionReportData || []; // Ensure functionData is an array
    let returnStr = "<table style='border-collapse: collapse; width: 100%;'>"
        + "<thead>"
        + "<tr><th colSpan='4' style='text-align: center;background-color: #4CAF50;'>Function Highlights</th></tr>"
        + "<tr>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>#</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Function Name</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>SPOC</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Highlights/Summary of the Week</th>"
        + "</tr>"
        + "</thead>"
        + "<tbody>";

    functionData.forEach((func, index) => {
        const serialNumber = index + 1;

        returnStr += '<tr>';
        returnStr += `<td style="border: 1px solid black;">${serialNumber}</td>`;
        returnStr += `<td style="border: 1px solid black;">${func.function_name || "N/A"}</td>`;
        returnStr += '<td style="border: 1px solid black;">Anand Kumar</td>';
        returnStr += '<td style="border: 1px solid black;">';
        returnStr += `<h4>Highlights</h4><p>${(func.top_highlights || "N/A").replace(/\n/g, "<br>")}</p>`;
        returnStr += '</td>';
        returnStr += '</tr>';
    });

    returnStr += '</tbody></table>';
    return returnStr;
};

// Function to create miscellaneous mailer table
const exeMiscMailer = (reportData) => {
    const miscData = reportData.miscReportData || []; // Ensure miscData is an array
    let returnStr = "<table style='border-collapse: collapse; width: 100%;'>"
        + "<thead>"
        + "<tr><th colSpan='4' style='text-align: center;background-color: #4CAF50;'>Miscellaneous Highlights</th></tr>"
        + "<tr>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>#</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Miscellaneous Item</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Responsible Person</th>"
        + "<th style='border: 1px solid black;background-color: #4CAF50;'>Highlights/Summary of the Week</th>"
        + "</tr>"
        + "</thead>"
        + "<tbody>";

    miscData.forEach((misc, index) => {
        const serialNumber = index + 1;

        returnStr += '<tr>';
        returnStr += `<td style="border: 1px solid black;">${serialNumber}</td>`;
        returnStr += `<td style="border: 1px solid black;">${misc.misc_name || "N/A"}</td>`;
        returnStr += '<td style="border: 1px solid black;">Anand Kumar</td>';
        returnStr += '<td style="border: 1px solid black;">';
        returnStr += `<h4>Highlights</h4><p>${(misc.top_highlights || "N/A").replace(/\n/g, "<br>")}</p>`;
        returnStr += '</td>';
        returnStr += '</tr>';
    });

    returnStr += '</tbody></table>';
    return returnStr;
};

// Exporting the sendReportEmail function using ES6 syntax
export default { sendReportEmail };
