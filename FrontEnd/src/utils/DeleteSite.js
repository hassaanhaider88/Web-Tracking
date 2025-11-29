import { BackEndURI } from "./api";
const handleDeleteSite = async (DelProjectId) => {
  //  here real funcationality will be perormed later
  const Res = await fetch(`${BackEndURI}/api/projects/${DelProjectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(Res);
  return Res.success;
};
export default handleDeleteSite;
