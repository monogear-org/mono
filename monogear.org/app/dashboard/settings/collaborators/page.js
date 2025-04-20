"use client"

import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Separator } from "../../../../../components/ui/separator"
import { Avatar } from "../../../../../components/ui/avatar"
import { Users, Settings, GitBranchIcon, Lock, Trash2, PlusCircle, Save, UserPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProjectCollaboratorsPage({ params }) {
    // Find the project by ID from our sample data
    const project = projects.find((p) => p.id.toString() === params.id) || projects[0]

    const [collaborators, setCollaborators] = useState([
        { id: 1, username: "johndoe", name: "John Doe", role: "Owner", avatar: "JD", permissions: "Admin" },
        { id: 2, username: "alicesmith", name: "Alice Smith", role: "Collaborator", avatar: "AS", permissions: "Write" },
        { id: 3, username: "bobmartin", name: "Bob Martin", role: "Collaborator", avatar: "BM", permissions: "Read" },
    ])

    const [newCollaborator, setNewCollaborator] = useState({ username: "", permissions: "Read" })

    const addCollaborator = () => {
        if (newCollaborator.username.trim()) {
            // In a real app, you would validate the username exists
            setCollaborators([
                ...collaborators,
                {
                    id: collaborators.length + 1,
                    username: newCollaborator.username,
                    name: "New User",
                    role: "Collaborator",
                    avatar: "NU",
                    permissions: newCollaborator.permissions,
                },
            ])
            setNewCollaborator({ username: "", permissions: "Read" })
        }
    }

    const removeCollaborator = (id) => {
        setCollaborators(collaborators.filter((c) => c.id !== id))
    }

    const updatePermissions = (id, permissions) => {
        setCollaborators(collaborators.map((c) => (c.id === id ? { ...c, permissions } : c)))
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
                    <span className="text-white">Collaborators</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Collaborators</h1>
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
                                    className="flex items-center gap-2 px-4 py-3 text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]"
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
                                <h2 className="text-xl font-semibold">Repository Collaborators</h2>
                                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add Collaborator
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]/50">
                                    <h3 className="text-lg font-medium mb-4">Add New Collaborator</h3>
                                    <div className="flex gap-3">
                                        <Input
                                            placeholder="Username"
                                            value={newCollaborator.username}
                                            onChange={(e) => setNewCollaborator({ ...newCollaborator, username: e.target.value })}
                                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                        />
                                        <select
                                            value={newCollaborator.permissions}
                                            onChange={(e) => setNewCollaborator({ ...newCollaborator, permissions: e.target.value })}
                                            className="h-10 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                                        >
                                            <option value="Read">Read</option>
                                            <option value="Write">Write</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={addCollaborator}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                <Separator className="bg-[#1E1E2A]" />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Current Collaborators</h3>
                                    <div className="space-y-3">
                                        {collaborators.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 bg-[#3B82F6]">
                                                        <span>{user.avatar}</span>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-gray-400">@{user.username}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {user.role !== "Owner" ? (
                                                        <select
                                                            value={user.permissions}
                                                            onChange={(e) => updatePermissions(user.id, e.target.value)}
                                                            className="h-9 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                                                        >
                                                            <option value="Read">Read</option>
                                                            <option value="Write">Write</option>
                                                            <option value="Admin">Admin</option>
                                                        </select>
                                                    ) : (
                                                        <span className="px-3 py-1.5 text-xs rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                                                            Owner
                                                        </span>
                                                    )}
                                                    {user.role !== "Owner" && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 text-gray-400 hover:text-[#EF4444] hover:bg-[#EF4444]/10"
                                                            onClick={() => removeCollaborator(user.id)}
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
                                    <h3 className="text-lg font-medium">Permission Levels</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">Admin</span>
                                                <span className="font-medium">Full access</span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Can read, write, and manage repository settings, including adding collaborators.
                                            </p>
                                        </div>

                                        <div className="p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-[#10B981]/10 text-[#10B981]">Write</span>
                                                <span className="font-medium">Standard access</span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Can read and write to the repository, but cannot change settings.
                                            </p>
                                        </div>

                                        <div className="p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-[#1E1E2A] text-gray-400">Read</span>
                                                <span className="font-medium">Limited access</span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Can only view and clone the repository, cannot make changes.
                                            </p>
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
