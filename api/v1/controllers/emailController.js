import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {user: process.env.CORREO, pass: process.env.CLAVE_CORREO}
});
export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const info = await transporter.sendMail({from: '"EcoRoute" ' + '<' + process.env.CORREO + '>', to, subject, html: htmlContent});
        console.log("Mensaje enviado: %s", info.messageId);
    } catch(error) {
        console.log("Error al enviar el correo: ", error);
    }
};