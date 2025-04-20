"use client"

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { FileTree } from "../../../components/dashboard/file-tree"
import { ProjectHeader } from "../../../components/dashboard/project-header"
import { BranchSelector } from "../../../components/dashboard/branch-selector"
import { Code, GitPullRequestIcon, AlertCircle, Play, Database, BarChart3, Shield, Search, GitCommitIcon } from "lucide-react"
import Link from "next/link"
import logo from "../../../public/logo.png"
import { useEffect, useState } from "react"
import { getHeaders } from "../../../lib/fetchHeaders"

export default function ProjectPage({params}) {
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
    const [requestsCompleted, setRequestsCompleted] = useState(0)
    const [currentBranch, setCurrentBranch] = useState("master")
    useEffect(() => {
        async function loadAll() {
            const base = server_url + "repo/" + params.id + "/" + currentBranch + "/"
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
    }, [currentBranch, params.id])


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

            <ProjectHeader project={project} />

            <main className="container mx-auto px-4 py-4">
                <Tabs defaultValue="code" className="w-full">
                    <TabsList className="bg-transparent border-b border-[#1E1E2A] w-full justify-start rounded-none h-auto p-0 mb-4">
                        <TabsTrigger
                            value="code"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <Code className="mr-2 h-4 w-4" />
                            Code
                        </TabsTrigger>
                        <TabsTrigger
                            value="issues"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Issues
                        </TabsTrigger>
                        <TabsTrigger
                            value="pull-requests"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <GitPullRequestIcon className="mr-2 h-4 w-4" />
                            Pull Requests
                        </TabsTrigger>
                        <TabsTrigger
                            value="actions"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <Play className="mr-2 h-4 w-4" />
                            Actions
                        </TabsTrigger>
                        <TabsTrigger
                            value="projects"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <Database className="mr-2 h-4 w-4" />
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="insights"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Insights
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
                        >
                            <Shield className="mr-2 h-4 w-4" />
                            Security
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="code" className="mt-0">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <BranchSelector branches={project.branches} />

                                    <Link href={`/dashboard/${project.id}/commits`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-gray-400 border-[#1E1E2A] hover:bg-[#1E1E2A] hover:text-white flex items-center gap-1"
                                        >
                                            <GitCommitIcon className="h-4 w-4 mr-1" />
                                            {project.commits.length} commits
                                        </Button>
                                    </Link>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="relative w-64">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Go to file"
                                            className="pl-10 bg-[#121218] border-[#1E1E2A] text-gray-300 focus-visible:ring-blue-600 h-9"
                                        />
                                    </div>

                                    <Button variant="default" size="sm" className="bg-[#3273FF] hover:bg-[#3273FF]/70 text-white">
                                        <Code className="mr-2 h-4 w-4" />
                                        Code
                                    </Button>
                                </div>
                            </div>

                            <div className="border border-[#1E1E2A] rounded-md bg-[#121218]">
                                <FileTree files={project.files} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="issues">
                        <div className="flex items-center justify-center h-64 border border-[#1E1E2A] rounded-md bg-[#121218]">
                            <p className="text-gray-400">No issues found</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="pull-requests">
                        <div className="flex items-center justify-center h-64 border border-[#1E1E2A] rounded-md bg-[#121218]">
                            <p className="text-gray-400">No pull requests found</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="actions">
                        <div className="flex items-center justify-center h-64 border border-[#1E1E2A] rounded-md bg-[#121218]">
                            <p className="text-gray-400">No actions configured</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects">
                        <div className="flex items-center justify-center h-64 border border-[#1E1E2A] rounded-md bg-[#121218]">
                            <p className="text-gray-400">No projects found</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="insights">
                        <div className="flex items-center justify-center h-64 border border-[#1E1E2A] rounded-md bg-[#121218]">
                            <p className="text-gray-400">No insights available</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="security">
                        <div className="flex items-center justify-center h-64 border border-[#1E1E2A] rounded-md bg-[#121218]">
                            <p className="text-gray-400">No security issues found</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}