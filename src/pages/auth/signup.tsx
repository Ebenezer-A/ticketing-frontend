import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signupProp, userSignup } from "./slice/thunk";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<signupProp>({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await dispatch(userSignup(formData))
      .unwrap()
      .then((response) => (response ? navigate("/dashboard") : ""))
      .catch((err) => {
        toast.error(err.message[0]);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="overflow-hidden relative flex flex-col justify-between bg-background w-1/2 text-white">
        <p className="m-12 text-2xl font-semibold italic">Ticketing System</p>
        <p className="mx-12 my-20 text-4xl bg-gradient-to-b from-white/100 to-white/40 bg-clip-text text-transparent font-light italic leading-relaxed z-10">
          Welcome.
          <br /> Start your journey now
          <br /> with our Customer Support
          <br /> Ticketing System!
        </p>
        <div className="absolute right-0 top-0 rounded-full bg-accent brightness-50 blur-3xl p-36 z-0"></div>
        <div className="absolute -left-5 -bottom-5 rounded-full bg-accent brightness-50 blur-3xl p-36 z-0"></div>
      </div>
      <div className="flex justify-center items-center w-1/2">
        <div className="flex flex-col gap-5 justify-center items-stretch w-1/2">
          <p className="font-semibold text-xl">Create an account</p>
          <div className="flex gap-3 flex-col items-stretch">
            <div className="flex gap-2 flex-col">
              <label className="text-black/80">Name</label>
              <input
                className="border-2 placeholder:text-sm placeholder:text-black/30 focus:border-accent/70 focus:outline-none border-gray-200 p-2 rounded-lg"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <label className="text-black/80">Email</label>
              <input
                className="border-2 placeholder:text-sm placeholder:text-black/30 focus:border-accent/70 focus:outline-none border-gray-200 p-2 rounded-lg"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <label className="text-black/80">Role</label>
              <select
                className="border-2 placeholder:text-sm placeholder:text-black/30 focus:border-accent/70 focus:outline-none border-gray-200 p-2 rounded-lg"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option className="font-poppins">Select role</option>
                <option className="font-poppins" value="User">
                  User
                </option>
                <option className="font-poppins" value="Admin">
                  Admin
                </option>
              </select>
            </div>
            <div className="flex gap-2 flex-col">
              <label className="text-black/80">Password</label>
              <input
                className="border-2 placeholder:text-sm placeholder:text-black/30 focus:border-accent/70 focus:outline-none border-gray-200 p-2 rounded-lg"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#1570EF] text-white font-semibold w-full p-2 rounded-md"
          >
            Signup
          </button>
          <div className="flex gap-1 justify-center items-start text-center">
            Don't have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-accent underline hover:no-underline cursor-pointer"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
