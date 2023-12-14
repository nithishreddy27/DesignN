import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";
export const Casual = ({ componentRef, filter = null }) => {
  const {
    profile,
    objective,
    education,
    work,
    skills,
    languages,
    projects,
    certifications,
    social,
    layout,
    hobbies,
    setdesign,
    awards,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  const headingClass =
    "text-xl captialize font-bold text-gray-700 border-b-2 border-black mb-2 pb-1";
  return (
    <div
      ref={componentRef}
      id="template"
      className="my-5 w-a4W bg-white mx-auto h-a4H"
    >
      <div className=" h-full">
        {console.log("profile", social)}
        <div className="grid grid-cols-3">
          <div>
            <div className="col-span-1 bg-gray-300  h-[296mm] w-[98%]">
              <div>
                <img
                  className="rounded-lg w-36 h-35 m-auto pt-3"
                  //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
                  src={profile?.image}
                  alt=""
                  id="profileImage"
                />
              </div>
              <div className="">
                <h1 className="font-semibold mx-8 text-lg   text-orange-800 mt-8 text-[16px] heading">
                  Details
                </h1>
                <div className="px-10">
                  <h6 className="  text-[12px]">{profile?.phone}</h6>
                  {profile?.displayEmail === "collegeMail" && (
                    <h6 className="  text-[12px]">{profile?.email}</h6>
                  )}
                  {profile?.displayEmail === "personalMail" && (
                    <h6 className=" text-[12px]">{profile?.personalEmail}</h6>
                  )}
                  <h6 className="  text-[12px]">{profile?.dob}</h6>
                </div>
              </div>
              {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
                <div>
                  <h1 className="font-bold ml-8  text-orange-800 text-lg mt-2 text-[16px] heading">
                    Skills
                  </h1>
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div className="flex justify-between">
                        <h1 className="font-normal ml-10 text-[12px]">
                          {item.name}
                        </h1>
                      </div>
                    ))}
                </div>
              )}
              {social?.filter((social) => social?.enabled)?.length > 0 && (
                <div>
                  <h1 className="font-semibold mx-8  text-orange-800 text-lg mt-2 text-[16px] heading">
                    Social Network
                  </h1>
                  {social
                    ?.filter((social) => social?.enabled === true)
                    .map((item) => (
                      <div className="ml-10 my-2 flex text-[12px]">
                        <img
                          src={
                            "https://www." + item.network + ".com/favicon.ico"
                          }
                          alt=""
                          className="w-5 h-5"
                        />
                        <Link href={item.url}>
                          <h1 className="ml-4 text-[12px]">{item.username}</h1>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
              {hobbies?.filter((hobbies) => hobbies?.enabled)?.length > 0 && (
                <div>
                  <h1 className="font-semibold ml-8 text-lg text-orange-800 mt-2 text-[16px] heading">
                    Hobbies
                  </h1>
                  {hobbies
                    ?.filter((hobbies) => hobbies?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="ml-10 text-[12px]">{item.name}</h1>
                      </div>
                    ))}
                </div>
              )}
              {languages?.filter((languages) => languages?.enabled)?.length >
                0 && (
                <div>
                  <h1 className="font-semibold ml-8 text-lg text-orange-800 mt-2 text-[16px] heading">
                    Languages
                  </h1>
                  {languages
                    ?.filter((languages) => languages?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="ml-10 text-[12px]">{item.name}</h1>
                      </div>
                    ))}
                  {awards?.filter((awa) => awa?.enabled)?.length > 0 && (
                    <div>
                      <h1 className="font-semibold ml-8 text-lg text-orange-800 mt-2 text-[16px] heading">
                        Awards
                      </h1>
                      {awards
                        ?.filter((awa) => awa?.enabled === true)
                        .map((item) => (
                          <div className="py-1 p-3 ml-6">
                            <h1 className="text-[13px] font-semibold relative ">
                              {item.name} -{" "}
                              <span className="font-normal text-[12px]">
                                {item.awarder}
                              </span>
                            </h1>
                            {item.summary.enabled && (
                              <h1 className="font-normal markdown text-[12px] mx-0.5 text-xs">
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
              )}
            </div>
          </div>
          <div className="col-span-2 py-2 px-5 ">
            <h1 className="mt-12 text-5xl text-[25px] font-semi-bold ">
              {profile?.firstName.toUpperCase()}{" "}
              {profile?.lastName.toUpperCase()}
            </h1>
            <h2 className="font-medium mt-2 ">{profile?.role}</h2>
            {objective && (
              <div>
                <h1 className="font-semibold text-orange-800 text-lg text-[16px] pt-12 heading">
                  Profile
                </h1>
                <h1 className="text-[12px] text-justify">
                  <MarkdownRenderer>{objective}</MarkdownRenderer>
                </h1>
              </div>
            )}
            {work?.filter((work) => work?.enabled)?.length > 0 && (
              <div>
                <h1 className="font-semibold text-orange-800 text-lg pt-2 text-[16px] heading">
                  Experience
                </h1>
                {work
                  ?.filter((work) => work?.enabled === true)
                  .map((item) => (
                    <div>
                      <h1 className="relative ml-4  font-semibold text-[12px]">
                        {item.company}
                        <span className="absolute right-0 font-semibold text-[10px]">
                          [ {item.from.slice(0, 7)} ] - [ {item.to.slice(0, 7)}{" "}
                          ]
                        </span>
                      </h1>

                      <h1 className="ml-8 list-disc text-[12px]">
                        {item.designation}
                      </h1>
                      <h1 className="ml-8 list-disc text-[12px]">
                        {item.website}
                      </h1>
                      {item.summary.enabled && (
                        <h1 className="ml-8 markdown list-disc text-[12px] text-justify">
                          <MarkdownRenderer>
                            {item.summary.data}
                          </MarkdownRenderer>
                        </h1>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {education?.filter((education) => education?.enabled)?.length >
              0 && (
              <div>
                <h1 className="font-semibold text-orange-800 text-lg pt-2 text-[16px] heading">
                  Education
                </h1>
                {education
                  ?.filter((education) => education?.enabled === true)
                  .map((item) => (
                    <div>
                      <h1 className="relative font-semibold ml-4 text-[12px]">
                        {item.institution}
                        <div className="">
                          <span className="absolute right-0 font-semibold text-[10px]">
                            [ {item.startDate.slice(0, 4)} ] - [{" "}
                            {item.endDate.slice(0, 4)} ]
                          </span>
                          <h1 className="font-normal ml-4 text-[12px]">
                            {item.typeOfDegree}
                          </h1>
                          <h1 className="font-normal ml-4 text-[12px]">
                            {item.fieldOfStudy} - {item.gpa}
                          </h1>
                        </div>
                        {item.summary.enabled && (
                          <h1 className="font-normal markdown ml-4 text-[12px] text-justify ">
                            <MarkdownRenderer>
                              {item.summary.data}
                            </MarkdownRenderer>
                          </h1>
                        )}{" "}
                        {/* <p>{item.summary.enabled}</p> */}
                        <h1>{item.enabled}</h1>
                      </h1>

                      {/* <p className="px-8 text-[12px]">{item.fieldOfStudy}</p> */}
                    </div>
                  ))}
              </div>
            )}
            {projects?.filter((projects) => projects?.enabled)?.length > 0 && (
              <div>
                <h1 className="font-semibold text-orange-800 text-lg pt-2 text-[16px] heading">
                  Projects
                </h1>
                {projects
                  ?.filter((projects) => projects?.enabled === true)
                  .map((item) => (
                    <div>
                      <h1 className="relative font-semibold ml-4 text-[12px]">
                        {item.name}
                        <span className="absolute right-0 font-semibold text-[10px]">
                          [ {item.from.slice(0, 7)} - {item.to.slice(0, 7)} ]
                        </span>
                      </h1>

                      <h1 className=" ml-8 text-[12px]">{item.website}</h1>
                      {item.summary.enabled && (
                        <h1 className=" ml-8 text-[12px] text-justify markdown">
                          <MarkdownRenderer>
                            {item.summary.data}
                          </MarkdownRenderer>
                        </h1>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {certifications?.filter((certifications) => certifications?.enabled)
              ?.length > 0 && (
              <div>
                <h1 className="font-semibold text-orange-800 text-lg pt-2 text-[16px] heading">
                  Certifications
                </h1>
                {certifications
                  ?.filter((certifications) => certifications?.enabled === true)
                  .map((item) => (
                    <div>
                      <h1 className=" relative ml-4 font-semibold text-[12px]">
                        {item.title}
                        <span className="absolute right-0 font-semibold bottom-1 text-[10px]">
                          [ {item.date} ]{" "}
                        </span>
                      </h1>
                      <h1 className=" ml-8 text-[12px]">{item.issuer}</h1>
                      {item.summary.enabled && (
                        <h1 className=" ml-8 text-[12px] markdown markdown text-justify">
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
    </div>
  );
};
