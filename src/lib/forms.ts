// Form endpoints. Default: FormSubmit (formsubmit.co), a free service with no account that
// emails each submission to the address in the URL. The first submission triggers a one-time
// activation email to that address. Override with PUBLIC_CONTACT_ENDPOINT /
// PUBLIC_NEWSLETTER_ENDPOINT (e.g. a Formspree form URL) without code changes.
import company from '../data/company.json';

const formsubmit = `https://formsubmit.co/ajax/${company.email}`;

export const contactEndpoint: string =
  (import.meta.env.PUBLIC_CONTACT_ENDPOINT as string | undefined) || formsubmit;
export const newsletterEndpoint: string =
  (import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT as string | undefined) || formsubmit;
