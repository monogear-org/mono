"use client"

import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Separator } from "../../../../../components/ui/separator"
import { Users, Settings, GitBranchIcon, Lock, Trash2, PlusCircle, Save, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProjectBranchesPage({ params }) {
    // Find the project by ID from our sample data
    const project = projects.find((p) => p.id.toString() === params.id) || projects[0]

    const [branches, setBranches] = useState([
        { name: "main", isDefault: true, isProtected: true, lastCommit: "2 hours ago", author: "johndoe" },
        { name: "develop", isDefault: false, isProtected: true, lastCommit: "5 hours ago", author: "alicesmith" },
        { name: "feature/auth", isDefault: false, isProtected: false, lastCommit: "1 day ago", author: "bobmartin" },
        { name: "feature/api", isDefault: false, isProtected: false, lastCommit: "3 days ago", author: "johndoe" },
    ])

    const [newBranch, setNewBranch] = useState({ name: "", basedOn: "main" })

    const addBranch = () => {
        if (newBranch.name.trim()) {
            setBranches([
                ...branches,
                {
                    name: newBranch.name,
                    isDefault: false,
                    isProtected: false,
                    lastCommit: "Just now",
                    author: "johndoe",
                },
            ])
            setNewBranch({ name: "", basedOn: "main" })
        }
    }

    const deleteBranch = (name) => {
        if (!branches.find((b) => b.name === name)?.isDefault) {
            setBranches(branches.filter((b) => b.name !== name))
        }
    }

    const setDefaultBranch = (name) => {
        setBranches(
            branches.map((b) => ({
                ...b,
                isDefault: b.name === name,
            })),
        )
    }

    const toggleProtection = (name) => {
        setBranches(branches.map((b) => (b.name === name ? { ...b, isProtected: !b.isProtected } : b)))
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
                    <span className="text-white">Branches</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Branch Settings</h1>
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
                                    className="flex items-center gap-2 px-4 py-3 text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]"
                                >
                                    <GitBranchIcon className="h-5 w-5" />
                                    <span>Branches</span>
                                </Link>
                                <Link
                                    href={`/project/${project.id}/settings/security`}
                                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                >
                                    <Lock className="h-5 w-5" />
                                    <span>Security</span>
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Branch Management</h2>
                                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                                    <GitBranchIcon className="mr-2 h-4 w-4" />
                                    New Branch
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]/50">
                                    <h3 className="text-lg font-medium mb-4">Create New Branch</h3>
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="Branch name"
                                            value={newBranch.name}
                                            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                        />
                                        <select
                                            value={newBranch.basedOn}
                                            onChange={(e) => setNewBranch({ ...newBranch, basedOn: e.target.value })}
                                            className="h-10 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                                        >
                                            {branches.map((branch) => (
                                                <option key={branch.name} value={branch.name}>
                                                    {branch.name}
                                                </option>
                                            ))}
                                        </select>
                                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={addBranch}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Create
                                        </Button>
                                    </div>
                                </div>

                                <Separator className="bg-[#1E1E2A]" />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Default Branch</h3>
                                    <p className="text-sm text-gray-400 mb-4">
                                        The default branch is used for new pull requests and code check-ins.
                                    </p>

                                    <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <GitBranchIcon className="h-5 w-5 text-[#3B82F6]" />
                                                <div>
                                                    <div className="font-medium">Default Branch</div>
                                                    <div className="text-sm text-gray-400">
                                                        Currently set to:{" "}
                                                        <span className="text-[#3B82F6]">{branches.find((b) => b.isDefault)?.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <select
                                                value={branches.find((b) => b.isDefault)?.name}
                                                onChange={(e) => setDefaultBranch(e.target.value)}
                                                className="h-9 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                                            >
                                                {branches.map((branch) => (
                                                    <option key={branch.name} value={branch.name}>
                                                        {branch.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-[#1E1E2A]" />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Branch Protection</h3>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Protected branches enforce rules for pushes and prevent branch deletion.
                                    </p>

                                    <div className="space-y-3">
                                        {branches.map((branch) => (
                                            <div
                                                key={branch.name}
                                                className="flex items-center justify-between p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <GitBranchIcon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{branch.name}</span>
                                                            {branch.isDefault && (
                                                                <span className="px-2 py-0.5 text-xs rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-400">
                                                            Last commit {branch.lastCommit} by @{branch.author}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className={`border-[#1E1E2A] ${branch.isProtected
                                                            ? "bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20"
                                                            : "text-gray-400 hover:bg-[#1E1E2A] hover:text-white"
                                                            }`}
                                                        onClick={() => toggleProtection(branch.name)}
                                                    >
                                                        <Shield className="mr-2 h-4 w-4" />
                                                        {branch.isProtected ? "Protected" : "Unprotected"}
                                                    </Button>
                                                    {!branch.isDefault && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 text-gray-400 hover:text-[#EF4444] hover:bg-[#EF4444]/10"
                                                            onClick={() => deleteBranch(branch.name)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="bg-[#1E1E2A]" />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Protection Rules</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle className="h-4 w-4 text-[#3B82F6]" />
                                                <span className="font-medium">Require pull request reviews</span>
                                            </div>
                                            <p className="text-sm text-gray-400 pl-6">
                                                Pull requests require at least 1 approval before merging.
                                            </p>
                                        </div>

                                        <div className="p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle className="h-4 w-4 text-[#3B82F6]" />
                                                <span className="font-medium">Require status checks</span>
                                            </div>
                                            <p className="text-sm text-gray-400 pl-6">Status checks must pass before merging.</p>
                                        </div>

                                        <div className="p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle className="h-4 w-4 text-[#3B82F6]" />
                                                <span className="font-medium">Prevent force pushes</span>
                                            </div>
                                            <p className="text-sm text-gray-400 pl-6">Force pushes are blocked for all users.</p>
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
