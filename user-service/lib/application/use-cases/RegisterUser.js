'use strict';

import User from '../../domain/entities/User';

export default async (username, email, password, { userRepository, accessTokenManager, mailerService }) => {
  if (username.length < 4) {
    throw Object.assign(new Error("username must be atleast 4 letters long."), {statusCode: 403});
  }

  if (password.length < 8) {
    throw Object.assign(new Error("password must be atleast 8 characters long."), {statusCode: 403});
  }
  
  const verificationCode = await accessTokenManager.generate({ username: username}, '1h');
  const verificationLink = `http://localhost:3000/verify/${verificationCode}`;
  const mail = await mailerService.sendMail({
    to: email,
    subject: "<BitWarriors/> :: Email Verification",
    html: `<p>Dear user,</p>
    <p>Thank you for registering! Please verify your email address by clicking <a href="${verificationLink}">here</a>.</p>
    <p>If the link doesn't work, please copy and paste the following URL into your browser:</p>
    <p>${verificationLink}</p>
    <p>Best regards,</p>
    <p>~ <b>BitWarriors</b></p>`
  });

  if (!mail) {
    // todo: Decouple statusCode!
    throw Object.assign(new Error("could not send verification email"), { statusCode: 503 });
  }

  const user = new User(username, email, password);

  return userRepository.persist(user);
};