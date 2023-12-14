import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";

import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Tokyo = ({ componentRef }) => {
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
  // templateRef.style.scale = 0.9;
  setdesign(templateRef);
  return (
    <>
      <div
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H `}
        id="template"
      >
        <div
          className="flex bg-red-700"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
        >
          <img
            className="rounded-full py-5 px-8 h-44 "
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
            src={profile?.image}
            id="profileImage"
          />
          <div className="m-1 py-12 w-[100%]">
            <div>
              <h1 className="text-3xl text-white font-semibold m-1">
                {profile?.firstName} {profile?.lastName}
              </h1>
              <h1 className="text-sm text-white m-1">
                {profile?.role?.toUpperCase()}
              </h1>
            </div>
            <div className="flex text-white m-1 ">
              {profile?.displayEmail === "collegeMail" && (
                <h1 className="text-[12px] ">{profile?.email}</h1>
              )}
              {profile?.displayEmail === "personalMail" && (
                <h1 className="text-[12px]  ">{profile?.personalEmail}</h1>
              )}
              <div className="text-[12px] mx-5 ">{profile?.phone}</div>
              {profile?.dob && (
                <div className="text-[12px] ">{profile?.dob}</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="col-span-2 h-[250mm] border-r-2 py-4 px-8">
            {objective && (
              <div>
                <h1 className="heading text-[16px] font-bold">Profile</h1>
                <h1 className="text-[13px] text-justify">
                  <MarkdownRenderer>{objective}</MarkdownRenderer>
                </h1>
              </div>
            )}
            {work?.filter((work) => work?.enabled)?.length > 0 && (
              <div>
                <h1 className="heading text-[16px] font-bold mt-4 mb-1">
                  Employment History
                </h1>
                {work
                  ?.filter((work) => work?.enabled === true)
                  .map((item) => (
                    <div className="my-1 ml-1">
                      <div className="flex justify-between">
                        <span className="text-[13px] font-bold mt-1">
                          ● {item.company}
                          {" - "}
                          <span className="text-[12px] font-semibold">
                            {item.designation}
                          </span>
                        </span>
                        <h1 className="text-[12px] pt-1 font-semibold text-gray-600">
                          ({item.from.slice(0, 4)} to {item.to.slice(0, 4)})
                        </h1>
                      </div>
                      <a
                        href={item.website}
                        target="blank"
                        className="text-[12px] underline font-semibold ml-3"
                      >
                        {item.website}
                      </a>
                      {item.summary.enabled && (
                        <h1 className="markdown text-[12px] text-justify ml-3">
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
                <h1 className="heading text-[16px] font-bold mt-4 mb-1">
                  Projects
                </h1>
                {projects
                  ?.filter((project) => project?.enabled === true)
                  .map((item) => (
                    <div className="my-1 ml-1">
                      <div className="flex justify-between">
                        <div className="text-[13px] font-bold mt-1">
                          ● {item.name}
                        </div>
                        <h1 className="text-[12px] pt-1 font-semibold text-gray-500">
                          ({item.from.slice(0, 7)} to {item.to.slice(0, 7)})
                        </h1>
                      </div>
                      <div className="ml-3">
                        <div className="text-[12px] font-semibold">
                          <div>
                            <a
                              href={item.website}
                              target="blank"
                              className="underline"
                            >
                              {item.website}
                            </a>
                          </div>
                          {item.summary.enabled && (
                            <h1 className="markdown text-[12px] text-justify font-normal">
                              <MarkdownRenderer>
                                {item.summary.data}
                              </MarkdownRenderer>
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                {certifications?.filter(
                  (certifications) => certifications?.enabled
                )?.length > 0 && (
                  <div>
                    <h1 className="heading text-[16px] font-bold mt-4 mb-1">
                      Certifications
                    </h1>
                    {certifications
                      ?.filter(
                        (certifications) => certifications?.enabled === true
                      )
                      .map((item) => (
                        <div className="my-1 ml-1">
                          <div className="flex justify-between">
                            <span className="text-[13px] font-bold mt-1">
                              ● {item.title} -
                              <span className="text-[12px] ml-3 font-normal">
                                {item.issuer}
                              </span>
                            </span>
                            <h1 className="text-[12px] pt-1 font-semibold text-gray-600">
                              ({item.date.slice(0, 4)})
                            </h1>
                          </div>

                          {item.summary.enabled && (
                            <div className="markdown text-[12px] text-justify ml-3">
                              <MarkdownRenderer>
                                {item.summary.data}
                              </MarkdownRenderer>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="py-4 px-4">
            {education?.filter((edu) => edu?.enabled)?.length > 0 && (
              <div>
                <h1 className="heading text-[16px] font-bold ">Education</h1>
                {education
                  ?.filter((edu) => edu?.enabled === true)
                  .map((item) => (
                    <div className="ml-1 py-0.5">
                      <div className="text-[13px] font-bold mt-1">
                        ● {item.institution}
                      </div>
                      <div className="text-[12px] ml-3 font-semibold">
                        {item.fieldOfStudy}
                      </div>
                      <h1 className="text-[12px] ml-3 font-semibold text-gray-600">
                        ({item.startDate.slice(0, 4)} to{" "}
                        {item.endDate.slice(0, 4)})
                      </h1>
                      {item.summary.enabled && (
                        <h1 className="markdown text-[12px] text-justify ml-3">
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
              <div>
                <h1 className="heading text-[16px] font-bold mt-3 mb-1">
                  Skills
                </h1>
                {skills
                  ?.filter((skill) => skill?.enabled === true)
                  .map((item) => (
                    <div className="ml-1">
                      <h1 className="text-[12px] font-semibold m-1">
                        ● {item.name} - {item.level}
                      </h1>
                    </div>
                  ))}
              </div>
            )}
            {social?.filter((social) => social?.enabled)?.length > 0 && (
              <div>
                <h1 className="heading text-[16px] font-bold mt-3 mb-1">
                  Social
                </h1>
                {social
                  ?.filter((social) => social?.enabled === true)
                  .map((item) => (
                    <div className="ml-1">
                      <a
                        href={item.url}
                        target="blank"
                        className="text-[12px] font-semibold m-1 underline"
                      >
                        ● {item.url}
                      </a>
                    </div>
                  ))}
              </div>
            )}
            {awards?.filter((award) => award?.enabled)?.length > 0 && (
              <div>
                <h1 className="heading text-[16px] font-bold mt-3">Awards</h1>
                <div className="ml-1">
                  {awards
                    ?.filter((award) => award?.enabled === true)
                    .map((item) => (
                      <div className="py-1">
                        <h1 className="text-[12px] font-bold relative">
                          ● {item.name}
                        </h1>
                        <h1 className="text-[12px] font-semibold ml-3">
                          {item.awarder}
                        </h1>
                        {item.summary.enabled && (
                          <h1 className="markdown text-[12px] text-justify ml-3">
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
            {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
              <div>
                <h1 className="heading text-[16px] font-bold mt-3 mb-1">
                  Hobbies
                </h1>
                {hobbies
                  ?.filter((hob) => hob?.enabled === true)
                  .map((item) => (
                    <div className="ml-1">
                      <h1 className="text-[12px] font-semibold m-1">
                        ● {item.name}
                      </h1>
                    </div>
                  ))}
              </div>
            )}
            {/* {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
              <div className="">
                <h1 className="heading text-[16px] font-bold mt-3 mb-1">
                  Languages
                </h1>
                {languages
                  ?.filter((lang) => lang?.enabled === true)
                  .map((item) => (
                    <div className="ml-1">
                      <h1 className="text-[12px] font-semibold m-1">
                        ● {item.name}
                      </h1>
                    </div>
                  ))}
              </div>
            )} */}
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
