import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { certifications } from "../../../constants/data";
import GlowCard from "../../common/GlowCard";
import EmptyState from "./EmptyState";
import styles from "./CertificationsTab.module.css";

export default function CertificationsTab() {
  if (certifications.length === 0) {
    return (
      <EmptyState
        title="Certifications coming soon"
        description="Credentials haven't been listed here yet. The Projects section shows the applied work in the meantime."
      />
    );
  }

  return (
    <div className={styles.grid}>
      {certifications.map((cert) => {
        const meta = [cert.organization, cert.date].filter(Boolean).join(" · ");

        const body = (
          <>
            <div className={styles.iconWrap}>
              <cert.icon />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{cert.name}</h3>
              {meta && <span className={styles.org}>{meta}</span>}
            </div>
            {cert.credentialUrl && <HiOutlineArrowUpRight className={styles.arrow} />}
          </>
        );

        return (
          <GlowCard key={cert.id} className={styles.card}>
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
                data-cursor="interactive"
              >
                {body}
              </a>
            ) : (
              <div className={styles.link}>{body}</div>
            )}
          </GlowCard>
        );
      })}
    </div>
  );
}
