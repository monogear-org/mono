"use client"

import { Button } from "../../../../../components/ui/button"
import { Separator } from "../../../../../components/ui/separator"
import { Users, Settings, GitBranchIcon, Lock, Save, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProjectSecurityPage({ params }) {

    const project = projects.find((p) => p.id.toString() === params.id) || projects[0]

    const [securitySettings, setSecuritySettings] = useState({
        vulnerabilityScan: true,
        secretScan: true,
        dependencyAlerts: true,
        codeScanning: false,
    })

    const toggleSetting = (key) => {
        setSecuritySettings({
            ...securitySettings,
            [key]: !securitySettings[key],
        })
    }

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <header className="border-b border-[#1E1E2A] sticky top-0 z-10 bg-[#0A0A0F]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#3B82F6] rounded flex items-center justify-center">
                                    <span className="font-bold text-white">M</span>
                                </div>
                                <span className="font-semibold text-white">monogear</span>
                            </Link>

                            <nav className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-gray-400 hover:text-[#3B82F6] text-sm font-medium">
                                    Dashboard
                                </Link>
                                <Link href="/repositories" className="text-gray-400 hover:text-[#3B82F6] text-sm font-medium">
                                    Repositories
                                </Link>
                                <Link href="/pipelines" className="text-gray-400 hover:text-[#3B82F6] text-sm font-medium">
                                    Pipelines
                                </Link>
                                <Link href="/deployments" className="text-gray-400 hover:text-[#3B82F6] text-sm font-medium">
                                    Deployments
                                </Link>
                                <Link href="/settings/organization" className="text-gray-400 hover:text-[#3B82F6] text-sm font-medium">
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
                            <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
                                <span className="text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-6">
                    <Link href={`/project/${project.id}`} className="text-gray-400 hover:text-[#3B82F6]">
                        {project.owner}/{project.repo}
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href={`/project/${project.id}/settings`} className="text-gray-400 hover:text-[#3B82F6]">
                        Settings
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-white">Security</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Security Settings</h1>
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
                                <Link
                                    href={`/project/${project.id}/settings`}
                                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span>General</span>
                                </Link>
                                <Link
                                    href={`/project/${project.id}/settings/collaborators`}
                                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                >
                                    <Users className="h-5 w-5" />
                                    <span>Collaborators</span>
                                </Link>
                                <Link
                                    href={`/project/${project.id}/settings/branches`}
                                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                >
                                    <GitBranchIcon className="h-5 w-5" />
                                    <span>Branches</span>
                                </Link>
                                <Link
                                    href={`/project/${project.id}/settings/security`}
                                    className="flex items-center gap-2 px-4 py-3 text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]"
                                >
                                    <Lock className="h-5 w-5" />
                                    <span>Security</span>
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="h-6 w-6 text-[#3B82F6]" />
                                <h2 className="text-xl font-semibold">Repository Security</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#3B82F6]/10 rounded-full">
                                                <AlertTriangle className="h-5 w-5 text-[#3B82F6]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Vulnerability Scanning</h3>
                                                <p className="text-sm text-gray-400">Automatically scan code for known vulnerabilities</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={securitySettings.vulnerabilityScan}
                                                onChange={() => toggleSetting("vulnerabilityScan")}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                        </label>
                                    </div>
                                    {securitySettings.vulnerabilityScan && (
                                        <div className="mt-4 p-3 bg-[#0A0A0F] rounded-md border border-[#1E1E2A]">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">Last scan: 2 hours ago</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">No vulnerabilities found</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#3B82F6]/10 rounded-full">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-[#3B82F6]"
                                                >
                                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Secret Scanning</h3>
                                                <p className="text-sm text-gray-400">Detect and prevent accidental commits of secrets</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={securitySettings.secretScan}
                                                onChange={() => toggleSetting("secretScan")}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#3B82F6]/10 rounded-full">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-[#3B82F6]"
                                                >
                                                    <path d="M16 2H8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Z" />
                                                    <path d="M12 11h4" />
                                                    <path d="M12 16h4" />
                                                    <path d="M8 11h.01" />
                                                    <path d="M8 16h.01" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Dependency Alerts</h3>
                                                <p className="text-sm text-gray-400">Get notified about vulnerabilities in dependencies</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={securitySettings.dependencyAlerts}
                                                onChange={() => toggleSetting("dependencyAlerts")}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                        </label>
                                    </div>
                                    {securitySettings.dependencyAlerts && (
                                        <div className="mt-4 p-3 bg-[#0A0A0F] rounded-md border border-[#1E1E2A]">
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                <span className="text-sm">1 dependency has a moderate vulnerability</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#3B82F6]/10 rounded-full">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-[#3B82F6]"
                                                >
                                                    <path d="m16 2-4 4-4-4" />
                                                    <path d="M12 6v16" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Code Scanning</h3>
                                                <p className="text-sm text-gray-400">Advanced security analysis for your code</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={securitySettings.codeScanning}
                                                onChange={() => toggleSetting("codeScanning")}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                        </label>
                                    </div>
                                    {!securitySettings.codeScanning && (
                                        <div className="mt-4 p-3 bg-[#0A0A0F] rounded-md border border-[#1E1E2A]">
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                <span className="text-sm">Premium feature - Upgrade your plan to enable</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Separator className="bg-[#1E1E2A] my-6" />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Security Audit Log</h3>
                                    <div className="border border-[#1E1E2A] rounded-lg overflow-hidden">
                                        <div className="p-3 bg-[#1A1A24] border-b border-[#1E1E2A]">
                                            <span className="font-medium">Recent Security Events</span>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm">Dependency scan completed</span>
                                                </div>
                                                <span className="text-xs text-gray-400">2 hours ago</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-[#3B82F6]" />
                                                    <span className="text-sm">Branch protection rule updated</span>
                                                </div>
                                                <span className="text-xs text-gray-400">1 day ago</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                    <span className="text-sm">Vulnerability detected and fixed</span>
                                                </div>
                                                <span className="text-xs text-gray-400">3 days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Sample project data
const projects = [
    {
        id: 1,
        name: "API Service",
        owner: "monogear",
        repo: "api-service",
        description: "Core API service for the Monogear platform",
        branch: "main",
        lastUpdated: "Updated 2h ago",
        icon: "A",
        branches: [
            { name: "main", isDefault: true },
            { name: "develop", isDefault: false },
            { name: "feature/auth", isDefault: false },
        ],
    },
]
