// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === "POST") {
      // parse incoming request
      const cred = JSON.parse(req.body);
      console.log("in clud api ",cred)
      //option object, body contains media file to be uploaded on xata database
      // const options = {
      //   method: "POST",
      //   headers: {
      //     Authorization: process.env.XATA,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(cred),
      // };
  
      (async () => {
        try {
          // upload file to files table on xata
          const response = await fetch(
            `${process.env.database}:main/tables/files/data?columns=id`,
            options
          );
  
          const data = await response.json();
          return res.status(200).json(data);
        } catch (err) {
          return res.status(500).json({ message: "An error occured" });
        }
      })();
    }
  }