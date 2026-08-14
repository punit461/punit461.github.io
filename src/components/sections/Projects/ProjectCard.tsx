import { useState } from "react";
import { FaArrowUpRightFromSquare, FaGithub, FaBookOpen } from "react-icons/fa6";
import type { Project } from "../../../types";
import { useTilt } from "../../../hooks/useTilt";
import { getPostUrl } from "../../../constants/posts";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 6, scale: 1.015 });
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div ref={tiltRef} className={styles.card} data-cursor="interactive">
      <div className={styles.imageWrap}>
        {imageFailed ? (
          <div className={styles.imageFallback} aria-hidden="true">
            <span>{project.title}</span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className={styles.imageOverlay} />
        {project.featured && <span className={styles.featuredBadge}>Featured</span>}
        {project.year && <span className={styles.year}>{project.year}</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.categoryRow}>
          {project.categories.map((cat) => (
            <span key={cat} className={styles.categoryBadge}>
              {cat}
            </span>
          ))}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.reveal}>
          <p className={styles.longDescription}>{project.longDescription}</p>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.links}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.linkBtn}
                aria-label={`${project.title} on GitHub`}
              >
                <FaGithub /> Code
              </a>
            )}
            {project.article && (
              <a
                href={getPostUrl(project.article)}
                className={styles.linkBtn}
                aria-label={`Read the article about ${project.title}`}
              >
                <FaBookOpen /> Article
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className={`${styles.linkBtn} ${styles.linkBtnSolid}`}
                aria-label={`${project.title} live demo`}
              >
                Live Demo <FaArrowUpRightFromSquare />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.glowBorder} aria-hidden="true" />
    </div>
  );
}
