import React from 'react';
import Earth from '@/components/globe';
import Nav from '@/components/nav';
import { Sparkles } from '@/components/sparkles';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

import logo from "@/public/logo.png"

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

            <div class="absolute top-0 left-0 w-screen h-screen overflow-visible grid-my [transform:_translateY(25%)]">
                <div class="grid-lines-my [transform-origin:_center_center] [transform:_scale(-1,-1)_translateY(33.3%)] h-[150%]"></div>
                <div class="grid-lines-my [transform:_rotateX(70deg)_translateY(0px)_translateX(5px)]"></div>
            </div>

            <div class="absolute pointer-events-none inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,white,transparent_27%)] opacity-[25%] blur-[100px] z-[1] h-screen w-screen"></div>

            <div class="absolute h-[calc(100vh-72px)] flex justify-center items-center flex-col gap-10 w-4/5 mx-auto z-[100]">
                <p class="text-center text-7xl font-medium leading-[120%] tracking-[-1.08px] text-white">The Future of <span class="omega">AI</span> on Distributed Computing powered by <span class="omega">ZK Proofs</span></p>
                <div class="flex">


                </div>
            </div>

            <div className='overflow-hidden mt-72'>
                <article className="grid gap-4 text-center relative z-10 pt-10">
                    <Earth />
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
