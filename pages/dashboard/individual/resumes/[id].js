import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Left } from "../../../../src/components/Resumes/Editor/Left";
import { Right } from "../../../../src/components/Resumes/Editor/Right/index";
import { Core } from "../../../../src/components/Resumes/Templates/Core";
import { Diamond } from "../../../../src/components/Resumes/Templates/Diamond";
import { Dynamic } from "../../../../src/components/Resumes/Templates/Dynamic";
import { Gengar } from "../../../../src/components/Resumes/Templates/Gengar";
import { Harvard } from "../../../../src/components/Resumes/Templates/Harvard";
import { Moscow } from "../../../../src/components/Resumes/Templates/Moscow";
import { NonCore } from "../../../../src/components/Resumes/Templates/NonCore";
import { Onyx } from "../../../../src/components/Resumes/Templates/Onyx";
import { Refined } from "../../../../src/components/Resumes/Templates/Refined";
import { Ruby } from "../../../../src/components/Resumes/Templates/Ruby";
import { Stockholm } from "../../../../src/components/Resumes/Templates/Stockholm";
import { TAdigital } from "../../../../src/components/Resumes/Templates/TAdigital";
import { useModelContext } from "../../../../src/context/ModalContext";
import { useResumes } from "../../../../src/hooks/useResumes";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { Berlin } from "../../../../src/components/Resumes/Templates/Berlin";
import { Tokyo } from "../../../../src/components/Resumes/Templates/Tokyo";
import { Premium } from "../../../../src/components/Resumes/Templates/Premium";
import { Red } from "../../../../src/components/Resumes/Templates/Red";
import { Dynamo } from "../../../../src/components/Resumes/Templates/dynamo";
import { Madrid } from "../../../../src/components/Resumes/Templates/Madrid";
import { Blue } from "../../../../src/components/Resumes/Templates/Blue";
import { Casual } from "../../../../src/components/Resumes/Templates/Casual";
import { Modern } from "../../../../src/components/Resumes/Templates/Modern";
import { Classic } from "../../../../src/components/Resumes/Templates/Classic";
import { Retro } from "../../../../src/components/Resumes/Templates/Retro";
import { Chrono } from "../../../../src/components/Resumes/Templates/Chrono";
import { Stylish } from "../../../../src/components/Resumes/Templates/Stylish";
import { Assymmetric } from "../../../../src/components/Resumes/Templates/Assymmetric";
import { Amsterdam } from "../../../../src/components/Resumes/Templates/Amsterdam";
import { Dublin } from "../../../../src/components/Resumes/Templates/Dublin";
import { Square } from "../../../../src/components/Resumes/Templates/Square";
import { Symmetric } from "../../../../src/components/Resumes/Templates/Symmetric";
import { Professional } from "../../../../src/components/Resumes/Templates/Professional";
import { Vertical } from "../../../../src/components/Resumes/Templates/Vertical";
import { useResumeContext } from "../../../../src/context/ResumeContext";

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
  vertical:Vertical,
};

const ResumeSlug = ({ user, id ,displayDetails}) => {
  const componentRef = useRef();
  const { resumes } = useResumes(user);
  const [resume, setResume] = useState(null);
  const router = useRouter();
  const { setLoading } = useModelContext();

  const Template = Templates[resume?.layout?.template];
  const {modules,setmodules} = useResumeContext();
  const currentDate = new Date()

  var allModules=[]
  var flag=false

  
  displayDetails[0].payment.history.map((pay)=>{
    if(pay.expiryDate){
    // console.log("inside")
      const expDate= new Date( pay.expiryDate)
      if(expDate > currentDate ){
        pay.modules.map((module)=>{
          allModules.push(module)
        })
      }
  }
  else{
    pay.modules.map((module)=>{
      allModules.push(module)
    })
  }
  flag=true
  })

  useEffect(()=>{
    setmodules(allModules)
    
  },[flag])
 
  // console.log('allmodules ',modules)

  useEffect(() => {
    if (!resumes) return;
    setLoading(false);
    const currentResume = resumes.find((x) => x._id === id);
    if (!currentResume) {
      router.push("/dashboard/individual/resumes");
      return;
    }
    setResume(currentResume);
  }, [resumes]);
  if (!resume) return <div></div>;
  if (resume)
    return (
      <div className="mt-[-10vh]">
        <Left resumeDetails={resume} />
        <main className="lg:ml-[30%] flex-1 mt-[10vh]">
          <div className="flex justify-between bg-gray-800 overflow-auto">
            <section className="mx-auto h-screen overflow-auto py-5 w-full">
              <Template componentRef={componentRef} />
            </section>
            <section className="w-[25%] h-screen overflow-auto">
              <Right componentRef={componentRef} />
            </section>
          </div>
        </main>
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Amatic+SC&family=Handlee&family=Lavishly+Yours&family=Lobster&family=Lora:ital@1&family=Merienda&family=Padauk&family=Patrick+Hand&family=Roboto&family=Sacramento&family=Satisfy&family=Shadows+Into+Light&family=Yellowtail&display=swap");
        `}</style>
      </div>
    );
};

export const getServerSideProps = async (context) => {
  const session = await getLoginSession(context.req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const displayDetails = new Array();
  
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/${user._id}`).then((res) => res.json()).then((res)=>{displayDetails.push(res)})
  if (user && !user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (user && user.category !== "individual") {
    return {
      redirect: {
        destination: `/individual/${user.category}`,
        permanent: false,
      },
    };
  }
  if (user.category === "individual" && !user.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      session,
      id: context.query.id,
      displayDetails:displayDetails
    },
  };
};

export default ResumeSlug;
