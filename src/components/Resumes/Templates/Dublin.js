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
export const Dublin = React.forwardRef(function NonCore({ componentRef }) {
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
      className="flex  w-a4W bg-white mx-auto h-a4H"
    >
      <div className="flex h-a4H w-a4W">
        <div className="w-[40%] h-full bg-emerald-700">
          {/* <div className="photobg bg-slate-300 w-[150px] h-[150px] mt-[50px] ml-[70px]"></div> */}
          <div className="photo">
            <img
              src={profile?.image}
              className="w-[130px] h-[130px] mt-[25px] ml-[80px] rounded-md"
              id="profileImage"
            ></img>
            <div className="personal pt-5">
              {profile?.dob && (
                <div className="dob pl-10 pt-3 text-sm text-white">
                  <MdDateRange className="inline"></MdDateRange>
                  {/* <i className="bx bxs-calendar pr-4 text-lg text-white"></i> */}
                  <span className="text-sm   text-white">
                    <span className="text-sm ml-2">{profile?.dob}</span>
                  </span>
                </div>
              )}
              <div className="phone pl-10 pt-1 text-white">
                <BsTelephone className="inline "></BsTelephone>
                <span class="text-sm  text-white">
                  <span className="text-sm ml-2">{profile?.phone}</span>
                </span>
              </div>
              <div className="mail pl-10 pt-1 pb-2 text-white">
                <FiMail className="inline"></FiMail>
                <span class="text-sm   text-white">
                  {console.log("display email", profile?.displayEmail)}
                  {profile?.displayEmail === "collegeMail" && (
                    <span className="text-sm ml-2">{profile?.email}</span>
                  )}
                  {profile?.displayEmail === "personalMail" && (
                    <span className="text-sm ml-2">
                      {profile?.personalEmail}
                    </span>
                  )}
                </span>
              </div>
            </div>
            {education?.filter((edu) => edu?.enabled)?.length > 0 && (
              <div className="education">
                <h2 className="text-center text-base mt-2 font-sans font-bold text-zinc-200">
                  E D U C A T I O N
                </h2>
                {education
                  ?.filter((edu) => edu?.enabled === true)
                  .map((item) => (
                    <p className="pl-8 pr-5 pt-2 text-sm">
                      <span className="font-medium text-white">
                        ➣ {item.institution}
                      </span>
                      <span className="text-white"> in </span>
                      <span className="font-medium text-white">
                        {item.fieldOfStudy} ({item.startDate.slice(0, 4)} -{" "}
                        {item.endDate.slice(0, 4)})
                      </span>
                      <br />
                      <i className="bx bxs-graduation text-white"></i>
                      <span className="text-white">
                        {" "}
                        {item.typeOfDegree} in {item.fieldOfStudy} ({item.gpa})
                      </span>
                    </p>
                  ))}
              </div>
            )}
            {certifications?.filter((cert) => cert?.enabled)?.length > 0 && (
              <div className="certifications">
                <h2 className="text-center text-base font-sans font-bold mt-4 text-zinc-200 ">
                  C E R T I F I C A T I O N S
                </h2>
                {certifications
                  ?.filter((cert) => cert?.enabled === true)
                  .map((item) => (
                    <p className="pl-8 pr-5 pt-2 text-sm text-white">
                      <span className="text-white">
                        ➣ {item.title} from {item.issuer}
                      </span>
                    </p>
                  ))}
              </div>
            )}
            {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
              <div className="skills">
                <div className="pl-8 pr-5">
                  <h2 className="text-center text-base  font-sans font-bold mt-4 pb-1 text-zinc-300">
                    S K I L L S
                  </h2>
                  <div className=" pr-3">
                    {skills
                      ?.filter((skill) => skill?.enabled === true)
                      .map((item) => (
                        <span className="pr-3 text-sm text-white">
                          {item.name}{" "}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
              <div className="hobbies">
                <div className="pl-8 pr-5">
                  <h2 className="text-center text-base  font-sans font-bold pt-4 pb-1 text-zinc-300">
                    H O B B I E S
                  </h2>
                  <div className="">
                    {hobbies
                      ?.filter((hob) => hob?.enabled === true)
                      .map((item) => (
                        <span className="pr-2 text-sm text-white">
                          {item.name}{" "}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[60%] h-full bg-emerald-100">
          <div className="name">
            <div className=" mx-10 mt-10  border-b-[1px] border-gray-600 ">
              <h1 className="text-2xl tracking-widest capitalize font-semibold font-serif">
                {profile?.firstName} {profile?.lastName}
              </h1>

              <h2 className="text-base font-normal py-3">{profile?.role}</h2>

              {social?.filter((soc) => soc?.enabled)?.length > 0 && (
                <div className="social  pt-1 pb-2 flex">
                  {social
                    ?.filter((soc) => soc?.enabled === true)
                    .map((item) => (
                      <div className="pr-2">
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
                    <h2 className="text-center text-base heading font-sans font-bold pt-3">
                      C A R E E R O B J E C T I V E
                    </h2>
                    <h1 className="pl-8 pr-5 pt-2 text-sm">
                      <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </h1>
                  </div>
                </>
              )}
            </>
          )}
          {work?.filter((wor) => wor?.enabled)?.length > 0 && (
            <div className="experience">
              <h2 className="text-center text-base heading font-sans font-bold pt-3">
                E X P E R I E N C E
              </h2>
              {work
                ?.filter((wor) => wor?.enabled === true)
                .map((item) => (
                  <div className="pl-8 pr-5 pt-2 text-sm">
                    {/* <MdWork className="inline relative bottom-[2px] right-1 text-zinc-700"></MdWork> */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm pr-3 ">
                        ➣ {item.designation} in {item.company}
                      </span>
                      <span className="text-[12px]">
                        ({item.from.slice(0, 4)} - {item.to.slice(0, 4)}){" "}
                      </span>
                    </div>

                    <p className="underline text-gray-800 text-justify">
                      {" "}
                      <Link href={item.website}>{item.website}</Link>
                    </p>
                    {item.summary.enabled && (
                      <span className="text-sm markdown text-justify">
                        <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}
          {projects?.filter((pro) => pro?.enabled)?.length > 0 && (
            <div className="projects">
              <h2 className="text-center text-base heading font-sans font-bold pt-2 heading">
                P R O J E C T S
              </h2>
              {projects
                ?.filter((pro) => pro?.enabled === true)
                .map((item) => (
                  <div className="pl-8 pr-5 pt-1 text-sm">
                    {/* <FaSquareFull className="inline text-zinc-700 text-[10px] relative right-1 bottom-[2px]"></FaSquareFull> */}
                    <div className="flex justify-between">
                      <span className="font-semibold pr-3 ">➣ {item.name}</span>
                      <span className="text-[12px]">
                        {" "}
                        ({item.from.slice(0, 7)} - {item.to.slice(0, 7)})
                      </span>
                    </div>
                    <p className="underline text-gray-800 text-justify">
                      {" "}
                      <Link href={item.website}>{item.website}</Link>
                    </p>
                    {item.summary.enabled && (
                      <span className="text-sm markdown text-justify">
                        <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}
          {awards?.filter((awa) => awa?.enabled)?.length > 0 && (
            <div className="awards">
              <h2 className="text-center text-base heading font-sans font-bold pt-2">
                A W A R D S
              </h2>
              {awards
                ?.filter((awa) => awa?.enabled === true)
                .map((item) => (
                  <div className="pl-8 pr-5 pt-1 text-sm">
                    {/* <BsFillAwardFill className="inline relative right-1 bottom-[2px] text-zinc-700"></BsFillAwardFill> */}
                    <span className="font-medium">➣ {item.name}</span> from{" "}
                    {item.awarder}
                  </div>
                ))}
            </div>
          )}
          {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
            <div className="languages">
              <div className="pl-10">
                <h2 className="text-center text-base  font-sans font-bold pt-5 pb-1 heading">
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
