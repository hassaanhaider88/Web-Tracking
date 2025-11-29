// import { IoTrashBin } from "react-icons/io"; 
import toast from "react-hot-toast";
import handleDeleteSite from "../utils/DeleteSite";
import { IoTrashBin } from "react-icons/io5";
const ModalBox = ({ setIsModalOpen, setIsConfrimed ,DelProjectId}) => {
  const hanldeConfrimClick = () => {
    setIsModalOpen(false);
    setIsConfrimed(true);
    const DelRes = handleDeleteSite(DelProjectId);
    if (DelRes) {
      toast.success("Delete Project Successfully");
    } else {
      toast.error("Something wents wrong.");
    }
  };
  const handleCencelClick = () => {
    setIsModalOpen(false);
    setIsConfrimed(false);
  };
  return (
    <div className="fixed w-screen z-50 h-screen flex justify-center items-center bg-[#333b] ">
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <IoTrashBin size={24} className='text-red-500' />
        </div>
        <h2 className="text-gray-900 font-semibold mt-4 text-xl">
          Are you sure?
        </h2>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Do you really want to continue? This action
          <br />
          cannot be undone.
        </p>
        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            onClick={() => handleCencelClick()}
            type="button"
            className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => hanldeConfrimClick()}
            type="button"
            className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
