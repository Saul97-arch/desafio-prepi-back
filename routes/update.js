const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { credentials } = require("../services/spreadsheet");

router.put("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of google Sheets API
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1fO850ZLI6L-1yKVlAaM783VC9usIKg673c4mBuECGWo";

  try {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: spreadsheetId,
      range: "F3:F3",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["grooogue"]],
      },
    }).data;
  } catch (err) {
    console.error(err);
  }

  res.send("RONALDO");
});

module.exports = router;
