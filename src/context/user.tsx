import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { http } from '../services/api';
import { User } from '../types/user';
import { authService } from '../services/auth';
import { UserRole } from '../constants/userRole';

type UserContext = {
  user: User | null;
  isAdmin: boolean;
  fetchUser: () => Promise<void>;
  isError: boolean;
  isLoading: boolean;
};

const defaultValue: UserContext = {
  user: null,
  isAdmin: false,
  fetchUser: async () => {},
  isError: false,
  isLoading: false
};

const UserContext = createContext(defaultValue);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncCallback = async (callback: () => Promise<any>) => {
    try {
      setIsLoading(true);

      await callback();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    await handleAsyncCallback(async () => {
      const { data } = await http.get<{ user: User; success: boolean }>(`/profile`);

      setUser(data.user);
      setIsAdmin(data.user.role === UserRole.ADMIN);
    });
  };

  const value = {
    user,
    fetchUser,
    isError,
    isLoading,
    isAdmin
  };

  const token = authService.getToken();

  useEffect(() => {
    if (!!user || !token) return;

    fetchUser();
  }, [token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
