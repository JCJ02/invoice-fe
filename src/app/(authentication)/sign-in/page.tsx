"use client";

import Footer from "@/components/Footer";
import React, { useState } from "react";
import Image from "next/image";
import signInFormImage from "../../../assets/images/sign-in-form-image.jpg";
import lwsLogo from "../../../assets/images/lws-logo.png";
import Link from "next/link";
import backgroundImageSignIn from "../../../assets/images/background-image-sign-in.png";
import useLoginForm from "@/hooks/useLoginForm";
import useLoginMutation from "@/hooks/useLoginMutation";

const SignIn = () => {
  const { values, errors, handleChange, validateForm } = useLoginForm();
  const loginMutation = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      loginMutation.mutate(values, {
        onError: () => {
          const message = "Invalid Credentials!";
          setErrorMessage(message);
        },
      });
    }
  };

  return (
    <>
      <div
        className={`bg-red-gradient bg-cover bg-center h-screen w-full`}
        style={{
          backgroundImage: `linear-gradient(rgba(210, 35, 45, 0.6), rgba(210, 35, 45, 0.6)), url(${backgroundImageSignIn.src})`,
        }}
      >
        <div className="flex justify-center items-center h-screen w-full">
          <div className="bg-[#FFFFFF] font-poppins flex justify-center items-center rounded-2xl">
            <form
              className="flex flex-col items-center gap-2 p-8 md:p-10 w-[320px] md:w-full"
              onSubmit={handleLogin}
            >
              <Image
                className="py-10"
                src={lwsLogo}
                alt="LWS Logo"
                height={70}
                width={200}
              />
              <div className="flex flex-col items-start w-full">
                <label className="text-xs md:text-md">E-mail Address</label>
                <input
                  id="email-address"
                  className="border-2 border-[#EEEEEE] text-xs md:text-md rounded-md pl-2 py-2 w-full"
                  placeholder="Enter E-mail Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="font-poppins text-red-700 text-xs md:text-md">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <label className="text-xs md:text-md">Password</label>
                <input
                  id="password"
                  className="border-2 border-[#EEEEEE] text-xs md:text-md rounded-md pl-2 py-2 w-full"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="font-poppins text-red-700 text-xs md:text-md">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                <div className="flex self-start items-center gap-1">
                  <input id="remember-password" type="checkbox" />
                  <label className="text-xs md:text-md">
                    Remember Password
                  </label>
                </div>
                <Link
                  id="forgot-password"
                  className="text-[#D2232D] pt-3 md:pt-0 text-xs md:text-md"
                  href={"*"}
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                id="sign-in"
                className="bg-[#D2232D] font-poppins text-white p-1 my-5 rounded-md hover:bg-[#E47B81] w-full"
                type="submit"
              >
                Sign In
              </button>
              {errorMessage && (
                <p className="font-poppins font-bold text-red-700 text-xs md:text-md">
                  {errorMessage}
                </p>
              )}
            </form>
            <Image
              className="hidden lg:inline-block rounded-tr-2xl rounded-br-2xl"
              src={signInFormImage}
              alt="Sign In Form Image"
              width={550}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
