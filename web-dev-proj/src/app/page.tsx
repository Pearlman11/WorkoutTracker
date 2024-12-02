"use client";
import SignUp from "./components/SignUp";
import {useSession} from "next-auth/react";
import WorkoutsPage from "@/src/app/components/WorkoutPage";

export default function Home() {
    const {data: session, status} = useSession();

  return (
    <div>
        {status === "authenticated" ? <WorkoutsPage /> :<SignUp />}

    </div>
  );
}
