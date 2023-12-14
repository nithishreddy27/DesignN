import React from "react";
import Link from "next/link";
import { useResumeContext } from "../../../context/ResumeContext";

import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Dynamo = ({ componentRef }) => {
  const {
    profile,
    social,
    objective,
    education,
    projects,
    skills,
    awards,
    hobbies,
    work,
    certifications,
    languages,
    layout,
    setdesign,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };

  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <>
      {/* <img src="/english.jpeg" alt="" className="absolute opacity-5 " /> */}

      {/* <div style={{ backgroundImage: `url('/english.jpeg')` }}  className="bg-cover bg-center">
          one
        </div> */}
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H bg-cover bg-center overflow-hidden`}
        id="template"
      >
        <div className="flex ">
          <div className=" w-[35%] h-[296mm] bg-gray-200 p-6 relative ">
            <div className="bg-slate-800 w-36 h-[200px] absolute top-0 left-0">
              <img
                //   src="https://randomuser.me/api/portraits/men/40.jpg"
                src={profile?.image}
                alt="#"
                className="w-36 h-36 mt-7 ml-10 border-8 border-white"
                id="profileImage"
              />
            </div>
            <div className="mt-48">
              <h1 className="text-[16px] font-semibold heading tracking-[2px] border-b-2 border-black mb-2">
                Contact
              </h1>
              {/* <hr className="h-[2px] bg-black my-1" /> */}
              {
                <>
                  <div className="flex">
                    <span>
                      <img
                        src="https://www.freeiconspng.com/uploads/contact-methods-phone-icon-512x512-pixel-3.png"
                        className="w-5 h-5"
                      />
                    </span>
                    <h1 className="mx-4 text-[12px] ">{profile?.phone}</h1>
                  </div>
                  <div className="flex my-1">
                    <span>
                      <img
                        src="https://www.freeiconspng.com/uploads/black-mail-icon-4.png"
                        className="w-7 h-7"
                      />
                    </span>
                    {profile?.displayEmail === "collegeMail" && (
                      <h1 className="mx-2 my-1 text-[12px] ">
                        {profile?.email}
                      </h1>
                    )}
                    {profile?.displayEmail === "personalMail" && (
                      <h1 className="mx-2 my-1 text-[12px] ">
                        {profile?.personalEmail}
                      </h1>
                    )}
                  </div>
                  {social
                    ?.filter((social) => social?.enabled === true)
                    .map((item) => (
                      <div className="my-3 flex">
                        <span>
                          <img
                            src={
                              "https://www." + item.network + ".com/favicon.ico"
                            }
                            alt=""
                            srcset=""
                            className="w-5 grayscale-[40%]"
                          />
                        </span>

                        <Link href={item.url}>
                          <span className="mx-4 text-[12px]">
                            {item.username}
                          </span>
                        </Link>
                      </div>
                    ))}
                </>
              }
            </div>
            {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
              <div className="mt-4 mb-3">
                <h1 className="text-[16px] font-semibold heading tracking-[2px] border-b-2 border-black mb-2">
                  Skills
                </h1>
                {/* <hr className="h-[2px] bg-black my-1" /> */}
                {skills
                  ?.filter((skill) => skill?.enabled === true)
                  .map((item) => (
                    <li className="mx-4 text-[12px] mb-1">{item.name}</li>
                  ))}
              </div>
            )}

            {awards?.filter((awa) => awa?.enabled)?.length > 0 && (
              <div>
                <h1 className="text-[16px] font-semibold heading tracking-[2px] border-b-2 border-black ">
                  Awards
                </h1>
                {/* <hr className="h-[2px] bg-black my-1" /> */}
                {awards
                  ?.filter((awa) => awa?.enabled === true)
                  .map((item) => (
                    <div className="my-2">
                      <div className="flex justify-between">
                        <h1 className="font-semibold text-[12px]">
                          {item.name}
                        </h1>
                        <h1 className="font-semibold text-[12px]">
                          [{item.date.slice(0, 4)}]
                        </h1>
                      </div>
                      {item.summary.enabled && (
                        <h1 className="mx-4 markdown text-[12px]">
                          <MarkdownRenderer>
                            {item.summary.data.slice(0, 38)}
                          </MarkdownRenderer>
                        </h1>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
              <div className="mt-4">
                <h1 className="text-[16px] font-semibold heading tracking-[2px] border-b-2 border-black">
                  Languages
                </h1>
                {/* <hr className="h-[2px] bg-black my-1" /> */}
                {languages
                  ?.filter((lang) => lang?.enabled === true)
                  .map((item) => (
                    <div className="flex justify-between">
                      <h1 className="mt-1 text-[12px] font-semibold">
                        {item.name}
                      </h1>
                      <h1 className="mt-1 text-[12px]">{item.fluency}</h1>
                    </div>
                  ))}
              </div>
            )}
            {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
              <div className="mt-4">
                <h1 className="text-[16px] font-semibold heading tracking-[2px]  border-b-2 border-black">
                  Hobbies
                </h1>
                {/* <hr className="h-[2px] bg-black my-1" /> */}
                {hobbies
                  ?.filter((hob) => hob?.enabled === true)
                  .map((item) => (
                    <h1 className="mt-1 text-[12px]">{item.name}</h1>
                  ))}
              </div>
            )}
          </div>
          <div className=" w-[65%] pt-10 px-5 ">
            <div>
              <h1 className="text-[25px] font-semibold tracking-wider">
                {profile?.firstName.toUpperCase()}
              </h1>
              <h1 className="text-[25px]  tracking-[4px] mt-2">
                {profile?.lastName.toUpperCase()}
              </h1>
              <h1 className="text-[20px]  tracking-[4px] mt-2">
                {profile?.role}
              </h1>
            </div>

            <div className="mt-12 pt-2 pr-5">
              {objective && (
                <div>
                  <h1 className="text-[16px] font-bold heading tracking-[1px]  border-b-2 border-black mb-2">
                    Objective
                  </h1>
                  {/* <hr className="h-[2px] bg-black my-1" /> */}
                  <h1 className="text-[12px]">
                    <MarkdownRenderer>{objective}</MarkdownRenderer>
                  </h1>
                </div>
              )}
              {work?.filter((work) => work?.enabled)?.length > 0 && (
                <div className="ml-1 mt-1">
                  <h1 className="text-[16px] font-bold tracking-[1px] heading mt-5  border-b-2 border-black mb-2">
                    Professional Experience
                  </h1>
                  {/* <hr className="h-[2px] bg-black my-1" /> */}
                  {work
                    ?.filter((work) => work?.enabled === true)
                    .map((item) => (
                      <div className="flex">
                        <div className="pt-1">
                          <div className="w-3 bg-black h-3 rounded-full opacity-60"></div>
                          <div className="w-1 bg-black h-28 m-1"></div>
                        </div>
                        <div className="ml-5 mt-1">
                          <h1 className="font-semibold text-[12px]">
                            {item.from.slice(0, 4)} - {item.to.slice(0, 4)}
                          </h1>
                          <h1 className="tracking-[2px] my-1 text-[12px]">
                            {item.company}
                          </h1>
                          <h1 className="font-bold text-[12px]">
                            {item.designation}
                          </h1>
                          {item.summary.enabled && (
                            <h1 className="mb-4 markdown text-justify text-[12px]">
                              <MarkdownRenderer>
                                {item.summary.data}
                              </MarkdownRenderer>
                            </h1>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {education?.filter((edu) => edu?.enabled)?.length > 0 && (
                <div className="ml-1 mt-1">
                  <h1 className="text-[16px] font-bold tracking-[1px] heading mt-3  border-b-2 border-black mb-2">
                    Education
                  </h1>
                  {/* <hr className="h-[2px] bg-black my-1" /> */}
                  {education
                    ?.filter((edu) => edu?.enabled === true)
                    .map((item) => (
                      <div className="flex">
                        <div className="flex">
                          <div className="pt-1">
                            <div className="w-3 bg-black h-3 rounded-full opacity-60"></div>
                            <div className="w-1 bg-black h-24 m-1"></div>
                          </div>
                          <div className="ml-5 mt-1">
                            <h1 className="font-semibold text-[12px]">
                              {item.startDate.slice(0, 4)} -{" "}
                              {item.endDate.slice(0, 4)}
                            </h1>
                            <h1 className="tracking-[2px] text-[12px]">
                              {item.institution}
                            </h1>
                            <h1 className="font-bold text-[12px]">
                              {item.fieldOfStudy}
                            </h1>
                            <h1 className="text-[12px]">{item.typeOfDegree}</h1>
                            <h1 className="text-[12px] font-semibold">
                              GPA-{item.gpa}
                            </h1>
                            {item.summary.enabled && (
                              <h1 className="mb-4 markdown text-justify text-[12px]">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </h1>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .heading {
            color: rgba(${r}, ${g}, ${b}, ${a});
          }
          @media print {
            #template {
              margin: 10cm;
            }
          }
        `}
      </style>
    </>
  );
};
