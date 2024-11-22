import { useState, useEffect } from "react";

interface RememberPasswordData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const useRememberPassword = () => {
    const [rememberPasswordData, setRememberPasswordData] = useState<RememberPasswordData>({
        email: "",
        password: "",
        rememberMe: false,
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        const storedRememberMe = localStorage.getItem("rememberMe");

        if (storedRememberMe === "true" && storedEmail && storedPassword) {
            setRememberPasswordData({
                email: storedEmail,
                password: storedPassword,
                rememberMe: true,
            });
        }
    }, []);

    const saveToLocalStorage = (data: RememberPasswordData) => {
        if (data.rememberMe) {
            localStorage.setItem("email", data.email);
            localStorage.setItem("password", data.password);
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("rememberMe");
        }
    };

    const updateRememberPasswordData = (key: keyof RememberPasswordData, value: string | boolean) => {
        setRememberPasswordData((input) => {
            const updatedData = { ...input, [key]: value };
            saveToLocalStorage(updatedData);
            return updatedData;
        });
    };

    return {
        rememberPasswordData,
        setRememberPasswordData,
        updateRememberPasswordData,
    };
};

export default useRememberPassword;
