"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Avatar } from "../ui/avatar"
import { Upload, Github, Twitter, Linkedin, MapPin } from "lucide-react"
import { useState } from "react"

export default function ProfileSettingsPage() {
    const [emoji, setEmoji] = useState("👨‍💻")
    const commonEmojis = ["👨‍💻", "👩‍💻", "🚀", "💻", "⚙️", "🔧", "🛠️", "📊", "🧪", "🔍", "🧠", "🤖"]

    return (
        <div className="md:col-span-3">
            <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 bg-[#3B82F6]">
                                <span className="text-lg font-medium">JD</span>
                            </Avatar>
                            <Button variant="outline" className="border-[#1E1E2A] hover:bg-[#1E1E2A]">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Photo
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">First Name</label>
                            <Input defaultValue="John" className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Last Name</label>
                            <Input defaultValue="Doe" className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Email</label>
                        <Input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Username</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E1E2A] bg-[#1A1A24] text-gray-400 text-sm">
                                @
                            </span>
                            <Input
                                defaultValue="johndoe"
                                className="rounded-l-none bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Bio</label>
                        <Textarea
                            defaultValue="Senior Developer at Monogear. Passionate about DevOps, automation, and building scalable systems."
                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Location</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E1E2A] bg-[#1A1A24] text-gray-400 text-sm">
                                <MapPin className="h-4 w-4" />
                            </span>
                            <Input
                                defaultValue="San Francisco, CA"
                                className="rounded-l-none bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Profile Emoji</label>
                        <div className="flex flex-wrap gap-2">
                            {commonEmojis.map((e) => (
                                <button
                                    key={e}
                                    onClick={() => setEmoji(e)}
                                    className={`w-10 h-10 text-xl flex items-center justify-center rounded-md ${emoji === e
                                        ? "bg-[#3B82F6]/20 border border-[#3B82F6]"
                                        : "bg-[#1A1A24] border border-[#1E1E2A]"
                                        }`}
                                >
                                    {e}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-8" />

                    <h2 className="text-xl font-semibold mb-6">Social Links</h2>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">GitHub</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E1E2A] bg-[#1A1A24] text-gray-400 text-sm">
                                    <Github className="h-4 w-4" />
                                </span>
                                <Input
                                    defaultValue="johndoe"
                                    className="rounded-l-none bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Twitter</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E1E2A] bg-[#1A1A24] text-gray-400 text-sm">
                                    <Twitter className="h-4 w-4" />
                                </span>
                                <Input
                                    defaultValue="johndoe"
                                    className="rounded-l-none bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">LinkedIn</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E1E2A] bg-[#1A1A24] text-gray-400 text-sm">
                                    <Linkedin className="h-4 w-4" />
                                </span>
                                <Input
                                    defaultValue="john-doe"
                                    className="rounded-l-none bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
