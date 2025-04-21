"use client"

import { Button } from "../../../../components/ui/button"
import { BranchSelector } from "../../../../components/dashboard/branch-selector"
import { GitBranchIcon, CheckIcon, XIcon, ClipboardIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { UserFilter } from "../../../../components/dashboard/user-filter"
import logo from "../../../../public/logo.png"
import { getHeaders } from "../../../../lib/fetchHeaders"

export default function CommitsPage({ params }) {
    var server_url = ""
    try {
        eval("window")
        server_url = localStorage.getItem("currentServer")
        if (server_url == null) {
            window.location = "/auth"
            return
        }
    } catch {}
    const [project, setProject] = useState({})
    const [selectedBranch, setSelectedBranch] = useState("master")
    const [selectedUser, setSelectedUser] = useState("All users")

    useEffect(() => {
            async function loadAll() {
                const base = server_url + "repo/" + params.id + "/" + selectedBranch + "/"
                const [
                commitsRes,
                fileTreeRes,
                repoDataRes,
                branchesRes
                ] = await Promise.all([
                fetch(base + "commits",   { headers: getHeaders() }),
                fetch(base + "file_tree", { headers: getHeaders() }),
                fetch(server_url + "repo_data?name=" + params.id, { headers: getHeaders() }),
                fetch(server_url + "repo/" + params.id + "/" + "branches",  { headers: getHeaders() })
                ])
    
                const commitsJson   = await commitsRes.json()
                const fileTreeJson  = await fileTreeRes.json()
                const repoDataJson  = await repoDataRes.json()
                const branchesJson  = await branchesRes.json()
    
                setProject({
                commits:  commitsJson.data,
                files:    fileTreeJson.files,    // or fileTreeJson.data.files if that’s the real shape
                ...repoDataJson,
                branches: branchesJson.data
                })
            }
    
            loadAll()
        }, [selectedBranch, params.id])
    
    
        if (JSON.stringify(project) == "{}") {
            return
        }
        console.log(project)

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <header className="border-b border-[#1E1E2A] sticky top-0 z-10 bg-[#0A0A0F]">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <div className='flex gap-2 w-full items-center'>
                                    <img src={logo.src} alt="monogear" className="relative z-[2] h-10" draggable="false" />
                                    <p className='text-lg lato font-semibold'>monogear</p>
                                </div>
                            </Link>

                            <nav className="hidden md:flex items-center space-x-6">
                                <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 text-sm font-medium">
                                    Dashboard
                                </Link>
                                <Link href="/settings" className="text-gray-400 hover:text-blue-400 text-sm font-medium">
                                    Settings
                                </Link>
                            </nav>
                        </div>

                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-2 mb-6">
                    <Link href={`/dashboard/${project.id}`} className="text-gray-400 hover:text-blue-400">
                        {project.owner}/{project.repo}
                    </Link>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-white">Commits</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">Commits</h1>

                <div className="flex items-center justify-between mb-6">
                    <BranchSelector branches={project.branches} />

                    <div className="relative">
                        <UserFilter
                            onFilterChange={(username) => {
                                setSelectedUser(username || "All users")
                            }}
                        />
                    </div>
                </div>

                <div className="border border-[#1E1E2A] rounded-md bg-[#121218] divide-y divide-[#1E1E2A]">
                    <div className="p-3 text-sm text-gray-400">
                        <GitBranchIcon className="inline-block h-4 w-4 mr-2" />
                        Commits on Apr 20, 2025
                    </div>

                    {project.commits
                        .filter(
                            (commit) => selectedUser === "All users" || commit.author.toLowerCase() === selectedUser.toLowerCase(),
                        )
                        .map((commit) => (
                            <div key={commit.id} className="p-4 hover:bg-[#1A1A24]">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Link
                                            href={`/dashboard/${project.id}/commits/${commit.id}`}
                                            className="text-white hover:text-blue-400 font-medium block mb-1"
                                        >
                                            {commit.message}
                                        </Link>
                                        <div className="flex items-center text-sm text-gray-400">
                                            <span className="mr-2">{commit.author}</span>
                                            <span>committed {commit.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1E1E2A]"
                                            title="Copy commit ID"
                                        >
                                            <ClipboardIcon className="h-4 w-4" />
                                        </Button>
                                        <div className="flex items-center gap-1">
                                            {commit.status === "success" ? (
                                                <CheckIcon className="h-4 w-4 text-green-500" />
                                            ) : commit.status === "failed" ? (
                                                <XIcon className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <div className="h-4 w-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
                                            )}
                                            <span className="text-sm font-mono text-gray-400">{commit.id}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1E1E2A]"
                                            title="View commit"
                                        >
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </main>
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
        commits: [
            {
                id: "f74ad8a",
                message: "added admin only access to apache reload",
                author: "aludayalu",
                date: "1 hour ago",
                status: "failed",
            },
            {
                id: "c8fee6f",
                message: "adding auth flow and onboarding",
                author: "Atharv777",
                date: "1 hour ago",
                status: "failed",
            },
            {
                id: "f819106",
                message: "moved all state to the db added auth to endpoints with a default user admin",
                author: "aludayalu",
                date: "1 hour ago",
                status: "success",
            },
            {
                id: "4d0ca73",
                message: "monogear published to npm",
                author: "aludayalu",
                date: "11 hours ago",
                status: "success",
            },
            {
                id: "14d5b7b",
                message: "fixed the setup command",
                author: "aludayalu",
                date: "11 hours ago",
                status: "success",
            },
            {
                id: "14ab76f",
                message: "basic cli done",
                author: "aludayalu",
                date: "11 hours ago",
                status: "success",
            },
            {
                id: "9b8ceff",
                message: "hi",
                author: "aludayalu",
                date: "11 hours ago",
                status: "pending",
            },
        ],
    },
]
