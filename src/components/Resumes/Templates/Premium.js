import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";

import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Premium = ({ componentRef }) => {
  const {
    profile,
    objective,
    education,
    projects,
    skills,
    awards,
    hobbies,
    work,
    social,
    certifications,
    languages,
    setdesign,
    layout,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <>
      <div
        ref={componentRef}
        id="template"
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5 relative overflow-hidden`}
      >
        <div className="absolute mt-10 z-10 w-[210mm] flex bg-gradient-to-r from-gray-200 to-white">
          <img
            className="rounded-full ml-10 border-[7px] border-cyan-800 w-48 h-48 "
            style={{
              borderColor: `rgba(${r}, ${g}, ${b}, ${a})`,
            }}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
            id="profileImage"
            src={profile?.image}
          />
          <div className="m-14">
            <h1 className="text-[25px] font-semibold text-cyan-900 heading">
              {profile?.firstName.toUpperCase()}{" "}
              {profile?.lastName.toUpperCase()}
            </h1>
            <h1 className="text-cyan-900 heading">{profile?.role}</h1>
          </div>
        </div>
        <div className="grid grid-cols-3 z-0 h-[297mm]">
          <div
            className="bg-cyan-800 text-white"
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
          >
            <div className="mt-64 mx-6">
              <div>
                <h1 className="border-2 border-white mt-5 mb-2 text-[16px] flex justify-center align-middle py-2 text-white">
                  CONTACTS
                </h1>
                {profile?.displayEmail === "collegeMail" && (
                  <h1 className="text-white text-[12px] mb-1">
                    {profile?.email}
                  </h1>
                )}
                {profile?.displayEmail === "personalMail" && (
                  <h1 className="text-white text-[12px] mb-1">
                    {profile?.personalEmail}
                  </h1>
                )}
                <h1 className="text-white text-[12px] mb-1">
                  {profile?.phone}
                </h1>
                <h1 className="text-white text-[12px]">{profile?.dob}</h1>
                {social
                  ?.filter((social) => social?.enabled === true)
                  .map((item) => (
                    <div className="flex mt-2">
                      <span>
                        {/* <img
                          src={
                            "https://www." + item.network + ".com/favicon.ico"
                          }
                          alt=""
                          srcset=""
                          className=" grayscale-[40%]"
                        /> */}
                      </span>
                      <a
                        href={item.url}
                        target="blank"
                        className="text-white underline text-[12px]"
                      >
                        {item.url}
                      </a>
                    </div>
                  ))}
              </div>
              {education?.filter((edu) => edu?.enabled)?.length > 0 && (
                <div>
                  <h1 className="border-2 text-white border-white text-[16px] mt-5 mb-3 flex justify-center align-middle py-2">
                    EDUCATION
                  </h1>
                  {education
                    ?.filter((edu) => edu?.enabled === true)
                    .map((item) => (
                      <div className="py-1 my-2">
                        <h1 className="text-[12px] text-white">
                          {item.endDate.slice(0, 4)}
                        </h1>
                        <h1 className="text-[15px] text-white">
                          {item.institution}
                        </h1>
                        <h1 className="text-[12px] text-white">
                          {item.fieldOfStudy}
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
                <div>
                  <h1 className="border-2 border-white text-white text-[16px] mt-5 mb-3 flex justify-center align-middle py-2">
                    SKILLS
                  </h1>
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div className="flex justify-between">
                        <h1 className="text-[13px] text-white">{item.name}</h1>
                        <h1 className="text-[12px] text-white mt-0.5">
                          {item.level}
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {awards?.filter((award) => award?.enabled)?.length > 0 && (
                <div>
                  <h1 className="border-2 text-white border-white text-[16px] mt-5 mb-3 flex justify-center align-middle py-2">
                    AWARDS
                  </h1>
                  {awards
                    ?.filter((award) => award?.enabled === true)
                    .map((item) => (
                      <div className="py-1 my-2">
                        <h1 className="text-[12px] text-white">
                          {item.date.slice(0, 4)}
                        </h1>
                        <h1 className="text-[14px] text-white">{item.name}</h1>
                        <h1 className="text-[12px] text-white">
                          {item.awarder}
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {/* {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
                <div>
                  <h1 className="border-2 border-white text-[16px] mt-5 mb-3 flex justify-center align-middle py-2 text-white">
                    HOBBIES
                  </h1>
                  {hobbies
                    ?.filter((hob) => hob?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="text-white text-[12px]">{item.name}</h1>
                      </div>
                    ))}
                </div>
              )} */}
            </div>
          </div>
          <div className="col-span-2 text-black">
            <div className="mt-64 mx-6">
              {objective && (
                <>
                  {objective != 0 && (
                    <>
                      <div>
                        <h1 className="text-[16px] font-semibold border-b-2 heading  border-black mb-3">
                          PROFILE
                        </h1>
                        <h1 className="text-[12px] text-justify">
                          <MarkdownRenderer>{objective}</MarkdownRenderer>
                        </h1>
                      </div>
                    </>
                  )}
                </>
              )}
              {/* {work?.filter((work) => work?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold border-b-2 heading  border-black mb-2 mt-4">
                    WORK EXPERIENCE
                  </h1>
                  {work
                    ?.filter((work) => work.enabled === true)
                    .map((item) => (
                      <div className="py-2">
                        <div className="flex justify-between">
                          <h1 className="text-[14px] font-semibold ">
                            {item.company} {" - "}{" "}
                            <span className="font-normal">
                              {item.designation}
                            </span>
                          </h1>
                          <h1 className="text-[12px] mt-1 font-semibold">
                            {item.from.slice(0, 4)} - {item.to.slice(0, 4)}
                          </h1>
                        </div>
                        <a
                          href={item.website}
                          target="blank"
                          className="text-[12px] font-semibold underline"
                        >
                          {item.website}
                        </a>
                        {item.summary.enabled && (
                          <h1 className="text-[12px] text-justify">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              )} */}
              {projects?.filter((pro) => pro?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold border-b-2 heading  border-black mb-2 mt-4">
                    PROJECTS
                  </h1>
                  {projects
                    ?.filter((pro) => pro?.enabled === true)
                    .map((item) => (
                      <div className="py-2">
                        <div className="flex justify-between">
                          <h1 className="text-[14px] font-semibold ">
                            {item.name}
                          </h1>
                          <h1 className="text-[12px] mt-1 font-semibold">
                            {item.from.slice(0, 7)} to {item.to.slice(0, 7)}
                          </h1>
                        </div>
                        <a
                          href={item.website}
                          target="blank"
                          className="text-[12px] font-semibold underline"
                        >
                          {item.website}
                        </a>
                        {item.summary.enabled && (
                          <h1 className="text-[12px] markdown text-justify">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {certifications?.filter((cer) => cer?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold border-b-2 heading  border-black mb-2 mt-4">
                    CERTIFICATIONS
                  </h1>
                  {certifications
                    ?.filter((cer) => cer?.enabled === true)
                    .map((item) => (
                      <div className="py-1">
                        <div className="flex justify-between">
                          <h1 className="font-semibold text-[14px]">
                            {item.title}
                            {" - "}
                            <span className="text-[14px] font-normal">
                              {item.issuer}
                            </span>
                          </h1>
                          <h1 className="text-[12px] mt-1 font-semibold">
                            {item.date.slice(0, 4)}
                          </h1>
                        </div>

                        <h1 className="text-[12px]">{item.designation}</h1>
                        {item.summary.enabled && (
                          <h1 className="markdown text-[12px] text-justify">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {/* {awards?.filter((awa) => awa?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold border-b-2 heading  border-black mb-2 mt-4">
                    AWARDS
                  </h1>
                  {awards
                    ?.filter((awa) => awa?.enabled === true)
                    .map((item) => (
                      <div className="py-1">
                        <div className="flex justify-between">
                          <h1 className="font-semibold text-[14px]">
                            {item.name}
                            {" - "}
                            <span className="text-[14px] font-normal">
                              {item.awarder}
                            </span>
                          </h1>
                          <h1 className="text-[12px] mt-1 font-semibold">
                            {item.date.slice(0, 4)}
                          </h1>
                        </div>
                        {item.summary.enabled && (
                          <h1 className="text-[12px] text-justify">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              )} */}
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
    </>
  );
};
