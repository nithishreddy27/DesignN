import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Stylish = ({ componentRef, filter = null }) => {
  const {
    profile,
    social,
    objective,
    education,
    awards,
    certifications,
    projects,
    work,
    skills,
    hobbies,
    languages,
    layout,
    setdesign,
    leftDisplayElements,
    rightDisplayElements
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
      className="w-a4W  mx-auto   h-[296mm] my-5  relative bg-gray-100"
      
    >
      <div className="flex px-5 py-4">

        {/* left  */}
        <div className="flex-col pt-1 mt-[5%] py-3 pl-1 w-[40%]  bg-blue-100 rounded-xl "
        style={{
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        }}>
          {/* image */}
          {profile && (
            <div className=" flex text-black   justify-around ">
              <img
                src={profile.image}
                alt=""
                className="w-[50%] h-[40%] p-3 rounded-3xl mb-3"
                id="profileImage"
              />
            </div>
          )}
          {/* name */}
          {profile && (
            <div className="flex-col py-2 pl-3 text-center">
              <span className=" text-[20px] text-center font-extrabold tracking-wide capitalize font-serif ">
                {profile.firstName} {profile.lastName}
              </span>
              <h1 className="  text-[16px]  tracking-wider font-thin ">
                {profile.role}
              </h1>
            </div>
          )}
          {/* network */}
          {profile && (
            <div className="py-1 px-2 text-black pt-2">
              <p className="text-[16px] font-bold tracking-wider  font-serif px-4 py-2">
                NETWORK
              </p>

              <div className="text-[14px] px-2">
                <div className="px-2">
                  <p>{profile.phone}</p>
                  <p> {profile.email}</p>
                </div>
              </div>
            </div>
          )}
          {/* skills */}
          {skills?.filter((skill) => skill?.enabled).length > 0 && (
            <div className="py-1 px-2 text-black">
              <p className="text-[16px] font-bold tracking-wider font-serif px-4 py-2">
                SKILLS
              </p>
              {skills.map((item) => (
                <>
                  {item.enabled == true && (
                    <div className="text-[14px] px-2">
                      <span className="">
                        <li>
                          {item.name} - {item.level}
                        </li>
                      </span>
                      <p>{item.enabled}</p>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          {/* languages */}
          {languages?.filter((language) => language?.enabled).length > 0 && (
            <div>
              {languages.length != 0 && (
                <div className="py-1 px-2 text-black">
                  <p className="text-[16px] font-bold tracking-wider  font-serif px-4 py-2">
                    LANGUAGES
                  </p>
                  {languages.map((item) => (
                    <>
                      {item.enabled == true && (
                        <div className="text-[14px] px-2">
                          <li>
                            {item.name} : {item.fluency}
                          </li>
                          <p>{item.enabled}</p>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* hobbies */}
          {hobbies?.filter((hobbie) => hobbie?.enabled).length > 0 && (
            <div>
              {hobbies.length != 0 && (
                <div className="py-1 px-2 text-black">
                  <p className="text-[16px] font-bold tracking-wider font-serif px-4 py-2">
                    HOBBIES
                  </p>
                  {hobbies.map((item) => (
                    <>
                      {item.enabled && (
                        <div key={item.name} className="text-[14px] px-2">
                          <li>{item.name}</li>
                          <p>{item.enabled}</p>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* awards */}
          {awards?.filter((award) => award?.enabled).length > 0 && (
            <div>
              {awards.length != 0 && (
                <div className="py-1 px-2 text-black">
                  <p className="text-[16px] font-bold tracking-wider font-serif px-4 py-2">
                    AWARDS
                  </p>
                  {awards.map((item) => (
                    <>
                      {item.enabled && (
                        <div className="text-[14px] px-2 font-semibold ">
                          <li>
                            {item.name}
                            <p className="px-4 font-mono text-[12px] font-normal">
                              [{item.date.slice(0, 4)}]
                            </p>
                            <p className="px-4 font-normal">{item.awarder}</p>

                            <p>{item.summary.enabled}</p>
                            <p>{item.enabled}</p>
                          </li>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* education  */}
         
        </div>


        {/* Right  */}
        <div className="flex pt-1 w-[60%] mt-[4%] ml-3 mr-3">
          <div className="flex-col">
            {/* profile */}
            {objective && (
              <div>
                {objective != 0 && (
                  <div>
                    <p className=" text-black my-auto font-semibold font-serif text-[16px] heading tracking-wider  p-1  mt-3 ">
                      PROFILE
                    </p>
                    {/* <hr></hr> */}
                    <hr className="h-[2px] ml-2 bg-black"></hr>

                    <h1 className="text-[12px] text-black text-justify p-1 pt-2">
                    <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </h1>
                  </div>
                )}
              </div>
            )}
            {/* education */}
            {education?.filter((education) => education?.enabled).length > 0 && (
              <div>
                {education.length != 0 && (
                  <div className="">
                    <p className=" text-black font-semibold font-serif text-[16px] heading tracking-wider  p-1  mt-3 ">
                      EDUCATION
                    </p>
                    {/* <hr></hr> */}
                    <hr className="h-[2px] ml-2 bg-black"></hr>

                    {education.map((item) => (
                      <>
                        {item.enabled && (
                          <div className="text-[12px] px-2 py-1 text-black">
                            <p className="font-semibold text-[14px] relative text-black">
                              {item.institution}
                              <span className="text-black font-normal absolute text-[11px] right-0">
                                [ {item.startDate.slice(0, 4)} ] - [{" "}
                                {item.endDate.slice(0, 4)} ]
                              </span>
                            </p>
                            <p className="text-black">{item.fieldOfStudy}</p>
                            <p className="text-black">
                              {item.typeOfDegree} - {item.gpa}
                            </p>
                            {item.summary.enabled && (
                            <h1 className="text-black markdown">{item.summary.data}</h1>
                            )}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Internship */}
            {work?.filter((work) => work?.enabled).length > 0 && (
              <div>
                {work.length != 0 && (
                  <div className="">
                    <p className="text-black font-semibold font-serif text-[16px] heading tracking-wider  mt-3 ">
                      EXPERIENCE
                    </p>
                    <hr className="h-[2px] ml-2 bg-black"></hr>
                    {work.map((item) => (
                      <>
                        {item.enabled && (
                          <div className="text-[12px] px-2 py-1 text-black">
                            <div className="text-black text-[14px] flex justify-between">
                              <div href={item.website} className="">
                               <h1 className="font-semibold text-justify"> {item.company} - <span className="font-normal">{item.designation} </span> </h1>
                              </div>
                              <div className="">
                              <span className="   text-[10px] text-black">
                                [{item.from.slice(0, 10)}] - [
                                {item.to.slice(0, 10)}]
                              </span>
                              </div>
                            </div>

                            <p className="px-4  font-normal"></p>
                            {item.summary.enabled && (

                              <h1 className="text-[12px] text-justify markdown text-black">
                            <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                            </h1>
                              )}
                            
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* projects */}
            {projects?.filter((project) => project?.enabled).length > 0 && (
              <div>
                {projects.length != 0 && (
                  <div className="">
                    <p className=" text-black font-semibold font-serif text-[16px] heading tracking-wider    mt-3 ">
                      PROJECTS
                    </p>
                    {/* <hr></hr> */}
                    <hr className="h-[2px] ml-2 bg-black"></hr>

                    {projects.map((item) => (
                      <>
                        {item.enabled && (
                          <div className="text-[13px] py-1 px-2 text-black">
                            <div className="flex justify-between">
                            <div className="">

                            <Link href={item.website} className="cursor-pointer ">
                              <h1 className="relative font-bold text-black tracking-wider cursor-pointer">
                                {item.name}
                                
                              </h1>
                            </Link>
                            </div>
                            <h1 className="ml-3 text-[11px] font-semiboldd text-black ">
                                  [{item.from.slice(0,7)}] - [
                                  {item.to.slice(0, 7)}]
                                </h1>
                            </div>
                            {item.summary.enabled && (


                              <h1 className="text-[12px] text-justify markdown text-black">
                            <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                            </h1>
                              )} 
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* certification */}
            {certifications?.filter((certification) => certification?.enabled)
              .length > 0 && (
              <div>
                {certifications.length != 0 && (
                  <div className="">
                    <p className=" text-black font-semibold font-serif text-[16px]  heading tracking-wider   mt-3 ">
                      CERTIFICATION
                    </p>
                    {/* <hr></hr> */}
                    <hr className="h-[2px] ml-2 bg-black"></hr>

                    {certifications.map((item) => (
                      <>
                        {item.enabled && (
                          <div className="text-[13px] py-1 px-2 text-black">
                            <p className="font-semibold  text-black">
                              {item.title}
                            </p>

                            <p className=" text-black relative">
                              {item.issuer}
                              <span className="absolute right-0 text-[12px] text-black">
                                [{item.date}]
                              </span>
                            </p>
                            {item.summary.enabled && (

                              <p className="text-[12px] text-justify markdown text-black">
                              {item.summary.data}
                            </p>
                              )}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                )}
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
    // </div>
  );
};
