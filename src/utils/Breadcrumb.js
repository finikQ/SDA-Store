import Link from "next/link";

import styles from "./breadcrumb.module.css";
import Image from "next/image";

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <nav>
      <ul className={styles.breadcrumb__list}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li className={styles.breadcrumb__li} key={breadcrumb.title}>
            {index !== 0 && (
              <Image
                src="/breadcrumbs/Right-chevron.svg"
                alt="Right-chevron"
                width={16}
                height={16}
              />
            )}
            {breadcrumb.link ? (
              <Link className={styles.breadcrumb__link} href={breadcrumb.link}>
                {breadcrumb.title}
              </Link>
            ) : (
              <span>{breadcrumb.title}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
//
export default Breadcrumb;
