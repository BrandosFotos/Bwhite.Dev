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
        id: 'portfolio',
        title: 'Personal Portfolio',
        description:
            'A modern, responsive portfolio website built with Next.js, React, and TailwindCSS. Features dynamic content loading and smooth animations.',
        image: '/projects/portfolio.jpg',
        technologies: ['Next.js', 'React', 'TailwindCSS', 'TypeScript', 'Framer Motion'],
        githubUrl: 'https://github.com/username/portfolio',
        liveUrl: 'https://portfolio.dev'
    },
    {
        id: 'dashboard',
        title: 'Analytics Dashboard',
        description:
            'Real-time analytics dashboard with interactive charts and data visualization. Built with React and D3.js.',
        image: '/projects/dashboard.jpg',
        technologies: ['React', 'D3.js', 'TypeScript', 'Material-UI', 'Redux'],
        githubUrl: 'https://github.com/username/analytics-dashboard',
        liveUrl: 'https://analytics-dashboard.dev'
    },
    {
        id: 'ecommerce',
        title: 'E-commerce Platform',
        description:
            'Full-featured e-commerce platform with product management, shopping cart, and secure checkout integration.',
        image: '/projects/ecommerce.jpg',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
        githubUrl: 'https://github.com/username/ecommerce',
        liveUrl: 'https://ecommerce-platform.dev'
    }
];
