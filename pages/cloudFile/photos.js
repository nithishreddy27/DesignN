import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Sidebar from "../../src/components/Sidebar";
// import Sidebar from "../components/Sidebar";


export default function Photos() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("cloud-user");
    if (user === null) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("cloud-user");

    (async () => {
      try {
        const response = await fetch(`/api/files?search=${user}`);
        const data = await response.json();
        let images = [];
        data.map((item) => {
          if (item.type === "image") {
            images.push(item);
          }
          setImages(images);
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div>
      <Head>
        <title>CloudDrop</title>
        <meta name="description" content="Clouddrop" />
      </Head>
      <div className={styles.homeflex}>
        <Sidebar />
        <div className={styles.home}>
          <h1 className={styles.homehead}>CloudDrop</h1>
          <h2 className={styles.head2}>Images</h2>

          {images.length > 0 ? (
            <div className={styles.box1}>
              {images.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}