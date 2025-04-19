import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles } from '@/components/sparkles';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowRight, Code, DockIcon as Docker, GitBranch, Lock, Settings, Zap, Server, Shield, ChevronRight, Layers, Users, Workflow, Cpu } from "lucide-react"


function home() {
    return (
        <>
            <Navbar />

            <div className="z-[4] flex h-10 items-center justify-center mt-36">
                <div className={cn("group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-white/5 bg-neutral-900 hover:bg-neutral-800")}>
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300 hover:text-neutral-400">
                        <span>✨ Introducing MonoGear v0.14</span>
                        <ArrowRightIcon className="ml-1 w-3 h-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                </div>
            </div>

            <div className='overflow-hidden'>
                <article className="grid gap-4 text-center relative z-[2] pt-10">
                    <h1 className='text-4xl md:text-6xl font-medium leading-[120%] tracking-[-1.04px] text-white'>
                        Setup <p className='inline-block text-[#3273FF]'>Monorepo</p> in minutes
                    </h1>
                    <h1 className='text-4xl md:text-6xl font-medium leading-[50%] text-white'>Scale to every project</h1>
                    <div className="flex justify-center items-center">
                        <h2 className='mt-8 text-center font-md max-w-[75vw] lg:max-w-[50vw]'>Monogear is a Dockerized, self-hosted monorepo platform with full Git compatibility, fine-grained access controls, built-in code viewing, customizable CI/CD and PR support, and extensibility via bots and plugins.</h2>
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        <InteractiveHoverButton className="scale-[1.25] bg-neutral-900 text-white border-white/5">Launch Setup</InteractiveHoverButton>
                    </div>
                </article>
                <div className="relative -mt-32 h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
                    <Sparkles
                        density={800}
                        speed={1.2}
                        size={1.2}
                        direction="top"
                        opacitySpeed={2}
                        color="#32A7FF"
                        className="absolute inset-x-0 bottom-0 h-full w-full "
                    />
                </div>
            </div>

            <section id="features" className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-[#3273FF] text-opacity-80 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#3273FF] bg-opacity-80 mr-2"></span>
                            Core Features
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need in one platform</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Monogear combines powerful features with an intuitive interface, giving you complete control over your
                            development workflow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <GitBranch className="h-6 w-6" />,
                                title: "Git Compatibility",
                                description:
                                    "Full backwards compatibility with Git, supporting all your existing workflows and tools.",
                            },
                            {
                                icon: <Code className="h-6 w-6" />,
                                title: "Built-in Code Viewer",
                                description: "Review and navigate your codebase with our powerful integrated code viewer.",
                            },
                            {
                                icon: <Zap className="h-6 w-6" />,
                                title: "CI/CD Pipelines",
                                description: "Pre-configured yet fully customizable CI/CD pipelines right out of the box.",
                            },
                            {
                                icon: <Lock className="h-6 w-6" />,
                                title: "Access Control",
                                description: "Per-repository and per-user access controls for maximum security and compliance.",
                            },
                            {
                                icon: <Settings className="h-6 w-6" />,
                                title: "Fully Programmable",
                                description: "Extend core functionality with bots, extensions, and custom pipeline components.",
                            },
                            {
                                icon: <Docker className="h-6 w-6" />,
                                title: "Dockerized Deployment",
                                description: "Deploy Monogear on your own infrastructure with our ready-to-use Docker containers.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-blue-600/50 hover:bg-gradient-to-b hover:from-blue-900/10 hover:to-transparent transition-all duration-300 group"
                            >
                                <div className="bg-gradient-to-br bg-[#3273FF] p-3 rounded-lg inline-block mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-[#3273FF] text-opacity-80 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] opacity-30"></div>
                    <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-[#3273FF] text-opacity-80 text-xs font-medium mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#3273FF] bg-opacity-80 mr-2"></span>
                                How It Works
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Streamlined workflow from code to deployment</h2>
                            <p className="text-zinc-400 mb-8">
                                Monogear simplifies your development process with an intuitive workflow that takes your code from
                                repository to production with minimal friction.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        step: "01",
                                        title: "Self-Host Anywhere",
                                        description:
                                            "Deploy Monogear on your own infrastructure using our Docker containers, maintaining complete control over your data and workflows.",
                                    },
                                    {
                                        step: "02",
                                        title: "Configure Your Workspace",
                                        description:
                                            "Set up repositories, access controls, and customize your CI/CD pipelines to match your team's exact requirements.",
                                    },
                                    {
                                        step: "03",
                                        title: "Collaborate Seamlessly",
                                        description:
                                            "Work together with your team using familiar Git workflows, PRs, commits, and built-in code review tools.",
                                    },
                                    {
                                        step: "04",
                                        title: "Deploy with Confidence",
                                        description:
                                            "Push your changes and let Monogear handle the rest, from testing to deployment, with full visibility at every step.",
                                    },
                                ].map((step) => (
                                    <div key={step.step} className="flex gap-4">
                                        <div className="bg-blue-900/20 text-[#3273FF] text-opacity-80 font-bold text-lg h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {step.step}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                            <p className="text-zinc-400">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="ml-2 text-sm text-zinc-400">terminal</div>
                                </div>
                                <div className="font-mono text-sm">
                                    <p className="text-green-500 mb-2">$ monogear init my-project</p>
                                    <p className="text-zinc-400 mb-4">Initializing new Monogear project: my-project</p>

                                    <p className="text-green-500 mb-2">$ monogear pipeline create</p>
                                    <p className="text-zinc-400 mb-1">Creating CI/CD pipeline...</p>
                                    <p className="text-zinc-400 mb-4">Pipeline created successfully!</p>

                                    <p className="text-green-500 mb-2">$ git push monogear main</p>
                                    <p className="text-zinc-400 mb-1">Pushing to Monogear repository...</p>
                                    <p className="text-zinc-400 mb-1">Running pipeline: build → test → deploy</p>
                                    <p className="text-zinc-400 mb-4">
                                        <span className="text-[#3273FF] text-opacity-80">✓</span> Deployment successful!
                                    </p>

                                    <p className="text-green-500 mb-2">$ monogear status</p>
                                    <div className="bg-zinc-800 p-3 rounded-lg">
                                        <p className="text-zinc-300 mb-1">Project: my-project</p>
                                        <p className="text-zinc-300 mb-1">
                                            Status: <span className="text-green-500">Running</span>
                                        </p>
                                        <p className="text-zinc-300 mb-1">Version: 1.0.0</p>
                                        <p className="text-zinc-300">URL: https://my-project.example.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur opacity-50 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="platform" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-[#3273FF] text-opacity-80 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#3273FF] bg-opacity-80 mr-2"></span>
                            Platform
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">One platform, endless possibilities</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Monogear adapts to your workflow, not the other way around. Build, test, and deploy your way with
                            complete flexibility.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                            <div className="p-8">
                                <div className="bg-gradient-to-br bg-[#3273FF] p-3 rounded-lg inline-block mb-4">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Mono-Repository Management</h3>
                                <p className="text-zinc-400 mb-6">
                                    Manage multiple projects in a single repository with advanced code organization, dependency
                                    management, and selective builds.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Centralized code management",
                                        "Cross-project dependency tracking",
                                        "Selective building and testing",
                                        "Unified versioning",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="bg-blue-900/20 text-[#3273FF] text-opacity-80 p-1 rounded-full mt-0.5">
                                                <ChevronRight className="h-3 w-3" />
                                            </div>
                                            <span className="text-zinc-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border-t border-zinc-800 p-6 bg-zinc-900">
                                <Link
                                    href="#"
                                    className="text-[#3273FF] text-opacity-80 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    Learn more about mono-repo management
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                            <div className="p-8">
                                <div className="bg-gradient-to-br bg-[#3273FF] p-3 rounded-lg inline-block mb-4">
                                    <Workflow className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">CI/CD Pipeline Automation</h3>
                                <p className="text-zinc-400 mb-6">
                                    Create powerful, customizable pipelines that automate your build, test, and deployment processes
                                    with precision and reliability.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Visual pipeline editor",
                                        "Conditional execution paths",
                                        "Parallel processing",
                                        "Custom plugin support",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="bg-blue-900/20 text-[#3273FF] text-opacity-80 p-1 rounded-full mt-0.5">
                                                <ChevronRight className="h-3 w-3" />
                                            </div>
                                            <span className="text-zinc-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border-t border-zinc-800 p-6 bg-zinc-900">
                                <Link
                                    href="#"
                                    className="text-[#3273FF] text-opacity-80 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    Explore pipeline capabilities
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="h-6 w-6" />,
                                title: "Team Collaboration",
                                description:
                                    "Built-in tools for code reviews, discussions, and approvals that streamline your team's workflow.",
                            },
                            {
                                icon: <Shield className="h-6 w-6" />,
                                title: "Enterprise Security",
                                description:
                                    "Advanced security features including role-based access control, audit logs, and vulnerability scanning.",
                            },
                            {
                                icon: <Cpu className="h-6 w-6" />,
                                title: "Resource Optimization",
                                description:
                                    "Intelligent resource allocation and caching to maximize performance and minimize costs.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br bg-[#3273FF] p-3 rounded-lg inline-block mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="solutions" className="py-24 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-[#3273FF] text-opacity-80 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#3273FF] bg-opacity-80 mr-2"></span>
                            Solutions
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Tailored for your needs</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Monogear provides specialized solutions for teams of all sizes, from startups to enterprise
                            organizations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden col-span-1 lg:col-span-3 mb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                                <div className="p-8 lg:p-12">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-[#3273FF] text-opacity-80 text-xs font-medium mb-6">
                                        Featured
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Enterprise DevOps</h3>
                                    <p className="text-zinc-400 mb-6">
                                        A complete solution for large organizations with complex requirements, offering advanced security,
                                        compliance features, and scalable infrastructure.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        {[
                                            "Role-based access control",
                                            "Audit logging and compliance reporting",
                                            "High availability deployment",
                                            "24/7 premium support",
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="bg-blue-900/20 text-[#3273FF] text-opacity-80 p-1 rounded-full mt-0.5">
                                                    <ChevronRight className="h-3 w-3" />
                                                </div>
                                                <span className="text-zinc-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="bg-[#3273FF] hover:bg-[#3273FF] hover:backdrop-opacity-50 text-white border-0">
                                        Learn More
                                    </Button>
                                </div>
                                <div className="bg-zinc-950 p-8 lg:p-12 flex items-center justify-center">
                                    <div className="relative w-full max-w-md aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Server className="h-16 w-16 text-[#3273FF] opacity-20" />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Button className="bg-[#3273FF] hover:bg-[#3273FF] text-white">Watch Demo</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-[#3273FF] text-opacity-80 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#3273FF] bg-opacity-80 mr-2"></span>
                            Testimonials
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by developers worldwide</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            See what teams are saying about how Monogear has transformed their development workflow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote:
                                    "Monogear has completely transformed how our team collaborates. The integrated CI/CD pipelines have cut our deployment time in half.",
                                author: "Sarah Chen",
                                role: "CTO, TechInnovate",
                            },
                            {
                                quote:
                                    "The ability to self-host and customize every aspect of our mono-repo has been a game-changer for our security and compliance requirements.",
                                author: "Michael Rodriguez",
                                role: "DevOps Lead, SecureFinance",
                            },
                            {
                                quote:
                                    "We've built custom extensions that automate our entire workflow. Monogear's programmability is unmatched in the market.",
                                author: "Jamie Wilson",
                                role: "Engineering Manager, CodeCraft",
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
                                <div className="mb-6 text-[#3273FF]">
                                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                <p className="text-zinc-300 mb-6">{testimonial.quote}</p>
                                <div>
                                    <p className="font-bold">{testimonial.author}</p>
                                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to simplify your DevOps?</h2>
                        <p className="text-zinc-400 mb-10 text-lg">
                            Start using Monogear today and experience the power of a fully programmable, self-hostable mono-repo
                            platform.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" className="bg-gradient-to-r bg-[#3273FF] hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8">Get Started Free</Button>
                            <Button variant="outline" size="lg" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                <Link href={"https://cal.com/atharv777/quick"} target='_blank'>Schedule a Demo</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
export default home;
