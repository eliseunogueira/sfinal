const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const enviaEmail = async (certificadoId, email) => {
  try {
    const emailToken = jwt.sign(
      {
        certificadoId: certificadoId,
      },
      process.env.CERT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    const urlap = `http://localhost:8081/aprovado/${emailToken}`;
    const urlrp = `http://localhost:8081/reprovado/${emailToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Confirm Email',
      html: `<a href="${urlap}">Aprovado</a><br/>|<a href="${urlrp}">Reprovado</a>`,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = enviaEmail;
