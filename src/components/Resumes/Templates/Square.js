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
export const Square = React.forwardRef(function NonCore({ componentRef }) {
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
      className="flex w-a4W bg-white mx-auto h-a4H"
    >
      <div className="flex w-a4W h-a4H">
        <div className="first w-[40%] h-full bg-slate-300">
          <div className="photo">
            <div className="px-20 pt-10 pb-5">
              <img
                src={profile?.image}
                className="w-[130px] h-[130px]"
                id="profileImage"
              ></img>
            </div>
          </div>
          <div className="personal">
            {profile?.dob && (
              <div className="dob pl-10 pt-3">
                <MdDateRange className="inline"></MdDateRange>
                <span className="text-sm relative top-[2px] left-2">
                  {profile?.dob}
                </span>
              </div>
            )}
            <div className="phone pl-10 pt-1">
              <BsTelephone className="inline"></BsTelephone>
              <span className="text-sm relative top-[2px] left-2">
                {profile?.phone}
              </span>
            </div>
            <div className="mail pl-10 pt-1 pb-3">
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
            <div className="education">
              <h2 className="text-center text-base font-serif font-bold heading underline">
                E D U C A T I O N
              </h2>
              {education
                ?.filter((edu) => edu?.enabled === true)
                .map((item) => (
                  <li className="pl-10 pr-5 pt-2 text-sm">
                    {/* <MdSchool className=" inline text-lg relative right-1 bottom-[2px]"></MdSchool> */}
                    <span className="font-medium"> {item.institution}</span> in{" "}
                    <span className="font-medium">
                      {item.fieldOfStudy}({item.startDate.slice(0, 4)} -{" "}
                      {item.endDate.slice(0, 4)})
                    </span>
                    <br />
                    <i className="bx bxs-graduation"></i> {item.typeOfDegree} in{" "}
                    {item.fieldOfStudy} ({item.gpa})
                  </li>
                ))}
            </div>
          )}
          {certifications?.filter((cert) => cert?.enabled)?.length > 0 && (
            <div className="certifications">
              <h2 className="text-center text-base font-serif font-bold heading underline pt-5">
                C E R T I F I C A T I O N S
              </h2>
              {certifications
                ?.filter((cert) => cert?.enabled === true)
                .map((item) => (
                  <li className="pl-10 pr-5 pt-3 text-sm">
                    {/* <FaSquareFull className="inline text-[10px] relative right-1 bottom-[2px]"></FaSquareFull> */}
                    {item.title} from {item.issuer}
                  </li>
                ))}
            </div>
          )}
          {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
            <div className="skills">
              <div className="pl-10">
                <h2 className="text-center text-base font-serif font-bold heading underline pt-2 pb-2">
                  S K I L L S
                </h2>
                {skills
                  ?.filter((skill) => skill?.enabled === true)
                  .map((item) => (
                    <span className="pr-2 text-sm">{item.name} </span>
                  ))}
              </div>
            </div>
          )}
          {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
            <div className="languages">
              <div className="pl-10">
                <h2 className="text-center text-base font-serif font-bold heading underline pt-2 pb-2">
                  L A N G U A G E S
                </h2>
                {languages
                  ?.filter((lang) => lang?.enabled === true)
                  .map((item) => (
                    <span className="pr-2 text-sm ">{item.name} </span>
                  ))}
              </div>
            </div>
          )}
          {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
            <div className="hobbies">
              <div className="pl-10">
                <h2 className="text-center text-base font-serif font-bold heading underline pt-2 pb-2">
                  H O B B I E S
                </h2>
                {hobbies
                  ?.filter((hob) => hob?.enabled === true)
                  .map((item) => (
                    <span className="pr-2 text-sm ">{item.name} </span>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="second bg-slate-100 w-[60%] h-full">
          <div className="name">
            <div className=" mx-20 mt-10  border-b-[1px] border-gray-600">
              <h1 className="font-semibold capitalize text-wider text-[24px] text-lg">
                {profile?.firstName} {profile?.lastName}
              </h1>
              <h2 className="text-base font-normal py-3">{profile?.role}</h2>
              {social?.filter((soc) => soc?.enabled)?.length > 0 && (
                <div className="social  pt-1 pb-2 flex">
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
                          <span className="pl-1 text-sm">{item.username}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {objective && (
            <>
              {objective != 0 && (
                <>
                  <div className="career-objective">
                    <h2 className="text-center text-base font-serif font-bold heading underline pt-6">
                      C A R E E R O B J E C T I V E
                    </h2>
                    <div className="pl-10 pr-5 pt-2 text-sm">
                      <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {work?.filter((wor) => wor?.enabled)?.length > 0 && (
            <div className="experience">
              <h2 className="text-center text-base font-serif font-bold heading underline pt-2">
                E X P E R I E N C E
              </h2>
              {work
                ?.filter((wor) => wor?.enabled === true)
                .map((item) => (
                  <li className="pl-10 pr-5 pt-2 text-sm">
                    {/* <MdWork className="inline relative bottom-[2px] right-1 text-zinc-700"></MdWork> */}
                    <span className="font-medium text-sm pr-3">
                      {item.designation} in {item.company}
                    </span>
                    ({item.from.slice(0, 4)}-{item.to.slice(0, 4)})<br />
                    <Link href={item.website}>{item.website}</Link>
                    <br></br>
                    {/* s */}
                    {item.summary.enabled && (
                      <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                    )}
                  </li>
                ))}
            </div>
          )}
          {projects?.filter((pro) => pro?.enabled)?.length > 0 && (
            <div className="projects">
              <h2 className="text-center text-base font-serif font-bold heading underline pt-2">
                P R O J E C T S
              </h2>
              {projects
                ?.filter((pro) => pro?.enabled === true)
                .map((item) => (
                  <li className="pl-10 pr-5 pt-2 text-sm">
                    {/* <FaSquareFull className="inline text-zinc-700 text-[10px] relative right-1 bottom-[2px]"></FaSquareFull> */}
                    <span className="font-medium  pr-3"> {item.name}</span>(
                    {item.from.slice(0, 4)} - {item.to.slice(0, 4)})<br />
                    <Link href={item.website}>{item.website}</Link>
                    <br></br>
                    {item.summary.enabled && (
                      <h1 className="markdown">
                        <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                      </h1>
                    )}
                  </li>
                ))}
            </div>
          )}
          {awards?.filter((awa) => awa?.enabled).length > 0 && (
            <div className="awards">
              <h2 className="text-center text-base font-serif font-bold heading underline pt-2">
                A W A R D S
              </h2>
              {awards
                ?.filter((awa) => awa?.enabled === true)
                .map((item) => (
                  <li className="pl-10 pr-5 pt-3 text-sm">
                    {/* <BsFillAwardFill className="inline relative right-1 bottom-[2px] text-zinc-700"></BsFillAwardFill> */}
                    <span className="font-medium "> {item.name}</span> from{" "}
                    {item.awarder}
                  </li>
                ))}
            </div>
          )}
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
