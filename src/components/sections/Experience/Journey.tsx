import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { experiences, education, awards, certifications } from "../../../constants/data";
import SectionHeading from "../../common/SectionHeading";
import GradientBlobs from "../../common/GradientBlobs";
import ExperienceTimeline from "./ExperienceTimeline";
import EducationTab from "./EducationTab";
import AwardsTab from "./AwardsTab";
import CertificationsTab from "./CertificationsTab";
import styles from "./Journey.module.css";

const TABS = [
  { label: "Experience", value: "experience" },
  { label: "Education", value: "education" },
  { label: "Awards", value: "awards" },
  { label: "Certifications", value: "certifications" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

const TAB_COUNTS: Record<TabValue, number> = {
  experience: experiences.length,
  education: education.length,
  awards: awards.length,
  certifications: certifications.length,
};

/** Open on the first tab that actually has entries. */
const DEFAULT_TAB: TabValue =
  TABS.find((t) => TAB_COUNTS[t.value] > 0)?.value ?? "experience";

export default function Journey() {
  const [tab, setTab] = useState<TabValue>(DEFAULT_TAB);

  return (
    <section id="journey" className={styles.journey}>
      <GradientBlobs />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading
          index="04"
          eyebrow="My Journey"
          title="Where the work happened."
          description="A running record of roles, learning, and recognition — switch tabs to explore each."
        />

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons={false}
          className={styles.tabs}
          slotProps={{ indicator: { className: styles.indicator } }}
        >
          {TABS.map((t) => (
            <Tab
              key={t.value}
              value={t.value}
              label={t.label}
              disableRipple
              className={styles.tab}
              classes={{ selected: styles.tabSelected }}
            />
          ))}
        </Tabs>

        <div className={styles.panel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "experience" && <ExperienceTimeline />}
              {tab === "education" && <EducationTab />}
              {tab === "awards" && <AwardsTab />}
              {tab === "certifications" && <CertificationsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
