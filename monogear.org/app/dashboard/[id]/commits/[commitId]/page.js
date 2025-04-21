"use client"

import { Button } from "../../../../../components/ui/button"
import { Textarea } from "../../../../../components/ui/textarea"
import { Avatar } from "../../../../../components/ui/avatar"
import { Separator } from "../../../../../components/ui/separator"
import { GitCommitIcon, ChevronRightIcon, CheckIcon, XIcon, MessageSquareIcon, RocketIcon, BeakerIcon, ClockIcon, UserIcon, GitBranchIcon, FileIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import logo from "../../../../../public/logo.png"
import { getHeaders } from "../../../../../lib/fetchHeaders"

export default function CommitConversationPage({ params }) {
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
    const [comment, setComment] = useState("")
    var selectedBranch = "master"
    const [comments, setComments] = useState([])

    useEffect(() => {
                async function loadAll() {
                    const base = server_url + "repo/" + params.id + "/" + selectedBranch + "/"
                    const [
                    commitsRes,
                    fileTreeRes,
                    repoDataRes,
                    branchesRes,
                    commentsRes
                    ] = await Promise.all([
                    fetch(base + "commits",   { headers: getHeaders() }),
                    fetch(base + "file_tree", { headers: getHeaders() }),
                    fetch(server_url + "repo_data?name=" + params.id, { headers: getHeaders() }),
                    fetch(server_url + "repo/" + params.id + "/" + "branches",  { headers: getHeaders() }),
                    fetch(server_url + "get_comments?commit="+params.commitId, {headers: getHeaders()})
                    ])
        
                    const commitsJson   = await commitsRes.json()
                    const fileTreeJson  = await fileTreeRes.json()
                    const repoDataJson  = await repoDataRes.json()
                    const branchesJson  = await branchesRes.json()
                    const commentsJson  = await commentsRes.json()

                    setComments(commentsJson)
        
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
    
    const commit = project.commits.find((c) => c.id === params.commitId)

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
                <div className="flex items-center gap-2 mb-4">
                    <Link href={`/dashboard/${project.id}`} className="text-gray-400 hover:text-blue-400">
                        {project.owner}/{project.repo}
                    </Link>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    <Link href={`/dashboard/${project.id}/commits`} className="text-gray-400 hover:text-blue-400">
                        Commits
                    </Link>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{commit.id.substring(0, 7)}</span>
                </div>

                <div className="border border-[#1E1E2A] rounded-md bg-[#121218] mb-6 overflow-hidden">
                    <div className="p-6 border-b border-[#1E1E2A] bg-[#0F0F17]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#3273FF] flex items-center justify-center">
                                <span className="text-sm font-medium">{commit.author.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{commit.message}</h1>
                                <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-1">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <UserIcon className="h-4 w-4 mr-1" />
                                        <span>{commit.author}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <ClockIcon className="h-4 w-4 mr-1" />
                                        <span>committed {commit.date}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <GitBranchIcon className="h-4 w-4 mr-1" />
                                        <span>main</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <GitCommitIcon className="h-4 w-4 mr-1" />
                                        <span className="font-mono">{commit.id}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        {commit.status === "success" ? (
                                            <span className="flex items-center text-green-500">
                                                <CheckIcon className="h-4 w-4 mr-1" />
                                                Success
                                            </span>
                                        ) : commit.status === "failed" ? (
                                            <span className="flex items-center text-red-500">
                                                <XIcon className="h-4 w-4 mr-1" />
                                                Failed
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-yellow-500">
                                                <div className="h-4 w-4 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin mr-1" />
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <div className="flex items-center px-3 py-1.5 bg-[#1A1A24] rounded-md text-sm">
                                <FileIcon className="h-4 w-4 mr-2 text-blue-400" />
                                <span>Few files changed</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex items-center mb-4">
                            <MessageSquareIcon className="h-5 w-5 mr-2 text-blue-400" />
                            <h2 className="text-lg font-medium">Conversation</h2>
                        </div>

                        <Separator className="bg-[#1E1E2A] mb-4" />

                        <div className="space-y-6">
                            {comments.map((x) => {
                                return (
                                    <>
                                    <div className="flex gap-4">
                                        <Avatar className="h-10 w-10 rounded-full bg-[#3273FF] flex-shrink-0">
                                            <span className="text-sm font-medium">{x.name.slice(0,2)}</span>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="bg-[#1A1A24] rounded-lg p-4 mb-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">{x.name}</span>
                                                    <span className="text-xs text-gray-400">{x.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-300">
                                                    {x.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                            })}

                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10 rounded-full bg-[#3273FF] flex-shrink-0">
                                    <span className="text-sm font-medium">{
                                        (()=>{
                                            var details = JSON.parse(localStorage.getItem(localStorage.getItem("currentServer")))
                                            return details.username.slice(0, 2)
                                        })()}</span>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="bg-[#1A1A24] rounded-lg p-4">
                                        <Textarea
                                            placeholder="Leave a comment..."
                                            className="bg-[#0A0A0F] border-[#1E1E2A] text-gray-300 focus-visible:ring-blue-600 min-h-24 mb-3"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                className="text-gray-400 border-[#1E1E2A] hover:bg-[#1E1E2A] hover:text-white"
                                            >
                                                Cancel
                                            </Button>
                                            <Button className="bg-[#3273FF] hover:bg-[#3273FF]/70 text-white" onClick={() => {
                                                fetch(server_url+"comment?commit="+params.commitId+"&message="+encodeURIComponent(comment), {headers: getHeaders()}).then(async (x) => {
                                                    await x.json()
                                                    fetch(server_url + "get_comments?commit="+params.commitId, {headers: getHeaders()}).then(async (x) => {
                                                        setComments(await x.json())
                                                        setComment("")
                                                    })
                                                })
                                            }}>Comment</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {commit.status == "success" ? 
                <div className="flex justify-end gap-4">
                    <Button size="lg" className="bg-[#3273FF] hover:bg-[#3273FF]/70 text-white" onClick={() => {
                        fetch(server_url+"prod?commit="+params.commitId, {headers: getHeaders()})
                    }}>
                        <RocketIcon className="mr-2 h-5 w-5" />
                        Push to Production
                    </Button>
                </div> : ""
                }
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
