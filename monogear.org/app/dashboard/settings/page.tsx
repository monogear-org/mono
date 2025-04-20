"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar } from "@/components/ui/avatar"
import { Users, Settings, GitBranchIcon, Lock, Trash2, PlusCircle, Save } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProjectSettingsPage({ params }: { params: { id: string } }) {
  // Find the project by ID from our sample data
  const project = projects.find((p) => p.id.toString() === params.id) || projects[0]

  const [collaborators, setCollaborators] = useState([
    { id: 1, username: "johndoe", name: "John Doe", role: "Owner", avatar: "JD" },
    { id: 2, username: "alicesmith", name: "Alice Smith", role: "Collaborator", avatar: "AS" },
  ])

  const [newCollaborator, setNewCollaborator] = useState("")

  const addCollaborator = () => {
    if (newCollaborator.trim()) {
      // In a real app, you would validate the username exists
      setCollaborators([
        ...collaborators,
        {
          id: collaborators.length + 1,
          username: newCollaborator,
          name: "New User",
          role: "Collaborator",
          avatar: "NU",
        },
      ])
      setNewCollaborator("")
    }
  }

  const removeCollaborator = (id: number) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
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
          <span className="text-white">Settings</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Repository Settings</h1>
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
                  className="flex items-center gap-2 px-4 py-3 text-white bg-[#1E1E2A] border-l-2 border-[#3B82F6]"
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
              <h2 className="text-xl font-semibold mb-6">Repository Information</h2>

              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Repository Name</label>
                  <Input
                    defaultValue={project.repo}
                    className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <Textarea
                    defaultValue={project.description}
                    className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Default Branch</label>
                  <select
                    defaultValue="main"
                    className="h-10 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <option value="main">main</option>
                    <option value="develop">develop</option>
                    <option value="feature/auth">feature/auth</option>
                  </select>
                </div>

                <Separator className="bg-[#1E1E2A] my-8" />

                <h2 className="text-xl font-semibold mb-6">Collaborators</h2>

                <div className="space-y-4">
                  {collaborators.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]"
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
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === "Owner" ? "bg-[#3B82F6]/10 text-[#3B82F6]" : "bg-[#1E1E2A] text-gray-400"
                          }`}
                        >
                          {user.role}
                        </span>
                        {user.role !== "Owner" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-[#EF4444] hover:bg-[#EF4444]/10"
                            onClick={() => removeCollaborator(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Add collaborator by username"
                    value={newCollaborator}
                    onChange={(e) => setNewCollaborator(e.target.value)}
                    className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                  />
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={addCollaborator}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>

                <Separator className="bg-[#1E1E2A] my-8" />

                <div className="rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/5 p-4">
                  <h3 className="text-lg font-medium text-[#EF4444] mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Once you delete this repository, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" className="bg-[#EF4444] hover:bg-[#DC2626]">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Repository
                  </Button>
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
