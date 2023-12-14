import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useResumeContext } from "../../context/ResumeContext";
import { NonCore } from "./Templates/NonCore";
import { Core } from "./Templates/Core";
import { Dynamic } from "./Templates/Dynamic";
import { Moscow } from "./Templates/Moscow";
import { Onyx } from "./Templates/Onyx";
import { Refined } from "./Templates/Refined";
import { Stockholm } from "./Templates/Stockholm";
import { TAdigital } from "./Templates/TAdigital";
import { Loading } from "../Reusables/Loading";
import { Loader } from "../Layout/Loader";
import { Ruby } from "./Templates/Ruby";
import { Harvard } from "./Templates/Harvard";
import { Diamond } from "./Templates/Diamond";
import { Berlin } from "./Templates/Berlin";
import { Tokyo } from "./Templates/Tokyo";
import { Premium } from "./Templates/Premium";
import { Red } from "./Templates/Red";
import { Dynamo } from "./Templates/dynamo";
import { Madrid } from "./Templates/Madrid";
import { Amsterdam } from "./Templates/Amsterdam";
import { Blue } from "./Templates/Blue";
import { Casual } from "./Templates/Casual";
import { Modern } from "./Templates/Modern";
import { Classic } from "./Templates/Classic";
import { Retro } from "./Templates/Retro";
import { Chrono } from "./Templates/Chrono";
import { Assymmetric } from "./Templates/Assymmetric";
import { Stylish } from "./Templates/Stylish";
import { Dublin } from "./Templates/Dublin";
import { Square } from "./Templates/Square";
import { Professional } from "./Templates/Professional";
import { Symmetric } from "./Templates/Symmetric";
import { useRouter } from "next/router";

const Templates = {
  noncore: NonCore,
  core: Core,
  onyx: Onyx,
  refined: Refined,
  tadigital: TAdigital,
  dynamic: Dynamic,
  moscow: Moscow,
  stockholm: Stockholm,
  ruby: Ruby,
  harvard: Harvard,
  diamond: Diamond,
  berlin: Berlin,
  tokyo: Tokyo,
  premium: Premium,
  red: Red,
  dynamo: Dynamo,
  madrid: Madrid,
  amsterdam: Amsterdam,
  blue: Blue,
  casual: Casual,
  modern: Modern,
  classic: Classic,
  retro: Retro,
  chrono: Chrono,
  assymmetric: Assymmetric,
  stylish: Stylish,
  dublin: Dublin,
  square: Square,
  symmetric: Symmetric,
  professional: Professional,
};
export const StudentResume = ({ userId }) => {

  const router = useRouter()
  const { resume, setResume,design } = useResumeContext();
  const [isFetching, setFecthing] = useState(true);
  useEffect(() => {
    (async () => {
      const {
        data: { resumes },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/resume/getpublicresume?id=${userId}`
      );
      setResume(resumes[0]);
      setFecthing(false);
    })();
  }, [userId]);
  const Template = Templates[resume?.layout?.template];
  const componentRef = useRef();

  if (!resume && !isFetching)
    return (
      <div className="pt-4 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex-shrink-0 flex justify-center h-40 w-40 mx-auto">
            <Image
              placeholder="blur"
              blurDataURL="/no_results.png"
              layout="fill"
              objectFit="contain"
              src="/no_results.png"
              alt=""
            />
          </div>
          <div className="py-4">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Public Resume Not Found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Seems like student having all private resumes.
              </p>
            </div>
          </div>
        </main>
      </div>
    );

  return (
    <div>
      {isFetching ? (
        <div className="flex justify-center items-center w-full h-[30vh] mt-6">
          <div className="h-16 w-16">
            <Loader />
          </div>
        </div>
      ) : (
        <>
        <button onClick={()=>{
          document.body.innerHTML = design.innerHTML
            window.print();
            router.reload()
        }}>Download</button>
        <section className="bg-gray-900 mx-auto overflow-auto py-5" >
          <div id="resume">

          {Template && <Template componentRef={componentRef} />}
          </div>
        </section>
        </>
      )}
    </div>
  );
};
