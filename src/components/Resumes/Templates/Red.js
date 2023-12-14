import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";

import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";

export const Red = ({ componentRef }) => {
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
        id="template"
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5 overflow-hidden`}
      >
        <div className="grid grid-cols-3">
          <div
            className=" bg-red-700 h-[296mm] "
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
          >
            <div className="ml-8 bg-gray-200 h-[296mm] px-4 pl pt-4">
              <div>
                <img
                  //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
                  src={profile?.image}
                  className="h-32 mx-auto mt-2"
                  id="profileImage"
                />
                <h1 className="text-red-700 text-[16px] font-semibold mt-4 mb-1 heading">
                  PERSONAL DETAILS
                </h1>
                <div>
                  <h1 className="text-[12px] font-semibold ">
                    {profile?.role?.toUpperCase()}
                  </h1>
                </div>
              <div>
                  {profile?.displayEmail === "collegeMail" && (
                    <h1 className="text-[12px]  font-semibold m-0.5">
                      {profile?.email}
                    </h1>
                  )}
                  {profile?.displayEmail === "personalMail" && (
                    <h1 className="text-[12px]  font-semibold m-0.5">
                      {profile?.personalEmail}
                    </h1>
                  )}
                </div>
                <div>
                  <span className="text-[12px]  font-semibold m-0.5">
                    {profile?.phone}
                  </span>
                </div>
                {social?.filter((social) => social?.enabled)?.length > 0 && (
                  <div>
                    <h1 className="text-red-700 text-[16px] font-semibold mt-2 mb-1 heading">
                      SOCIAL
                    </h1>
                    {social
                      ?.filter((social) => social?.enabled === true)
                      .map((item) => (
                        <div className="text-[12px] font-semibold underline mx-0.5 mb-2">
                          <a href={item.url} target="blank ">
                            {item.url}
                          </a>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-red-700 text-[16px] font-semibold mt-4 mb-1 heading">
                    SKILLS
                  </h1>
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="text-[12px] mb-1">
                          <span className="font-bold">{item.name}</span> -{" "}
                          {item.level}
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {awards?.filter((awa) => awa?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-red-700 text-[16px] font-semibold mt-4 heading">
                    AWARDS
                  </h1>
                  {awards
                    ?.filter((awa) => awa?.enabled === true)
                    .map((item) => (
                      <div className="py-1">
                        <h1 className="text-[13px] font-semibold relative m-0.5">
                          {item.name} -{" "}
                          <span className="font-normal text-[12px]">
                            {item.awarder}
                          </span>
                        </h1>
                        {item.summary.enabled && (
                          <h1 className="font-normal markdown text-[12px] mx-0.5">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {languages?.filter((lang) => lang?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-red-700 text-[16px] font-semibold mt-3 mb-1 heading">
                    LANGUAGES
                  </h1>
                  {languages
                    ?.filter((lang) => lang?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="text-[12px] font-semibold m-0.5">
                          <span className="font-bold">{item.name}</span>
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {hobbies?.filter((hob) => hob?.enabled)?.length > 0 && (
                <div>
                  <h1 className="text-red-700 text-[16px] font-semibold mt-3 mb-1 heading">
                    HOBBIES
                  </h1>
                  {hobbies
                    ?.filter((hob) => hob?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="text-[12px] font-semibold m-0.5">
                          {item.name}
                        </h1>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 p-6">
            <h1 className="text-red-700 capitalize text-[30px] text-semibold heading">
              {profile?.firstName}{" "}
              {profile?.lastName}
            </h1>
            {objective && (
              <div>
                <h1 className="text-red-700 text-[16px] font-semibold mt-4 heading">
                  PROFILE
                </h1>
                <h1 className="text-[12px] text-justify">
                  <MarkdownRenderer>{objective}</MarkdownRenderer>
                </h1>
              </div>
            )}
            {work?.filter((work) => work?.enabled)?.length > 0 && (
              <div>
                <h1 className="text-red-700 text-[16px] font-semibold mt-3 mb-1 heading">
                  EXPERIENCE
                </h1>
                {work
                  ?.filter((work) => work?.enabled === true)
                  .map((item) => (
                    <div className="py-2">
                      <h1 className="text-[13px] font-bold relative">
                        {item.company} - {item.designation}
                        <span className="text-[12px] pt-1 absolute right-0">
                          {item.from.slice(0, 10)} - {item.to.slice(0, 10)}
                        </span>
                      </h1>
                      <a
                        href={item.website}
                        target="blank"
                        className="text-[12px] underline font-semibold"
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
            {education?.filter((edu) => edu?.enabled)?.length > 0 && (
              <div>
                <h1 className="text-red-700 text-[16px] font-semibold mt-3 mb-1 heading">
                  EDUCATION
                </h1>
                {education
                  ?.filter((edu) => edu?.enabled === true)
                  .map((item) => (
                    <div className="py-2">
                      <h1 className="text-[12.5px] font-bold relative">
                        {item.typeOfDegree} from {item.institution}
                        <span className="text-[12px] absolute right-0">
                          {item.startDate.slice(0, 4)} -{" "}
                          {item.endDate.slice(0, 4)}
                        </span>
                      </h1>
                      <p className="text-[12px]">{item.fieldOfStudy}</p>
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
            {projects?.filter((pro) => pro?.enabled)?.length > 0 && (
              <div>
                <h1 className="text-red-700 text-[16px] font-semibold mt-3 mb-1 heading">
                  PROJECTS
                </h1>
                {projects
                  ?.filter((pro) => pro?.enabled === true)
                  .map((item) => (
                    <div className="py-2">
                      <h1 className="text-[13px] font-bold relative">
                        {item.name}
                        <span className="text-[12px] absolute right-0">
                          {item.from.slice(0, 7)} - {item.to.slice(0, 7)}
                        </span>
                      </h1>
                      <a
                        href={item.website}
                        target="blank"
                        className="text-[12px] underline font-semibold"
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
                <h1 className="text-red-700 text-[16px] font-semibold mt-3 mb-1 heading">
                  CERTIFICATIONS
                </h1>
                {certifications
                  ?.filter((cer) => cer?.enabled === true)
                  .map((item) => (
                    <div className="py-1">
                      <h1 className="text-[13px] font-bold relative">
                        {item.title} -{" "}
                        <span className="text-[13px] font-normal">
                          {item.issuer}
                        </span>
                        <span className="text-[12px] absolute right-0">
                          {item.date}
                        </span>
                      </h1>
                      <h1 className="text-[12px] font-semibold"></h1>
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
    </>
  );
};
