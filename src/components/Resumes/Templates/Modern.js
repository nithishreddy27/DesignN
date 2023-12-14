import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Modern = ({ componentRef, filter = null }) => {
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
    awards,
    setdesign,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const headingClass ="text-xl captialize font-bold text-gray-700 border-b-2 border-black mb-2 pb-1";
  const templateRef = document.getElementById("template");
  setdesign(templateRef);
  return (
    <div
      ref={componentRef}
      className="my-5 h-[296mm] w-a4W bg-white mx-auto  border "
      id="template"
    >
      <div className="h-[296mm] relative">
        <div className=" flex">
          <div className="w-[35%] h-[295mm] bg-slate-800  p-7 ">
            <div className="mt-36">
              <h1 className="text-[16px]  tracking-[2px] text-white">
                Contact
              </h1>
              <hr className="h-[2px] bg-black my-2" />
              {profile && (
                <>
                  <div className="flex">
                    <span>
                      <img
                        src="https://www.freeiconspng.com/uploads/office-phone-icon--25.png"
                        className="w-5 h-4"
                      />
                    </span>
                    <h1 className="mx-4  text-white text-[12px]">
                      {profile?.phone}
                    </h1>
                  </div>
                  <div className="flex my-1 text-[12px]">
                    <span>
                      <img
                        src="https://www.freeiconspng.com/uploads/icon-email-icon-clip-art-at-clker-com-vector-qafaq-e-mail-icon-trace--0.png"
                        className="w-4 h-5"
                      />
                    </span>
                    {profile?.displayEmail == "collegeMail" && (

                      <h1 className="mx-4 text-white   ">{profile?.email}</h1>
                    )}
                    {profile?.displayEmail == "personalMail" && (
                      <h1 className="mx-4 text-white   ">{profile?.personalEmail}</h1>

                    )}
                  </div>
                </>
              )}

              {social && (
                <div>
                  {social?.map((item) => (
                    <>
                      {item.enabled && (
                        <div
                          className="my-3 flex text-[12px]"
                          key={item.network}
                        >
                          <span>
                            <img
                              src={
                                "https://www." +
                                item.network +
                                ".com/favicon.ico"
                              }
                              alt=""
                              srcset=""
                              className="w-4 grayscale-[40%]   "
                            />
                          </span>

                          <Link href={item.url}>
                            <span className="mx-4 text-white cursor-pointer">
                              {item.username}
                            </span>
                          </Link>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}

              {skills?.filter((skill) => skill?.enabled).length > 0 && (
                <div className="">
                  <h1 className="text-[16px] mt-4   tracking-[2px] text-white">
                    Skills
                  </h1>
                  <hr className="h-[2px] bg-black my-2" />
                  {skills.length != 0 && (
                    <div>
                      {skills
                        ?.filter((skill) => skill?.enabled === true)
                        .map((item) => (
                          <>
                            {item.enabled && (
                              <div className="flex" key={item.name}>
                                <h1 className="mx-1   text-white my-2 w-[70%] text-sm text-[12px]">
                                  {item.name}
                                </h1>
                                {item.level == "Beginner" && (
                                  // <p className="text-white"></p>
                                  <div className="w-[40%] h-1 relative rounded-md left-0 bg-white   mt-5">
                                    <div className="w-[66%] absolute right-0 bg-black h-1 rounded-r-full"></div>
                                  </div>
                                )}
                                {item.level == "Intermediate" && (
                                  <div className="w-[40%] h-1 relative rounded-md left-0 bg-white  mt-5">
                                    <div className="w-[33%] absolute right-0 bg-black h-1 rounded-r-full"></div>
                                  </div>
                                )}
                                {
                                  item.level == "Expert" && (
                                    <div className="w-[40%] h-1 relative rounded-md  left-0 bg-white  mt-5">
                                      <div className="w-[1%] absolute right-0 bg-black h-1 rounded-r-full"></div>
                                    </div>
                                  )
                                  // <p className="text-white">exp</p>
                                }
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {hobbies?.filter((hobby) => hobby?.enabled).length > 0 && (
                <div>
                  {hobbies.length != 0 && (
                    <div className="mt-5">
                      <h1 className="text-[16px]  text-white    tracking-[2px]">
                        Interests
                      </h1>
                      <hr className="h-[2px] my-1" />
                      {hobbies
                        ?.filter((hobby) => hobby?.enabled === true)
                        .map((item) => (
                          <>
                            {item?.enabled && (
                              <h1
                                className="my-2 text-white text-[12px]"
                                key={item?.name}
                              >
                                {item?.name}
                              </h1>
                            )}
                          </>
                        ))}
                    </div>
                  )}
                </div>
              )}

             

              {awards?.filter((award) => award?.enabled).length > 0 && (
                <div>
                  {awards.length != 0 && (
                    <>
                      {" "}
                      <h1 className="text-[16px]  tracking-[2px]   text-white mt-5">
                        Awards
                      </h1>
                      <hr className="h-[2px] bg-black mt-1 mb-4 " />
                      {awards
                        ?.filter((award) => award?.enabled === true)
                        .map((item) => (
                          <>
                            {item?.enabled && (
                              <div className="my-2 " key={item.name}>
                                <span className="font-semibold text-[12px] text-white">
                                  {item?.name}
                                </span>

                                {item?.summary?.enabled && (
                                  <h1 className="mx-4 markdown text-[12px] text-white opacity-60">
                                    <MarkdownRenderer>
                                      {item?.summary?.data}
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


          {languages?.filter((language) => language?.enabled).length >
                0 && (
                <div>
                  {languages.length != 0 && (
                    <div className="mt-5">
                      <h1 className="text-[16px]  text-white    tracking-[2px]">
                        Languages
                      </h1>
                      <hr className="h-[2px] my-1" />
                      {languages
                        ?.filter((language) => language?.enabled === true)
                        .map((item) => (
                          <>
                            {item.enabled && (
                              <h1
                                className="my-2 text-white text-[12px]"
                                key={item?.name}
                              >
                                {item?.name}
                              </h1>
                            )}
                          </>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-[65%] z-10 bg-slate-300 py-5 px-6">
            {objective && (
              <div>
                {objective?.length != 0 && (
                  <div className="mt-40">
                    <div className="flex mb-2">
                      <h1 className="text-[16px] font-semibold heading  tracking-[1px]">
                        Objective
                      </h1>
                      <hr className=" h-[2px] w-[100%] ml-2 mt-3 bg-black" />
                    </div>
                    <h1 className="text-[12px]">{objective}</h1>
                  </div>
                )}
              </div>
            )}

            {work?.filter((wo) => wo?.enabled).length > 0 && (
              <div>
                {work.length != 0 && (
                  <div className="mt-3">
                    <div className="flex">
                      <h1 className="text-[16px] flex flex-wrap font-semibold heading  tracking-[1px]">
                        Professional Experience
                      </h1>
                      <hr className=" h-[2px] w-[100%] ml-2 mt-3 bg-black" />
                    </div>
                    {work
                      ?.filter((wo) => wo?.enabled === true)
                      .map((item) => (
                        <>
                          {item.enabled && (
                            <div
                              className="mt-2 text-[12px]"
                              key={item?.company}
                            >
                              <div className="flex justify-between">
                                <h1 className="font-semibold">
                                  {item?.company}{" "}
                                </h1>
                                <span className="mx-2 font-medium">
                                  {item?.from.slice(0, 4)}-{item.to.slice(0, 4)}
                                </span>{" "}
                              </div>
                              <h1 className="font-semibold">
                                  {item.designation}{" "}
                                </h1>
                              <a className="ml-5" href={item.website}>
                                {item.website}
                              </a>
                              {item?.summary?.enabled && (
                                <h1 className="ml-5 markdown my-1">
                                  <MarkdownRenderer>
                                    {item?.summary?.data}
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

            {education?.filter((edu) => edu?.enabled).length > 0 && (
              <div>
                {education?.length != 0 && (
                  <div className="mt-3">
                    <div className="flex">
                      <h1 className="text-[16px] font-semibold heading  tracking-[1px]">
                        Education
                      </h1>
                      <hr className=" h-[2px] w-[100%] ml-2 mt-3 bg-black" />
                    </div>
                    {education
                      ?.filter((edu) => edu?.enabled === true)
                      .map((item) => (
                        <>
                          {item?.enabled && (
                            <div
                              className="mt-2 text-[12px]"
                              key={item.institution}
                            >
                              <div className="flex justify-between">
                                <h1 className="font-semibold">
                                  {item?.institution}{" "}
                                </h1>
                                <span className="font-medium mx-2">
                                  {item?.startDate.slice(0, 4)}-
                                  {item?.endDate.slice(0, 4)}
                                </span>{" "}
                              </div>
                              <h1 className="ml-5">{item?.typeOfDegree}</h1>
                              {item?.summary?.enabled && (
                                <h1 className="ml-5 markdown my-1">
                                  <MarkdownRenderer>
                                    {item?.summary?.data}
                                  </MarkdownRenderer>
                                </h1>
                              )}
                              <h1 className="ml-5">GPA-{item?.gpa}</h1>
                            </div>
                          )}
                        </>
                      ))}
                  </div>
                )}
              </div>
            )}

            {projects?.filter((project) => project?.enabled).length > 0 && (
              <div>
                {projects.length != 0 && (
                  <div className="mt-2">
                    <div className="flex mb-2">
                      <h1 className="text-[16px] font-semibold heading  tracking-[1px]">
                        Projects
                      </h1>
                      <hr className=" h-[2px] w-[100%] ml-2 mt-3 bg-black" />
                    </div>
                    {projects
                      ?.filter((project) => project?.enabled === true)
                      .map((item) => (
                        <>
                          {item.enabled && (
                            <div className="mt-2 text-[12px]" key={item.name}>
                              <div className="flex justify-between">
                                <h1 className="font-semibold">{item.name} </h1>{" "}
                                <span className="font-medium mx-2">
                                  {item.from.slice(0, 4)}-{item.to.slice(0, 4)}
                                </span>{" "}
                              </div>
                              {console.log('item',item)}
                              {item.website && (
                                <span className="underline">
                                  <MarkdownRenderer>
                                    {item.website}
                                  </MarkdownRenderer>
                                </span>
                              )}
                              {item.summary.enabled && (
                                <span className="markdown">
                                  <MarkdownRenderer>
                                    {item.summary.data}
                                  </MarkdownRenderer>
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      ))}
                  </div>
                )}
              </div>
            )}

            {certifications?.filter((certificate) => certificate?.enabled)
              .length > 0 && (
              <div>
                {certifications.length != 0 && (
                  <div className="mt-2">
                    <div className="flex mb-1">
                      <h1 className="text-[16px] font-semibold  heading  tracking-[1px]">
                        CERTIFICATIONS
                      </h1>
                      <hr className=" h-[2px] w-[100%] ml-2 mt-3 bg-black" />
                    </div>
                    {certifications
                      ?.filter((certificate) => certificate?.enabled === true)
                      .map((item) => (
                        <>
                          {item.enabled && (
                            <div
                              className="flex justify-between"
                              key={item.title}
                            >
                              <div className="flex">

                              <h1 className="my-2 text-[12px]">{item.title}</h1>
                              <span  className="my-2 mx-2 text-[12px]">By {item.issuer} </span>
                              </div>
                              <h1 className="my-2 text-[12px] mx-2">{item.date}</h1>
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

        <div className="absolute w-[100%] h-28 bg-cyan-800 z-20 top-9 flex">
          {profile && (
            <div>
              {
                <>
                  <h1 className="text-3xl mt-7 ml-24 font-semibold tracking-widest text-white ">
                    {profile?.firstName
                      .toUpperCase()
                      .concat("  " + profile?.lastName.toUpperCase())}
                  </h1>
                  <p className="mt-2 ml-36 tracking-widest text-white">
                    {profile?.role}
                  </p>
                </>
              }
            </div>
          )}
        </div>
        {profile && (
          <img
            // src="https://randomuser.me/api/portraits/men/40.jpg"
            src={profile?.image}
            alt=""
            className=" absolute top-6 right-8 z-30 h-32 rounded-full border-white border-4  "
            id="profileImage"
          />
        )}
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
