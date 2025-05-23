"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import logo from "../../public/logo.png"

export default function SignIn({ onAuthStateChange, server_url, setServer_url }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        setIsLoading(false)
        onAuthStateChange("signin")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md overflow-hidden rounded-lg border border-[#27272a] bg-[#121212] p-6 shadow-lg"
        >
            <div className="mb-6 flex flex-col items-center space-y-2 text-center">
                <div className="flex items-center gap-2 mb-2">
                    <img src={logo.src} alt="monogear" className="relative z-[2] h-8" draggable="false" />
                    <p className='text-lg lato font-semibold'>monogear</p>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Sign in to monogear</h1>
                <p className="text-sm text-[#a1a1aa]">Enter your credentials to access your account</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="serverurl">Server URL</Label>
                    <Input
                        id="serverurl"
                        name="serverurl"
                        type="serverurl"
                        placeholder="monogear.org/server/3b63703b-a3af-4e21-933c-8071160a327c"
                        value={server_url}
                        onChange={(e) => { setServer_url(e.target.value) }}
                        required
                        className="flex h-10 w-full rounded-md border border-[#27272a] bg-[#121212] px-3 py-2 text-sm placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <Button
                    type="submit"
                    className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3b82f6]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? "Verifying URL..." : "Continue"}
                </Button>
            </div>
        </motion.div >
    )
}
