'use strict';

import User from '../../domain/entities/User';

export default async (username, email, password, { userRepository, accessTokenManager, mailerService }) => {
  if (username.length < 4) {
    throw new Error("username must be atleast 4 letters long.");
  }

  if (password.length < 8) {
    throw new Error("password must be atleast 8 characters long.");
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
    throw new Error("could not send verification email");
  }

  const user = new User(username, email, password);

  return userRepository.persist(user);
};