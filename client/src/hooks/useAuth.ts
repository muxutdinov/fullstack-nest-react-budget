import { useAppSelector } from "../store/hooks";

export const useAuth = (): boolean => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return isAuth;
};

export const getEmail = (): any => {
  const email = useAppSelector((state) => state.user?.user?.email);
  return email;
};