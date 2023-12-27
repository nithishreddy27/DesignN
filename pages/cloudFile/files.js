import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
// import Sidebar from "../components/Sidebar";
import Sidebar from "../../src/components/Sidebar";


export default function Files() {
  const [documents, setDoc] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("cloud-user");
    if (user === null) {
      window.location.href = "/login";
    }

    (async () => {
      try {
        const response = await fetch(`/api/files?search=${user}`);
        const data = await response.json();
        let documents = [];
        data.map((item) => {
          if (item.type === "documents") {
            documents.push(item);
          }
          setDoc(documents);
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>CloudDrop - Files</title>
        <meta name="description" content="Clouddrop" />
      </Head>
      <div className={styles.homeflex}>
        <Sidebar />
        <div className={styles.home}>
          <h1 className={styles.homehead}>CloudDrop</h1>
          <h2 className={styles.head2}>Documents</h2>
          {documents.length > 0 ? (
            <div className={styles.box1}>
              {documents.map((item) => {
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