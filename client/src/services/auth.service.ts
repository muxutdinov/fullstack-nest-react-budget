import { instance } from "../api/axios.api";
import { IResponseUserData, IUser, IUserData } from "../types/types";

export const AuthService = {
  async register(userData: IUserData): Promise<IResponseUserData | undefined> {
    const { data } = await instance.post<IResponseUserData>("user", userData);
    return data;
  },
  async login(userData: IUserData): Promise<IUser | undefined> {
    const { data } = await instance.post<IUser>("auth/login", userData);
    return data;
  },
  async getProfile(): Promise<IUser | undefined> {
    const { data } = await instance.get("auth/profile");
    if (data) {
      return data;
    }
  },
};
