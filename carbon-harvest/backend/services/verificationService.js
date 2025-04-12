const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateVerificationToken = (user) => {
  const verificationToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_VERIFICATION_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return verificationToken;
};

const sendVerificationEmail = async (user, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Email Verification',
    html: `<p>Please click this link to verify your email: <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <p>Hello ${name},</p>
            <p>You recently requested to reset your password for your account.</p>
            <p>Please click on the following link to reset your password:</p>
            <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
};

module.exports = { generateVerificationToken, sendVerificationEmail, sendPasswordResetEmail };