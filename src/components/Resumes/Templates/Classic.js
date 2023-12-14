import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Classic = ({ componentRef, filter = null }) => {
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
      className="w-a4W bg-white mx-auto h-a4H my-5"
    >
      <div className="">
        <div className="space-x-2 border-separate">
          <div className="flex bg-gray-200 border-b-1 py-4 border-solid text-black pb-2 ">
            {profile && (
              <>
                {/* <img
              className="w-[20%] h-[30] p-3 pb-5 pl-7"
              src="https://randomuser.me/api/portraits/women/71.jpg"
            ></img> */}
                {/* personal detail */}

                <div className="m-auto">
                  <p className=" text-center text-black text-3xl uppercase tracking-widest   m-4 mt-3 ml-16">
                    {profile?.firstName} {profile?.lastName}
                  </p>
                  <p className=" text-center text-xl  text-gray-700 -mt-2 font-thin  tracking-wider  ml-16 ">
                    {profile?.role}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="m-2">
          <div className="flex gap-3">
            <div className=" min-w-[50%]">
              <div className=" mt-4 mx-4">
                {objective && (
                  <>
                    {objective != 0 && (
                      <>
                        <p className="bg-gray-800 tracking-widest  text-white p-1 w-[100%] rounded-md mt-3 text-center heading">
                          Profile
                        </p>
                        <h1 className="text-[12px] markdown px-4 py-1 text-justify ">
                          <MarkdownRenderer>{objective}</MarkdownRenderer>
                        </h1>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="mt-4 mx-4">
                {/* <span className=" bg-gray-800 text-white pt-1 p-1 rounded-sm">PERSONAL</span> */}

                {/* EDUCATION */}
                {education
                  ?.filter((education) => education?.enabled)
                  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                  .length > 0 && (
                  <div className="mt-4">
                    {education?.length != 0 && (
                      <div className=" ">
                        <p className="bg-gray-800 tracking-widest text-center rounded-md text-white p-1  heading">
                          Education
                        </p>

                        {education?.map((item) => (
                          <>
                            {item.enabled && (
                              <div key={item.institution} className="py-1 pl-4">
                                <li className="font-semibold   text-[13px]">
                                  {item.institution}
                                </li>

                                <div className="text-[12px] relative">
                                  <h1>
                                    {item.fieldOfStudy}
                                    <span className="absolute right-1 text-[10px] text-gray-800 font-semibold">
                                      {new Date(item.startDate).getFullYear()} -{" "}
                                      {new Date(item.endDate).getFullYear()}
                                    </span>
                                  </h1>
                                  <h1>
                                    {item.typeOfDegree}
                                    <p className="">Score : {item.gpa}</p>
                                  </h1>
                                  {item.summary.enabled && (
                                    <h1 className="text-[12px]">
                                      {item.summary.data}
                                    </h1>
                                  )}
                                  {/* <p>{item.summary.enabled}</p> */}
                                  {/* <p>{item.enabled}</p> */}
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* projects */}
              {projects?.filter((project) => project?.enabled).length > 0 && (
                <div>
                  {projects?.length != 0 && (
                    <div className="mt-4 mx-4">
                      <p className="bg-gray-800 tracking-widest rounded-md text-center text-white p-1  my-1 heading">
                        Projects
                      </p>
                      {projects?.map((item) => (
                        <>
                          {item.enabled && (
                            <div key={item.name} className="p-1 pl-5 ">
                              <p className="font-bold  text-[14px] ">
                                {item.name}
                              </p>
                              <p className="text-[11px] font-semibold">
                                {new Date(item.from).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(item.to).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                              <Link href={`{item.website}$`}>
                                <p className="underline text-[12px] tracking-wider">
                                  {item.website}
                                </p>
                              </Link>
                              {item.summary.enabled && (
                                <h1 className="text-[12px] markdown text-justify">
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
              {/* SKILLS */}

              {skills?.filter((skill) => skill?.enabled).length > 0 && (
                <div className="mt-4">
                  <p className="bg-gray-800 tracking-widest rounded-md text-center text-white p-1 heading">
                    Skills
                  </p>
                  {skills?.map((item) => (
                    <>
                      {item.enabled && (
                        <div key={item.name} className=" pl-4   ">
                          <li className="text-[12px] pt-1 ">
                            {item.name}
                            {/* - {item.level} */}
                          </li>
                          <p>{item.enabled}</p>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}
              {/* HOBBIES */}
              {hobbies?.filter((hobbie) => hobbie?.enabled).length > 0 && (
                <div>
                  {hobbies?.length != 0 && (
                    <div className="">
                      <p className="bg-gray-800  tracking-widest text-white p-1 w-[100%] rounded-md mt-3 text-center heading">
                        Interests
                      </p>
                      {hobbies?.map((item) => (
                        <>
                          {item.enabled && (
                            <div
                              key={item.name}
                              className="pt-1   text-[12px] pl-4"
                            >
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
            </div>
            <div className="  min-w-[50%] ">
              {/* NETWORK */}

              <div className="mt-4  mr-6">
                {profile && (
                  <>
                    <h1 className="bg-gray-800 tracking-widest text-white mt-1 p-1 text-center rounded-md heading">
                      Network
                    </h1>
                    <div className="p-1  px-1 text-[12px]">
                      <li className=" tracking-wider">{profile?.phone}</li>
                      {/* <p className="tracking-wider">{profile.email}</p> */}
                      {profile?.displayEmail == "collegeMail" && (
                        <li className="tracking-wider">{profile?.email}</li>
                      )}
                      {profile?.displayEmail == "personalMail" && (
                        <li className="tracking-wider">
                          {profile?.personalEmail}
                        </li>
                      )}
                      {social
                        ?.filter((social) => social?.enabled === true)
                        .map((item) => (
                          <div className="text-[12px] font-semibold">
                            <li>
                              {" "}
                              <a
                                href={item.url}
                                target="blank"
                                className="underline"
                              >
                                {item.url}
                              </a>
                            </li>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {/* INTERNSHIPS */}

                {work?.filter((work) => work?.enabled).length > 0 && (
                  <div className="mt-4">
                    {work.length != 0 && (
                      <>
                        <p className="bg-gray-800 tracking-widest text-white mt-1 p-1 text-center rounded-md  heading">
                          Professional Experience
                        </p>
                        {work.map((item) => (
                          <>
                            {item.enabled && (
                              <div key={item.company} className="m-2">
                                <Link href={`{item.website}$`}>
                                  <p className="font-bold text-[13px]   tracking-wide relative">
                                    {item.company}
                                    <span className="font-sans text-[10px] top-1 absolute text-gray-700 right-0">
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
                                  </p>
                                </Link>
                                <p className=" text-[13px] font-semibold">
                                  {item.designation}
                                </p>
                                {item.summary.enabled && (
                                  <h1 className="text-[12px] markdown text-justify">
                                    <MarkdownRenderer>
                                      {item.summary.data}
                                    </MarkdownRenderer>
                                  </h1>
                                )}
                              </div>
                            )}
                          </>
                        ))}
                      </>
                    )}
                  </div>
                )}

                <div>
                  {/* AWARDS */}
                  {awards?.filter((award) => award?.enabled)
                  .length > 0 && (
                    <div className="mt-4">
                      {awards?.length != 0 && (
                        <div className="">
                          <p className="bg-gray-800 tracking-widest rounded-md text-center  text-white p-1  heading">
                            Awards
                          </p>
                          {awards?.map((item) => (
                            <>
                              {item.enabled && (
                                <div key={item.name} className=" m-2">
                                  <p className="font-bold   text-[14px] tracking-wide">
                                    {item.name}
                                  </p>
                                  <p className="text-[12px]  font-semibold relative">
                                    Awarder : {item.awarder}{" "}
                                    <span className="text-[10px] absolute right-0  ">
                                      {new Date(item.date).toLocaleDateString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        }
                                      )}
                                    </span>
                                  </p>
                                  {item.summary.enabled && (
                                    <h1 className="text-[12px] text-justify markdown">
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

                  {/* CERTIFICATIONS */}
                  {certifications?.filter(
                    (certification) => certification?.enabled
                  ).length > 0 && (
                    <div>
                      {certifications?.length != 0 && (
                        <div className="mt-4">
                          <p className="bg-gray-800 tracking-widest rounded-md mt-2 text-center text-white p-1  heading">
                            Certifications
                          </p>
                          {certifications?.map((item) => (
                            <>
                              {item.enabled && (
                                <div key={item.title} className="pl-2 pt-1">
                                  <p className="font-semibold    text-[13px]">
                                    {item.title}{" "}
                                  </p>
                                  <p className="font-bold text-gray-600 text-[13px] font relative">
                                    {item.issuer}{" "}
                                    <span className=" font-bold font-sans text-gray-700 text-[12px] absolute right-1 ">
                                      [{item.date}]
                                    </span>{" "}
                                  </p>
                                  {item.summary.enabled && (
                                    <h1 className="text-[12px] mr-3 text-justify">
                                      {item.summary.data}
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
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </div>
    // </div>
  );
};
