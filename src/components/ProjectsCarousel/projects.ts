export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export const projectsData: Project[] = [
    {
        id: 'os-ready',
        title: 'OS-Ready',
        description:
            'OS-Ready is a lightweight command-line utility designed to automate fresh installations and system configuration across Windows, macOS, and Linux using Ansible and Chocolatey.',
        image: '/projects/os-ready.png',
        technologies: ['C++', 'Powershell', 'Shell'],
        githubUrl: 'https://github.com/BrandosFotos/OS-Ready'
        // liveUrl: 'https://portfolio.dev'
    },
    {
        id: 'StarGuide',
        title: 'StarGuide (Coming Soon)',
        description:
            "Our Ultimate Companion for the Verse. Navigate the stars with precision. StarGuide is your all-in-one resource for hauling, salvaging, and mining in Star Citizen. Whether you're charting trade routes, stripping derelicts, or extracting precious ore, StarGuide empowers you with real-time insights, profit metrics, and route optimization to make every journey count.",
        image: '/projects/starguide.png',
        technologies: ['React', 'Framer-Motion', 'D3.js', 'TypeScript', 'Material-UI', 'Redux']
        // githubUrl: 'https://github.com/username/analytics-dashboard',
        // liveUrl: 'https://analytics-dashboard.dev'
    }
];
