// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === "POST") {
      // parse incoming request
      const cred = JSON.parse(req.body);
  
      // option object for first request, filter checks if email already exists in the database
      const options1 = {
        method: "POST",
        headers: {
          Authorization: process.env.XATA,
          "Content-Type": "application/json",
        },
        body: `{"filter":{"email":{"$contains":"${cred.email}"}},"page":{"size":15}}`,
      };
  
      //option object for second request, body contains email and password to create a new user
      const options2 = {
        method: "POST",
        headers: {
          Authorization: process.env.XATA,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      };
  
      (async () => {
        try {
          // check if user already exists
          const response = await fetch(
            `${process.env.database}:main/tables/users/query`,
            options1
          );
          const data = await response.json();
          // returns error message if user exists
          if (data.records.length > 0) {
            return res.status(400).json({ message: "User already exists" });
          } else {
            // create a new user if user does not exist
            const response2 = await fetch(
              `${process.env.database}:main/tables/users/data?columns=id`,
              options2
            );
            const data2 = await response2.json();
            return res.status(200).json(data2);
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "An error occured" });
        }
      })();
    }
  }