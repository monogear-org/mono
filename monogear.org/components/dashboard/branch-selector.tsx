"use client"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { GitBranchIcon, ChevronDown, Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Branch {
    name: string
    isDefault: boolean
}

interface BranchSelectorProps {
    branches: Branch[]
}

export function BranchSelector({ branches }: BranchSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredBranches, setFilteredBranches] = useState(branches)
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

    useEffect(() => {
        if (searchTerm) {
            const filtered = branches.filter((branch) => branch.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredBranches(filtered)
        } else {
            setFilteredBranches(branches)
        }
    }, [searchTerm, branches])

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="outline"
                size="sm"
                className="text-gray-400 border-[#1E1E2A] hover:bg-[#1E1E2A] hover:text-white flex items-center gap-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                <GitBranchIcon className="h-4 w-4 mr-1" />
                master
                <ChevronDown className="h-4 w-4 ml-1" />
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#121218] border border-[#1E1E2A] rounded-md shadow-lg z-10">
                    <div className="p-2 border-b border-[#1E1E2A]">
                        <h3 className="text-sm font-medium text-white mb-2">Switch branches</h3>
                        <Input
                            placeholder="Find a branch..."
                            className="bg-[#0A0A0F] border-[#1E1E2A] text-gray-300 focus-visible:ring-blue-600 h-8 text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto p-1">
                        {filteredBranches.length > 0 ? (
                            filteredBranches.map((branch) => (
                                <div
                                    key={branch.name}
                                    className="flex items-center gap-2 p-2 hover:bg-[#1E1E2A] rounded-md cursor-pointer"
                                    onClick={() => {
                                        // Handle branch selection
                                        setIsOpen(false)
                                    }}
                                >
                                    {branch.name === "main" ? <Check className="h-4 w-4 text-blue-500" /> : <span className="h-4 w-4" />}
                                    <span className="text-sm text-white">{branch.name}</span>
                                    {branch.isDefault && <span className="text-xs text-gray-400 ml-auto">default</span>}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-sm text-gray-400">No branches found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
