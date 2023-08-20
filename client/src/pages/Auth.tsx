import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { AuthService } from "../services/auth.service";
import { setTokenLogalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";

const Auth: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await AuthService.login({email,password})
      if(data){
        setTokenLogalStorage('token', data.token)
        dispatch(login(data))
        toast.success('You logged in.')
        navigate('/')
      }
    } catch (error: any) {
      const err = error.response?.massage;
      toast.error(err.toString());
    }
  };
  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await AuthService.register({ email, password });
      if (data) {
        toast.success("Account has been created.");
        setIsLogin(!isLogin);
      }
    } catch (error: any) {
      toast.error(error.response.data.message ? error.response.data.message.toString() : "get error");
    }
  };
  return (
    <div className="mt-40 flex justify-center flex-col items-center bg-slate-900 text-white">
      <h1 className="mb-5 text-center text-xl">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form
        className="mx-auto flex w-1/3 flex-col gap-5"
        onSubmit={isLogin ? loginHandler : registerHandler}
      >
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
