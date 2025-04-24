export declare function sendMail({ to, subject, html }: {
    to: string;
    subject: string;
    html: string;
}): Promise<void>;
