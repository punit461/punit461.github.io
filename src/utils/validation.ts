export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!values.email.trim()) {
    errors.email = "An email is required to reply.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "That email doesn't look right.";
  }
  if (!values.subject.trim()) errors.subject = "Add a short subject.";
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}
