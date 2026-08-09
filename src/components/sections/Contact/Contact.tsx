import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLocationDot,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCircleCheck,
} from "react-icons/fa6";
import { personalInfo } from "../../../constants/data";
import { sendContactMessage } from "../../../services/contactService";
import { validateContactForm, type ContactFormErrors, type ContactFormValues } from "../../../utils/validation";
import SectionHeading from "../../common/SectionHeading";
import FloatingField from "../../common/FloatingField";
import MagneticButton from "../../common/MagneticButton";
import GradientBlobs from "../../common/GradientBlobs";
import styles from "./Contact.module.css";

const EMPTY_FORM: ContactFormValues = { name: "", email: "", subject: "", message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentVia, setSentVia] = useState<"endpoint" | "mailto">("endpoint");

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      const result = await sendContactMessage(values);
      setSentVia(result.via);
      setStatus("success");
      setValues(EMPTY_FORM);
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <GradientBlobs variant="reverse" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          index="06"
          eyebrow="Get In Touch"
          title="Have a project in mind? Let's talk."
          description="Whether it's a full build, a second pair of hands, or just a good technical conversation — my inbox is open."
        />

        <div className={styles.grid}>
          <div className={styles.info}>
            <a href={`mailto:${personalInfo.email}`} className={styles.infoRow} data-cursor="interactive">
              <span className={styles.infoIcon}>
                <FaEnvelope />
              </span>
              <div>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{personalInfo.email}</span>
              </div>
            </a>
            <a
              href="https://github.com/punit461"
              target="_blank"
              rel="noreferrer"
              className={styles.infoRow}
              data-cursor="interactive"
            >
              <span className={styles.infoIcon}>
                <FaGithub />
              </span>
              <div>
                <span className={styles.infoLabel}>GitHub</span>
                <span className={styles.infoValue}>github.com/punit461</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/punit461bhardwaj"
              target="_blank"
              rel="noreferrer"
              className={styles.infoRow}
              data-cursor="interactive"
            >
              <span className={styles.infoIcon}>
                <FaLinkedin />
              </span>
              <div>
                <span className={styles.infoLabel}>LinkedIn</span>
                <span className={styles.infoValue}>in/punit461bhardwaj</span>
              </div>
            </a>
            {personalInfo.location && (
              <div className={styles.infoRow}>
                <span className={styles.infoIcon}>
                  <FaLocationDot />
                </span>
                <div>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>{personalInfo.location}</span>
                </div>
              </div>
            )}

            <div className={styles.socials}>
              {personalInfo.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={styles.socialLink}
                  data-cursor="interactive"
                >
                  <social.icon />
                </a>
              ))}
            </div>

            {personalInfo.location && (
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapGrid} />
                <span className={styles.mapPin}>
                  <FaLocationDot />
                </span>
                <span className={styles.mapLabel}>{personalInfo.location}</span>
              </div>
            )}
          </div>

          <form className={`${styles.form} glass`} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <FloatingField
                label="Your Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <FloatingField
                label="Your Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
            </div>
            <FloatingField
              label="Subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              error={errors.subject}
              required
            />
            <FloatingField
              label="Message"
              name="message"
              as="textarea"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              required
            />

            <MagneticButton
              as="button"
              type="submit"
              variant="solid"
              className={styles.submitBtn}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              <FaPaperPlane />
            </MagneticButton>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={styles.successMsg}
                >
                  <FaCircleCheck />{" "}
                  {sentVia === "mailto"
                    ? "Your email app should be open with the message ready — press send and it reaches me."
                    : "Message sent — I'll get back to you soon."}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={styles.errorMsg}
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
