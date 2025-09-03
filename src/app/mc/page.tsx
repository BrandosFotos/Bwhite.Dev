'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { VersionsSection } from './components/VersionsSection';
import { motion } from 'framer-motion';

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

type ActiveTab = 'server' | 'whitelist' | 'gallery' | 'mods';

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className='rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a]'>
            <button
                type='button'
                onClick={() => setOpen((v) => !v)}
                className='flex w-full items-center justify-between px-4 py-3'>
                <span className='text-left text-lg font-semibold text-[#ffffff]'>{title}</span>
                <span className='text-[#aaaaaa]'>{open ? '−' : '+'}</span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className='overflow-hidden border-t-2 border-[#4a4a4a]'>
                <div className='p-4'>{children}</div>
            </motion.div>
        </div>
    );
}

export default function MinecraftPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        discord: '',
        reason: '',
        experience: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [versions, setVersions] = useState<Version[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTab>('server');

    useEffect(() => {
        fetch('/api/uploads')
            .then((res) => res.json())
            .then((data) => setVersions(data))
            .catch((error) => console.error('Error fetching versions:', error));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/minecraft/whitelist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setStatus('success');
            setFormData({
                username: '',
                email: '',
                discord: '',
                reason: '',
                experience: ''
            });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='min-h-screen bg-[#1a1a1a]'>
            <motion.div
                className='container mx-auto px-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <motion.h1
                    className='mb-2 text-5xl font-extrabold tracking-wider text-[#55ff55] drop-shadow-[0_0_5px_#56ff55]'
                    initial={{ opacity: 0, x: -200 }} // start off to the left
                    animate={{ opacity: 1, x: 0 }} // fade in + slide into place
                    transition={{ duration: 1, ease: 'easeOut' }}
                    whileHover={{
                        scale: 1.1,
                        textShadow: '0px 0px 10px #55ff55, 0px 0px 40px #33cc33'
                    }}>
                    Minecraft Server
                </motion.h1>

                <p className='mb-8 text-lg text-[#ffffff]'>Welcome!</p>

                {/* Tabs */}
                <div className='mb-6 flex w-full items-center gap-2 overflow-x-auto rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-1'>
                    {(
                        [
                            { key: 'server', label: 'Server' },
                            { key: 'whitelist', label: 'Whitelist' },
                            { key: 'gallery', label: 'Gallery' },
                            { key: 'mods', label: 'Mods' }
                        ] as { key: ActiveTab; label: string }[]
                    ).map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={
                                    'rounded-md px-4 py-2 text-sm font-semibold transition-colors ' +
                                    (isActive ? 'bg-[#55ff55] text-[#1a1a1a]' : 'text-[#ffffff] hover:bg-[#1a1a1a]')
                                }>
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Panels */}
                {activeTab === 'server' && (
                    <div className='space-y-4'>
                        <AccordionItem title='Connection Details'>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <div>
                                    <h3 className='mb-2 font-semibold text-[#55ff55]'>Server Address</h3>
                                    <p className='rounded bg-[#1a1a1a] p-2 font-mono text-[#ffffff]'>mc.bwhite.dev</p>
                                </div>
                                <div>
                                    <h3 className='mb-2 font-semibold text-[#55ff55]'>About the Modpack</h3>
                                    <ul className='list-disc space-y-2 pl-5 text-[#dddddd]'>
                                        <li>
                                            <span className='font-semibold text-[#ffffff]'>Age range:</span> Designed
                                            for ages 6–10 with safe, supervised multiplayer.
                                        </li>
                                        <li>
                                            <span className='font-semibold text-[#ffffff]'>Learn through play:</span>
                                            Explore engineering with <span className='text-[#55ff55]'>Create</span> and
                                            its add-ons by building machines and solving mechanical puzzles.
                                        </li>
                                        <li>
                                            <span className='font-semibold text-[#ffffff]'>Plan and grow:</span> Develop
                                            sustainability with{' '}
                                            <span className='text-[#55ff55]'>Mystical Agriculture </span>
                                            and <span className='text-[#55ff55]'>Dynamic Trees</span>.
                                        </li>
                                        <li>
                                            <span className='font-semibold text-[#ffffff]'>
                                                Be creative & organized:{' '}
                                            </span>
                                            Use <span className='text-[#55ff55]'>Effortless Building</span> and
                                            <span className='text-[#55ff55]'> Sophisticated Backpacks</span> to build
                                            and manage resources.
                                        </li>
                                        <li>
                                            <span className='font-semibold text-[#ffffff]'>Collaborate:</span>{' '}
                                            Communicate and work as a team with{' '}
                                            <span className='text-[#55ff55]'>Simple Voice Chat </span>
                                            and <span className='text-[#55ff55]'>What Are They Up To</span>.
                                        </li>
                                    </ul>
                                    <p className='mt-3 text-sm text-[#aaaaaa]'>
                                        A fun blend of imagination, problem-solving, and cooperation that encourages
                                        curiosity and hands-on experimentation.
                                    </p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem title='Modpack Versions'>
                            <VersionsSection versions={versions} />
                        </AccordionItem>

                        <AccordionItem title='How to Install the Modpack (CurseForge)'>
                            <ol className='list-decimal space-y-3 pl-6 text-[#dddddd]'>
                                <li>
                                    <div className='font-semibold text-[#ffffff]'>Download the Modpack</div>
                                    <div>Click the Download button above to get the latest .zip file.</div>
                                </li>
                                <li>
                                    <div className='font-semibold text-[#ffffff]'>Open the CurseForge App</div>
                                    <div>If you need it, download the app from the official site. </div>
                                </li>
                                <li>
                                    <div className='font-semibold text-[#ffffff]'>Go to Minecraft Modpacks</div>
                                    <div>Choose Minecraft in the sidebar, then open "My Modpacks".</div>
                                </li>
                                <li>
                                    <div className='font-semibold text-[#ffffff]'>Import the Modpack</div>
                                    <div>
                                        Click "Create Custom Profile" → "Import" (top right) and select the .zip you
                                        downloaded.
                                    </div>
                                </li>
                                <li>
                                    <div className='font-semibold text-[#ffffff]'>Play</div>
                                    <div>Once imported, launch it from your list to play with all mods installed.</div>
                                </li>
                            </ol>
                            <div className='mt-4 flex flex-wrap items-center gap-3'>
                                <a
                                    href='https://www.curseforge.com/download/app'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='rounded-md bg-[#55ff55] px-4 py-2 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#44dd44]'>
                                    Get CurseForge App
                                </a>
                                <p className='text-sm text-[#aaaaaa]'>If you run into issues, reach out for help.</p>
                            </div>
                        </AccordionItem>
                    </div>
                )}

                {activeTab === 'whitelist' && (
                    <motion.div
                        className='rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}>
                        <h2 className='mb-6 text-2xl font-semibold text-[#ffffff]'>Whitelist Application</h2>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor='username' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Minecraft Username *
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Your Minecraft username'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Your email address'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='discord' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Discord Username
                                </label>
                                <input
                                    type='text'
                                    id='discord'
                                    name='discord'
                                    value={formData.discord}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Your Discord username'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='reason' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Why do you want to join? *
                                </label>
                                <textarea
                                    id='reason'
                                    name='reason'
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Tell us why you want to join our community'
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='experience' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Minecraft Experience
                                </label>
                                <textarea
                                    id='experience'
                                    name='experience'
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border-2 border-[#4a4a4a] bg-[#1a1a1a] p-2 text-[#ffffff] placeholder-[#666666] focus:border-[#55ff55] focus:outline-none'
                                    placeholder='Tell us about your Minecraft experience'
                                    rows={3}
                                    required
                                />
                            </div>
                            {status === 'error' && (
                                <div className='rounded-lg bg-[#ff5555]/20 p-3 text-[#ffaaaa]'>{errorMessage}</div>
                            )}
                            {status === 'success' && (
                                <div className='rounded-lg bg-[#55ff55]/20 p-3 text-[#aaffaa]'>
                                    Application submitted successfully! We'll review it soon.
                                </div>
                            )}
                            <button
                                type='submit'
                                disabled={status === 'loading'}
                                className='w-full rounded-lg bg-[#55ff55] px-8 py-3 font-bold text-[#1a1a1a] transition-colors hover:bg-[#44dd44] disabled:bg-[#4a4a4a] disabled:text-[#888888]'>
                                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'gallery' && (
                    <motion.div
                        className='rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}>
                        <h2 className='mb-6 text-2xl font-semibold text-[#ffffff]'>Gallery</h2>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            {[
                                '/minecraft/minecraft-community.png',
                                '/projects/os-ready.png',
                                '/projects/starguide.png',
                                '/projects/sprinkler.png',
                                '/images/screenshot.png'
                            ].map((src) => (
                                <div key={src} className='overflow-hidden rounded-lg border border-[#3a3a3a]'>
                                    <Image
                                        src={src}
                                        alt='Gallery image'
                                        width={800}
                                        height={600}
                                        className='h-48 w-full object-cover transition-transform duration-300 hover:scale-[1.03]'
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'mods' && (
                    <motion.div
                        className='rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}>
                        <h2 className='mb-6 text-2xl font-semibold text-[#ffffff]'>Included Mods</h2>
                        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                            {[
                                'Kotlin for Forge (by thedarkcolour)',
                                'Iris Shaders (by coderbot)',
                                'Create: Dragons Plus (by DragonsPlus)',
                                'Underground Villages, Stoneholm (by Reggarf)',
                                'Create: Dimension, Steamworks Realm (by Reggarf)',
                                'Create (by simibubi)',
                                'Create: Simple Ore Doubling [Forge/Fabric/NeoForge] (by robinfrt)',
                                'AppleSkin (by squeek502)',
                                'Chipped (by terrariumearth)',
                                'Complementary Shaders - Reimagined (by EminGT)',
                                'Super Duper Vanilla Shaders (by eldeston)',
                                'Just Zoom (by Keksuccino)',
                                'Corpse (by henkelmax)',
                                "Biomes O' Plenty (by Forstride)",
                                'Create: Enchantment Industry (by DragonsPlus)',
                                'Create Compressed (by nocubeyt)',
                                'Sophisticated Core (by P3pp3rF1y)',
                                'Carry On (by Tschipp)',
                                "Macaw's Doors (by sketch_macaw)",
                                'Create: Ultimate Factory [Forge/Fabric/NeoForge] (by robinfrt)',
                                'Cloth Config API (Fabric/Forge/NeoForge) (by shedaniel)',
                                'Creeper Overhaul (by joosh_7889)',
                                'Collective (by Serilum)',
                                'Create: Connected (by Lysine)',
                                'Serene Seasons (by TheAdubbz)',
                                'Mouse Tweaks (by YaLTeR)',
                                'Melody (by Keksuccino)',
                                'Effortless Building (by Requioss)',
                                'Create: Structures Arise (by SmartStreamLabs)',
                                'Supplementaries (by MehVahdJukaar)',
                                'TerraBlender (NeoForge) (by TheAdubbz)',
                                'BSL Shaders (by capttatsu)',
                                'Sophisticated Backpacks (by P3pp3rF1y)',
                                'Athena (by terrariumearth)',
                                'Create: Recycling Everything [NeoForge Port] (by MangoYT)',
                                'CoroUtil (by Corosus)',
                                'Sophisticated Storage Create Integration (by P3pp3rF1y)',
                                'Dynamic Trees (by MaxHyper)',
                                'Vanilla Plus Shader (by RRe36)',
                                'Create Encased (by iglee42)',
                                'MakeUp - Ultra Fast | Shaders (by XavierFST)',
                                'Mechanicals Lib (by oierbravo)',
                                'Create: Better Villager (by Reggarf)',
                                'Drippy Loading Screen (by Keksuccino)',
                                'Solas Shader (by Septonious)',
                                'FerriteCore ((Neo)Forge) (by malte0811)',
                                'spark (by Iucko)',
                                "Nature's Compass (by Chaosyr)",
                                'Resourceful Config (by ThatGravyBoat)',
                                "Macaw's Fences and Walls (by sketch_macaw)",
                                'Create Mechanical Spawner (by oierbravo)',
                                'Sophisticated Storage (by P3pp3rF1y)',
                                'Simple Voice Chat (by henkelmax)',
                                'FancyMenu (by Keksuccino)',
                                'Tree Harvester (by Serilum)',
                                'Sodium (by JellySquid)',
                                'Just Enough Items (JEI) (by mezz)',
                                'Create Jetpack (by possible_triangle)',
                                "Create Stuff 'N Additions (by Furti_Two)",
                                'Create: Trading Floor (by CakeIsTastyDeveloper)',
                                'Create: Copycats+ (by Lysine)',
                                'GeckoLib (by Gecko)',
                                'Cucumber Library (by BlakeBr0)',
                                'What Are They Up To (Watut) (by Corosus)',
                                'Moonlight Lib (by MehVahdJukaar)',
                                'Create: Power Loader (by Lysine)',
                                "Create: Dreams n' Desires (by Luna)",
                                'Fusion (Connected Textures) (by SuperMartijn642)',
                                'Konkrete [Forge/NeoForge] (by Keksuccino)',
                                'Resourceful Lib (by ThatGravyBoat)',
                                'Nostalgia Shader (by RRe36)',
                                'Mystical Agriculture (by BlakeBr0)',
                                'ModernFix (by embeddedt)',
                                'GlitchCore (by TheAdubbz)'
                            ].map((mod) => (
                                <div
                                    key={mod}
                                    className='rounded border border-[#3a3a3a] bg-[#1a1a1a] px-3 py-2 text-[#e5e5e5]'>
                                    {mod}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
