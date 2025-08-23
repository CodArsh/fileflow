const nodeMailer = require('nodemailer')
const moment = require('moment')
const connection = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
})

// utils/formatFileSize.ts
const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";

    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    const size = bytes / Math.pow(1024, i);

    return `${size.toFixed(2)} ${sizes[i]}`;
};


const getEmailTemplate = (filename, email, link, type, size, createdAt) => {
    return `
    <!doctype html>
    <html lang="en">
    <body style="margin:0;padding:0;background:#f3f6fb;">
        <!-- Preheader (hidden preview text) -->
        <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f3f6fb;">
        Your file is ready to download. This link will expire on {{expires_on}}.
        </div>

        <!-- Wrapper -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f3f6fb;margin:0;padding:24px;">
        <tr>
            <td align="center" style="padding:0;margin:0;">
            <!-- Container -->
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e6ecf5;">
                <!-- Header -->
                <tr>
                <td align="left" style="padding:24px 24px 12px 24px;background:#0a66ff;">
                    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:24px;color:#ffffff;">
                    Docmate
                    </h1>
                    <p style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#dce8ff;">
                    India's best and secure file sharing platform
                    </p>
                </td>
                </tr>

                <!-- Body -->
                <tr>
                <td style="padding:20px 24px 8px 24px;">
                    <p style="margin:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1f2d3d;">
                    Hello dear,
                    </p>
                    <p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#46566e;">
                    Arsil Malek has shared a file with you. Use the button below to download it securely. For your safety, the link will expire after the validity period.
                    </p>

                    <!-- File Card -->
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border:1px solid #e9eef6;border-radius:8px;">
                    <tr>
                        <td style="padding:16px;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                            <td valign="top" width="44" style="padding-right:12px;">
                                <!-- Simple icon block -->
                                <div style="width:40px;height:40px;border-radius:8px;background:#eef4ff;text-align:center;line-height:40px;font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#0a66ff;">
                                ⬇️
                                </div>
                            </td>
                            <td valign="top">
                                <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:20px;color:#1f2d3d;font-weight:bold;">
                                ${filename}
                                </p>
                                <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#5b6b82;">
                                Type: ${type} &nbsp;•&nbsp; Size: ${formatFileSize(size)}
                                </p>
                                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#7b8aa0;">
                                Created on: ${moment(createdAt).format("DD MMM YYYY, hh:mm A")}&nbsp;
                                </p>
                                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#7b8aa0;">
                                Uploaded on: ${moment(new Date()).format("DD MMM YYYY, hh:mm A")}&nbsp;
                                </p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:6px 16px 16px 16px;">
                        <a href="${link}"
                            style="display:inline-block;background:#0a66ff;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:16px;padding:12px 18px;border-radius:6px;">
                            Download File
                        </a>
                        </td>
                    </tr>
                    </table>

                    <!-- Fallback link 
                    <p style="margin:16px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#7b8aa0;">
                    Trouble with the button? Copy and paste this URL into your browser:<br>
                    <span style="word-break:break-all;color:#0a66ff;">{${link}}</span>
                    </p>
                    -->

                    <!-- Security note -->
                    <div style="margin:16px 0 0 0;padding:12px 14px;background:#f8fafc;border:1px solid #e9eef6;border-radius:6px;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#55657a;">
                        🔒 For security, this link is single-use and time-limited. If it expires, ask Arsil Malek to resend a new link.
                    </p>
                    </div>
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                <td style="padding:18px 24px 24px 24px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#7b8aa0;">
                    Need help? Contact us at <a href="mailto:arsil8356@gmail.com" style="color:#0a66ff;text-decoration:none;">arsil8356@gmail.com</a>.
                    </p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:#9aa7b4;">
                    You’re receiving this email because a file was shared with your address (${email}).
                    </p>
                </td>
                </tr>
            </table>

            <!-- Brand line -->
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;margin-top:10px;">
                <tr>
                <td align="center" style="padding:8px 10px;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:#8a97a6;">
                    copyright @2025 - Docmate 
                    </p>
                </td>
                </tr>
            </table>

            </td>
        </tr>
        </table>
    </body>
    </html>
    `
}
const shareFile = async (req, res) => {
    const { filename, email, _id, type, size, createdAt } = req.body
    const link = `http://localhost:8080/file/download/${_id}`
    try {

        const options = {
            from: process.env.SMTP_EMAIL,
            to: 'arsil.m@hashtechy.com',
            subject: 'Docmate FileBox',
            html: getEmailTemplate(filename, email, link, type, size, createdAt),
        }
        await connection.sendMail(options)
        res.status(200).json({ status: 200, message: 'Email sent' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    shareFile
}