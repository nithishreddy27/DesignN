import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import swal from "sweetalert";
import axios from "axios";
import crypto from "crypto";
import { toast } from "react-toastify";
import { useModelContext } from "../../../../src/context/ModalContext";
import { Loading } from "../../../../src/components/Reusables/Loading";
import { StudentLoading } from "../../../../src/components/Reusables/studentLoading";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { useResumeContext } from "../../../../src/context/ResumeContext";
import { useRouter } from "next/router";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const CSV_to_DB = ({
  userDetails,
  paymentDetails,
  numberOfStudentsRegistered,
}) => {
  // const num = 5>10 ? true :  (() => {
  //   console.log("first")
  //   console.log("Condition is false");
  //   return false
  // })();
  // console.log("bool",num)
  const user = JSON.parse(userDetails);
  // console.log(user.numberOfStudents)
  const numberOfStudents = user.numberOfStudents;
  const [btn, setbtn] = useState("Submit Data");
  const { loading, setLoading } = useModelContext();
  const [attributes, setattributes] = useState([]);
  const [sorted, setsorted] = useState([]);
  const [arrayitems, setarrayitems] = useState([]);
  const [data, setdata] = useState([]);
  const [payment, setpayment] = useState();
  const [education, seteducation] = useState([]);
  const [personal, setpersonal] = useState([]);
  const [scount, setscount] = useState(0);
  const [displayError, setDisplayError] = useState();
  const date = new Date();
  const orderId = paymentDetails[0].payment.orderId;
  const { modules, setmodules } = useResumeContext();
  const currentDate = new Date();
  const count = numberOfStudents - numberOfStudentsRegistered;
  const router = useRouter();
  var allModules = [];
  var errorArray = [];
  var flag = false;

  paymentDetails[0].payment.history.map((pay) => {
    if (pay.expiryDate) {
      // console.log("inside")
      const expDate = new Date(pay.expiryDate);
      if (expDate > currentDate) {
        pay.modules.map((module) => {
          allModules.push(module);
        });
      }
    } else {
      pay.modules.map((module) => {
        allModules.push(module);
      });
    }
    flag = true;
  });

  useEffect(() => {
    setmodules(allModules);
  }, [flag]);

  // console.log(allModules)

  const findHistory = (a) => {
    for (var i = 0; i < a.length; i++) {
      if (a[i] > 0) {
        return "H";
      }
    }
    return "NH";
  };

  const parseFile = (event) => {
    setLoading(true);
    Papa.parse(event.target.files[0], {
      header: true,
      complete: (results) => {
        setdata(results.data);
        // console.log(results.data);
      },
    });
    // console.log("data",data);
  };

  useEffect(() => {
    if (data) {
      arrangeData();
    }
  }, [data]);

  const arrangeData = async () => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync("Provast@123", salt, 1000, 64, "sha512")
      .toString("hex");
    const arr = new Array();
    const educationArray = new Array();
    const payArr = new Array();
    const dataArray = new Array();
    const att = new Array();
    const personalArray = new Array();
    for (const key in data[0]) {
      if (key != "hash" || key != "salt") {
        if (data[0].hasOwnProperty(key)) {
          att.push(key);
        }
      }
    }
    // console.log("att",att)
    setattributes(att);

    for (var i = 0; i < data.length - 1 && i < count; i++) {
      // const [displayError, setDisplayError] = useState(false)

      if (i == count - 1) {
        swal(
          "The expected Number of Students cannot be uploaded as Available Limit is only " +
            (numberOfStudents - numberOfStudentsRegistered)
        );
        setsorted("");
        setarrayitems("");
        setdata("");
        setpayment("");
        seteducation("");
        setpersonal("");
        setattributes("");
        router.push("/dashboard/college/students");
      }

      const itemarray = new Array();
      for (const key in data[i]) {
        if (key != "hash" || key != salt) {
          if (data[i].hasOwnProperty(key)) {
            if (data[i][key] === undefined) {
              itemarray.push("ND");
            }
            itemarray.push(data[i][key]);
          }
        }
      }

      dataArray.push(itemarray);

      function validateEmail(email) {
        const atIndex = email.indexOf("@");
        if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
          return false;
        }

        const dotIndex = email.lastIndexOf(".");
        if (
          dotIndex === -1 ||
          dotIndex < atIndex ||
          dotIndex === email.length - 1
        ) {
          return false;
        }

        return true;
      }

      if (data[i]["Student Mail ID"]) {
      } else {
        data[i]["Student Mail ID"] = data[i]["College Mail ID"];
      }
      if (data[i]["College Mail ID"]) {
      } else {
        data[i]["College Mail ID"] = data[i]["Student Mail ID"];
      }

      if (
        validateEmail(data[i]["Student Mail ID"]) == false ||
        validateEmail(data[i]["College Mail ID"]) == false
      ) {
        toast.error("Mail IDs is Incorrect in Row" + (i + 1), {
          toastId: "Mail IDs is Incorrect",
        });
        return;  
      }
      if (data[i]["Alternative Mobile Number"] === undefined) {
        data[i]["Alternative Mobile Number"] = data[i]["Student Mobile"];
      }
      console.log("email",data[i]["College Mail ID"])
      const stat = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/checkmail`,
        { email: data[i]["College Mail ID"] }
      );
      if (stat.data.status === "Ok") {
        toast.error(
          data[i]["College Mail ID"] + " Already Registered with Provast"
        );
        errorArray.push(i);
      }

      if (data[i]["B.Tech I Year I Sem"]) {
      } else {
        data[i]["B.Tech I Year I Sem"] = "NA";
      }
      if (data[i]["B.Tech I Year II Sem"]) {
      } else {
        data[i]["B.Tech I Year II Sem"] = "NA";
      }
      if (data[i]["B.Tech II Year I Sem"]) {
      } else {
        data[i]["B.Tech II Year I Sem"] = "NA";
      }
      if (data[i]["B.Tech II Year II Sem"]) {
      } else {
        data[i]["B.Tech II Year II Sem"] = "NA";
      }
      if (data[i]["B.Tech III Year I Sem"]) {
      } else {
        data[i]["B.Tech III Year I Sem"] = "NA";
      }
      if (data[i]["B.Tech III Year II Sem"]) {
      } else {
        data[i]["B.Tech III Year II Sem"] = "NA";
      }
      if (data[i]["B.Tech IV Year I Sem"]) {
      } else {
        data[i]["B.Tech IV Year I Sem"] = "NA";
      }
      if (data[i]["B.Tech IV Year II Sem"]) {
      } else {
        data[i]["B.Tech IV Year II Sem"] = "NA";
      }

      if (data[i]["Backlogs1"]) {
      } else {
        data[i]["Backlogs1"] = "NA";
      }
      if (data[i]["Backlogs2"]) {
      } else {
        data[i]["Backlogs2"] = "NA";
      }
      if (data[i]["Backlogs3"]) {
      } else {
        data[i]["Backlogs3"] = "NA";
      }
      if (data[i]["Backlogs4"]) {
      } else {
        data[i]["Backlogs4"] = "NA";
      }
      if (data[i]["Backlogs5"]) {
      } else {
        data[i]["Backlogs5"] = "NA";
      }
      if (data[i]["Backlogs6"]) {
      } else {
        data[i]["Backlogs6"] = "NA";
      }
      if (data[i]["Backlogs7"]) {
      } else {
        data[i]["Backlogs7"] = "NA";
      }
      if (data[i]["Backlogs8"]) {
      } else {
        data[i]["Backlogs8"] = "NA";
      }
      if (
        data[i]["EAMCET/JEE/MGMT/SPOT"] === "MGMT" ||
        data[i]["EAMCET/JEE/MGMT/SPOT"] === "SPOT"
      ) {
        data[i]["RANK"] = "NA";
      }

      const item = {
        email: data[i]["College Mail ID"],
        personalEmail: data[i]["Student Mail ID"],
        hash: hash,
        salt: salt,
        placed: false,
        detailsAvailable: true,
        academicsAvailable: true,
        profile: {
          firstName: data[i]["First Name"]
            ? data[i]["First Name"]
            : (() => {
                toast.error(
                  "First Name is not present at " + data[i]["S.No"] + " row"
                );
                errorArray.push(i);
              })(),
          middleName: data[i]["Middle Name"],
          lastName: data[i]["Last Name"]
            ? data[i]["Last Name"]
            : (() => {
                toast.error(
                  "Last Name is not present at " + data[i]["S.No"] + " row"
                );
                errorArray.push(i);
              })(),
          verified: true,
          frozen: false,
        },
        phone: {
          value: data[i]["Student Mobile"]
            ? Number(data[i]["Student Mobile"])
              ? data[i]["Student Mobile"]
              : (() => {
                  toast.error(
                    " Student Mobile Number is in invalid format " +
                      data[i]["S.No"] +
                      " row"
                  );
                  errorArray.push(i);
                })()
            : (() => {
                toast.error(
                  " Student Mobile Number is not present at " + i + " row"
                );
                errorArray.push(i);
              })(),
          verified: true,
          frozen: false,
        },
        approved: true,
        category: "student",
        rollNumber: {
          value: data[i]["RollNo."]
            ? data[i]["RollNo."]
            : (() => {
                toast.error(
                  "Roll Number is not present at " + data[i]["S.No"] + " row"
                );
                errorArray.push(i);
              })(),
          verified: true,
          frozen: false,
        },
        college: {
          name: user.college.name,
          code: user.college.code,
          campus: "test",
          program: "test",
          specialisation: data[i]["Branch"]
            ? data[i]["Branch"]
            : (() => {
                toast.error(
                  "Branch is not present at " + data[i]["S.No"] + " row"
                );
                errorArray.push(i);
              })(),
          passphrase: user.college.passphrase,
        },
      };

      const per = {
        contact: {
          parents: {
            father: {
              name: data[i]["Father's Name"],
            },
            mother: {
              name: data[i]["Mother's Name"],
            },
          },
          address: data[i]["Address"],
        },
        details: {
          aadhar: data[i]["AADHAR No"].toString(),
          pan: data[i]["PAN Number"].toString(),
          alternativeNumber: data[i]["Alternate Mobile number"],

          dob: data[i][
            "Date of Birth\r\nas per SSC\r\n(DD-MON-YYYY) /(DD/MM/YY)"
          ],
          // dob: data[i]["Date of Birth as per SSC (DD-MON-YYYY) /(DD/MM/YY)"] ? Date.parse(data[i]["Date of Birth as per SSC (DD-MON-YYYY) /(DD/MM/YY)"]) ? data[i]["Date of Birth as per SSC (DD-MON-YYYY) /(DD/MM/YY)"]  : (() => {
          //   toast.error(" Date is in invalid format "+data[i]["S.No"]+" row");
          //   errorArray.push(i)
          // })() : (() => {
          //   toast.error(" Date is not present at "+data[i]["S.No"]+" row");
          //   errorArray.push(i)
          // })() ,
          gender: data[i]["Gender"],

          //   gender:data[i]["Gender"]  ? data[i]["Gender"] :  (() => {
          //   toast.error("Gender is not present at "+data[i]["S.No"]+" row");
          //   errorArray.push(i)
          // })(),
        },
      };

      console.log("marks", Number(data[i]["Total Backlogs"]));
      const education = {
        marks: {
          tenth: {
            percentage: data[i]["TENTH %"]
              ? Number(data[i]["TENTH %"])
                ? data[i]["TENTH %"]
                : (() => {
                    toast.error(
                      " Tenth percentage is in invalid format " +
                        data[i]["S.No"] +
                        " row"
                    );
                    errorArray.push(i);
                  })()
              : (() => {
                  toast.error(
                    "Tenth percentage is not present at " + i + " row"
                  );
                  errorArray.push(i);
                })(),

            yearofpass: data[i]["TENTH YEAR OF PASSING"]
              ? Number(data[i]["TENTH YEAR OF PASSING"])
                ? data[i]["TENTH YEAR OF PASSING"]
                : (() => {
                    toast.error(
                      " Tenth Year  is in invalid format " +
                        data[i]["S.No"] +
                        " row"
                    );
                    errorArray.push(i);
                  })()
              : (() => {
                  toast.error("Tenth Year is not present at " + i + " row");
                  errorArray.push(i);
                })(),

            board: data[i]["SSC/CBSE/ICSE/ DETAILS"]
              ? data[i]["SSC/CBSE/ICSE/ DETAILS"]
              : (() => {
                  toast.error(
                    "Board type is not present at " + data[i]["S.No"] + " row"
                  );
                  errorArray.push(i);
                })(),
          },
          inter: {
            percentage: data[i]["INTER %"]
            ? Number(data[i]["INTER %"])
              ? data[i]["INTER %"]
              : (() => {
                  toast.error(
                    " INTER percentage is in invalid format " +
                      data[i]["S.No"] +
                      " row"
                  );
                  errorArray.push(i);
                })()
            : (() => {
                toast.error(
                  "Inter percentage is not present at " + i + " row"
                );
                errorArray.push(i);
              })(),
            yearofpass: data[i]["INTER YEAR OF PASSING"]
              ? Number(data[i]["INTER YEAR OF PASSING"])
                ? data[i]["INTER YEAR OF PASSING"]
                : (() => {
                    toast.error(
                      " Inter Year of pass  is in invalid format " +
                        data[i]["S.No"] +
                        " row"
                    );
                    errorArray.push(i);
                  })()
              : (() => {
                  toast.error(
                    "Inter Year of passing is not present at " + i + " row"
                  );
                  errorArray.push(i);
                })(),
          },

          undergraduate: {
            semester: [
              {
                semester: 1,
                gpa: data[i]["B.Tech I Year I Sem"]
                  ? data[i]["B.Tech I Year I Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech I Year I Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech I Year I Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs1"] == "NA" ? 0 : data[i]["Backlogs1"],
              },
              {
                semester: 2,
                gpa: data[i]["B.Tech I Year II Sem"]
                  ? data[i]["B.Tech I Year II Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech I Year II Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech I Year II Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs2"] == "NA" ? 0 : data[i]["Backlogs2"],
              },
              {
                semester: 3,
                gpa: data[i]["B.Tech II Year I Sem"]
                  ? data[i]["B.Tech II Year I Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech II Year I Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech II Year I Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs3"] == "NA" ? 0 : data[i]["Backlogs3"],
              },
              {
                semester: 4,
                gpa: data[i]["B.Tech II Year II Sem"]
                  ? data[i]["B.Tech II Year II Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech II Year II Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech II Year II Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs4"] == "NA" ? 0 : data[i]["Backlogs4"],
              },
              {
                semester: 5,
                gpa: data[i]["B.Tech III Year I Sem"]
                  ? data[i]["B.Tech III Year I Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech III Year I Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech III Year I Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs5"] == "NA" ? 0 : data[i]["Backlogs5"],
              },
              {
                semester: 6,
                gpa: data[i]["B.Tech III Year II Sem"]
                  ? data[i]["B.Tech III Year II Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech III Year II Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech III Year II Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs6"] == "NA" ? 0 : data[i]["Backlogs6"],
              },
              {
                semester: 7,
                gpa: data[i]["B.Tech IV Year I Sem"]
                  ? data[i]["B.Tech IV Year I Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech IV Year I Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech IV Year I Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs7"] == "NA" ? 0 : data[i]["Backlogs7"],
              },
              {
                semester: 8,
                gpa: data[i]["B.Tech IV Year II Sem"]
                  ? data[i]["B.Tech IV Year II Sem"] == "NA"
                    ? 0
                    : data[i]["B.Tech IV Year II Sem"]
                  : (() => {
                      toast.error(
                        "B.Tech IV Year II Sem is not present at " +
                          data[i]["S.No"] +
                          " row"
                      );
                      errorArray.push(i);
                    })(),
                backlogs:
                  data[i]["Backlogs8"] == "NA" ? 0 : data[i]["Backlogs8"],
              },
            ],

            entrance: data[i]["EAMCET/JEE/MGMT/SPOT"]
              ? data[i]["EAMCET/JEE/MGMT/SPOT"]
              : (() => {
                  toast.error(
                    "Entrance column is empty at " + data[i]["S.No"] + " row"
                  );
                  errorArray.push(i);
                })(),

            rank: data[i]["RANK"],

            cgpa: data[i]["CGPA"]
              ? data[i]["CGPA"]
              : (() => {
                  toast.error(
                    "CGPA is not present at " + data[i]["S.No"] + " row"
                  );
                  errorArray.push(i);
                })(),

            percentage: data[i]["Btech Percentage"]
              ? data[i]["Btech Percentage"]
              : (() => {
                  toast.error(
                    "BTECH percentage is not present at " +
                      data[i]["S.No"] +
                      " row"
                  );
                  errorArray.push(i);
                })(),

            totalbacklogs: data[i]["Total Backlogs"]
              ? data[i]["Total Backlogs"]
              : (() => {
                  toast.error("Total backlogs is not present at " + i + " row");
                  errorArray.push(i);
                })(),

            history: Boolean(data[i]["History"] == "H" ? 1 : 0),
          },
        },
      };

      const pay = {
        paymentId: "testing",
        amount: "250",
        college: data[i].collegename,
        email: data[i]["Student Mail ID"],
        phone: data[i]["Student Mobile"],
        category: "CPAID",
        plan: "Premium",
        modules: allModules,
        expiryDate: date.setFullYear(date.getFullYear() + 1),
      };

      arr.push(item);

      educationArray.push(education);
      payArr.push(pay);
      personalArray.push(per);
      setscount(scount++);
      // console.log("Education : ",education)
      // console.log("personal",personalArray);
      // console.log("sorted",sorted);
    }

    // console.log("display error",errorArray);
    setDisplayError(errorArray);
    setsorted(arr);
    setarrayitems(dataArray);
    setpayment(payArr);
    seteducation(educationArray);
    setpersonal(personalArray);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setbtn("Submitting...");
    setLoading(true);
    e.preventDefault();
    console.log(sorted);
    console.log(payment);
    console.log("Array items", arrayitems);
    console.log(attributes);
    try {
      const status = axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/addbulkstudents`,
        { sorted, payment, education, personal, orderId }
      );
      if (status) {
        setLoading(false);
        toast.success("Data Added into the DataBase");
        setbtn("Submitted");
      }
    } catch (error) {
      // console.log("error", error);
    }
  };
  const handleDownload = () => {
    // Create a dummy CSV data
    const csvData =
      "S.No,RollNo.,First Name,Middle Name,Last Name,Father's Name,Mother's Name,Date of Birth as per SSC (DD-MON-YYYY) /(DD/MM/YY),Branch,Gender,TENTH MAX MARKS,TENTH MARKS,TENTH %,SSC/CBSE/ICSE/ DETAILS,TENTH YEAR OF PASSING,INTER MAX MARKS,INTER MARKS,INTER %,INTER YEAR OF PASSING,EAMCET/JEE/MGMT/SPOT,RANK,B.Tech I Year I Sem,Backlogs1,B.Tech I Year II Sem,Backlogs2,B.Tech II Year I Sem,Backlogs3,B.Tech II Year II Sem,Backlogs4,B.Tech III Year I Sem,Backlogs5,B.Tech III Year II Sem,Backlogs6,B.Tech IV Year I Sem,Backlogs7,B.Tech IV Year II Sem,Backlogs8,CGPA,Btech Percentage,Total Backlogs,History,College Mail ID,Student Mail ID,Student Mobile,Alternate Mobile number,AADHAR No,PAN Number,Address";
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
    link.download = "SampleStudentDataTemplate.csv";
    link.click();
  };

  return (
    <div>
      <div className="pt-24 mb-10 flex justify-evenly bg-gradient-to-b from-gray-200 to-white">
        <p className=" tracking-wide">
          Total number of Students :{" "}
          <span className="text-2xl font-semibold "> {numberOfStudents}</span>{" "}
        </p>
        <p className=" tracking-wide">
          Number of Students Already Registered :
          <span className="text-2xl font-semibold ">
            {" "}
            {numberOfStudentsRegistered}
          </span>
        </p>
        <p className=" tracking-wide">
          Total number of Students Available :
          <span className="text-2xl font-semibold ">
            {" "}
            {numberOfStudents - numberOfStudentsRegistered}
          </span>{" "}
        </p>
      </div>
      {loading && <StudentLoading scount={scount} />}
      <div className="flex justify-center gap-10">
        <button
          className="bg-orange-600 flex gap-2 justify center text-white rounded-lg h-11 my-auto px-4 py-2  hover:bg-green-600"
          onClick={handleDownload}
        >
          <MdFileDownload size={30} className="animate-pulse" />{" "}
          <p className="mt-0.5">Sample Template</p>
        </button>
        <label className="w-64 flex flex-col items-center px-2 py-5 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border-orange-600 border-2 border-blue cursor-pointer hover:bg-neutral-200">
          <MdFileUpload size={35} className="my-auto mr-3 animate-bounce" />
          {/* <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" /> */}

          <span className=" text-sm leading-normal">Select a file</span>
          <input
            type="file"
            name="file"
            placeholder="Upload Only CSV"
            className="hidden"
            onChange={parseFile}
            accept=".csv"
          />
        </label>

        <button
          className="bg-orange-600 flex gap-2 justify-center text-white rounded-lg w-48 h-11 my-auto px-4 py-2  hover:bg-green-600"
          onClick={handleSubmit}
        >
          <FiCheckCircle size={25} className="animate-pulse" />
          <div className="my-0.5">{btn}</div>
        </button>
      </div>
      {sorted && (
        <div className="overflow-auto mt-8">
          <table className="table-row overflow-scroll border border-collapse border-slate-400">
            <thead className="font-medium">
              <tr className="h-3 border-slate-300 hover:bg-neutral-100">
                {attributes &&
                  attributes.map((item) => {
                    return (
                      <>
                        <td
                          scope="col"
                          className="px-6 py-4 text-sm tracking-wider font-semibold border border-slate-500 bg-orange-500 whitespace-nowrap"
                        >
                          {item}
                          {/* <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 ml-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          
                          onChange={(e) => {
                          }}
                        /> */}
                        </td>
                      </>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {arrayitems &&
                arrayitems.map((item, index) => {
                  return (
                    <>
                      {/* {console.log("ind",displayError,index,errorArray.includes(index))} */}

                      {displayError.includes(index) && (
                        <tr className="h-10 border-2 border-slate-300 bg-red-300 hover:bg-red-200">
                          {item.map((i) => {
                            return (
                              <td
                                scope="col"
                                className="px-6 py-1 text-xs border border-slate-300  hover:bg-red-300 whitespace-nowrap"
                              >
                                {i}
                              </td>
                            );
                          })}
                        </tr>
                      )}
                      {!displayError.includes(index) && (
                        <tr className="h-10 border-2 border-slate-300 hover:bg-neutral-200">
                          {item.map((i) => {
                            return (
                              <td
                                scope="col"
                                className="px-6 py-1 text-xs border border-slate-300  hover:bg-neutral-300 whitespace-nowrap"
                              >
                                {i}
                              </td>
                            );
                          })}
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const paymentDetails = new Array();
  await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/${user._id}`)
    .then((res) => res.json())
    .then((res) => {
      paymentDetails.push(res);
    });
  var numberOfStudents;
  if (paymentDetails) {
    const orderId = paymentDetails[0].payment.orderId;
    console.log("user", orderId);

    var numberOfStudentsRegistered;

    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/college/details/orderId?orderId=${orderId}`
    );
    numberOfStudentsRegistered = data.data.students.length;
    // console.log("disp",numberOfStudentsRegistered)
  }

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (user && !user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (user && user.category !== "college") {
    return {
      redirect: {
        destination: "/dashbaord/" + user.category,
        permanent: false,
      },
    };
  }
  if (!user.approved) {
    return {
      redirect: {
        destination: "/approvalpending",
        permanent: false,
      },
    };
  }
  return {
    props: {
      userDetails: JSON.stringify(user),
      paymentDetails: paymentDetails,
      numberOfStudentsRegistered: numberOfStudentsRegistered - 1,
    },
  };
};

export default CSV_to_DB;
