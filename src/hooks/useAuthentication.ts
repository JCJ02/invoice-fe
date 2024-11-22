import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuthentication = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
        }
    }, [router]);

}

export default useAuthentication;