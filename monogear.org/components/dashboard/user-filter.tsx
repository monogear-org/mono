"use client"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { UserIcon, ChevronDown, Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface UserFilterProps {
    onFilterChange: (username: string | null) => void
}

export function UserFilter({ onFilterChange }: UserFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [activeFilter, setActiveFilter] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const applyFilter = () => {
        if (username.trim()) {
            setActiveFilter(username.trim())
            onFilterChange(username.trim())
        }
        setIsOpen(false)
    }

    const clearFilter = () => {
        setUsername("")
        setActiveFilter(null)
        onFilterChange(null)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="outline"
                size="sm"
                className="text-gray-400 border-[#1E1E2A] hover:bg-[#1E1E2A] hover:text-white flex items-center gap-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                <UserIcon className="h-4 w-4 mr-1" />
                {activeFilter ? (
                    <>
                        <span className="text-blue-400">{activeFilter}</span>
                        <X
                            className="h-4 w-4 ml-1 hover:text-red-400"
                            onClick={(e) => {
                                e.stopPropagation()
                                clearFilter()
                            }}
                        />
                    </>
                ) : (
                    <>
                        All users
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                )}
            </Button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-[#121218] border border-[#1E1E2A] rounded-md shadow-lg z-10">
                    <div className="p-3 border-b border-[#1E1E2A]">
                        <h3 className="text-sm font-medium text-white mb-2">Filter by username</h3>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Enter username..."
                                className="bg-[#0A0A0F] border-[#1E1E2A] text-gray-300 focus-visible:ring-blue-600 h-8 text-xs pl-8"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        applyFilter()
                                    }
                                }}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="p-2 flex justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white hover:bg-[#1E1E2A] text-xs"
                            onClick={clearFilter}
                        >
                            Clear filter
                        </Button>
                        <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs" onClick={applyFilter}>
                            Apply filter
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
