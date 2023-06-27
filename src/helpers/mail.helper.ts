import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { getHtmlTemplate } from './mail-template.helper';

type SetMailOptions = {
  to: string;
  link?: string;
  subject?: string;
  content?: string;
};

const setMailDetails = ({
  to,
  link,
  subject,
  content,
}: SetMailOptions): MailOptions => ({
  from: process.env.EMAIL_USER,
  to,
  subject,
  text: subject,
  html: getHtmlTemplate({ link, subject, content }),
});

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = (mailDetails: MailOptions) =>
  transporter.sendMail(mailDetails);

export { setMailDetails, sendMail };
