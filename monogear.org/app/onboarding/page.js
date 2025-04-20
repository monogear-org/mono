"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import PersonalInfoOnboarding from "@/components/auth/PersonalInfoOnboarding"
import RoleInfoOnboarding from "@/components/auth/RoleInfoOnboarding"
import SourceInfoOnboarding from "@/components/auth/SourceInfoOnboarding"

export default function OnboardingPage() {

    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        companyName: "",
        profileImage: null,
    })
    const [roleInfo, setRoleInfo] = useState({
        teamSize: "",
        role: "",
    })
    const [sourceInfo, setSourceInfo] = useState({
        source: "",
        interests: [],
    })

    const handlePersonalInfoSubmit = (data) => {
        setPersonalInfo(data)
        setCurrentStep(2)
    }

    const handleRoleInfoSubmit = (data) => {
        setRoleInfo(data)
        setCurrentStep(3)
    }

    const handleSourceInfoSubmit = (data) => {
        setSourceInfo(data)

        setTimeout(() => {
            // will call API here
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                            Step {currentStep} of 3
                        </div>
                        <div className="text-sm text-[#a1a1aa]">Setting up your workspace</div>
                    </div>

                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#27272a]">
                        <motion.div
                            className="h-full bg-[#3b82f6]"
                            initial={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                            animate={{ width: `${(currentStep / 3) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {currentStep === 1 && <PersonalInfoOnboarding key="step1" initialData={personalInfo} onSubmit={handlePersonalInfoSubmit} />}

                    {currentStep === 2 && <RoleInfoOnboarding key="step2" initialData={roleInfo} onSubmit={handleRoleInfoSubmit} onBack={() => setCurrentStep(1)} />}

                    {currentStep === 3 && <SourceInfoOnboarding key="step3" initialData={sourceInfo} onSubmit={handleSourceInfoSubmit} onBack={() => setCurrentStep(2)} />}
                </AnimatePresence>
            </div>
        </div>
    )
}
