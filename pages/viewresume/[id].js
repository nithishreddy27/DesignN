import React, { useEffect, useRef } from "react";
import { Loader } from "../../src/components/Layout/Loader";
import { Core } from "../../src/components/Resumes/Templates/Core";
import { Diamond } from "../../src/components/Resumes/Templates/Diamond";
import { Dynamic } from "../../src/components/Resumes/Templates/Dynamic";
import { Gengar } from "../../src/components/Resumes/Templates/Gengar";
import { Harvard } from "../../src/components/Resumes/Templates/Harvard";
import { Moscow } from "../../src/components/Resumes/Templates/Moscow";
import { NonCore } from "../../src/components/Resumes/Templates/NonCore";
import { Onyx } from "../../src/components/Resumes/Templates/Onyx";
import { Refined } from "../../src/components/Resumes/Templates/Refined";
import { Ruby } from "../../src/components/Resumes/Templates/Ruby";
import { Stockholm } from "../../src/components/Resumes/Templates/Stockholm";
import { TAdigital } from "../../src/components/Resumes/Templates/TAdigital";
import { useResumeContext } from "../../src/context/ResumeContext";
import { useResume } from "../../src/hooks/useResume";
import { Amsterdam } from "../../src/components/Resumes/Templates/Amsterdam";
import { Berlin } from "../../src/components/Resumes/Templates/Berlin";
import { Tokyo } from "../../src/components/Resumes/Templates/Tokyo";
import { Premium } from "../../src/components/Resumes/Templates/Premium";
import { Red } from "../../src/components/Resumes/Templates/Red";
import { Dynamo } from "../../src/components/Resumes/Templates/dynamo";
import { Madrid } from "../../src/components/Resumes/Templates/Madrid";
import { Chrono } from "../../src/components/Resumes/Templates/Chrono";
import { Dublin } from "../../src/components/Resumes/Templates/Dublin";
import { Vertical } from "../../src/components/Resumes/Templates/Vertical";
import { Assymmetric } from "../../src/components/Resumes/Templates/Assymmetric";
import { Classic } from "../../src/components/Resumes/Templates/Classic";
import { Retro } from "../../src/components/Resumes/Templates/Retro";
import { Stylish } from "../../src/components/Resumes/Templates/Stylish";
import { Modern } from "../../src/components/Resumes/Templates/Modern";
import { Blue } from "../../src/components/Resumes/Templates/Blue";
import { Casual } from "../../src/components/Resumes/Templates/Casual";
import { Professional } from "../../src/components/Resumes/Templates/Professional";
import { Square } from "../../src/components/Resumes/Templates/Square";
import { Symmetric } from "../../src/components/Resumes/Templates/Symmetric";

const Templates = {
  noncore: NonCore,
  core: Core,
  onyx: Onyx,
  refined: Refined,
  tadigital: TAdigital,
  dynamic: Dynamic,
  moscow: Moscow,
  gengar: Gengar,
  stockholm: Stockholm,
  ruby: Ruby,
  harvard: Harvard,
  diamond: Diamond,
  amsterdam: Amsterdam,
  berlin: Berlin,
  tokyo: Tokyo,
  premium: Premium,
  red: Red,
  modern:Modern,
  dynamo: Dynamo,
  madrid: Madrid,
  chrono: Chrono,
  blue: Blue,
  vertical: Vertical,
  dublin: Dublin,
  stylish: Stylish,
  assymmetric: Assymmetric,
  classic: Classic,
  retro: Retro,
  casucal:Casual,
  profesional:Professional,
  square:Square,
  symmetric:Symmetric,
};

const ViewResume = ({ id }) => {
  const { setResume } = useResumeContext();
  const componentRef = useRef();
  const { resume } = useResume(id);
  const Template = Templates[resume?.layout?.template];

  useEffect(() => {
    if (!resume) return;
    setResume(resume);
  }, [resume]);

  return (
    <div className="flex justify-between bg-gray-800 overflow-auto">
      {resume ? (
        <section className="mx-auto h-screen overflow-auto py-5 w-full">
          <Template componentRef={componentRef} />
        </section>
      ) : (
        <Loader size={"16"} color={"white"} />
      )}
    </div>
  );
};

export const getServerSideProps = ({ req, res, query }) => {
  return {
    props: {
      id: query.id,
    },
  };
};

export default ViewResume;
