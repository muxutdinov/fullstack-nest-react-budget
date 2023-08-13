import { FC, useState } from "react";

const Auth: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div className="mt-40 flex justify-center flex-col items-center bg-slate-900 text-white">
      <h1 className="mb-5 text-center text-xl">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form className="mx-auto flex w-1/3 flex-col gap-5">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="input"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          placeholder="Password"
        />
        <button className="btn btn-green mx-auto">Submit</button>
      </form>
      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
