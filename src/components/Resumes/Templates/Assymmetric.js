import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Assymmetric = ({ componentRef, filter = null }) => {
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
      className="w-a4W  bg-white mx-auto h-a4H my-5 relative"
    >
      <div className="flex gap-3 pt-2">


        {/* left  */}
        <div className="w-[35%] pl-7">
          {profile && (
            <>
              <img
                src={profile?.image}
                alt=""
                className="w-[35mm] h-[33mm] mt-5 border-4 border-gray-500 rounded-full my-2"
                id="profileImage"
                style={{
                  borderColor: `rgba(${r}, ${g}, ${b},${a})`,
                }}
              />
            </>
          )}

          {/* network */}
          {profile && (
            <div className="pt-3">
              <div className="text-[12px]">
                <h1 className="text-[16px]  font-serif tracking-[2px] heading font-bold">
                  Network
                </h1>
                <div className="flex mt-2">
                  <span className="">
                    <img
                      src="https://www.freeiconspng.com/uploads/contact-methods-phone-icon-512x512-pixel-3.png"
                      className="w-3 h-3"
                    />
                  </span>
                  <h1 className="mx-3 -mt-1 text-[12px]">{profile?.phone}</h1>
                </div>
                <div className="flex my-1">
                  <span className="">
                    <img
                      src="https://www.freeiconspng.com/uploads/black-mail-icon-4.png"
                      className="w-4 h-4"
                    />
                  </span>
                  {profile?.displayEmail === "collegeMail" && (
                    <h1 className="mx-2 text-[12px]">{profile?.email}</h1>
                  )}
                  {profile?.displayEmail === "personalMail" && (
                    <h1 className="mx-2 text-[12px]">
                      {profile?.personalEmail}
                    </h1>
                  )}
                </div>
                {social
                  ?.filter((social) => social?.enabled === true)
                  .map((item) => (
                    <li className="text-[12px] ">
                      <a href={item.url} target="blank" className="underline">
                        {item.url}
                      </a>
                    </li>
                  ))}

              </div>
            </div>
          )}

          {/* hobbies */}
          {hobbies?.filter((hobbie) => hobbie?.enabled).length > 0 && (
            <div>
              {hobbies?.length != 0 && (
                <div className="pt-3 ">
                  <p className="text-[16px] tracking-[2px]  font-serif  heading font-bold">
                    Interests
                  </p>
                  <div className="pt-1">
                    {hobbies?.map((item) => (
                      <>
                        {item.enabled && (
                          <div key={item.name} className="text-[12px]">
                            <li className="">{item.name}</li>
                            <p>{item.enabled}</p>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* skills */}
          {skills?.filter((skill) => skill?.enabled).length > 0 && (
            <div className="pt-3">
              <p className="text-[16px] tracking-[2px] font-bold heading  font-serif ">
                Skills
              </p>
              <div className="pt-1">
                {skills?.map((item) => (
                  <>
                    {item.enabled == true && (
                      <div key={item.name}>
                        <li className="text-[12px] ">
                          {item.name} 
                        </li>
                        <p>{item.enabled}</p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          )}
          {/* languages */}
          {languages?.filter((language) => language?.enabled).length > 0 && (
            <div>
              {languages?.length != 0 && (
                <div className="pt-3">
                  <p className="text-[16px] tracking-[2px] heading font-serif tracking-wider font-bold">
                    Languages
                  </p>
                  {languages?.length != 0 &&
                    languages?.filter((languages) => languages?.enabled).length >
                      0 && (
                      <div className="pt-1">
                        {languages?.map((item) => (
                          <>
                            {item.enabled && (
                              <div key={item.name} className="">
                                <h1 className="text-[12px]">
                                  {item.name} 
                                </h1>
                                <p>{item.enabled}</p>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          )}

          {/* internship */}
          {work?.filter((work) => work?.enabled).length > 0 && (
            <div>
              {work?.length != 0 && (
                <div className="pt-3">
                  <p className="tracking-[2px] text-[16px] heading font-serif  font-bold pb-1">
                     Experience
                  </p>
                  <div className="pt-1">
                    {work?.map((item) => (
                      <>
                        {item.enabled && (
                          <div key={item.company} className="">
                            <p className="relative font-bold pl-2 text-gray-800 text-[14px] tracking-wider">
                              {item.company}
                            </p>
                            <p>
                              <span className="pl-2 text-[12px]">
                                [ {item.from.slice(0, 7)}] - [
                                {item.to.slice(0, 7)}]
                              </span>
                            </p>

                            <p className="text-[12px] pl-2  text-justify font-semibold text-gray-700">
                              {item.designation}
                            </p>
                            {item.summary.enabled && (
                              <h1 className="pl-2 text-[12px] markdown">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </h1>
                            )}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* awards */}
          {awards?.filter((award) => award?.enabled).length > 0 && (
            <div className="pt-3">
              {awards?.length != 0 && (
                <div className="">
                  <p className="text-black tracking-[2px] font-bold font-serif heading tracking-wider   py-1 ">
                    Awards
                  </p>
                  {awards?.map((item) => (
                    <>
                      {item.enabled && (
                        <div key={item.name} className="text-[12px] pt-2">
                          <div className="flex justify-between">

                          <h1 className="font-bold  text-gray-800">
                            {item.name} - {item.awarder}
                          </h1>
                          <span className="">
                            [{item.date.slice(0, 4)}]
                          </span>
                          </div>
                          <p className="font-semibold"></p>
                          {item.summary.enabled && (
                            <h1 className="text-justify markdown text-[12px]">
                              <MarkdownRenderer>
                              {item.summary.data}
                              </MarkdownRenderer>
                            
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
        </div>

        <div className="w-[65%] px-4 py-2 pb-4 ">
          {profile && (
            <div className="py-5 ">
              <p className="font-bold capitalize heading text-center text-[25px]  font-serif tracking-widest ">
                {profile?.firstName} {profile?.lastName}
              </p>
              <p className="text-black pt-1 heading font-thin text-[18px] tracking-widest text-center  ">
                {profile?.role}
              </p>
            </div>
          )}
          {objective && (
              <>
          <div className=" bg-gray-200 mt-8  rounded-xl p-2"
          style={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
          }}>
            
                {objective != 0 && (
                  <>
                    <p className="heading tracking-[2px] text-black font-serif font-bold text-[16px] px-2 py-1  tracking-wider  ">
                      Profile
                    </p>
                    <h1 className="markdown text-[12px] text-justify text-black px-2 pb-2 ">
                      <MarkdownRenderer>{objective}</MarkdownRenderer>
                    </h1>
                  </>
                )}
              
          </div>
          </>
            )}

          {/* education */}
          {education?.filter((education) => education?.enabled).length > 0 && (
            <div>
              {education?.length != 0 && (
                <div className="bg-gray-200 rounded-xl p-2 mt-2"
                style={{
                  backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                }}>
                  <p className="tracking-[2px] text-black heading font-serif font-bold text-[16px] px-2 py-1 ">
                    Education
                  </p>
                  {education?.map((item) => (
                    <>
                      {item.enabled && (
                        <div
                          key={item.institution}
                          className="text-[12px] pt-1 pl-2"
                        >
                          <p className="relative font-bold text-gray-800 text-[14px]">
                            {item.institution}
                            <span className="absolute right-1 font-normal text-[12px]">
                              [ {item.startDate.slice(0, 4)} ] - [ {item.endDate.slice(0, 4)} ]
                            </span>
                          </p>
                          <p className="text-[12px] text-gray-600">{item.fieldOfStudy}</p>
                          <p className="text-[12px]">
                            {item.typeOfDegree} - {item.gpa}
                          </p>
                          {item.summary.enabled && (
                            <h1 className="text-[12px] markdown text-justify ">
                              <MarkdownRenderer>
                                {item.summary.data}
                              </MarkdownRenderer>
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

          {/* project */}
          {projects?.filter((project) => project?.enabled).length > 0 && (
            <div>
              {projects?.length != 0 && (
                <div className="bg-gray-200 rounded-xl p-2 mt-2"
                style={{
                  backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                }}>
                  <p className="tracking-[2px] text-black font-serif font-bold heading text-[16px] px-2 py-1 ">
                    Projects
                  </p>

                  {projects?.map((item) => (
                    <>
                      {item.enabled && (
                        <div key={item.name} className=" text-black pl-2 pt-1 ">
                          <p className="font-bold relative text-gray-800 text-[14px] ">
                            {item.name}

                            <span className="absolute right-2 pt-1 font-normal text-[10px]">
                              [ {item.from.slice(0, 7)} ] - [{" "}
                              {item.to.slice(0, 7)} ]
                            </span>
                          </p>
                          <Link className="text-gray-600 font-medium cursor-pointer" href={item.website}>
                                    <p className="text-[12px] underline cursor-pointer text-gray-600">
                                      {item.website}
                                    </p>
                                  </Link>
                          {item.summary.enabled && (
                            <h1 className="text-[12px] markdown markdown text-justify ">
                              <MarkdownRenderer>
                                {item.summary.data}
                              </MarkdownRenderer>
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

          {certifications?.filter((certification) => certification?.enabled)
            .length > 0 && (
            <div>
              {certifications?.length != 0 && (
                <div className="bg-gray-200 rounded-xl p-2 mt-2 "
                style={{
                  backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                }}>
                  <p className="text-black tracking-[2px] heading font-serif font-bold text-[16px] px-2 py-1 tracking-wider ">
                    Certifications
                  </p>

                  {certifications?.map((item) => (
                    <>
                      {item.enabled && (
                        <div key={item.title} className=" text-black  pl-2 pt-1  ">
                          <p className="font-bold  text-gray-800 text-[14px]  ">
                            {item.title}
                          </p>
                          <p className="font-bold relative text-gray-600 text-[13px]">
                            {item.issuer}
                            <span className="absolute right-2 font-normal text-[10px]">
                              [ {item.date.slice(0, 10)} ]
                            </span>
                          </p>
                          {item.summary.enabled && (
                            <h1 className="text-[12px] markdown text-justify ">
                              <MarkdownRenderer>
                                {item.summary.data}
                              </MarkdownRenderer>
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
