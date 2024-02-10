import * as nodemailer from 'nodemailer';

const sendMail = async (addres, content) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
            user: 'lincorteamnt@gmail.com',
            pass: 'xbewqqnfarwklaaj',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    await transport.sendMail({
        from: 'lincorteamnt@gmail.com',
        to: addres,
        subject: 'Link for Web Site',
        text: content,
        attachDataUrls: true,
    });
};

export default sendMail;
