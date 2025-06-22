'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { motion } from 'framer-motion';

interface Version {
    id: number;
    fileName: string;
    packVersion: string;
    createdAt: string;
}

const mods = [
    { name: 'Cucumber Library', author: 'BlakeBr0', url: 'https://www.curseforge.com/minecraft/mc-mods/cucumber' },
    {
        name: 'Mystical Agriculture',
        author: 'BlakeBr0',
        url: 'https://www.curseforge.com/minecraft/mc-mods/mystical-agriculture'
    },
    {
        name: 'Create: Trading Floor',
        author: 'CakeIsTastyDeveloper',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-trading-floor'
    },
    {
        name: 'Create: Enchantment Industry',
        author: 'DragonsPlus',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-enchantment-industry'
    },
    {
        name: 'Create: Simple Ore Doubling [Forge/Fabric/NeoForge]',
        author: 'robinfrt',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-simple-ore-doubling'
    },
    { name: 'CoroUtil', author: 'Corosus', url: 'https://www.curseforge.com/minecraft/mc-mods/coroutil' },
    {
        name: 'Create: Connected',
        author: 'Lysine',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-connected'
    },
    {
        name: 'Create: Dragons Plus',
        author: 'DragonsPlus',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-dragons-plus'
    },
    {
        name: "Create Stuff 'N Additions",
        author: 'Furti_Two',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-stuff-additions'
    },
    { name: 'Just Zoom', author: 'Keksuccino', url: 'https://www.curseforge.com/minecraft/mc-mods/just-zoom' },
    { name: 'Dynamic Trees', author: 'MaxHyper', url: 'https://www.curseforge.com/minecraft/mc-mods/dynamictrees' },
    {
        name: 'Create Jetpack',
        author: 'possible_triangle',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-jetpack'
    },
    { name: 'GlitchCore', author: 'TheAdubbz', url: 'https://www.curseforge.com/minecraft/mc-mods/glitchcore' },
    { name: 'Mouse Tweaks', author: 'YaLTeR', url: 'https://www.curseforge.com/minecraft/mc-mods/mouse-tweaks' },
    {
        name: 'Nostalgia Shader',
        author: 'RRe36',
        url: 'https://www.curseforge.com/minecraft/customization/nostalgia-shader'
    },
    {
        name: 'What Are They Up To (Watut)',
        author: 'Corosus',
        url: 'https://www.curseforge.com/minecraft/mc-mods/what-are-they-up-to'
    },
    {
        name: 'Solas Shader',
        author: 'Septonious',
        url: 'https://www.curseforge.com/minecraft/customization/solas-shader'
    },
    {
        name: 'TerraBlender (NeoForge)',
        author: 'TheAdubbz',
        url: 'https://www.curseforge.com/minecraft/mc-mods/terrablender'
    },
    {
        name: 'Simple Voice Chat',
        author: 'henkelmax',
        url: 'https://www.curseforge.com/minecraft/mc-mods/simple-voice-chat'
    },
    { name: 'Iris Shaders', author: 'coderbot', url: 'https://www.curseforge.com/minecraft/mc-mods/irisshaders' },
    { name: 'Collective', author: 'Serilum', url: 'https://www.curseforge.com/minecraft/mc-mods/collective' },
    { name: 'AppleSkin', author: 'squeek502', url: 'https://www.curseforge.com/minecraft/mc-mods/appleskin' },
    {
        name: 'Konkrete [Forge/NeoForge]',
        author: 'Keksuccino',
        url: 'https://www.curseforge.com/minecraft/mc-mods/konkrete'
    },
    {
        name: 'Create: Better Villager',
        author: 'Reggarf',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-better-villager'
    },
    {
        name: 'Create Compressed',
        author: 'nocubeyt',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-compressed'
    },
    {
        name: "Macaw's Fences and Walls",
        author: 'sketch_macaw',
        url: 'https://www.curseforge.com/minecraft/mc-mods/macaws-fences-and-walls'
    },
    {
        name: 'Create: Structures Arise',
        author: 'SmartStreamLabs',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-structures-arise'
    },
    { name: 'Corpse', author: 'henkelmax', url: 'https://www.curseforge.com/minecraft/mc-mods/corpse' },
    {
        name: 'Create Mechanical Spawner',
        author: 'oierbravo',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-mechanical-spawner'
    },
    {
        name: 'Complementary Shaders - Reimagined',
        author: 'EminGT',
        url: 'https://www.curseforge.com/minecraft/customization/complementary-reimagined-shaders'
    },
    {
        name: 'Underground Villages, Stoneholm',
        author: 'Reggarf',
        url: 'https://www.curseforge.com/minecraft/mc-mods/stoneholm-underground-villages'
    },
    {
        name: 'Create: Recycling Everything [NeoForge Port]',
        author: 'MangoYT',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-recycling-everything'
    },
    {
        name: 'Effortless Building',
        author: 'Requioss',
        url: 'https://www.curseforge.com/minecraft/mc-mods/effortless-building'
    },
    {
        name: 'Creeper Overhaul',
        author: 'joosh_7889',
        url: 'https://www.curseforge.com/minecraft/mc-mods/creeperoverhaul'
    },
    {
        name: 'Sophisticated Backpacks',
        author: 'P3pp3rF1y',
        url: 'https://www.curseforge.com/minecraft/mc-mods/sophisticated-backpacks'
    },
    {
        name: 'Supplementaries',
        author: 'MehVahdJukaar',
        url: 'https://www.curseforge.com/minecraft/mc-mods/supplementaries'
    },
    {
        name: "Biomes O' Plenty",
        author: 'Forstride',
        url: 'https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty'
    },
    {
        name: 'Create: Ultimate Factory [Forge/Fabric/NeoForge]',
        author: 'robinfrt',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-ultimate-factory'
    },
    { name: 'ModernFix', author: 'embeddedt', url: 'https://www.curseforge.com/minecraft/mc-mods/modernfix' },
    { name: 'Just Enough Items (JEI)', author: 'mezz', url: 'https://www.curseforge.com/minecraft/mc-mods/jei' },
    {
        name: 'Sophisticated Storage Create Integration',
        author: 'P3pp3rF1y',
        url: 'https://www.curseforge.com/minecraft/mc-mods/sophisticated-storage-create-integration'
    },
    { name: 'Serene Seasons', author: 'TheAdubbz', url: 'https://www.curseforge.com/minecraft/mc-mods/serene-seasons' },
    {
        name: 'MakeUp - Ultra Fast | Shaders',
        author: 'XavierFST',
        url: 'https://www.curseforge.com/minecraft/customization/makeup-ultra-fast-shaders'
    },
    {
        name: 'Create: Copycats+',
        author: 'Lysine',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-copycats'
    },
    {
        name: 'Moonlight Lib',
        author: 'MehVahdJukaar',
        url: 'https://www.curseforge.com/minecraft/mc-mods/moonlight-lib'
    },
    {
        name: 'Create: Dimension, Steamworks Realm',
        author: 'Reggarf',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-dimension-steamworks-realm'
    },
    {
        name: 'Fusion (Connected Textures)',
        author: 'SuperMartijn642',
        url: 'https://www.curseforge.com/minecraft/mc-mods/fusion-connected-textures'
    },
    {
        name: "Nature's Compass",
        author: 'Chaosyr',
        url: 'https://www.curseforge.com/minecraft/mc-mods/natures-compass'
    },
    {
        name: 'Super Duper Vanilla Shaders',
        author: 'eldeston',
        url: 'https://www.curseforge.com/minecraft/customization/super-duper-vanilla-shaders'
    },
    { name: "Macaw's Doors", author: 'sketch_macaw', url: 'https://www.curseforge.com/minecraft/mc-mods/macaws-doors' },
    { name: 'GeckoLib', author: 'Gecko', url: 'https://www.curseforge.com/minecraft/mc-mods/geckolib' },
    { name: 'spark', author: 'Iucko', url: 'https://www.curseforge.com/minecraft/mc-mods/spark' },
    { name: 'BSL Shaders', author: 'capttatsu', url: 'https://www.curseforge.com/minecraft/customization/bsl-shaders' },
    {
        name: 'Kotlin for Forge',
        author: 'thedarkcolour',
        url: 'https://www.curseforge.com/minecraft/mc-mods/kotlin-for-forge'
    },
    { name: 'Sodium', author: 'JellySquid', url: 'https://www.curseforge.com/minecraft/mc-mods/sodium' },
    { name: 'Create', author: 'simibubi', url: 'https://www.curseforge.com/minecraft/mc-mods/create' },
    {
        name: 'Resourceful Config',
        author: 'ThatGravyBoat',
        url: 'https://www.curseforge.com/minecraft/mc-mods/resourceful-config'
    },
    {
        name: 'Vanilla Plus Shader',
        author: 'RRe36',
        url: 'https://www.curseforge.com/minecraft/customization/vanilla-plus-shader'
    },
    {
        name: 'Cloth Config API (Fabric/Forge/NeoForge)',
        author: 'shedaniel',
        url: 'https://www.curseforge.com/minecraft/mc-mods/cloth-config'
    },
    { name: 'Create Encased', author: 'iglee42', url: 'https://www.curseforge.com/minecraft/mc-mods/create-encased' },
    {
        name: "Create: Dreams n' Desires",
        author: 'Luna',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-dreams-n-desires'
    },
    {
        name: 'Mechanicals Lib',
        author: 'oierbravo',
        url: 'https://www.curseforge.com/minecraft/mc-mods/mechanicals-lib'
    },
    {
        name: 'Create: Power Loader',
        author: 'Lysine',
        url: 'https://www.curseforge.com/minecraft/mc-mods/create-power-loader'
    },
    { name: 'Tree Harvester', author: 'Serilum', url: 'https://www.curseforge.com/minecraft/mc-mods/tree-harvester' },
    {
        name: 'Resourceful Lib',
        author: 'ThatGravyBoat',
        url: 'https://www.curseforge.com/minecraft/mc-mods/resourceful-lib'
    },
    {
        name: 'FerriteCore ((Neo)Forge)',
        author: 'malte0811',
        url: 'https://www.curseforge.com/minecraft/mc-mods/ferritecore'
    },
    {
        name: 'Sophisticated Core',
        author: 'P3pp3rF1y',
        url: 'https://www.curseforge.com/minecraft/mc-mods/sophisticated-core'
    },
    {
        name: 'Sophisticated Storage',
        author: 'P3pp3rF1y',
        url: 'https://www.curseforge.com/minecraft/mc-mods/sophisticated-storage'
    },
    { name: 'Carry On', author: 'Tschipp', url: 'https://www.curseforge.com/minecraft/mc-mods/carry-on' }
];

function ModsList() {
    const [show, setShow] = React.useState(false);
    const modsPerPage = 15;
    const [page, setPage] = React.useState(0);
    const pageCount = Math.ceil(mods.length / modsPerPage);
    const paginatedMods = mods.slice(page * modsPerPage, (page + 1) * modsPerPage);

    return (
        <motion.div
            className='mb-8 rounded-lg border-2 border-[#4a4a4a] bg-[#232a32] p-6 shadow-lg'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}>
            <div className='mb-2 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold text-[#55ff55]'>Full Mod List</h2>
                <button
                    onClick={() => setShow((s) => !s)}
                    className='rounded bg-[#55ff55] px-4 py-1 font-semibold text-[#1a1a1a] hover:bg-[#44dd44]'>
                    {show ? 'Hide List' : 'Show List'}
                </button>
            </div>
            {show && (
                <div>
                    <table className='mb-4 w-full text-left'>
                        <thead>
                            <tr>
                                <th className='p-2 text-[#55ff55]'>Mod Name</th>
                                <th className='p-2 text-[#55ff55]'>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedMods.map((mod, i) => (
                                <tr key={mod.name + mod.author} className='border-b border-[#333]'>
                                    <td className='p-2 text-[#e0ffe0]'>{mod.name}</td>
                                    <td className='p-2 text-[#e0ffe0]'>{mod.author}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center gap-2'>
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className='rounded bg-[#444] px-3 py-1 font-semibold text-[#fff] disabled:opacity-50'>
                            Previous
                        </button>
                        <span className='px-2 text-[#fff]'>
                            Page {page + 1} of {pageCount}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                            disabled={page === pageCount - 1}
                            className='rounded bg-[#444] px-3 py-1 font-semibold text-[#fff] disabled:opacity-50'>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function ModsListModal() {
    const modsPerPage = 15;
    const [page, setPage] = React.useState(0);
    const pageCount = Math.ceil(mods.length / modsPerPage);
    const paginatedMods = mods.slice(page * modsPerPage, (page + 1) * modsPerPage);

    return (
        <div>
            <table className='mb-4 w-full text-left'>
                <thead>
                    <tr>
                        <th className='p-2 text-[#55ff55]'>Mod Name</th>
                        <th className='p-2 text-[#55ff55]'>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedMods.map((mod, i) => (
                        <tr key={mod.name + mod.author} className='border-b border-[#333]'>
                            <td className='p-2 text-[#e0ffe0]'>
                                <a
                                    href={mod.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-[#55aaff] underline hover:text-[#88ccff]'>
                                    {mod.name}
                                </a>
                            </td>
                            <td className='p-2 text-[#e0ffe0]'>{mod.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center gap-2'>
                <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className='rounded bg-[#444] px-3 py-1 font-semibold text-[#fff] disabled:opacity-50'>
                    Previous
                </button>
                <span className='px-2 text-[#fff]'>
                    Page {page + 1} of {pageCount}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                    disabled={page === pageCount - 1}
                    className='rounded bg-[#444] px-3 py-1 font-semibold text-[#fff] disabled:opacity-50'>
                    Next
                </button>
            </div>
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
    const [showOlderVersions, setShowOlderVersions] = useState(false);
    const [showModsModal, setShowModsModal] = useState(false);

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

    const latestVersion = versions[0];

    useEffect(() => {
        if (showModsModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModsModal]);

    return (
        <div className='min-h-screen bg-[#1a1a1a]'>
            <motion.div
                className='container mx-auto px-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='mb-6 text-6xl font-bold text-[#55ff55]'>Minecraft Server</h1>
                <p className='mb-8 text-xl text-[#ffffff]'>Welcome to Brandon's Minecraft Community!</p>

                {/* Educational Description Card */}
                <motion.div
                    className='mb-8 rounded-lg border-2 border-[#4a4a4a] bg-[#222a22] p-6 shadow-lg'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}>
                    <h2 className='mb-2 text-2xl font-semibold text-[#55ff55]'>About This Mod Pack</h2>
                    <p className='text-[#e0ffe0]'>
                        This carefully curated Minecraft mod pack offers children ages 6 to 10 a fun and safe way to
                        build valuable learning skills through play. With mods like <b>Create</b> and its many
                        expansions, kids explore engineering concepts by designing machines and solving mechanical
                        puzzles. Resource and farming mods such as <b>Mystical Agriculture</b> and <b>Dynamic Trees</b>{' '}
                        introduce planning, sustainability, and environmental awareness. Customization tools like{' '}
                        <b>Effortless Building</b> and <b>Sophisticated Backpacks</b> encourage creativity,
                        organization, and spatial reasoning. Multiplayer-friendly features like <b>Simple Voice Chat</b>{' '}
                        and <b>What Are They Up To</b> promote communication and teamwork in a supervised environment.
                        Overall, this pack blends imagination, problem-solving, and cooperation—making it a great way
                        for kids to learn through digital play while encouraging curiosity and hands-on experimentation.
                    </p>
                </motion.div>

                {/* CurseForge Installation Instructions */}
                <motion.div
                    className='mb-8 rounded-lg border-2 border-[#4a4a4a] bg-[#222244] p-6 shadow-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 }}>
                    <h2 className='mb-2 text-2xl font-semibold text-[#55aaff]'>
                        How to Install the Modpack with CurseForge
                    </h2>
                    <ol className='list-inside list-decimal space-y-2 text-[#e0eaff]'>
                        <li>
                            <b>Download the Modpack:</b> Click the{' '}
                            <span className='font-semibold text-[#55ff55]'>Download</span> button above to get the
                            latest modpack file (it will be a <code>.zip</code> file).
                        </li>
                        <li>
                            <b>Open the CurseForge App:</b> If you don't have it, you can download it from{' '}
                            <a
                                href='https://download.curseforge.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-[#55aaff] underline'>
                                CurseForge
                            </a>
                            .
                        </li>
                        <li>
                            <b>Go to Minecraft Modpacks:</b> In the CurseForge app, select{' '}
                            <span className='font-semibold'>Minecraft</span> from the sidebar, then click{' '}
                            <span className='font-semibold'>"My Modpacks"</span> at the top.
                        </li>
                        <li>
                            <b>Import the Modpack:</b> Click the{' '}
                            <span className='font-semibold'>"Create Custom Profile"</span> button, then choose{' '}
                            <span className='font-semibold'>"Import"</span> (usually at the top right). Select the{' '}
                            <code>.zip</code> file you downloaded.
                        </li>
                        <li>
                            <b>Play!</b> Once imported, the modpack will appear in your list. Click{' '}
                            <span className='font-semibold'>Play</span> to launch Minecraft with all the mods
                            pre-installed.
                        </li>
                    </ol>
                    <p className='mt-4 text-sm text-[#aaccff]'>
                        If you have any trouble, feel free to reach out for help!
                    </p>
                </motion.div>

                {/* Server Info Card with Download */}
                <motion.div
                    className='mb-8 rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}>
                    <h2 className='mb-4 text-2xl font-semibold text-[#ffffff]'>Server Information</h2>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <div>
                            <h3 className='font-semibold text-[#55ff55]'>Server Address:</h3>
                            <p className='rounded bg-[#1a1a1a] p-2 font-mono text-[#ffffff]'>mc.bwhite.dev</p>
                        </div>
                        <div>
                            <h3 className='font-semibold text-[#55ff55]'>Modpack Version (Latest):</h3>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between rounded bg-[#1a1a1a] p-2'>
                                    <div>
                                        <p className='font-semibold text-[#ffffff]'>
                                            Version {latestVersion?.packVersion}
                                        </p>
                                        <p className='text-sm text-[#aaaaaa]'>
                                            Released {new Date(latestVersion?.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <a
                                        href={`/api/uploads/${latestVersion?.id}`}
                                        className='rounded-lg bg-[#55ff55] px-4 py-2 font-semibold text-[#1a1a1a] transition-colors hover:bg-[#44dd44]'
                                        download>
                                        Download
                                    </a>
                                </div>
                                <button
                                    onClick={() => setShowOlderVersions(!showOlderVersions)}
                                    className='w-full rounded-lg bg-[#1a1a1a] px-4 py-2 text-center text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#2a2a2a]'>
                                    {showOlderVersions ? 'Hide Older Versions' : 'Show Older Versions'}
                                </button>
                                {showOlderVersions && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className='space-y-2'>
                                        {versions.slice(1).map((version) => (
                                            <div
                                                key={version.id}
                                                className='flex items-center justify-between rounded bg-[#1a1a1a] p-2'>
                                                <div>
                                                    <p className='font-semibold text-[#ffffff]'>
                                                        Version {version.packVersion}
                                                    </p>
                                                    <p className='text-sm text-[#aaaaaa]'>
                                                        {new Date(version.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <a
                                                    href={`/api/uploads/${version.id}`}
                                                    className='rounded-lg bg-[#55ff55] px-3 py-1 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#44dd44]'
                                                    download>
                                                    Download
                                                </a>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button
                            onClick={() => setShowModsModal(true)}
                            className='flex items-center gap-2 rounded bg-[#55ff55] px-4 py-2 font-semibold text-[#1a1a1a] shadow hover:bg-[#44dd44]'>
                            <ListBulletIcon className='h-5 w-5' />
                            View Full Mod List
                        </button>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                    {/* Whitelist Application Form */}
                    <motion.div
                        className='rounded-lg border-2 border-[#4a4a4a] bg-[#2a2a2a] p-6 shadow-lg'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}>
                        <h2 className='mb-6 text-2xl font-semibold text-[#ffffff]'>Whitelist Application</h2>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor='username' className='mb-2 block font-semibold text-[#55ff55]'>
                                    Minecraft Username
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
                                    Why do you want to join?
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

                    {/* Server Image */}
                    <motion.div
                        className='flex items-center justify-center'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}>
                        <Image
                            src='/minecraft/minecraft-community.png'
                            alt='Minecraft Community'
                            width={600}
                            height={800}
                            className='rounded-lg object-cover shadow-lg'
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Mod List Modal */}
            {showModsModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                    <div className='relative mx-4 w-full max-w-2xl rounded-lg bg-[#232a32] p-6 shadow-2xl'>
                        <button
                            onClick={() => setShowModsModal(false)}
                            className='absolute top-3 right-3 text-[#55ff55] hover:text-[#44dd44] focus:outline-none'>
                            <XMarkIcon className='h-6 w-6' />
                        </button>
                        <h2 className='mb-4 text-center text-2xl font-semibold text-[#55ff55]'>Full Mod List</h2>
                        <ModsListModal />
                    </div>
                </div>
            )}
        </div>
    );
}
