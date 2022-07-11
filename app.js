const express = require('express');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const app = express();
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'faiyazrahman03@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: 'Faiyaz Rahman <faiyazrahman03@gmail.com>',
      to: 'faiyazrahman05@gmail.com',
      subject: 'Hello from working googleAPI',
      text: 'Hello mann, this iss working',
      html: '<h1>WE DID IT!</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then(result => {
    console.log('🚀 ~ file: app.js ~ line 44 ~ sendMail ~ result', result);
  })
  .catch(error => console.log('Error', error.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Sever is alive on PORT:${PORT}`));
