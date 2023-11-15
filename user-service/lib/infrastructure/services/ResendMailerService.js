import IMailerService from "../../domain/services/IMailerService";
import { Resend } from 'resend'; 

const resend = new Resend('re_5zLhbZ1k_6cEri9RhHrPXvxs7egzuK2Lp');

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