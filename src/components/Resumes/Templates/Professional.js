import Image from "next/image";
import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdSchool } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa";
import { BsFillAwardFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";
export const Professional = React.forwardRef(function NonCore({
  componentRef,
}) {
  const {
    profile,
    social,
    objective,
    education,
    awards,
    certifications,
    projects,
    work,
    skills,
    hobbies,
    languages,
    setdesign,
    layout,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <div
      id="template"
      ref={componentRef}
      style={{ fontFamily: layout?.font }}
      className="flex my-5 w-a4W bg-white mx-auto h-a4H"
    >
      <div>
        <div className="first pt-3">
          <div
            className="w-[150mm] h-[130px]  ml-[60mm] mt-[50px]"
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
          >
            <div
              className="name text-white "
              style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            >
              <h1
                className="pl-[100px] pt-[20px] capitalize text-2xl tracking-wider font-bold text-white bg-black "
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
              >
                {profile?.firstName}
                <span
                  className="pl-2 capitalize text-white "
                  style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
                >
                  {profile?.lastName}
                </span>
              </h1>
              <h2
                className="text-white pl-[100px] pt-2 text-base "
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
              >
                {profile?.role}
              </h2>
            </div>
            <div className="pl-16 pt-2">
              {/* {social?.filter((soc)=>soc?.enabled)?.length>0 && (
                    <div className="social pl-10 pt-1 flex relative">
                  {social?.filter(soc=>soc?.enabled===true).map((item) => (
                      <div className="pr-2">
                        <span>
                          <Link href={item.url}>
                            <img
                              src={
                                "https://www." + item.network + ".com/favicon.ico"
                              }
                              className="w-5 grayscale-[40%]"
                            ></img>
                          </Link>
                        </span>
                      </div>
                    ))}
                  </div>
                )} */}
              {social?.filter((soc) => soc?.enabled)?.length > 0 && (
                <div className="social  pt-1 pb-2 pl-[30px] flex">
                  {social
                    ?.filter((soc) => soc?.enabled === true)
                    .map((item) => (
                      <div className="pr-3">
                        <div className="flex">
                          <Link href={item.url}>
                            <img
                              src={
                                "https://www." +
                                item.network +
                                ".com/favicon.ico"
                              }
                              className="w-5 grayscale-[40%]"
                            ></img>
                          </Link>
                          <span className="pl-1 text-sm text-white">
                            {item.username}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="photo relative top-[-170px] left-[80px]">
            <img
              src={profile?.image}
              className="w-[200px] h-[200px] rounded-full border-[12px] "
              style={{ borderColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
              id="profileImage"
            ></img>
          </div>

          {objective && (
            <>
              {objective != 0 && (
                <>
                  <div className="career-objective w-[190mm] pt-3 relative top-[-170px] left-[50px] text-sm">
                    {/* <h2 className="text-center text-base font-serif font-semibold heading   border-b-[4px] border-black pt-2 pb-1">
                    P R O F I L E
                  </h2> */}
                    <div className="pt-2">
                      <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="second relative top-[-170px] flex">
          <div className="third  w-[40%]">
            <h2 className="text-center text-base font-serif font-semibold heading mx-3 pt-3 pb-1 border-b-[4px] border-black">
              N E T W O R K
            </h2>
            <div className="contact">
              {profile?.dob && (
                <div className="dob pl-8 pt-5">
                  <MdDateRange className="inline"></MdDateRange>
                  <span className="text-sm relative top-[2px] left-2">
                    {profile?.dob}
                  </span>
                </div>
              )}
              <div className="phone pl-8 pt-1">
                <BsTelephone className="inline"></BsTelephone>
                <span className="text-sm relative top-[2px] left-2">
                  {profile?.phone}
                </span>
              </div>
              <div className="mail pl-8 pt-1">
                <FiMail className="inline"></FiMail>
                {profile?.displayEmail === "collegeMail" && (
                  <span className="text-sm relative top-[2px] left-2">
                    {profile?.email}
                  </span>
                )}
                {profile?.displayEmail === "personalMail" && (
                  <span className="text-sm relative top-[2px] left-2">
                    {profile?.personalEmail}
                  </span>
                )}
              </div>
            </div>
            {education?.filter((edu) => edu?.enabled)?.length > 0 && (
              <div className="education mx-3">
                <div className="pb-2">
                  <h2 className="text-center text-base font-serif font-semibold heading  pt-3 pb-1 border-b-[4px] border-black">
                    E D U C A T I O N
                  </h2>
                  <div className="py-2">
                    {education
                      ?.filter((edu) => edu?.enabled === true)
                      .map((item) => (
                        <div className="pl-5 pr-5 pt-2 text-sm">
                          {/* <MdSchool className="inline text-lg relative right-1 bottom-[2px]"></MdSchool> */}
                          <span className="font-medium">
                            ➣ {item.institution}
                          </span>{" "}
                          in{" "}
                          <span className="font-medium">
                            {item.fieldOfStudy}
                            <br />({item.startDate.slice(0, 4)} -{" "}
                            {item.endDate.slice(0, 4)})
                          </span>
                          <br />
                          <i className="bx bxs-graduation"></i>{" "}
                          {item.typeOfDegree} in {item.fieldOfStudy} ({item.gpa}
                          )
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {certifications?.filter((cert) => cert?.enabled)?.length > 0 && (
              <div className="certifications mx-3">
                <div className="pb-2">
                  <h2 className="text-center text-base font-serif font-semibold heading  border-b-[4px] border-black pt-2 pb-1">
                    C E R T I F I C A T I O N S
                  </h2>
                  <div className="py-2">
                    {certifications
                      ?.filter((cert) => cert?.enabled === true)
                      .map((item) => (
                        <div className="pl-5 pr-2 pt-2 text-sm">
                          {/* <FaSquareFull className="inline text-[10px] relative right-1 bottom-[2px]"></FaSquareFull> */}
                          <i className="bx bxs-square text-xs pr-3"></i>➣{" "}
                          {item.title} from {item.issuer}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
              <div className="hobbies mx-3">
                <div className=" pb-2">
                  <h2 className="text-center text-base font-serif font-semibold  heading pt-1 pb-1 border-b-[4px] border-black">
                    H O B B I E S
                  </h2>
                  <div className="pt-1 pl-5">
                    {hobbies
                      ?.filter((hob) => hob?.enabled === true)
                      .map((item) => (
                        <span className="pr-2 text-sm">{item.name} </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
              <div className="skills mx-3">
                <div className="">
                  <h2 className="text-center text-base font-serif font-semibold  heading pt-1 pb-1 border-b-[4px] border-black">
                    S K I L L S
                  </h2>
                  <div className="pt-1 pl-5 ">
                    {skills
                      ?.filter((skill) => skill?.enabled === true)
                      .map((item) => (
                        <span className="pr-2 text-sm">{item.name} </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="fourth w-[60%]">
            {work?.filter((wor) => wor?.enabled)?.length > 0 && (
              <div className="experience mx-3">
                <h2 className="text-center text-base font-serif font-semibold  heading pt-3 pb-1 border-b-[4px] mx-3 border-black">
                  E X P E R I E N C E
                </h2>
                <div className="pb-1 py-2">
                  {work
                    ?.filter((wor) => wor?.enabled === true)
                    .map((item) => (
                      <div className="pl-10 pr-5 pt-1 text-sm">
                        {/* <MdWork className="inline relative bottom-[2px] right-1"></MdWork> */}
                        <span className="font-medium  pr-3 py-1">
                          ➣ {item.designation} in {item.company}
                        </span>
                        <br></br>({item.from.slice(0, 4)} -{" "}
                        {item.to.slice(0, 4)})<br />
                        <Link href={item.website}>{item.website}</Link>
                        <br></br>
                        {item.summary.enabled && (
                          <span className="text-sm markdown">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {projects?.filter((pro) => pro?.enabled)?.length > 0 && (
              <div className="projects mx-3">
                <h2 className="text-center text-base font-serif font-semibold pb-1  heading pt-3 border-b-[4px] mx-1 border-black">
                  P R O J E C T S
                </h2>
                <div className="py-2">
                  {projects
                    ?.filter((pro) => pro?.enabled === true)
                    .map((item) => (
                      <div className="pl-10 pr-5 text-sm pt-1">
                        {/* <FaSquareFull className="inline text-[10px] relative right-1 bottom-[2px]"></FaSquareFull> */}
                        <span className="font-medium pr-3 py-1">
                          ➣ {item.name}
                        </span>{" "}
                        ({item.from.slice(0, 4)} - {item.to.slice(0, 4)})<br />
                        <Link href={item.website}>{item.website}</Link>
                        <br></br>
                        {item.summary.enabled && (
                          <span className="markdown">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {awards?.filter((awa) => awa?.enabled)?.length > 0 && (
              <div className="awards mx-3">
                <h2 className="text-center text-base font-serif pb-1 font-semibold  heading pt-1 border-b-[4px] mx-1 border-black">
                  A W A R D S
                </h2>
                {awards
                  ?.filter((awa) => awa?.enabled === true)
                  .map((item) => (
                    <div className="pl-10 pr-5 py-1 text-sm">
                      {/* <BsFillAwardFill className="inline relative right-1 bottom-[2px] "></BsFillAwardFill> */}
                      <i className="bx bxs-award pr-1"></i>
                      <span className="font-medium">
                        ➣ {item.name}
                      </span> from {item.awarder}
                    </div>
                  ))}
              </div>
            )}
            {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
              <div className="languages mx-3">
                <div className="">
                  <h2 className="text-center text-base font-serif font-semibold heading  pt-1 pb-1 border-b-[4px] mx-1 border-black">
                    L A N G U A G E S
                  </h2>
                  <div className="pt-1 pl-10">
                    {languages
                      ?.filter((lang) => lang?.enabled === true)
                      .map((item) => (
                        <span className="text-sm pr-2">{item.name} </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .heading {
            color: rgba(${r}, ${g}, ${b}, ${a});
          }
        `}
      </style>
    </div>
  );
});

// export default function Preview({ userInfo }) {
//   return (
//     userInfo && (
//           <hr />
//           <hr />
//         </div>
//
//           <hr />
//           <div>
//             <h3>Areas of Expertise</h3>
//             <div>
//               <h5>Tech skills:</h5> {userInfo.techSkills}
//             </div>
//             <h5>Non Tech Skills:</h5>
//             {userInfo.nonTechSkills &&
//               userInfo.nonTechSkills.map((nts) => {
//                 return (
//                   <div key={nts.id} id={nts.id}>
//                     <div>•{nts.nonTechSkill}</div>
//                   </div>
//                 );
//               })}
//           </div>
//           <hr />
//
//           <hr />
//         </div>
//       </div>
//     )
//   );
// }
