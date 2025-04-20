"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import SignIn from "@/components/auth/Signin"
import ServerURL from "@/components/auth/ServerURL"

export default function Home() {

    const [authState, setAuthState] = useState("serverurl")
    const [server_url, setServer_url] = useState("")
    const [userData, setUserData] = useState("")

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <AnimatePresence mode="wait">
                    {authState === "serverurl" && <ServerURL key="serverurl" onAuthStateChange={setAuthState} server_url={server_url} setServer_url={setServer_url} />}

                    {authState === "signin" && <SignIn key="signin" setUserData={setUserData} />}
                </AnimatePresence>
            </div>
        </div>
    )
}
