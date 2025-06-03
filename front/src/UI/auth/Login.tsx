import { UserStore } from "@/store/UserStroe";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { SiFoodpanda } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { login, loading } = UserStore();
  const navigate = useNavigate();

  interface LoginInput {
    email: string;
    password: string;
  }

  const [input, setInput] = useState<LoginInput>({
    email: "hello@gmail.com", // Default email
    password: "1234", // Default password
  });

  const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(input);
      if (res) {
        toast.success("Login Successfully");
        navigate("/", { replace: true });
      }
    } catch (error) {
      const er = error as Error;
      toast.error(er.message);
    }
  };

  return (
    <div className="py-16 dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover rounded-md"
          style={{
            backgroundImage: 'url("./images/login.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
          }}></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className="flex justify-center gap-3 items-center">
            <SiFoodpanda className="text-[#FF2B85] font-bold text-3xl" />
            <h2 className="text-2xl font-extrabold text-[#FF2B85] font-[Roboto Condensed] text-gray-700 dark:text-gray-100 text-center">
              Food Panda
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100">
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100 focus:outline-none focus:shadow-outline border rounded py-2 px-4 block w-full appearance-none"
                type="email"
                placeholder="Email Address"
                name="email"
                value={input.email} // Default email
                onChange={ChangeHandler}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                  Password
                </label>
                <Link
                  to={"/forget-password"}
                  className="text-xs text-gray-500 dark:text-gray-100">
                  Forget Password?
                </Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100 focus:outline-none focus:shadow-outline border rounded py-2 px-4 block w-full appearance-none"
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                value={input.password} // Default password
                onChange={ChangeHandler}
              />
            </div>
            <div className="mt-8">
              {loading ? (
                <button className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Please Wait</span>
                </button>
              ) : (
                <button className="bg-[#FF2B85] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  Login
                </button>
              )}
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link
              to={"/signup"}
              className="text-xs text-gray-500 dark:text-gray-100 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
