// "use client";

import RoomList from "@/components/RoomList";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";
import SignupFormDemo from "@/components/signup-form-demo";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home({params}: any) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = await currentUser();
  console.log(user);
  console.log("userID:",user?.id,user?.fullName,user?.emailAddresses);

  // const token = localStorage.getItem('token');
  if(!user){
    // const decoded = jwt.decode("sfadads") as any;

    // if(decoded?.userId !== userId){
      // setIsLoggedIn(false);
    // }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="font-bold text-3xl pb-10 pr-5 text-white">Welcome to Draw App</div>

      {!true ?(
      <button className="hover:bg-blue-500 mr-10 hover:text-white text-white bg-blue-700 rounded-lg px-4 py-2 font-bold">
        Sign In
      </button> )
      : 
        <RoomList userId = {user} />
      
      }
  

    </div>
  );
}
