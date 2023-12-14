import React from 'react'

export default function cloud() {

    const handleImageUpload = async (event) => {
        // setloadin(true);
        const file = event.target.files[0];
        console.log(file);
        const formD = new FormData();
        formD.append("file", file);
        formD.append("upload_preset", "vo99iup5");
    
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dvl0qtkko/image/upload",
          {
            method: "POST",
            body: formD,
          }
        )
          .then((r) => r.json())
          .then((r) => {
            // formData.logo = r.secure_url;
            console.log("data in", r.secure_url);
          });
        // setloading(false);
        // console.log("data out", formData);
      };


  return (
    <div className='mt-24'>

<div className="">
          <input
            type="file"
            name="logo"
            onChange={handleImageUpload}
            className="w-full px-5 py-3 focus:outline-none rounded-md focus:border-gray-500 text-center"
            placeholder="Logo"
            required
          />
          <p className="text-xs px-5">Upload JPG/JPEG</p>
        </div>
    </div>
  )
}
