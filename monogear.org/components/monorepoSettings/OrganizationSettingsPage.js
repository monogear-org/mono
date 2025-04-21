"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Avatar } from "../ui/avatar"
import { Trash2, PlusCircle, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { getHeaders } from "../../lib/fetchHeaders"

export default function OrganizationSettingsPage() {
    var server_url = ""
    try {
        eval("window")
        server_url = localStorage.getItem("currentServer")
        if (server_url == null) {
            window.location = "/auth"
            return
        }
    } catch { }
    function getAllUsers(response) {
        return Object.values(response.data).flat();
    }
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(server_url+"access", {headers:getHeaders()}).then(async (x) => {
            setUsers(getAllUsers((await x.json())))
        })
    }, [])

    const [newUser, setNewUser] = useState({ username: "", password: "", name: "", role: "User" })

    const addUser = () => {
        if (newUser.username && newUser.password && newUser.name) {
            setUsers([
                ...users,
                newUser.username,
            ])
            fetch(server_url+"access", {
                "method":"POST",
                "headers":getHeaders(),
                "body": JSON.stringify({
                    "user":newUser.username,
                    "password":newUser.password,
                    "repo":"base.git"
                })
            })
            setNewUser({ username: "", password: "", name: "", role: "User" })
        }
    }

    return (
        <div className="md:col-span-3">
            <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Organization Profile</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Organization Name</label>
                        <Input
                            defaultValue="Monogear"
                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Organization URL</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E1E2A] bg-[#1A1A24] text-gray-400 text-sm">
                                monogear.io/
                            </span>
                            <Input
                                defaultValue="monogear"
                                className="rounded-l-none bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Description</label>
                        <Textarea
                            defaultValue="A self-hostable, fully programmable mono-repo platform for end-to-end DevOps"
                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Organization Logo</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#3B82F6] rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">M</span>
                            </div>
                            <Button variant="outline" className="border-[#1E1E2A] hover:bg-[#1E1E2A]">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload New Logo
                            </Button>
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-8" />

                    <h2 className="text-xl font-semibold mb-6">Organization Members</h2>

                    <div className="space-y-4">
                        {users.map((user) => (
                            <div
                                key={user}
                                className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 bg-[#3B82F6]">
                                        <span>{user.slice(0, 2)}</span>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{user}</div>
                                        <div className="text-sm text-gray-400">@{user}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${user === "admin" ? "bg-[#3B82F6]/10 text-[#3B82F6]" : "bg-[#1E1E2A] text-gray-400"
                                            }`}
                                    >
                                        {"admin" ? user === "admin" : "user"}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-400 hover:text-[#EF4444] hover:bg-[#EF4444]/10"
                                        id={"remove-"+user}
                                        onClick={(x) => {
                                            var user = x.target.id.split("remove-")[1]
                                            fetch(server_url+"access", {
                                                "method":"DELETE",
                                                "headers":getHeaders(),
                                                "body": JSON.stringify({
                                                    "user":user,
                                                    "repo":"base.git"
                                                })
                                            }).then(async (x) => {
                                                await x.json()
                                                fetch(server_url+"access", {headers:getHeaders()}).then(async (x) => {
                                                    setUsers(getAllUsers((await x.json())))
                                                })
                                            })
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border border-dashed border-[#1E1E2A] rounded-lg bg-[#1A1A24]/50 mt-4">
                        <h3 className="text-lg font-medium mb-4">Add New Member</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400">Username</label>
                                <Input
                                    placeholder="username"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400">Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    className="h-10 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" onClick={addUser}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Member
                        </Button>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-8" />

                    <div className="rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/5 p-4">
                        <h3 className="text-lg font-medium text-[#EF4444] mb-2">Danger Zone</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Once you delete this organization, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive" className="bg-[#EF4444] hover:bg-[#DC2626]">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Organization
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
