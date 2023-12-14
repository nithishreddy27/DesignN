import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Chrono = ({ componentRef, filter = null }) => {
  const {
    profile,
    social,
    objective,
    education,
    awards,
    certifications,
    work,
    skills,
    projects,
    hobbies,
    languages,
    setdesign,
    layout,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  const headingClass =
    "text-lg text-center capitalize font-bold text-gray-700 mb-2 pb-1";
  return (
    <div
      ref={componentRef}
      id="template"
      className="w-a4W bg-white mx-auto h-a4H my-5 "
    >
      <div className="grid grid-cols-5 relative">
        <div className="col-span-2 border-2 border-solid border-black h-[270mm] px-2 ml-5 mt-20 ">
          <img
            className="mt-4 w-36  h-36 absolute top-1 ml-14 border-2  border-gray-600 z-10"
            //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
            src={profile?.image}
            alt=""
            id="profileImage"
          />

          <div>
            <h1 className="text-black mt-28 ml-3  font-medium text-xl">
              {profile?.firstName.toUpperCase()} {" "} 
              {profile?.lastName.toUpperCase()}
            </h1>
           
            <h6 className="font-normal text-lg ml-3 pt-2">{profile?.role}</h6>
          </div>
          <div>
            <h1 className="font-semibold text-lg ml-2 pt-4 p-1 text-[16px]  heading">
              Details 
            </h1>
            {profile?.displayEmail == "collegeMail" && (
              <li className="font-medium ml-3 mt-2 text-[12px]">{profile?.email}</li>
            )}
            {profile?.displayEmail == "personalMail" && (
              <li className="font-medium ml-3 mt-2 text-[12px]">{profile?.personalEmail}</li>

              )}
              <li className="font-medium ml-3 mt-2 text-[12px]">{profile?.phone}</li>
            <li className="font-medium ml-3 mt-2 text-[12px]">{profile?.dob}</li>
          </div>
          {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
            <div className="">
              <h1 className="font-semibold tracking-wider text-lg ml-2   pt-4 text-[16px] heading">
                Skills
              </h1>
              {skills
                ?.filter((skill) => skill?.enabled === true)
                .map((item) => (
                  <div>
                    <li className="font-normal ml-2 mt-2    text-[12px] ">
                      {item.name} - {item.level}
                    </li>
                  </div>
                ))}
            </div>
          )}
          {social?.filter((social) => social?.enabled)?.length > 0 && (
            <div className="">
              <h1 className="font-semibold tracking-wider text-lg ml-2  pt-4 text-[16px] heading">
                Social Network
              </h1>
              {social
                ?.filter((social) => social?.enabled === true)
                .map((item) => (
                  <div className="    my-2 flex text-[12px]">
                    {/* <img
                      src={"https://www." + item.network + ".com/favicon.ico"}
                      alt=""
                      className="w-5 h-5"
                    /> */}
                    <Link href={item.url}>
                      <li className="ml-4 text-[12px]">{item.username}</li>
                    </Link>
                  </div>
                ))}
            </div>
          )}
           {awards?.filter((awards) => awards.enabled)?.length > 0 && (
            <div>
              <h1 className="font-semibold tracking-wider text-lg ml-2 pt-4 heading">
                Awards
              </h1>
              {awards
                ?.filter((awards) => awards?.enabled === true)
                .map((item) => (
                  <div className="mt-2">
                    <h1 className=" text-normal font-semibold text-[12px] ml-2">
                      {item.name}
                    </h1>
                    <h1 className=" text-sm font-medium text-[12px] ml-2">
                      {item.awarder}
                    </h1>
                    {item.summary.enabled && (
                      <h1 className="text-[12px] markdown ml-2 text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>
                    )}
                  </div>
                ))}
            </div>
          )}
          {hobbies?.filter((hobbies) => hobbies?.enabled)?.length > 0 && (
            <div className="">
              <h1 className="font-semibold tracking-wider text-lg ml-2 pt-4 heading">
                Hobbies
              </h1>
              {hobbies
                ?.filter((hobbies) => hobbies?.enabled === true)
                .map((item) => (
                  <div>
                    <h1 className="ml-2 font-medium text-sm  text-[12px]">
                      {item.name}
                    </h1>
                  </div>
                ))}
            </div>
          )}
          {/* {languages?.filter((languages) => languages?.enabled)?.length > 0 && (
            <div className="">
              <h1 className="font-semibold tracking-wider text-lg ml-2 pt-4 heading">Languages</h1>
              {languages
                ?.filter((languages) => languages?.enabled === true)
                .map((item) => (
                  <div>
                    <h1 className="ml-2 font-medium text-sm ">
                      {item.name}
                    </h1>
                  </div>
                ))}
            </div>
          )} */}
        </div>
        <div className="col-span-3 px-6 py-2">
          {objective && (
            <div className="">
              <h1 className="font-semibold tracking-wider text-xl mt-24 text-[16px] heading">
                Objective
              </h1>
              <h1 className="p-2 pt-1 ml-2 text-justify text-[12px]"><MarkdownRenderer>{objective}</MarkdownRenderer></h1>
            </div>
          )}
          {education?.filter((education) => education?.enabled)?.length > 0 && (
            <div className=" px-0  ">
              <h1 className="tracking-wider font-semibold text-xl pt-2 text-[16px] heading">
                Education
              </h1>
              {education
                ?.filter((education) => education?.enabled === true)
                .map((item) => (
                  <div className="p-1">
                    <div className="flex justify-between">
                      <h1 className="font-semibold  ml-2 text-[12px]">
                        {item.institution}
                      </h1>
                      <h6 className="text-xs  font-medium text-[12px] flex justify-end  ">
                      [  {item.startDate.slice(0, 4)} -{" "}
                        {item.endDate.slice(0, 4)}]
                      </h6>
                    </div>
                    <h1 className="font-semibold  ml-2 text-[12px]">
                    {item.typeOfDegree}
                      </h1>
                    <h1 className=" font-medium text-[12px] ml-2">
                      {item.fieldOfStudy}
                    </h1>
                    {item.summary.enabled &&(
                      <h1 className="text-[12px] markdown text-justify  ml-2 "><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                    )}
                  </div>
                ))}
            </div>
          )}
          {work?.filter((work) => work?.enabled)?.length > 0 && (
            <div className="p-2 px-0 ">
              <h1 className="tracking-wider font-semibold text-xl pt-2 text-[16px] heading">
                Work Experience
              </h1>
              {work
                ?.filter((work) => work?.enabled === true)
                .map((item) => (
                  <div className="">
                    <div className="flex justify-between">
                      <h1 className="font-semibold ml-2 text-lg text-[12px]">
                        {item.company}
                      </h1>
                      <h2 className="font-medium text-xs text-[12px] flex justify-end">
                        [{item.from.slice(0, 4)} - {item.to.slice(0, 4)}]
                      </h2>
                    </div>
                    <h1 className="list-disc ml-2 font-semibold text-[12px]">
                      {item.designation}
                    </h1>
                    <h1 className="list-disc ml-2  font-medium text-[12px]">
                      {item.website}
                    </h1>
                    {item.summary.enabled &&(
                    <h1 className="text-[12px] markdown text-justify ml-2"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                    )}
                  </div>
                ))}
            </div>
          )}
          {certifications?.filter((certifications) => certifications.enabled)
            ?.length > 0 && (
            <div>
              <h1 className="tracking-wider font-bold text-xl pt-2 text-[16px] heading">
                Certifications
              </h1>
              {certifications
                ?.filter((certifications) => certifications?.enabled === true)
                .map((item) => (
                  <div className="">
                    <div className="flex justify-between">

                    <h1 className=" ml-2 text-normal font-semibold text-[12px]">
                      {item.title}
                    </h1>
                    <h1 className="font-medium text-xs text-[12px]">[{item.date}]</h1>

                    </div>
                    <h1 className=" ml-2 text-sm font-medium text-[12px]">
                      {item.issuer}
                    </h1>
                    {item.summary.enabled && (
                      <h1 className=" ml-2 markdown text-[12px] text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                      )}
                  </div>
                ))}
            </div>
          )}
         {projects?.filter((projects) => projects?.enabled)?.length > 0 && (
              <div>
                <h1 className="tracking-wider font-bold text-xl pt-2 text-[16px] heading">
                  Projects
                </h1>
                {projects
                  ?.filter((projects) => projects?.enabled === true)
                  .map((item) => (
                    <div>
                      <h1 className="relative ml-2 font-semibold text-[12px]">
                        {item.name}
                        <span className="absolute right-0 font-medium text-[12px]">
                          [ {item.from.slice(0, 7)} - {item.to.slice(0, 7)} ]
                        </span>
                      </h1>

                      <h1 className=" ml-2 text-[12px] cursor-pointer underline">{item.website}</h1>
                     {item.summary.enabled &&(
                       <h1 className=" ml-2 text-[12px] markdown text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                     ) 

                     }
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
    
  );
};
