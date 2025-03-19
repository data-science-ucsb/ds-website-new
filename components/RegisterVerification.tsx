// import { google } from '@google-cloud/sheets';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const sheets = google.sheets('v4');

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email } = req.body;

//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: 'path/to/your/service-account-key.json',
//       scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
//     });

//     const response = await sheets.spreadsheets.values.get({
//       auth,
//       spreadsheetId: 'YOUR_SPREADSHEET_ID',
//       range: 'Sheet1!A:B', // Adjust based on your sheet structure
//     });

//     const rows = response.data.values;
//     const isMember = rows?.some(row => row[1] === email); // Assuming email is in column B

//     if (isMember) {
//       res.status(200).json({ isMember: true });
//     } else {
//       res.status(200).json({ 
//         isMember: false, 
//         redirect: 'https://your-ecommerce-store.com/membership' 
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error verifying membership' });
//   }
// }