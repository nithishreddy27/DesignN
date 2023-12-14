export const intialResume = (user) => {
  return {
  personal: {
    firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      email: user?.email,
      personalEmail:user?.personalEmail,
      role: "React Developer",
      image: user?.profile?.image,
      dob: "1985-11-01",
      phone: user?.phone?.value,
      displayEmail:"collegeMail"
  },
  social: [],
  objective: "",
  work: [],
  education: [],
  projects: [],
  awards: [],
  certifications: [],
  skills: [],
  hobbies: [],
  languages: [],
}
};
