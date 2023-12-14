import { useState } from "react";
import { useResumeContext } from "../../../context/ResumeContext";
import { MarkdownSupporter } from "../MarkdownSupporter";

export const ObjectiveDisplay = () => {
  const { resume, objective, setObjective, debounceUpdateResume } = useResumeContext();
  const [count, setcount] = useState(0);

  return (
    <div id="objective" className="text-white py-10 border-b-2 border-gray-600">
      <h2 className="mb-5 text-2xl">Objective</h2>
      <div className="flex justify-between">
         <p className="block uppercase tracking-wider text-[10px] font-medium text-gray-400">
          Summary
         </p>
         <p className="block uppercase tracking-wider text-[10px] font-medium text-gray-400">
           {count}/250 characters
         </p>
       </div>
      <div className="mt-1 flex rounded-md shadow-sm">
        <textarea
          type="markdown"
          rows={4}
          name="summary"
          id="summary"
          value={objective || ""}
          maxLength={250}
          onChange={(e) => {
            setObjective(e.target.value);
            setcount(e.target.value.length);
            debounceUpdateResume({ ...resume, objective: e.target.value });
          }}
          className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-sm sm:text-sm text-gray-900 border-gray-300"
        />
      </div>
      <MarkdownSupporter />
    </div>
  );
};

