import React from "react";
import Link from "next/link";
import { useResumeContext } from "../../../context/ResumeContext";
import { months, rename } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
export const Madrid = ({ componentRef }) => {
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
  const headingClass =
    "text-xl captialize font-bold text-gray-700 border-b-2 border-black mb-2 pb-1";
  return (
    <>
      <div
        id="template"
        ref={componentRef}
        style={{ fontFamily: layout?.font }}
        className={`w-a4W bg-white mx-auto h-a4H my-5 `}
      >
        <div className="grid grid-cols-11">
          <div className="col-span-8">
            <div className=" py-4 px-2 flex bg-gray-300 h-52">
              <img
                className="rounded-lg w-[125px] h-[125px] ml-4 my-4 mx-4 "
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl60g6oKVerEKPde2ClN4-6ASK4Ds4KzlM0Y1N-K_bCgOCMBYZ019WUgRLOfNAqyyhnY&usqp=CAU"
                src={profile?.image}
                alt=""
              id="profileImage"
    
              />
              <div>
                <h1 className="text-2xl  font-medium ml-1 mt-2 capitalize">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <div>
                  <h1 className="ml-1 mb-1 text-sm font-medium heading">
                    {profile?.role}
                  </h1>
                </div>
                {objective && (
                  <div>
                    <h1 className="text-xs ml-1 font-medium text-[12px] text-justify">
                      <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div className="px-7 py-5">
            {work?.filter((work) => work?.enabled)?.length > 0 && (
            <div className="p-2 px-0 ">
              <h1 className="tracking-wider font-semibold text-xl pt-2 text-[16px] heading">
                Professional Experience
              </h1>
              {work
                ?.filter((work) => work?.enabled === true)
                .map((item) => (
                  <div className="">
                    <div className="flex justify-between">
                      <h1 className="font-semibold text-lg ml-4 text-[12px]">
                        {item.company}
                      </h1>
                      <h2 className="font-semibold text-xs text-[12px] flex justify-end">
                        [{item.from.slice(0, 7)} -- {item.to.slice(0, 7)}]
                      </h2>
                    </div>
                    <h1 className="list-disc ml-4 font-semibold text-[12px]">
                      {item.designation}
                    </h1>
                    <h1 className="list-disc ml-4 font-medium text-[12px]">
                      {item.website}
                    </h1>
                    {item.summary.enabled &&(
                    <h1 className="text-[12px] ml-4 markdown text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                    )}
                  </div>
                ))}
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
                      <h1 className="font-semibold ml-4 text-[12px]">
                        {item.institution}
                      </h1>
                      <h6 className="text-xs ml-4  font-semibold text-[12px] flex justify-end  ">
                      [  {item.startDate.slice(0, 4)} -{" "}
                        {item.endDate.slice(0, 4)}]
                      </h6>
                    </div>
                    <h1 className=" font-medium text-[12px] ml-4">
                    {item.typeOfDegree}
                    </h1>
                    <h1 className=" font-medium text-[12px] ml-4">
                      {item.fieldOfStudy}
                    </h1>
                    {item.summary.enabled &&(
                      <h1 className="text-[12px] markdown ml-4 text-justify "><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                    )}
                  </div>
                ))}
            </div>
          )}
               {certifications?.filter((certifications) => certifications?.enabled)
              ?.length > 0 && (
              <div>
                <h1 className="tracking-wider font-semibold text-xl pt-2 text-[16px] heading">
                  Certifications
                </h1>
                {certifications
                  ?.filter((certifications) => certifications?.enabled === true)
                  .map((item) => (
                    <div>
                      <h1 className=" relative font-semibold ml-4 text-[12px]">
                        {item.title}
                        <span className="absolute right-0 font-semibold  text-[10px]">
                          [ {item.date} ]{" "}
                        </span>
                      </h1>
                      <h1 className=" ml-4 text-[12px]">{item.issuer}</h1>
                      {item.summary.enabled && (
                      <h1 className=" ml-4 markdown text-[12px] text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

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
                      <h1 className="relative ml-4 font-semibold text-[12px]">
                        {item.name}
                        <span className="absolute right-0 font-semibold text-[10px]">
                          [ {item.from.slice(0, 10)} -- {item.to.slice(0, 10)} ]
                        </span>
                      </h1>

                      <h1 className=" ml-4 text-[12px]">{item.website}</h1>
                     {item.summary.enabled &&(
                       <h1 className=" ml-4 markdown text-[12px] text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>

                     )

                     }
                    </div>
                  ))}
              </div>
            )}
            </div>
          </div>
          <div className="col-span-3">
            {social?.filter((soc) => soc?.enabled)?.length > 0 && (
              <div className="bg-blue-800 h-52 py-2">
                <h1 className="font-bold  text-xl  text-[16px]  ml-8 pt-4  tracking-widest text-white">
                  Social Network
                </h1>
                {social
                  ?.filter((social) => social?.enabled === true)
                  .map((item) => (
                    <div className="ml-10 my-2 flex text-[12px]">
                      <img
                        src={"https://www." + item.network + ".com/favicon.ico"}
                        alt=""
                        className="w-5 h-5"
                      />
                      <Link href={item.url}>
                        <h1 className="ml-4 text-white ">{item.username}</h1>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
            <div className="bg-gray-300 h-[85%] px-5 py-3">
            <div>
            <h1 className="font-semibold text-lg  pt-4 p-1 text-[16px]  heading">
              Details 
            </h1>
            {profile?.displayEmail == "collegeMail" && (

              <h1 className=" ml-4 text-[12px]">{profile?.email}</h1>
            )}
            {console.log(profile)}
            {profile?.displayEmail == "personalMail" && (
              <h1 className=" ml-4 text-[12px]">{profile?.personalEmail}</h1>
            )}
            <h1 className=" ml-4   text-[12px]">{profile?.dob}</h1>
            <h1 className=" ml-4 text-[12px]">{profile?.phone}</h1>
          </div>
            {skills?.filter((skill) => skill?.enabled)?.length > 0 && (
                <div>
                  <h1 className="font-semibold p-1 my-0  text-lg pt-5 text-[16px] heading">
                    Skills
                  </h1>
                  {skills
                    ?.filter((skill) => skill?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="font-semibold ml-4 text-[12px]">
                          {item.name}
                        </h1>
                        <h2 className="ml-4 text-[12px]">{item.level}</h2>
                      </div>
                    ))}
                </div>
              )}
               {awards?.filter((awards) => awards.enabled)?.length > 0 && (
            <div>
              <h1 className="font-semibold p-1 my-0  text-lg pt-5 text-[16px] heading">
                Awards
              </h1>
              {awards
                ?.filter((awards) => awards?.enabled === true)
                .map((item) => (
                  <div className="">
                    <h1 className=" text-normal font-semibold text-[12px] ml-2 p-1">
                      {item.name}
                    </h1>
                    <h1 className=" text-sm font-medium text-[12px] ml-4 ">
                      {item.awarder}
                    </h1>
                    {item.summary.enabled && (
                      <h1 className="text-[12px] markdown ml-4 text-justify"><MarkdownRenderer>{item.summary.data}</MarkdownRenderer></h1>
                    )}
                  </div>
                ))}
            </div>
          )}
              {hobbies?.filter((hobbies) => hobbies?.enabled)?.length > 0 && (
                <div>
                  <h1 className="font-semibold ml-2  text-lg pt-5 text-[16px] heading">
                    Hobbies
                  </h1>
                  {hobbies
                    ?.filter((hobbies) => hobbies?.enabled === true)
                    .map((item) => (
                      <div>
                        <h1 className="ml-4 text-[12px]">{item.name}</h1>
                      </div>
                    ))}
                </div>
              )}
               {languages?.filter((languages) => languages?.enabled)?.length > 0 && (
            <div className="">
              <h1 className="font-semibold ml-2  text-lg pt-5 text-[16px] heading">Languages</h1>
              {languages
                ?.filter((languages) => languages?.enabled === true)
                .map((item) => (
                  <div>
                    <h1 className="ml-4 font-medium text-sm ">
                      {item.name}
                    </h1>
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
    </>
  );
};
