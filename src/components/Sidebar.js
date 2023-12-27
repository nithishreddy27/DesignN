import styles from "./Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.rm} href="/cloudFile/cfile">
        <div className={styles.item}>Home</div>
      </Link>

      <Link href="/cloudFile/all" className={styles.rm}>
        <div className={styles.item}>All</div>
      </Link>

      <Link href="/cloudFile/files" className={styles.rm}>
        <div className={styles.item}>Documents</div>
      </Link>

      <Link href="/cloudFile/videos" className={styles.rm}>
        <div className={styles.item}>Videos</div>
      </Link>

      <Link href="/cloudFile/photos" className={styles.rm}>
        <div className={styles.item}>Photos</div>
      </Link>

      <div className={styles.log}>
        Logout
      </div>
    </div>
  );
}