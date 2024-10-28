// Import the exeMail module using ES6 syntax
import exeMail from './exesummarymail.js'; // Ensure to include .js for ES6 modules

// Define the getExeMail function
const getExeMail = async (req, res) => {
    try {
        console.log(req.body);
        // Call the sendReportEmail function with req.body
        await exeMail.sendReportEmail(req.body);
        // If the email is sent successfully, respond with a success message
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

// Export the getExeMail function using ES6 syntax
export default getExeMail ;
