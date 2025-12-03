import toast from "react-hot-toast";
import { MdContactSupport } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
const ContactUs = () => {
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    toast.success("Message Sent Successfully");
    navigate("/");
  };
  return (
    <form onSubmit={submit} className="flex min-h-screen flex-col items-center text-sm">
      <Navbar/>
      <h1 className="text-4xl mt-3 font-semibold text-slate-700 pb-4">
        Get in touch with us
      </h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        DevTrace helps you monitor user activity on your website in a simple and
        clean way. <br /> It gives you clear insights into how visitors behave
        so you can improve your product with confidence.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Name
          </label>
          <input
            placeholder="Your Full Name"
            className="h-12  p-2 mt-2 w-full border border-gray-500/30 rounded-2xl outline-none focus:border-[#F97316]"
            type="text"
            required
          />
        </div>
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Email
          </label>
          <input
            placeholder="Your Working Email"
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded-2xl outline-none focus:border-[#F97316]"
            type="email"
            required
          />
        </div>
      </div>

      <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="name">
          Message
        </label>
        <textarea
          placeholder="Your Detail Message"
          className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded-2xl resize-none outline-none focus:border-[#F97316]"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="mt-5 flex justify-center items-center gap-3 bg-[#F97316] text-white h-12 w-56 px-4 rounded active:scale-95 transition"
      >
        Send Message <MdContactSupport size={22} />
      </button>
    </form>
  );
};

export default ContactUs;
