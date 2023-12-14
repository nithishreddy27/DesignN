import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";

import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Berlin = ({ componentRef }) => {
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
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-[290mm] overflow-hidden`}
        id="template"
      >
        <div className="p-8">
          <div className="h-auto pb-6 border-b-4">
            {profile && (
              <div>
                <h1 className="text-[25px] font-sans font-semibold">
                  {profile?.firstName.toUpperCase()}{" "}
                  {profile?.lastName.toUpperCase()}
                </h1>
                <h1 className="text-[14px] text-gray-500 capitalize font-semibold mt-2">
                  {profile?.role}
                </h1>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 mt-6">
            <div className="border-r-4 h-[243mm] pr-8">
              <div>
                <h1 className="text-[16px] font-semibold heading tracking-wider">Details</h1>
                <hr className="w-[15%] h-1 bg-black mb-2"></hr>
                <h1 className="text-[12px] font-semibold pt-1">
                  {profile?.displayEmail === "collegeMail" && (
                    <li className="text-[12px] text-gray-600 ">
                      {profile?.email}
                    </li>
                  )}
                  {profile?.displayEmail === "personalMail" && (
                    <li className="text-[12px] text-gray-600">
                      {profile?.personalEmail}
                    </li>
                  )}
                </h1>
                <h1 className="text-[12px] font-semibold pt-1">
                  <li className="text-[12px] text-gray-600">
                    {profile?.phone}
                  </li>
                </h1>
                {profile?.dob && (
                  <li className="text-[12px] font-semibold pt-1">
                    DOB
                    <span className="text-[12px] text-gray-600">
                      {" : "}
                      {profile?.dob}
                    </span>
                  </li>
                )}
                {social
                  ?.filter((social) => social?.enabled === true)
                  .map((item) => (
                    <div className="text-[12px] font-semibold pt-2">
                      <li href={item.url} target="blank" className="underline cursor-pointer">
                        {item.url}
                      </li>
                    </div>
                  ))}
              </div>
              {education?.filter((edu) => edu?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold pt-4  tracking-wider heading">Education</h1>
                  <hr className="w-[15%] h-1 mb-3 bg-black"></hr>
                  {education
                    ?.filter((edu) => edu?.enabled === true)
                    .map((item) => (
                      <div className="mt-2">
                        <li className="text-[12px] font-bold">
                          {item.typeOfDegree} </li>
                          <p className="text-[12px] font-bold"> {item.institution}
                        </p>
                        <h1 className="text-[12px]  font-semibold text-gray-600">
                          {item.fieldOfStudy}{" "}
                          <span className="text-[12px] font-semibold text-gray-600">
                            ({item.startDate.slice(0, 4)} -{" "}
                            {item.endDate.slice(0, 4)})
                          </span>
                        </h1>
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
              {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
                <div className="">
                  <h1 className="text-[16px] font-semibold tracking-wider heading pt-4">Skills</h1>
                  <hr className="w-[15%] h-1 bg-black"></hr>
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div className="mt-1" key={item?._id}>
                        <h1 className="text-[12px] text-black pt-0.5 flex justify-between">
                          <li className="font-semibold">{item.name} </li>
                          <div>{item.level}</div>
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {awards?.filter((award) => award?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold pt-4 tracking-wider heading">Awards</h1>
                  <hr className="w-[15%] h-1 bg-black"></hr>
                  {awards
                    ?.filter((award) => award?.enabled === true)
                    .map((item) => (
                      <div className="mt-1">
                        <span className="text-[13px] font-bold">
                        <li>{item.name}</li>  
                        </span>
                        <h1 className="text-[12px] pt-1 font-semibold text-gray-600">
                          {item.awarder}{" "}
                          <span className="text-[12px] font-semibold text-gray-600">
                            ({item.date.slice(0, 4)})
                          </span>
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {hobbies?.filter((hobby) => hobby?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold pt-4 tracking-wider heading">Interests</h1>
                  <hr className="w-[15%] h-1 bg-black"></hr>
                  {hobbies
                    ?.filter((hobby) => hobby?.enabled === true)
                    .map((item) => (
                      <div className="mt-1">
                        <li className="text-[12px] font-semibold text-black pt-1">
                          {item.name}
                        </li>
                      </div>
                    ))}
                </div>
              )}
              {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold pt-4 heading">LANGUAGES</h1>
                  <hr className="w-[15%] h-1 bg-black"></hr>
                  {languages
                    ?.filter((lang) => lang?.enabled === true)
                    .map((item) => (
                      <div className="mt-1">
                        <li className="text-[12px] font-semibold text-black pt-1">
                          {item.name}
                        </li>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="col-span-2 pl-10">
              {objective && (
                <>
                  {objective != 0 && (
                    <div>
                      <h1 className="text-[16px] font-semibold heading tracking-wider" >Profile</h1>
                      <hr className="w-[7%] h-1 bg-black"></hr>
                      <h1 className="text-[13px] text-justify markdown text-black py-3">
                        <MarkdownRenderer>{objective}</MarkdownRenderer>
                      </h1>
                    </div>
                  )}
                </>
              )}
              {work?.filter((work) => work?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold pt-3 tracking-wider heading border-t-2">
                  Professional Experience
                  </h1>
                  <hr className="w-[7%] h-1 bg-black mb-2"></hr>
                  {work
                    ?.filter((work) => work?.enabled === true)
                    .map((item) => (
                      <div className="pb-3">
                        <div className="flex justify-between">
                          <span className="text-[13px] font-bold mt-1">
                            {item.company}
                            {" - "}
                            <span className="text-[12px] font-bold mt-1">
                              {item.designation}
                            </span>
                          </span>
                          <h1 className="text-[12px] pt-1 font-semibold text-gray-600">
                            ({item.from.slice(0, 4)} - {item.to.slice(0, 4)})
                          </h1>
                        </div>
                        {item.website && (
                          <a
                            href={item.website}
                            target="blank"
                            className="text-[12px] text-gray-800"
                          >
                            <span className="font-semibold"> Website</span> -{" "}
                            {item.website}
                          </a>
                        )}
                        {item.summary.enabled && (
                          <h1 className="text-[12px] markdown text-justify text-gray-700">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {projects?.filter((project) => project?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-[16px] font-semibold pt-3 heading tracking-wider border-t-2">
                    Projects
                  </h1>
                  <hr className="w-[7%] h-1 bg-black mb-2"></hr>
                  {projects
                    ?.filter((project) => project?.enabled === true)
                    .map((item) => (
                      <div className="pb-3">
                        <div className="flex justify-between">
                          <div className="text-[13px] font-bold mt-1">
                            <a href="{item.website}">{item.name}</a>
                          </div>
                          <div className="text-[12px] pt-1 font-semibold text-gray-600">
                            ({item.from.slice(0, 7)} - {item.to.slice(0, 7)})
                          </div>
                        </div>
                        {item.website && (
                          <a
                            href={item.website}
                            target="blank"
                            className="text-[12px] text-gray-800"
                          >
                            <span className="font-semibold"> Website</span> -{" "}
                            {item.website}
                          </a>
                        )}
                        {item.summary.enabled && (
                          <h1 className="text-[12px] markdown text-justify text-gray-700">
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
                  <h1 className="text-[16px] tracking-wider font-semibold pt-3 heading border-t-2">
                    Certifications
                  </h1>
                  <hr className="w-[7%] h-1 bg-black mb-2"></hr>
                  {certifications
                    ?.filter((cer) => cer?.enabled === true)
                    .map((item) => (
                      <div className="pb-2">
                        <div className="flex justify-between">
                          <div className="text-[13px] font-bold mt-1">
                            <h1 className="text-[13px]">
                              {item.title}
                              <span className="font-normal">
                                - {item.issuer}
                              </span>
                            </h1>
                          </div>
                          <div className="text-[12px] py-1 font-semibold text-gray-600">
                            ({item.date.slice(0, 10)})
                          </div>
                        </div>
                        {item.summary.enabled && (
                          <h1 className="text-[12px]  markdown text-justify text-gray-600">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
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
      </div>
    </>
  );
};
