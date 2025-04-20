"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import logo from "../../public/logo.png"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { ArrowLeft, Check } from "lucide-react"


const sourceOptions = [
    { value: "google", label: "Google" },
    { value: "friend", label: "Friend or colleague" },
    { value: "social", label: "Social media" },
    { value: "blog", label: "Blog or article" },
    { value: "event", label: "Event or conference" },
    { value: "other", label: "Other" },
]

const interestOptions = [
    {
        value: "git-compatibility",
        label: "Git Compatibility",
        description: "Full feature compatibility with Git, supporting all your existing workflows and tools.",
    },
    {
        value: "code-viewer",
        label: "Built-in Code Viewer",
        description: "Review and visualize your codebase with our powerful code viewer.",
    },
    {
        value: "cicd-pipelines",
        label: "CI/CD Pipelines",
        description: "Your workflows get fully customizable CI/CD pipelines integrated with your code.",
    },
    {
        value: "access-control",
        label: "Access Control",
        description: "Granular access controls for teams, branches, and repositories.",
    },
    {
        value: "programmable",
        label: "Fully Programmable",
        description: "Extend and customize with webhooks, extensions, and APIs.",
    },
    {
        value: "deployment",
        label: "Distributed Deployment",
        description: "Deploy to multiple environments with ease and confidence.",
    },
]

export default function SourceInfoOnboarding({ initialData, onSubmit, onBack }) {
    const [formData, setFormData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setIsLoading(false)
        onSubmit(formData)
    }

    const toggleInterest = (value) => {
        setFormData((prev) => {
            const interests = prev.interests.includes(value)
                ? prev.interests.filter((i) => i !== value)
                : [...prev.interests, value]

            return { ...prev, interests }
        })
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
                <h1 className="text-2xl font-semibold tracking-tight">Almost there!</h1>
                <p className="text-sm text-[#a1a1aa]">Help us tailor your experience</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <Label>Where did you hear about us?</Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {sourceOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    type="button"
                                    variant={formData.source === option.value ? "default" : "outline"}
                                    className="justify-start"
                                    onClick={() => setFormData((prev) => ({ ...prev, source: option.value }))}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>What are you interested in using?</Label>
                        <p className="text-xs text-[#a1a1aa]">Select all that apply</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {interestOptions.map((option) => {
                                const isSelected = formData.interests.includes(option.value)
                                return (
                                    <div
                                        key={option.value}
                                        className={`flex cursor-pointer flex-col items-center rounded-lg border ${isSelected ? "border-[#3b82f6]" : "border-[#27272a]"
                                            } bg-[#121212] p-4 transition-all hover:border-[#3b82f6]/50 hover:bg-[#121212]/80`}
                                        onClick={() => toggleInterest(option.value)}
                                    >
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[#3b82f6]/10 text-[#3b82f6]">
                                            {isSelected && <Check className="h-4 w-4" />}
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-sm font-medium">{option.label}</h3>
                                            <p className="mt-1 text-xs text-[#a1a1aa]">{option.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
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
                        disabled={isLoading || !formData.source || formData.interests.length === 0}
                    >
                        {isLoading ? "Finishing setup..." : "Complete setup"}
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}
