import React from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { rename, months } from "../../../lib/helper";
import { MarkdownRenderer } from "../../../lib/MarkdownRenderer";
import Link from "next/link";

export const Retro = ({ componentRef, filter = null }) => {
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
      className="w-a4W bg-white mx-auto h-[296mm] my-5 relative"
    >
      <div className="">
        <div className="flex px-4 py-4 mt-[2%]   ">
          <div className="w-[30%]">
            {profile && (
              <div className="pl-5">
                <img
                  src={profile.image}
                  alt=""
                  className=" h-[32mm] rounded-full w-[35mm]"
                  id="profileImage"
                />
              </div>
            )}
          </div>

          {objective && (
            <div className="right-0 w-[70%]">
              <h1 className=" text-black font-bold text-[16px] heading  tracking-wide heading ">
                P R O F I L E
              </h1>
              <h1 className="-mt-4 font-bold tracking-tighter">______</h1>
              <h1 className="text-[12px] text-justify text-black pt-1">
                <MarkdownRenderer>{objective}</MarkdownRenderer>
              </h1>
            </div>
          )}
        </div>

        {profile && (
          <div className=" bg-black px-4 py-1"
          style={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
          }}
          >
            <span className="text-[22px] bg-white p-1 pl-2 rounded-sm font-bold text-black tracking-wider   ml-1">
              {profile.firstName} {profile.lastName}
            </span>
            <span className=" text-[16px] pl-[10%] text-white tracking-wider font-thin text-right  ">
              {profile.role}
            </span>
          </div>
        )}
        <hr className="border-gray-100 border-1" />
        <div className="relative flex">
          <div className="   h-[240mm] pl-2 from-white-300 w-[40%]"
          style={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
          }}
          >
            <div className="flex px-4 py-2">
              <div className="">
                {/* {profile && (
              <div className="">
                <h1 className="font-sans font-bold text-[18px]">
                  {profile.firstName} {profile.lastName}
                </h1>
                <h1 className=" font-mono text-[16px]">{profile.role}</h1>
              </div>
            )} */}
                {profile && (
                  <div className="pt-3">
                    <div className="text-[12px]">
                      <h1 className="text-black font-bold  heading  tracking-wider text-[16px] heading">
                        NETWORK
                      </h1>
                      <div className="flex mt-2">
                        <span className="pl-2">
                          <img
                            src="https://www.freeiconspng.com/uploads/contact-methods-phone-icon-512x512-pixel-3.png"
                            className="w-3 h-3"
                          />
                        </span>
                        <h1 className="mx-3 -mt-1 text-[12px]">
                          {profile.phone}
                        </h1>
                      </div>
                      <div className="flex my-1">
                        <span className="pl-2">
                          <img
                            src="https://www.freeiconspng.com/uploads/black-mail-icon-4.png"
                            className="w-4 h-4"
                          />
                        </span>
                        {profile?.displayEmail === "collegeMail" && (
                          <h1 className="mx-2 text-[12px]">{profile.email}</h1>
                        )}
                        {profile?.displayEmail === "personalMail" && (
                          <h1 className="mx-2 text-[12px]">
                            {profile.personalEmail}
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* skills */}
                {skills?.filter((skill) => skill?.enabled).length > 0 && (
                  <>
                    {skills.length != 0 && (
                      <div className="pt-3">
                        <h1 className="text-black font-bold  heading  tracking-wider text-[16px] heading">
                          SKILLS
                        </h1>
                        {skills.map((item) => (
                          <>
                            {item.enabled == true && (
                              <div key={item.name} className="ml-2">
                                <span className="text-[12px]  ">
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
                  </>
                )}

                {/* Languages */}
                {languages?.filter((language) => language?.enabled).length >
                  0 && (
                  <div className="pt-3">
                    {languages.length != 0 && (
                      <div className="">
                        <h1 className="text-black font-bold  heading  tracking-wider text-[16px] heading">
                          LANGUAGES
                        </h1>
                        {languages.map((item) => (
                          <>
                            {item.enabled == true && (
                              <div key={item.name} className="ml-2">
                                <li className="text-[12px]">
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
                {/* awards */}
                {awards?.filter((awards) => awards?.enabled).length > 0 && (
                  <div className="pt-3">
                    {awards.length != 0 && (
                      <div className="">
                        <p className="text-black font-bold   heading tracking-wider text-[16px] heading">
                          AWARDS
                        </p>
                        {awards.map((item) => (
                          <>
                            {item.enabled && (
                              <div key={item.name} className="ml-2">
                                <h1 className="">
                                  <span className="text-[14px] font-semibold">
                                    {item.name}
                                  </span>
                                  <div className="">
                                    <p className="relative  text-[14px]">
                                      {item.awarder}
                                      <span className="absolute text-[12px] right-0">
                                        [{item.date.slice(0, 4)}]
                                      </span>
                                    </p>
                                    {item.summary.enabled && (
                                      <h1 className="text-[12px] markdown text-justify ">
                                        <MarkdownRenderer>
                                          {item.summary.data}
                                        </MarkdownRenderer>
                                      </h1>
                                    )}{" "}
                                  </div>
                                </h1>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* hobbies */}
                {hobbies?.filter((hobbies) => hobbies?.enabled).length > 0 && (
                  <div>
                    {hobbies.length != 0 && (
                      <div className="pt-3">
                        <p className="text-black  font-bold  heading  tracking-wider text-[16px]  heading">
                          HOBBIES
                        </p>
                        {hobbies.map((item) => (
                          <>
                            {item.enabled && (
                              <div className="ml-2" key={item.name}>
                                <li className="text-[12px]">{item.name}</li>
                                <p>{item.enabled}</p>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* projects */}
                {projects?.filter((projects) => projects?.enabled).length >
                  0 && (
                  <div>
                    {projects.length != 0 && (
                      <div className=" pt-3">
                        <p className="text-black font-bold   heading tracking-wider text-[16px]  heading  ">
                          PROJECTS
                        </p>

                        {projects.map((item) => (
                          <>
                            {item.enabled && (
                              <div key={item.name} className="pt-1">
                                <div className=" ml-2 text-black ">
                                  <p className="tracking-wide text-[14px] font-semibold">
                                    {item.name}
                                  </p>
                                  <p className="text-[12px]">
                                    [ {item.from.slice(0, 10)} ] - [{" "}
                                    {item.to.slice(0, 10)} ]
                                  </p>

                                  <p href={item.website}>
                                    <p className="text-[12px]">
                                      {item.website}
                                    </p>
                                  </p>
                                  {item.summary.enabled && (
                                    <h1 className="pr-2 markdown text-[12px] text-justify ">
                                      <MarkdownRenderer>
                                        {item.summary.data}
                                      </MarkdownRenderer>
                                    </h1>
                                  )}
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
            </div>
          </div>
          <div className="w-[70%] py-2 px-4">
            {/* education */}
            {education?.filter((education) => education?.enabled).length >
              0 && (
              <div>
                {education.length != 0 && (
                  <div className="pt-3 ">
                    <p className=" text-black font-bold text-[16px]  heading  tracking-wide  heading">
                      EDUCATION
                    </p>
                    <hr></hr>
                    {education.map((item) => (
                      <>
                        {item.enabled && (
                          <div
                            key={item.institution}
                            className="text-[12px] p-1 pt-2  text-black "
                          >
                            <p className="relative text-[14px] font-semibold text-black ">
                              {item.institution}
                              <span className="absolute font-normal text-[12px] right-3">
                                [{item.startDate.slice(0, 4)}-
                                {item.endDate.slice(0, 4)}]
                              </span>
                            </p>
                            <p>{item.typeOfDegree}</p>
                            <h1>
                              {item.fieldOfStudy} - {item.gpa}
                            </h1>
                            {item.summary.enabled && (
                              <h1 className="text-[12px] markdown text-justify">
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

            {/* internship */}
            {work?.filter((work) => work?.enabled).length > 0 && (
              <div>
                {work.length != 0 && (
                  <>
                    <div className="pt-3">
                      <p className=" text-black font-bold  text-[16px]   heading tracking-wide heading">
                        EXPERIENCE
                      </p>
                      <hr></hr>
                      {work.map((item) => (
                        <>
                          {item.enabled && (
                            <div
                              key={item.company}
                              className="text-[12px] p-1 pt-2 text-black "
                            >
                              <p className="relative font-semibold text-[14px] text-black ">
                                {item.company}
                                <span className="absolute font-normal text-[12px] right-0">
                                  [{item.from.slice(0, 7)}] - [
                                  {item.to.slice(0, 7)}]
                                </span>
                              </p>
                              <p className="text-gray-700">
                                {item.designation}
                              </p>
                              {item.summary.enabled && (
                                <h1 className="text-justify markdown">
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
                  </>
                )}
              </div>
            )}
            {/* certification */}

            {certifications?.filter((certifications) => certifications?.enabled)
              .length > 0 && (
              <div>
                {certifications.length != 0 && (
                  <>
                    <div className="pt-3">
                      <p className=" text-black font-bold  text-[16px]   heading tracking-wider heading">
                        CERTIFICATION
                      </p>
                      <hr className=""></hr>
                      {certifications.map((item) => (
                        <>
                          {item.enabled && (
                            <div
                              key={item.title}
                              className="text-[12px] p-2 text-black"
                            >
                              <p className=" font-semibold text-[14px]">
                                {item.title}{" "}
                                
                              </p>

                              <p className="relative">{item.issuer}
                              <span className="right-0 absolute font-normal text-[12px]">
                                  [{item.date}]
                                </span>
                              </p>
                              {item.summary.enabled && (
                                <h1 className="text-justify markdown">
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
                  </>
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
