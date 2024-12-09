// // import useFetch from "../../../../../hooks/useFetch";
// import baseUrl from "@/utils/baseUrl";
// import { ClientResponse } from "@/types/ClientType";
// import useFetch from "@/hooks/useFetch";
  
// // const useFetchClients = (query: string, page: number, limit: number) => {
// //     return useFetch<ClientResponse>(
// //         ["clients", query, page.toString(), limit.toString()],
// //         `${baseUrl}api/client/?query=${query}&page=${page}&limit=${limit}`
// //     );
// // };

// const useFetchClients = (query: string, page: number, limit: number) => {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       throw new Error("Authorization Token is Missing!");
//     }

//     const { data, isLoading, isError, error } = useFetch<ClientResponse>(
//         `${baseUrl}api/client/`,
//         { Authorization: `Bearer ${token}` },
//         { query, page, limit }
//     );
    
//     return { data, isLoading, isError, error };

// }
  
// export default useFetchClients;

import baseUrl from "@/utils/baseUrl";
import { ClientResponse } from "@/types/ClientType";
import useFetch from "@/hooks/useFetch";

const useFetchClients = (query: string, page: number, limit: number) => {
  const { data, isLoading, isError, error } = useFetch<ClientResponse>(
    "clients",
    `${baseUrl}api/client/`,
    {
      params: {
        query,
        page,
        limit,
      },
    }
  );

  return { data, isLoading, isError, error };
};

export default useFetchClients;
