import { useRouter } from "next/navigation";
import { Login } from "@/utils/validations/AdminSchema";
import { Bounce, toast } from 'react-toastify';
import usePost from "./usePost";
import { useUser } from "@/context/UserContext";
import useLocalStorage from "./useLocalStorage";
import baseUrl from "@/utils/baseUrl";

interface LoginResponse {
  data: {
    token: string;
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
  const [authToken, setAuthToken] = useLocalStorage<string | null>("token", null);

  const loginMutation = usePost<Login, LoginResponse>({
    api: `${baseUrl}api/admin/authenticate`,
    onSuccess: (data) => {
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
      setAuthToken(data.data.token);
      setUser(data.data.admin);
      router.push("/client");
    }
  });

  return loginMutation;
};

export default useLoginMutation;


