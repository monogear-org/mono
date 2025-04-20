"use client"

import { Separator } from "../ui/separator"
import { Bell, Mail, MessageSquare, GitCommitIcon, GitPullRequestIcon } from "lucide-react"
import { useState } from "react"

export default function NotificationsSettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState({
        commits: true,
        pullRequests: true,
        mentions: true,
        deployments: false,
        security: true,
    })

    const [webNotifications, setWebNotifications] = useState({
        commits: true,
        pullRequests: true,
        mentions: true,
        deployments: true,
        security: true,
    })

    const toggleEmailNotification = (key) => {
        setEmailNotifications({
            ...emailNotifications,
            [key]: !emailNotifications[key],
        })
    }

    const toggleWebNotification = (key) => {
        setWebNotifications({
            ...webNotifications,
            [key]: !webNotifications[key],
        })
    }

    return (
        <div className="md:col-span-3">
            <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#3B82F6]" />
                            <h3 className="text-lg font-medium">Email Notifications</h3>
                        </div>

                        <div className="space-y-3 pl-8">
                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <GitCommitIcon className="h-4 w-4 text-gray-400" />
                                    <span>Commits</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications.commits}
                                        onChange={() => toggleEmailNotification("commits")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <GitPullRequestIcon className="h-4 w-4 text-gray-400" />
                                    <span>Pull Requests</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications.pullRequests}
                                        onChange={() => toggleEmailNotification("pullRequests")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-4 w-4 text-gray-400" />
                                    <span>Mentions</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications.mentions}
                                        onChange={() => toggleEmailNotification("mentions")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-gray-400"
                                    >
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                    <span>Deployments</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications.deployments}
                                        onChange={() => toggleEmailNotification("deployments")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-gray-400"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <span>Security Alerts</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications.security}
                                        onChange={() => toggleEmailNotification("security")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-6" />

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-[#3B82F6]" />
                            <h3 className="text-lg font-medium">Web Notifications</h3>
                        </div>

                        <div className="space-y-3 pl-8">
                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <GitCommitIcon className="h-4 w-4 text-gray-400" />
                                    <span>Commits</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={webNotifications.commits}
                                        onChange={() => toggleWebNotification("commits")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <GitPullRequestIcon className="h-4 w-4 text-gray-400" />
                                    <span>Pull Requests</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={webNotifications.pullRequests}
                                        onChange={() => toggleWebNotification("pullRequests")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-4 w-4 text-gray-400" />
                                    <span>Mentions</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={webNotifications.mentions}
                                        onChange={() => toggleWebNotification("mentions")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-gray-400"
                                    >
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                    <span>Deployments</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={webNotifications.deployments}
                                        onChange={() => toggleWebNotification("deployments")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                                <div className="flex items-center gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-gray-400"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <span>Security Alerts</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={webNotifications.security}
                                        onChange={() => toggleWebNotification("security")}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-6" />

                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Notification Schedule</h3>
                        <div className="p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                            <p className="text-sm text-gray-400 mb-4">
                                Configure when you want to receive notifications. You can set quiet hours to avoid disruptions.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-400">Quiet Hours Start</label>
                                    <select className="h-10 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]">
                                        <option value="18">6:00 PM</option>
                                        <option value="19">7:00 PM</option>
                                        <option value="20">8:00 PM</option>
                                        <option value="21">9:00 PM</option>
                                        <option value="22">10:00 PM</option>
                                        <option value="23">11:00 PM</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-400">Quiet Hours End</label>
                                    <select className="h-10 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]">
                                        <option value="6">6:00 AM</option>
                                        <option value="7">7:00 AM</option>
                                        <option value="8">8:00 AM</option>
                                        <option value="9">9:00 AM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
