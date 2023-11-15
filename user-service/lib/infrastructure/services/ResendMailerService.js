import IMailerService from "../../domain/services/IMailerService.js";
import { Resend } from 'resend'; 
import env from '../config/environment.js';

const resend = new Resend(env.RESEND_API_KEY);

export default class extends IMailerService {
    async sendMail({ to, subject, html }) {
        try {
            const data = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: 'delivered@resend.dev',
                subject: subject,
                html: html
            });
            return true;
        } catch (err) {
            return false;
        }
    }
}