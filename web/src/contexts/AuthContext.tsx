import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../lib/axios';
import { useGoogleLogin } from 'react-google-login';

interface UserProps {
  name: string;
  avatarUrl: string;
}

const clientId = "421120602706-imqtigurvm2isoma1v2jcn6toqbqk7qb.apps.googleusercontent.com";

export interface AuthContexDataProps {
  user: UserProps;
  singIn: () => Promise<void>;
  isUserLoading: boolean;
  isSignComplete: boolean
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContexDataProps);

export function AuthContextProvider({ children }: any) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isSignComplete, setIsSignComplete] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const { signIn, loaded } = useGoogleLogin({
    clientId,
    onSuccess
  })

  function onSuccess(response: any) {
    singInWithGoogle(response.accessToken);
  }

  async function singIn() {
    try {
      setIsUserLoading(true)
      signIn();
    } catch (error) {
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function singInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post('/users', { access_token });
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;
      localStorage.setItem(`token`, tokenResponse.data.token)
      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);
      setIsSignComplete(true);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    // if (localStorage.getItem(`token`)) {
    //   api.get('/me').then(resp => setUser(resp.data.user));
    // }
  })


  return (
    <AuthContext.Provider value={{
      singIn,
      isUserLoading,
      user,
      isSignComplete
    }}>
      {children}
    </AuthContext.Provider>
  )
}