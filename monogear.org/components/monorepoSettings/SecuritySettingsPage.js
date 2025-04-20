"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { ShieldAlert, KeyIcon, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SecuritySettingsPage() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [sessionTimeout, setSessionTimeout] = useState("30")

    return (


        <div className="md:col-span-3">
            <div className="bg-[#121218] border border-[#1E1E2A] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Account Security</h2>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Change Password</label>
                        <div className="space-y-3">
                            <Input
                                type="password"
                                placeholder="Current password"
                                className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                            />
                            <Input
                                type="password"
                                placeholder="New password"
                                className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                            />
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                            />
                            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">Update Password</Button>
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-6" />

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-medium text-gray-400">Two-Factor Authentication</label>
                        <div className="flex items-center justify-between p-4 border border-[#1E1E2A] rounded-lg bg-[#1A1A24]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#3B82F6]/10 rounded-full">
                                    <ShieldAlert className="h-5 w-5 text-[#3B82F6]" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={twoFactorEnabled}
                                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#1E1E2A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                                </label>
                            </div>
                        </div>

                        {twoFactorEnabled && (
                            <div className="p-4 border border-[#3B82F6]/20 rounded-lg bg-[#3B82F6]/5">
                                <h3 className="font-medium mb-2">Setup Two-Factor Authentication</h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Scan the QR code with your authenticator app or enter the code manually.
                                </p>
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-40 h-40 bg-white p-2 rounded-md">
                                        <div className="w-full h-full bg-[#1A1A24] flex items-center justify-center">
                                            <span className="text-xs text-gray-400">QR Code Placeholder</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 mb-4">
                                    <label className="text-sm font-medium text-gray-400">Manual Entry Code</label>
                                    <Input
                                        value="ABCD-EFGH-IJKL-MNOP"
                                        readOnly
                                        className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6] font-mono text-center"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-400">Verification Code</label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Enter code from authenticator app"
                                            className="bg-[#0A0A0F] border-[#1E1E2A] focus-visible:ring-[#3B82F6]"
                                        />
                                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">Verify</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator className="bg-[#1E1E2A] my-6" />

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-medium text-gray-400">Session Settings</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm">Session Timeout (minutes)</label>
                                <select
                                    value={sessionTimeout}
                                    onChange={(e) => setSessionTimeout(e.target.value)}
                                    className="h-9 rounded-md border border-[#1E1E2A] bg-[#0A0A0F] px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                                >
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="120">2 hours</option>
                                    <option value="240">4 hours</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-6" />

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-medium text-gray-400">API Keys</label>
                        <div className="border border-[#1E1E2A] rounded-lg overflow-hidden">
                            <div className="p-4 bg-[#1A1A24] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <KeyIcon className="h-4 w-4 text-[#3B82F6]" />
                                    <span className="font-medium">Personal Access Tokens</span>
                                </div>
                                <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
                                    Generate New Token
                                </Button>
                            </div>
                            <div className="p-4 text-center text-gray-400 text-sm">
                                No personal access tokens have been created yet.
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-[#1E1E2A] my-6" />

                    <div className="rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/5 p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-[#EF4444] mt-0.5" />
                            <div>
                                <h3 className="text-lg font-medium text-[#EF4444] mb-2">Account Deletion</h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Permanently delete your account and all associated data. This action cannot be undone.
                                </p>
                                <Button variant="destructive" className="bg-[#EF4444] hover:bg-[#DC2626]">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
