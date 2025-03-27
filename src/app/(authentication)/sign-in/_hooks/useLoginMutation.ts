import { useRouter } from "next/navigation";
import { Login } from "@/utils/validations/AdminSchema";
import { Bounce, toast } from 'react-toastify';
import usePost from "../../../../hooks/usePost";
import { useUser } from "@/context/UserContext";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import baseUrl from "@/utils/baseUrl";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    admin: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      role: string;
    };
  };
}

const useLoginMutation = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>("token", null);
  const [_, setRefreshToken] = useLocalStorage<string | null>("refreshToken", null);

  const loginMutation = usePost<Login, LoginResponse>({
    url: `${baseUrl}api/admin/authenticate`,
    requiresAuthentication: false,
    onSuccess: (data) => {
      if (!data.data?.accessToken || !data.data?.refreshToken) {
        toast.error("Invalid Token!", {
          toastId: "invalidToken",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);

      // SET USER CONTEXT
      setUser(data.data.admin);

      // REDIRECT TO:
      router.push("/client");

      // RESPONSE or MESSAGE
      toast.success('Logged In Successfully!', {
        toastId: "loggedInSuccess",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
    onError: (error) => {
      toast.error("Login Failed!", {
        toastId: "loginError",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Login Error:", error);
    },
  });

  return loginMutation;
};

export default useLoginMutation;