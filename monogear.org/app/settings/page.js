"use client"

import { Button } from "../../components/ui/button"
import { Building, User, Lock, Bell, Save } from "lucide-react"
import Link from "next/link"

import logo from "../../public/logo.png";

import OrganizationSettingsPage from "../../components/monorepoSettings/OrganizationSettingsPage"
import NotificationsSettingsPage from "../../components/monorepoSettings/NotificationsSettingsPage"
import ProfileSettingsPage from "../../components/monorepoSettings/ProfileSettingsPage"
import SecuritySettingsPage from "../../components/monorepoSettings/SecuritySettingsPage";
import { useState } from "react"
import { cn } from "../../lib/utils";

export default function Settings() {

    const [pageState, setPageState] = useState("profile")

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <header className="border-b border-[#1E1E2A] sticky top-0 z-10 bg-[#0A0A0F]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/repo" className="flex items-center gap-2">
                                <div className='flex gap-2 w-full items-center'>
                                    <img src={logo.src} alt="monogear" className="relative z-[2] h-10" draggable="false" />
                                    <p className='text-lg lato font-semibold'>monogear</p>
                                </div>
                            </Link>

                            <nav className="hidden md:flex items-center space-x-6">
                                <Link href="/dashboard" className="text-white hover:text-blue-400 text-sm font-medium">
                                    Dashboard
                                </Link>
                                <Link href="/repositories" className="text-gray-400 hover:text-blue-400 text-sm font-medium">
                                    Repositories
                                </Link>
                                <Link href="/pipelines" className="text-gray-400 hover:text-blue-400 text-sm font-medium">
                                    Pipelines
                                </Link>
                                <Link href="/deployments" className="text-gray-400 hover:text-blue-400 text-sm font-medium">
                                    Deployments
                                </Link>
                                <Link href="/settings" className="text-gray-400 hover:text-blue-400 text-sm font-medium">
                                    Settings
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-400 border-[#1E1E2A] hover:bg-[#1E1E2A] hover:text-white"
                            >
                                Feedback
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-400 border-[#1E1E2A] hover:bg-[#1E1E2A] hover:text-white"
                            >
                                Docs
                            </Button>
                            <div className="w-8 h-8 rounded-full bg-[#3273FF] flex items-center justify-center">
                                <span className="text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold capitalize">{pageState} Settings</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-[#1E1E2A] hover:bg-[#1E1E2A]">
                            Cancel
                        </Button>
                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg overflow-hidden">
                            <nav className="flex flex-col">
                                <div
                                    onClick={() => { setPageState("organization") }}
                                    className={cn("cursor-pointer flex items-center gap-2 px-4 py-3 ",
                                        pageState === "organization" ? "text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]" : "text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                    )}
                                >
                                    <Building className="h-5 w-5" />
                                    <span>Organization</span>
                                </div>
                                <div
                                    onClick={() => { setPageState("profile") }}
                                    className={cn("cursor-pointer flex items-center gap-2 px-4 py-3 ",
                                        pageState === "profile" ? "text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]" : "text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                    )}
                                >
                                    <User className="h-5 w-5" />
                                    <span>Profile</span>
                                </div>
                                <div
                                    onClick={() => { setPageState("security") }}
                                    className={cn("cursor-pointer flex items-center gap-2 px-4 py-3 ",
                                        pageState === "security" ? "text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]" : "text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                    )}
                                >
                                    <Lock className="h-5 w-5" />
                                    <span>Security</span>
                                </div>
                                <div
                                    onClick={() => { setPageState("notifications") }}
                                    className={cn("cursor-pointer flex items-center gap-2 px-4 py-3 ",
                                        pageState === "notifications" ? "text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]" : "text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                    )}
                                >
                                    <Bell className="h-5 w-5" />
                                    <span>Notifications</span>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {pageState == "profile" && <ProfileSettingsPage />}
                    {pageState == "security" && <SecuritySettingsPage />}
                    {pageState == "notifications" && <NotificationsSettingsPage />}
                    {pageState == "organization" && <OrganizationSettingsPage />}


                </div>
            </div>
        </div>
    )
}
