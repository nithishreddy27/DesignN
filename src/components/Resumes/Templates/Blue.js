import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Blue = ({ componentRef, filter = null }) => {
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
    modules,
  } = useResumeContext();
  const { r, g, b, a } = layout?.color || { r: "0", g: "0", b: "0", a: "0" };
  const headingClass =
    "text-lg text-center capitalize font-bold text-gray-700 mb-2 pb-1";

  const templateRef = document.getElementById("template");
  setdesign(templateRef);

  return (
    <div
      ref={componentRef}
      className="w-a4W bg-white mx-auto h-a4H my-5 relative overflow-hidden"
      id="template"
    >
      <div
        className={`h-[95%] w-[35%] bg-sky-200 absolute left-10 rounded-b-full p-5 z-10`}
        style={{
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
        }}
      >
        {profile && (
          <>
            <img
              src={profile?.image}
              alt=""
              className="rounded-full h-40 mb-5 mx-auto"
              id="profileImage"
            />
          </>
        )}
        <>
          {profile && (
            <>
              <div className="flex">
                <span>
                  <img
                    src="https://www.freeiconspng.com/uploads/contact-methods-phone-icon-512x512-pixel-3.png"
                    className="w-3 h-3"
                  />
                </span>
                <h1 className="mx-4 text-[13px]">{profile?.phone}</h1>
              </div>
              <div className="flex my-1">
                <span>
                  <img
                    src="https://www.freeiconspng.com/uploads/black-mail-icon-4.png"
                    className="w-4 h-4"
                  />
                </span>
                {profile?.displayEmail === "collegeMail" && (
                  <h1 className="mx-2 text-[13px]">{profile?.email}</h1>
                )}
                {profile?.displayEmail === "personalMail" && (
                  <h1 className="mx-2 text-[13px]">{profile?.personalEmail}</h1>
                )}
              </div>
            </>
          )}
          {social && (
            <>
              {social.map((item) => (
                <div className="my-2 flex " key={item.network}>
                  <span>
                    <img
                      src={"https://www." + item.network + ".com/favicon.ico"}
                      alt=""
                      srcset=""
                      className="w-3 grayscale-[40%]"
                    />
                  </span>

                  <Link href={item.url}>
                    <span className="mx-4 text-[13px]">{item?.username}</span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </>

        {skills?.filter((skill) => skill?.enabled).length > 0 && (
          <div>
            <h1 className="text-[16px] font-semibold tracking-[2px] mt-5  ">
              Skills
            </h1>
            <div className="my-1 text-[12px]">
              {skills?.map((item) => (
                <>
                  {item.enabled == true && (
                    <div className="flex" key={item.name}>
                      <li className="">{item.name}</li>
                      <p className="absolute right-5 ">{item.level}</p>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}

        {awards?.filter((award) => award?.enabled).length > 0 && (
          <div>
            {awards?.length != 0 && (
              <>
                <h1 className="text-[16px] font-semibold tracking-[2px] mt-5 ">
                  Awards
                </h1>
                <div className="my-1 ">
                  {awards
                    ?.filter((award) => award?.enabled === true)
                    .map((item) => (
                      <>
                        {item.enabled && (
                          <div className="text-[12px] mt-2" key={item.name}>
                            <div className="flex justify-between">
                              <span className="font-semibold text-[13px] ">
                                {item.name}{" "}
                              </span>
                              <span className="text-[12px]">
                                [{item.date.slice(0, 7)}]
                              </span>
                            </div>
                            <h1 className="font-semibold">{item.awarder}</h1>
                            <div>
                              {item.summary.enabled && (
                                <h1 className="text-justify markdown">
                                  {item.summary.data}
                                </h1>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </div>
              </>
            )}
          </div>
        )}

        {languages?.filter((language) => language?.enabled).length > 0 && (
          <div>
            {languages?.length != 0 && (
              <>
                <h1 className="text-[16px] font-semibold tracking-[2px] mt-5 ">
                  Languages
                </h1>
                <div className="my-1">
                  {languages?.map((item) => (
                    <>
                      {item.enabled && (
                        <div
                          className="flex justify-between text-[13px]"
                          key={item.name}
                        >
                          <li className="">{item.name}</li>
                          <h1>{item.fluency}</h1>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {hobbies && (
          <div>
            {hobbies?.length != 0 && (
              <>
                <h1 className="text-[16px] font-semibold tracking-[2px] mt-5 ">
                  Interests
                </h1>
                <div className="my-1">
                  {hobbies?.map((item) => (
                    <>
                      {item.enabled && (
                        <div className="flex text-[13px]  " key={item.name}>
                          <li className="">{item.name}</li>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* 
          {certifications && (
            <div>
              {certifications.length != 0 && (
                <>
                    <h1 className="text-[16px] font-semibold tracking-[2px] heading">
                      CERTIFICATIONS
                    </h1>
                  <div className="mt-4">
                    {certifications.map((item) => (
                      <p className="my-2 text-[12px]" key={item.name}>
                        {item.title}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          )} */}
      </div>
      <div
        className={`w-[100%] h-36 bg-sky-100 top-10 relative z-1 rounded-l-full  p-10`}
        style={{
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        }}
      >
        {profile && (
          <>
            <h1 className="text-3xl ml-[50%] font-bold capitalize tracking-widest">
              {profile?.firstName} <span>{profile?.lastName}</span>
            </h1>
            <h1 className="ml-[58%] my-2 tracking-widest capitalize visible min-h-[25px]">
              {profile?.role}
            </h1>
          </>
        )}
        <div className="absolute mt-10  left-[330px] w-[57%] h-[100%] px-3 text-black">
          {objective && (
            <>
              {objective != 0 && (
                <>
                  <h1 className="text-[16px] font-bold tracking-[1px] ">
                    Objective
                  </h1>
                  <hr className="w-[100%] h-0.5 bg-black my-2" />
                  <h1 className="text-[13px] text-justify markdown">
                    <MarkdownRenderer>{objective}</MarkdownRenderer>
                  </h1>
                </>
              )}
            </>
          )}

          {education?.filter((edu) => edu?.enabled).length > 0 && (
            <>
              <h4 className="text-[16px] mt-3 font-bold tracking-[1px] ">
                Education
              </h4>
              <hr className="w-[100%] h-0.5 bg-black my-2" />

              {education
                ?.filter((edu) => edu?.enabled === true)
                .map((item) => (
                  <div className="mt-2 text-[13px]" key={item.institution}>
                    <div className="flex justify-between">
                      <h1 className="font-semibold">{item.institution} </h1>
                      <h1 className="font-medium">
                        ({item.startDate.slice(0, 4)}-{item.endDate.slice(0, 4)}
                        )
                      </h1>{" "}
                    </div>
                    <h1 className="ml-5">{item.typeOfDegree}</h1>
                    {item.summary.enabled && (
                      <h1 className="ml-5 markdown text-justify">
                        <MarkdownRenderer>{item.summary.data}</MarkdownRenderer>
                      </h1>
                    )}
                    <h1 className="ml-5"> {item.gpa}</h1>
                  </div>
                ))}
            </>
          )}

          {/* <h1 className="text-[16px] font-bold tracking-[1px] mt-4 heading">
                      INTERNSHIP
                    </h1> */}

          {work?.filter((wo) => wo?.enabled).length > 0 && (
            <div>
              {work.length != 0 && (
                <>
                  <h1 className="text-[16px] font-bold tracking-[1px] mt-4 ]">
                    Professional Experience
                  </h1>
                  <hr className="w-[100%] h-0.5 bg-black my-2" />
                  {work
                    ?.filter((wo) => wo?.enabled === true)
                    .map((item) => (
                      <>
                        {item.enabled && (
                          <div className="mt-2 text-[13px]" key={item.company}>
                            <div className="flex justify-between">
                              <h1 className="font-bold">{item.company} </h1>
                              <h1 className="font-medium">
                                ({item.from.slice(0, 7)} - {item.to.slice(0, 7)})
                              </h1>{" "}
                            </div>
                            <span className=" tracking-wider ">
                              {item.designation}
                            </span>
                            {item.summary.enabled && (
                              <span className="ml-5 markdown text-justify text-[13px]">
                                <MarkdownRenderer>
                                  {item.summary.data}
                                </MarkdownRenderer>
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    ))}
                </>
              )}
            </div>
          )}

          {/* <h1 className="text-[16px] font-bold tracking-[1px] mt-4 heading">
                      PROJECTS
                    </h1> */}

          {projects?.filter((project) => project?.enabled).length > 0 && (
            <>
              <h2 className="font-bold  mt-3 text-[16px]  ">Projects</h2>
              <hr className="w-[100%] h-0.5 bg-black my-2" />

              {projects
                ?.filter((project) => project?.enabled === true)
                .map((item) => (
                  <>
                    {item.enabled && (
                      <div className="text-[13px] mt-2" key={item.name}>
                        <div className="flex justify-between">
                          <h1 className="font-semibold">{item.name}</h1>
                          <h1>
                            ({item.from.slice(0, 10)} - {item.to.slice(0, 7)})
                          </h1>
                        </div>
                        {console.log("item", item)}
                        {item.website && (
                          <a
                            href={item.website}
                            target="blank"
                            className=" underline text-[12px]"
                          >
                            {item.url}
                          </a>
                        )}
                        {item.summary.enabled && (
                          <h1 className="text-13px markdown text-justify">
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
