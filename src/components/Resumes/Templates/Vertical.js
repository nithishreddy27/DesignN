import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import { MdDateRange } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import Link from "next/link";
export const Vertical = ({ componentRef }) => {
  const {
    profile,
    social,
    objective,
    education,
    awards,
    projects,
    work,
    skills,
    hobbies,
    layout,
    certifications,
    setdesign,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <div
      id="template"
      ref={componentRef}
      className="w-a4W bg-white mx-auto h-a4H my-5"
    >
      <div className="relative">
        <div className="w-[205mm] h-40 bg-blue-500 absolute  z-0 mt-10">
          <h1 className="text-white capitalize ml-72 mt-8 text-5xl text-[25px]">
            {profile?.firstName} {profile?.lastName}
          </h1>
          <h6 className="text-white ml-72 mt-1 text-[16px] ">
            {profile?.role}
          </h6>
          <div className="ml-72 grid grid-cols-2 gap-x-4">
            <div className="mail pt-1 text-white">
              <FiMail className="inline"></FiMail>
              <span class="text-sm relative top-[2px]  text-white">
                {console.log("display email", profile?.displayEmail)}
                {profile?.displayEmail === "collegeMail" && (
                  <span className="text-sm ml-2">{profile?.email}</span>
                )}
                {profile?.displayEmail === "personalMail" && (
                  <span className="text-sm ml-2">{profile?.personalEmail}</span>
                )}
              </span>
            </div>
            <div className="phone pt-1 text-white">
              <BsTelephone className="inline "></BsTelephone>
              <span class="text-sm relative top-[1px]  text-white">
                <span className="text-sm ml-2">{profile?.phone}</span>
              </span>
            </div>
            {profile?.dob && (
              <div className="dob pt-1 text-white">
                <MdDateRange className="inline"></MdDateRange>
                {/* <i className="bx bxs-calendar pr-4 text-lg text-white"></i> */}
                <span className="text-sm relative top-[1px]   text-white">
                  <span className="">{profile?.dob}</span>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="bg-slate-900 h-[292mm] ml-5 z-10">
            <img
              className="w-[150px] h-[150px] m-10 rounded-full"
              //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
              src={profile?.image}
              alt=" "
              id="profileImage"
            />
            {skills?.filter((skills) => skills?.enabled)?.length > 0 && (
              <div>
                <div className="border-b-2 border-white m-5 pb-4 ">
                  <h1 className="font-medium text-lg mt-2 text-white text-[16px] ">
                    SKILLS
                  </h1>
                  {skills
                    ?.filter((skills) => skills?.enabled === true)
                    .map((item) => (
                      <div className="mt-2 ml-2 flex justify-between">
                        <h1 className="font-normal   text-white text-[12px]">
                          {item.name}
                        </h1>
                        <h1 className="text-sm  text-white text-[12px]">
                          {item.level}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* {social?.filter((social) => social?.enabled)?.length > 0 && (
              <div>
                <div className="border-b-2 border-white m-6 ">
                  <h1 className="font-medium text-lg mt-2 text-white text-[16px]  ">
                    SOCIAL
                  </h1>
                  <div className="flex my-2 ml-4">
                    <span>
                      <BsTelephone className="text-white"></BsTelephone>
                    </span>
                    <h1 className="mx-4  text-white text-[12px]">
                      {profile.phone}
                    </h1>
                  </div>
                  <div className="flex my-2 ml-4 text-[12px]">
                    <span>
                      <img
                        src="https://www.freeiconspng.com/uploads/icon-email-icon-clip-art-at-clker-com-vector-qafaq-e-mail-icon-trace--0.png"
                        className="w-4 h-5"
                      />
                    </span>
                    <h1 className="mx-4 text-white   ">{profile.email}</h1>
                  </div>
                  {social
                    ?.filter((social) => social?.enabled === true)
                    .map((item) => (
                      <div className="ml-4 my-4 flex">
                        <img
                          src={
                            "https://www." + item.network + ".com/favicon.ico"
                          }
                          alt=""
                          className="w-5 h-5"
                        />
                        <Link href={item.url}>
                          <h1 className="ml-4 text-white text-[12px]">
                            {item.username}
                          </h1>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )} */}
            {projects?.filter((projects) => projects?.enabled)?.length > 0 && (
              <div>
                <div className="border-b-2 border-white m-5 pb-4">
                  <h1 className="font-medium text-lg text-white text-[16px] ">
                    PROJECTS
                  </h1>
                  {projects
                    ?.filter((projects) => projects?.enabled === true)
                    .map((item) => (
                      <div className="m-2">
                        <h1 className="text-white text-[12px]">{item.name}</h1>
                        <h1 className="text-white text-sm  text-[12px]">
                          {item.from.slice(0, 4)} - {item.to.slice(0, 4)}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {awards?.filter((awards) => awards?.enabled)?.length > 0 && (
              <div>
                <div className="border-b-2 border-white m-6 ">
                  <h1 className="font-medium text-lg mt-2 text-white text-[16px]  ">
                    AWARDS
                  </h1>
                  {awards
                    ?.filter((awards) => awards?.enabled === true)
                    .map((item) => (
                      <div className="m-2">
                        <h1 className="text-white text-[12px]">{item.name}</h1>
                        <h1 className="text-white text-sm ml-2 text-[12px]">
                          {item.awarder}
                        </h1>
                        {item.summary.enabled && (
                          <h1 className="markdown text-white text-[12px] ml-2">
                            {item.summary.data}
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {hobbies?.filter((hobbies) => hobbies?.enabled)?.length > 0 && (
              <div>
                <div className="border-b-2 border-white m-6 p-1">
                  <h1 className="font-medium text-lg text-white text-[16px] ">
                    HOBBIES
                  </h1>
                  {hobbies
                    ?.filter((hobbies) => hobbies?.enabled === true)
                    .map((item) => (
                      <div className="m-2">
                        <h1 className="text-white text-[12px]">{item.name}</h1>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2">
            {objective && (
              <div>
                <div className="pt-48">
                  <div className="border-b-4 border-black m-4 p-2 pt-5">
                    <h1 className="font-bold text-lg text-gray-600 text-[16px] heading ">
                      ABOUT ME
                    </h1>
                    <h1 className="text-sm font-medium text-justify pt-1 text-[12px]">
                      <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {work?.filter((wor) => wor?.enabled)?.length > 0 && (
              <div>
                <div className="border-b-4 border-black m-4 p-2">
                  <h1 className="font-bold text-lg text-gray-600 text-[16px] heading">
                    WORK EXPERIENCE
                  </h1>
                  {work
                    ?.filter((wor) => wor?.enabled === true)
                    .map((item) => (
                      <div className="">
                        <div className="flex justify-between">
                          <h1 className="font-semibold ml-4 text-lg text-[12px]">
                            {item.company}
                          </h1>
                          <h2 className="font-medium text-xs ml-4 text-[12px] justify-end">
                            [{item.from.slice(0, 4)} - {item.to.slice(0, 4)}]
                          </h2>
                        </div>
                        <h1 className="ml-10  font-semibold text-[12px]">
                          {item.designation}
                        </h1>
                        <h1 className="ml-10  font-medium text-[12px]">
                          {item.website}
                        </h1>
                        {item.summary.enabled && (
                          <h1 className="markdown text-[12px] text-xs text-justify ml-10">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {education?.filter((education) => education?.enabled)?.length >
              0 && (
              <div>
                <div className="border-b-4 border-black m-4 p-2">
                  <h1 className="font-bold text-lg text-gray-600 text-[16px] heading">
                    EDUCATION
                  </h1>
                  {education
                    ?.filter((education) => education?.enabled === true)
                    .map((item) => (
                      <div>
                        <div className="flex justify-between">
                          <h1 className="font-bold ml-4 mt-1 text-[12px]">
                            {item.institution}
                          </h1>
                          <h6 className="text-xs font-medium ml-6 text-[12px] flex justify-end">
                            [{item.startDate.slice(0, 4)} -{" "}
                            {item.endDate.slice(0, 4)}]
                          </h6>
                        </div>
                        <p className="ml-8 font-semibold text-[12px]">
                          {item.fieldOfStudy}
                        </p>
                        {item.summary.enabled && (
                          <h1 className="markdown text-[12px] text-xs ml-8">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {certifications?.filter((certifications) => certifications?.enabled)
              ?.length > 0 && (
              <div>
                <div className="border-b-4 border-black m-4 p-2">
                  <h1 className="font-bold text-lg text-gray-600 text-[16px] heading">
                    CERTIFICATONS
                  </h1>
                  {certifications
                    ?.filter(
                      (certifications) => certifications?.enabled === true
                    )
                    .map((item) => (
                      <div>
                        {/* <h1 className="ml-4 text-normal mt-1 font-bold text-[12px]">
                          {item.title}
                        </h1>
                       
                        <h1 className="ml-12 text-sm font-semibold text-[12px]">
                          {item.issuer}
                        </h1>
                        <h1 className="text-[12px] text-xs ml-12">
                          <MarkdownRenderer>
                            {item.summary.data}
                          </MarkdownRenderer>
                        </h1> */}
                        <div className="flex justify-between">
                          <h1 className="font-bold ml-4 mt- text-[12px]">
                            {item.title}
                          </h1>
                          <h6 className="text-xs font-medium ml-6 text-[12px] flex justify-end">
                            [{item.date}]
                          </h6>
                        </div>
                        <h1 className="ml-8  font-semibold text-[12px]">
                          {item.issuer}
                        </h1>
                        {item.summary.enabled && (
                          <h1 className="markdown text-[12px] text-xs ml-8 ">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
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
};
