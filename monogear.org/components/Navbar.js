"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "../lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"

import { InteractiveHoverButton } from '../components/magicui/interactive-hover-button';

import logo from "../public/logo.png"

const components = [
    {
        title: "Git Compatibility",
        href: "https://docs.monogear.org/",
        description:
            "Full backwards compatibility with Git, supporting all your existing workflows and tools.",
    },
    {
        title: "Built-in Code Viewer",
        href: "https://docs.monogear.org/",
        description:
            "Review and navigate your codebase with our powerful integrated code viewer.",
    },
    {
        title: "Built-in Code Viewer",
        href: "https://docs.monogear.org/",
        description:
            "Pre-configured yet fully customizable CI/CD pipelines right out of the box.",
    },
    {
        title: "Access Control",
        href: "https://docs.monogear.org/",
        description: "Per-repository and per-user access controls for maximum security and compliance.",
    },
    {
        title: "Fully Programmable",
        href: "https://docs.monogear.org/",
        description:
            "Extend core functionality with bots, extensions, and custom pipeline components.",
    },
    {
        title: "Dockerized Deployment",
        href: "https://docs.monogear.org/",
        description:
            "Deploy Monogear on your own infrastructure with our ready-to-use Docker containers.",
    },
]

export default function Navbar() {
    return (
        <div className="w-screen px-4 fixed top-5 z-[50]">
            <div className="border shadow-xl shadow-black/5 border-white/[0.08] bg-black/70 backdrop-blur-sm backdrop-saturate-150 rounded-lg py-2 px-2 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 lg:gap-1 min-w-600px w-[75vw] mx-auto">
                <div className='flex gap-2 w-full items-center'>
                    <img src={logo.src} alt="monogear" className="relative z-[2] h-10" draggable="false" />
                    <p className='text-lg lato font-semibold'>monogear</p>
                </div>

                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                {/* <Icons.logo className="h-6 w-6" /> */}
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Monogear
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    The self-hostable, fully programmable mono-repo platform for end-to-end DevOps.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built using Radix UI and Tailwind CSS.
                                    </ListItem>
                                    <ListItem href="/docs/installation" title="Installation">
                                        How to install dependencies and structure your app.
                                    </ListItem>
                                    <ListItem href="/docs/primitives/typography" title="Typography">
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="https://docs.monogear.org/" target="_blank" legacyBehavior passHref>
                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`} >
                                    Documentation
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="w-full flex items-center justify-center md:justify-end gap-10">
                    <a href="/dashboard">
                        <InteractiveHoverButton>Launch Setup</InteractiveHoverButton>
                    </a>
                </div>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"