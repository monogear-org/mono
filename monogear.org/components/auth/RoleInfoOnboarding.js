"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import logo from "../../public/logo.png"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { ArrowLeft } from "lucide-react"

const teamSizeOptions = [
    { value: "1", label: "Just me" },
    { value: "2-5", label: "2-5 people" },
    { value: "6-10", label: "6-10 people" },
    { value: "11-50", label: "11-50 people" },
    { value: "50+", label: "50+ people" },
]

const roleOptions = [
    { value: "frontend", label: "Frontend Engineer" },
    { value: "backend", label: "Backend Engineer" },
    { value: "fullstack", label: "Full Stack Engineer" },
    { value: "devops", label: "DevOps Engineer" },
    { value: "student", label: "Student" },
    { value: "educator", label: "Educator" },
    { value: "manager", label: "Engineering Manager" },
    { value: "other", label: "Other" },
]

export default function RoleInfoOnboarding({ initialData, onSubmit, onBack }) {
    const [formData, setFormData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        setIsLoading(false)
        onSubmit(formData)
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
                    <img src={logo.src} alt="monogear" className="relative z-[2] h-8" draggable="false" />
                    <p className='text-lg lato font-semibold'>monogear</p>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Your role</h1>
                <p className="text-sm text-[#a1a1aa]">Tell us about your team and role</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <Label>How many people will be working with you?</Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {teamSizeOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    type="button"
                                    variant={formData.teamSize === option.value ? "default" : "outline"}
                                    className="justify-start"
                                    onClick={() => setFormData((prev) => ({ ...prev, teamSize: option.value }))}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Who are you?</Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {roleOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    type="button"
                                    variant={formData.role === option.value ? "default" : "outline"}
                                    className="justify-start"
                                    onClick={() => setFormData((prev) => ({ ...prev, role: option.value }))}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <Button type="button" variant="outline" onClick={onBack} className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 inline-flex h-10 items-center justify-center rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3b82f6]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        disabled={isLoading || !formData.teamSize || !formData.role}
                    >
                        {isLoading ? "Saving..." : "Continue"}
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}
