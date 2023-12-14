import React, { useEffect } from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Amsterdam = ({ componentRef }) => {
  const {
    profile,
    objective,
    education,
    projects,
    work,
    skills,
    hobbies,
    languages,
    certifications,
    social,
    awards,
    layout,
    setdesign,
  } = useResumeContext();

  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5 relative `}
        id="template"
      >
        <div className="absolute left-44 top-5 border-[3px] border-gray-500 h-40 w-96 bg-white text-center">
          {profile && (
            <>
              <h1 className="mt-6 font-extrabold text-[24px] capitalize px-1 tracking-[3px]">
                {profile?.firstName} {profile?.lastName}
              </h1>
              <h1 className="mt-3">{profile?.role}</h1>
            </>
          )}
        
          
        </div>

        <div className="flex">
          <div className="w-[40%] h-[296mm] bg-gray-200">
            <div className="mt-52 mx-10 flex flex-col">
              <div>
                <h4 className="font-bold tracking-[2px] text-[16px] heading">
                  Contacts
                </h4>
                <hr className="w-[100%] h-1 bg-black my-2" />
                {profile && (
                  <div className="text-[11px]">
                    {profile?.displayEmail === "collegeMail" && (
                      <li className="font-semibold my-2 ">{profile?.email}</li>
                    )}
                    {profile?.displayEmail === "personalMail" && (
                      <li className="font-semibold my-2 ">
                        {profile?.personalEmail}
                      </li>
                    )}
                    <li className="font-semibold">{profile?.phone}</li>
                    {social
                  ?.filter((social) => social?.enabled === true)
                  .map((item) => (
                    <div className="text-[11px] font-semibold pt-2">
                     <li className=""><a  href={item.url} target="blank" className="underline ">
                        {item.url}
                      </a></li> 
                    </div>
                  ))}
                  </div>
                )}
              </div>

              {education?.filter((edu) => edu?.enabled).length > 0 && (
                <>
                  <h4 className="font-bold tracking-[2px] text-[16px]  mt-2 heading">
                    Education
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />

                  {education
                    ?.filter((edu) => edu?.enabled === true)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item) => (
                      <div
                        className="flex flex-col mt-2 text-[12px] "
                        key={item.institution}
                      >
                        <div className="flex justify-between">
                          <li className="text-black font-semibold">
                            {item.institution}
                          </li>
                        </div>
                        <div className="font-semibold ">
                          <div className="text-[10px] right-0">
                            {new Date(item.startDate).getFullYear()} -{" "}
                            {new Date(item.endDate).getFullYear()}
                          </div>

                          <div>{item.typeOfDegree} </div>
                        </div>
                        <span className="">{item.fieldOfStudy}</span>

                        <span className="">
                          <h1> Score : {item.gpa} </h1>
                        </span>
                      </div>
                    ))}
                </>
              )}
              {/* </div> */}
            </div>

            <div className="mx-10 flex flex-col mt-2 ">
              {skills?.filter((skill) => skill?.enabled).length > 0 && (
                <div>
                  <h4 className="font-bold tracking-[2px] text-[16px]  heading">
                    Skills
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div className="flex justify-between mt-2 text-[12px] ">
                        <li className="font-semibold " key={item.name}>
                          {item.name}
                        </li>
                        <span className="  ">{item.level}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
           



            <div className="mx-10 flex flex-col mt-2 ">
              {/* {awards?.filter((award) => award?.enabled).length > 0 && (
                <div>
                  <h4 className="font-bold tracking-[4px] text-[16px]  heading">
                    AWARDS
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {awards
                    ?.filter((award) => award?.enabled === true)
                    .map((item) => (
                      <div className="text-[12px] mt-2 ">
                        <div className="flex justify-between">
                          <h1 className="font-semibold  " key={item.name}>
                            {item.name}
                          </h1>
                          <h1>[{item.date.slice(0, 4)}]</h1>
                        </div>
                        <span className="">{item.awarder}</span>
                      </div>
                    ))}
                </div>
              )} */}
            </div>
            <div className="mx-10 flex flex-col mt-2 ">
              {languages?.filter((language) => language?.enabled).length >
                0 && (
                <div>
                  <h4 className="font-bold tracking-[2px] text-[16px]  heading">
                    Languages
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {languages
                    ?.filter((language) => language?.enabled === true)
                    .map((item) => (
                      <div className="text-[12px] flex justify-between mt-2 ">
                        <li className="font-semibold " key={item.name}>
                          {item.name} - {item.fluency}
                        </li>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="mx-10 flex flex-col mt-2 ">
              {hobbies?.filter((hobby) => hobby?.enabled).length > 0 && (
                <div>
                  <h4 className="font-bold tracking-[2px] text-[16px]  heading">
                    Interests
                  </h4>
                  <hr className="w-[100%] h-1 bg-black my-1" />
                  {hobbies
                    ?.filter((hobby) => hobby?.enabled === true)
                    .map((item) => (
                      <div className="text-[12px] mt-2">
                        <li className="font-semibold ">{item.name}</li>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-[60%] h-auto mt-52 mx-10">
            {console.log("ob", objective)}
            {objective && (
              <div>
                {objective?.length != 0 && (
                  <>
                    <h2 className="font-bold tracking-[2px] heading">
                      Objective
                    </h2>
                    <hr className="w-[100%] h-1 bg-black my-1" />
                    <p className="my-4 text-[13px] markdown text-justify"><MarkdownRenderer>{objective}</MarkdownRenderer></p>
                  </>
                )}
              </div>
            )}
            {work?.filter((wo) => wo?.enabled).length > 0 && (
              <div>
                {work.length != 0 && (
                  <>
                    <h2 className="font-bold text-[16px] mt-2  tracking-[2px] heading">
                      Professional Experience
                    </h2>
                    <hr className="w-[100%] h-1 bg-black my-1" />
                    {work
                      ?.filter((wo) => wo?.enabled === true)
                      .sort((a, b) => new Date(b.from) - new Date(a.from))
                      .map((item) => (
                        <div className="text-[12px] ">
                          <div className="flex flex-col" key={item.company}>
                            {/* <span className="text-black font-bold mt-3" >{item.name}</span> */}
                            <div className="flex mt-3 justify-between">
                              <span className="text-black text-[13px]  font-bold ">
                                {item.company} - {item.designation}
                              </span>
                              <h1>
                                <span className="font-semibold text-[10px]">
                                  {new Date(item.from).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}{" "}
                                  -{" "}
                                  {new Date(item.to).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </h1>
                            </div>
                            <span className="text-black font-semibold "></span>
                            {item.summary.enabled && (
                              <h1 className="text-justify markdown">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </h1>
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}

            {projects?.filter((project) => project?.enabled).length > 0 && (
              <>
                <h2 className="font-bold tracking-[2px] text-[16px] mt-2 heading">
                  Projects
                </h2>
                <hr className="w-[100%] h-1 bg-black my-1" />

                {projects
                  ?.filter((project) => project?.enabled === true)
                  .sort((a, b) => new Date(b.from) - new Date(a.from))
                  .map((item) => (
                    <div className="mt-1">
                      {item.enabled && (
                        <div className="text-[12px] ">
                          <div className="mt-3">
                            <div className="flex justify-between">
                              <span className="text-black text-[13px]  font-bold">
                                {item.name}{" "}
                              </span>
                              <h1>
                                <span className="text-black text-[10px] font-semibold">
                                  {new Date(item.from).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}{" "}
                                  -{" "}
                                  {new Date(item.to).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}{" "}
                                </span>{" "}
                              </h1>
                            </div>
                            {item.summary.enabled && (
                              <h1 className=" text-justify markdown">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </h1>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}

            {certifications?.filter((certificate) => certificate?.enabled)
              .length > 0 && (
              <div>
                {certifications.length != 0 && (
                  <>
                    <h2 className="font-bold tracking-[2px] text-[16px] mt-2 heading">
                      Certifications
                    </h2>
                    <hr className="w-[100%] h-1 bg-black my-1" />
                    {certifications
                      ?.filter((certificate) => certificate?.enabled === true)
                      .map((item) => (
                        <div className="text-[12px] ">
                          <div className="flex flex-col" key={item.title}>
                            {/* <span className="text-black font-bold mt-3" >{item.name}</span> */}
                            <div className="flex justify-between mt-2">
                              <p className="text-black font-bold ">
                                {item.title}
                              </p>
                              <p className="font-semibold text-[10px]">
                                [{item.date}]
                              </p>
                            </div>
                            <span className="text-black font-semibold mx-4">
                              {item.issuer}
                            </span>
                            {item.summary.enabled && (
                              <p className=" text-justify markdown">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}

            {awards?.filter((award) => award?.enabled).length > 0 && (
              <div>
                <h4 className="font-bold tracking-[2px] text-[16px]  heading">
                  Awards
                </h4>
                <hr className="w-[100%] h-1 bg-black my-1" />
                {awards
                  ?.filter((award) => award?.enabled === true)
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item) => (
                    <div className="text-[12px] mt-2 ">
                      <div className="flex justify-between">
                        <h1 className="font-semibold  " key={item.name}>
                          {item.name} - {item.awarder}
                        </h1>
                        <h1 className="font-bold">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h1>
                      </div>
                      {/* <span className=""></span> */}
                      <h1 className="markdown text-justify ">
                        <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                      </h1>
                    </div>
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
    </>
  );
};
