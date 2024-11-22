import { useRouter } from "next/navigation";
import { Login } from "@/utils/validations/AdminSchema";
import { Bounce, toast } from 'react-toastify';
import usePost from "./usePost";
import { useUser } from "@/context/UserContext";
import useLocalStorage from "./useLocalStorage";

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
  const [authToken, setAuthToken] = useLocalStorage<string | null>("authToken", null);

  const loginMutation = usePost<Login, LoginResponse>({
    api: "http://localhost:8080/api/admin/authenticate",
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

      // localStorage.setItem("authToken", data.data.token);
      setAuthToken(data.data.token);

      setUser(data.data.admin);

      router.push("/client");
    }
  });

  return loginMutation;
};

export default useLoginMutation;


