"use client"

import * as React from "react"
import {
    ChevronDown,
    ChevronRight,
    FileIcon,
    FolderIcon,
    FolderOpenIcon,
    FileTextIcon,
    FileJsonIcon,
    FileCodeIcon,
} from "lucide-react"
import { cn } from "../../lib/utils"

interface File {
    id: string
    name: string
    type: "file" | "directory"
    children?: File[]
}

interface FileTreeProps {
    files: File[]
}

export function FileTree({ files }: FileTreeProps) {
    return (
        <div className="p-2">
            {files.map((file) => (
                <FileTreeNode key={file.id} file={file} level={0} />
            ))}
        </div>
    )
}

interface FileTreeNodeProps {
    file: File
    level: number
}

function FileTreeNode({ file, level }: FileTreeNodeProps) {
    const [isOpen, setIsOpen] = React.useState(level === 0)

    const handleToggle = () => {
        if (file.type === "directory") {
            setIsOpen(!isOpen)
        }
    }

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase()

        switch (extension) {
            case "md":
                return <FileTextIcon className="h-4 w-4 text-gray-400" />
            case "json":
                return <FileJsonIcon className="h-4 w-4 text-gray-400" />
            case "js":
            case "jsx":
            case "ts":
            case "tsx":
                return <FileCodeIcon className="h-4 w-4 text-blue-400" />
            default:
                return <FileIcon className="h-4 w-4 text-gray-400" />
        }
    }

    return (
        <div>
            <div
                className={cn(
                    "flex items-center py-1 px-2 rounded-md hover:bg-[#1E1E2A] cursor-pointer",
                    file.type === "file" ? "text-gray-300" : "text-white",
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={handleToggle}
            >
                {file.type === "directory" ? (
                    <>
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4 text-gray-400 mr-1" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        {isOpen ? (
                            <FolderOpenIcon className="h-4 w-4 text-blue-400 mr-2" />
                        ) : (
                            <FolderIcon className="h-4 w-4 text-blue-400 mr-2" />
                        )}
                    </>
                ) : (
                    <span className="ml-5 mr-2">{getFileIcon(file.name)}</span>
                )}
                <span className="text-sm">{file.name}</span>
            </div>

            {isOpen && file.type === "directory" && file.children && (
                <div>
                    {file.children.map((child) => (
                        <FileTreeNode key={child.id} file={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}
