"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import logo from "@/public/logo.png"

export default function PersonalInfoOnboarding({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)

    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            // will call API here
            setIsLoading(false)
            onSubmit(formData)
        }, 800)
    }

    const handleImageUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result
            setFormData((prev) => ({
                ...prev,
                profileImage: base64String,
            }))
            setIsUploading(false)
        }
        reader.onerror = () => {
            console.error("Error reading file")
            setIsUploading(false)
        }
        reader.readAsDataURL(file)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-[#27272a] bg-[#121212] p-6 shadow-lg"
        >
            <div className="mb-6 flex flex-col items-center space-y-2 text-center">
                <div className="flex items-center gap-2 mb-2">
                    <img src={logo.src} alt="NeuroLayer" className="relative z-[2] h-8" draggable="false" />
                    <p className='text-lg lato font-semibold'>monogear</p>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Tell us about yourself</h1>
                <p className="text-sm text-[#a1a1aa]">Let's get to know you better</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <Label htmlFor="profileImage" className="cursor-pointer">
                        <Avatar className="h-24 w-24 border-2 border-[#27272a]">
                            {formData.profileImage ? (
                                <AvatarImage src={formData.profileImage || "/placeholder.svg"} alt="Profile" />
                            ) : (
                                <AvatarFallback className="bg-[#27272a] text-white">
                                    <Camera className="h-8 w-8" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <span className="sr-only">Upload profile picture</span>
                    </Label>

                    <input
                        type="file"
                        id="profileImage"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <Button type="button" variant="outline" size="sm" onClick={handleImageUploadClick} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Upload picture"}
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="flex h-10 w-full rounded-md border border-[#27272a] bg-[#121212] px-3 py-2 text-sm placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company name</Label>
                        <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Acme Inc."
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            className="flex h-10 w-full rounded-md border border-[#27272a] bg-[#121212] px-3 py-2 text-sm placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3b82f6]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Continue"}
                </Button>
            </form>
        </motion.div>
    )
}
