import React from 'react';
import Nav from '@/components/nav';
import { Sparkles } from '@/components/sparkles';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import logo from "@/public/logo.png"
import { ShimmerButton } from "@/components/magicui/shimmer-button";

 
export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex h-10 items-center justify-center mt-36">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing MonoGear v0.14</span>
          <ArrowRightIcon className="ml-1 w-3 h-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  );
}

function home() {
    return (
        <>
            <div className="w-screen px-4 fixed top-5 z-[5] backdrop-blur-xl backdrop-saturate-150">
                <div className="border shadow-xl shadow-black/5 border-white/[0.08] bg-black/70 backdrop-blur-sm rounded-lg py-2 px-2 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 lg:gap-1 min-w-600px w-[75vw] mx-auto">
                    <div className='flex gap-2 w-full items-center'>
                        <img src={logo.src} alt="NeuroLayer" className="relative z-[2] h-10" draggable="false" />
                        <p className='text-lg lato'>Monogear</p>
                    </div>

                    <Nav />

                    <div className="w-full flex items-center justify-center md:justify-end gap-10">
                        <a href="/app">
                            <InteractiveHoverButton>Launch Setup</InteractiveHoverButton>
                        </a>
                    </div>
                </div>
            </div>
            {/* <Nav /> */}

            {AnimatedShinyTextDemo()}



            <div className='overflow-hidden'>
                <article className="grid gap-4 text-center relative z-10 pt-10">
                   <h1 className='text-6xl font-large leading-[120%] tracking-[-1.04px] text-white'>
                    Setup Monorepo in minutes
                   </h1>
                   <h1 className='text-5xl font-large leading-[50%] text-white'>
                    Scale across every project
                   </h1>
                   <div className="flex justify-center items-center">
                        <h2 className='mt-8 text-center font-md' style={{maxWidth:"50vw"}}>
                                Monogear is a Dockerized, self‑hosted monorepo platform with full Git compatibility, fine‑grained access controls, built‑in code viewing, customizable CI/CD and PR support, and extensibility via bots and plugins.</h2>
                   </div>

                   <div className="flex justify-center items-center mt-10">
                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-xl pr-8 pl-8">Start Setup</button>
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

        </>
    );
}
export default home;
