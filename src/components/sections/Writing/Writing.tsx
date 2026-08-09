import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { posts } from "../../../constants/posts";
import SectionHeading from "../../common/SectionHeading";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import styles from "./Writing.module.css";

export default function Writing() {
  const listRef = useScrollReveal<HTMLDivElement>({
    type: "up",
    selector: `.${styles.row}`,
    y: 28,
    stagger: 0.09,
    start: "top 86%",
  });

  return (
    <section id="writing" className={styles.writing}>
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Writing"
          title="Notes from building the things above."
          description="Long-form write-ups on the architecture, trade-offs, and dead ends behind each project."
        />

        <div ref={listRef} className={styles.list}>
          {posts.map((post) => (
            <a key={post.slug} href={post.url} className={styles.row} data-cursor="interactive">
              <div>
                <div className={styles.meta}>
                  <span className={styles.tag}>{post.tag}</span>
                  <time className={styles.date} dateTime={post.date}>
                    {post.dateDisplay}
                  </time>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                <HiOutlineArrowUpRight />
              </span>
            </a>
          ))}
        </div>

        <div className={styles.footerRow}>
          <a href="/blog.html" className={styles.allLink} data-cursor="interactive">
            View all articles <HiOutlineArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
