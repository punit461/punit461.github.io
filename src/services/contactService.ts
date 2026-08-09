import { personalInfo } from "../constants/data";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Endpoint for a real background submit. This site is statically hosted on
 * GitHub Pages, so there's no server of our own to post to.
 *
 * TODO(punit): to receive messages without the visitor's mail client opening,
 * create a free form endpoint (e.g. https://formspree.io or https://web3forms.com)
 * and paste the URL here. Until then we fall back to composing the mail locally,
 * which always reaches you but requires the visitor to press send.
 */
const FORM_ENDPOINT = "";

export type SendResult = { ok: true; via: "endpoint" | "mailto" };

export async function sendContactMessage(
  payload: ContactPayload
): Promise<SendResult> {
  if (FORM_ENDPOINT) {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Form endpoint responded with ${response.status}`);
    }

    return { ok: true, via: "endpoint" };
  }

  // Fallback: hand the message to the visitor's mail client, pre-filled.
  const body = [
    payload.message,
    "",
    "---",
    `From: ${payload.name}`,
    `Reply to: ${payload.email}`,
  ].join("\n");

  const mailto =
    `mailto:${personalInfo.email}` +
    `?subject=${encodeURIComponent(payload.subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  return { ok: true, via: "mailto" };
}
