"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { PlusIcon, SearchIcon, FilterIcon, MoreHorizontalIcon, GitBranchIcon, ClockIcon } from "lucide-react"
import logo from "../../public/logo.png"
import { getHeaders } from "../../lib/fetchHeaders"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as muiButton } from '@mui/material';

function timeAgo(unixTime) {
    const now = Date.now();
    let t = Number(unixTime);
    if (t < 1e12) t *= 1000;
    let diff = now - t;
    if (diff < 0) diff = 0;
    const MINUTE = 60 * 1000;
    const HOUR   = 60 * MINUTE;
    const DAY    = 24 * HOUR;
    const MONTH  = 30 * DAY;
    const YEAR   = 365 * DAY;
    if (diff < MINUTE)           return 'just now';
    if (diff < HOUR)             return Math.floor(diff / MINUTE) + 'm ago';
    if (diff < DAY)              return Math.floor(diff / HOUR)   + 'h ago';
    if (diff < MONTH)            return Math.floor(diff / DAY)    + 'd ago';
    if (diff < YEAR)             return Math.floor(diff / MONTH)  + 'mo ago';
    return Math.floor(diff / YEAR) + 'y ago';
}

// {
//     id: 6,
//     name: "Documentation",
//     owner: "monogear",
//     repo: "docs",
//     description: "Official documentation and guides",
//     branch: "main",
//     lastUpdated: "Updated 2d ago",
//     icon: "D",
// }

export default function Dashboard() {
    var server_url = ""
    try {
        eval("window")
        server_url = localStorage.getItem("currentServer")
        if (server_url == null) {
            window.location = "/auth"
            return
        }
    } catch { }

    const [repos, setRepos] = useState([])

    useEffect(() => {
        fetch(server_url+"repos_data", {
            headers: getHeaders()
        }).then(async (x) => {
            setRepos(await x.json())
        })
    }, [])

    const [searchTerm, setSearchTerm] = useState("")
    const [open, setOpen] = useState(false);

    const filteredRepos = repos.filter((repo) => {
        if (!searchTerm.trim()) {
            return true;
        }
        const searchLower = searchTerm.toLowerCase()
        return (
            repo.name.toLowerCase().includes(searchLower) ||
            repo.owner.toLowerCase().includes(searchLower) ||
            repo.repo.toLowerCase().includes(searchLower) ||
            repo.description.toLowerCase().includes(searchLower)
        )
    })

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
                                <Link href="/dashboard" className="text-white hover:text-blue-400 text-sm font-medium">
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

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Repos</h1>
                        <Button className="bg-[#3273FF] hover:bg-[#3273FF]/70 text-white" onClick={() => {
                            setOpen(true)
                        }}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            New Repo
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search repos..."
                                className="pl-10 bg-[#121218] border-[#1E1E2A] text-gray-300 focus-visible:ring-blue-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredRepos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 bg-[#1E1E2A] rounded-full flex items-center justify-center mb-4">
                                <SearchIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No repos found</h3>
                            <p className="text-gray-400 max-w-md">
                                We couldn't find any repos matching "{searchTerm}". Try adjusting your search term or create a new
                                repo.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredRepos.map((repo) => (
                                <RepoCard key={repo.id} repo={repo} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div style={{backgroundColor: "rgb(10 10 15 / var(--tw-bg-opacity, 1))", color:"white", paddingLeft: "40px", paddingRight: "40px", padding: "20px"}}>
                    <h1 className="text-2xl pb-4" style={{textAlign: "center"}}>Repository Name</h1>
                    <input style={{border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "5px"}} id="reponame"></input>
                    <br></br>
                    <div className="flex justify-center items-center">
                        <Button className="bg-[#3273FF] hover:bg-[#3273FF]/70 text-white mt-5 pl-7 pr-7" onClick={() => {
                            fetch(server_url+"repo/new/"+document.getElementById("reponame").value, {headers: getHeaders()}).then((x) => {
                                window.location = window.location.href
                            })
                        }}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

function RepoCard({ repo }) {
    return (
        <Link href={`/dashboard/${repo.id}`} className="block h-full">
            <div className="h-full border border-[#1E1E2A] rounded-lg p-4 bg-[#121218] hover:border-blue-600/50 transition-colors group flex flex-col gap-4">
                <div className="flex flex-col gap-4 justify-between">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-[#1E1E2A] flex items-center justify-center text-blue-500">
                                {repo.icon}
                            </div>
                            <div>
                                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                                <p className="text-xs text-gray-400">
                                    {repo.owner}/{repo.repo}
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1E1E2A]">
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="text-xs text-gray-400">{repo.description}</div>
                </div>

                <div className="flex items-center justify-between text-xs flex-1">
                    <div className="flex items-center gap-1 text-gray-400">
                        <GitBranchIcon className="h-3 w-3" />
                        <span>{repo.latestBranch}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                        <ClockIcon className="h-3 w-3" />
                        <span>{timeAgo(repo.lastUpdated)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}