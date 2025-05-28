// ElectronicsCard.jsx

export default function ElectronicsCard() {
    return (
        <div className='mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                Electronics & Embedded Systems Expertise
            </h2>
            <p className='mb-4 leading-relaxed text-gray-700 dark:text-gray-300'>
                I have a strong background in integrating hardware with software, focusing on embedded systems, IoT
                devices, and real-time data acquisition. My projects combine low-level programming, hardware
                interfacing, and cloud/app integration to create seamless user experiences and automation solutions.
            </p>
            <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100'>Key Projects and Skills:</h3>
            <ul className='mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300'>
                <li>
                    <strong>3D Printer Integration & Automation:</strong> Developed custom notification systems for the
                    Bambu P1P 3D printer integrated with Home Assistant, enabling real-time print job monitoring.
                </li>
                <li>
                    <strong>Home Automation with Embedded Sensors:</strong> Customized Home Assistant automations to
                    track real-world data, including fuel consumption, with Apple CarPlay integration.
                </li>
                <li>
                    <strong>Embedded File Management & System Automation:</strong> Created C++ programs for embedded
                    file management and automated multi-OS system setups.
                </li>
            </ul>
            <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100'>Technical Proficiencies:</h3>
            <p className='text-gray-700 dark:text-gray-300'>
                <strong>Languages:</strong> C++, Python, Bash
                <br />
                <strong>Hardware Interfaces:</strong> Bluetooth OBD2, Raspberry Pi, 3D printer firmware APIs
                <br />
                <strong>Platforms:</strong> Home Assistant, TrueNAS SCALE, Docker containers
                <br />
                <strong>Tools & Frameworks:</strong> Ansible, Next.js, React, Framer Motion
                <br />
                <strong>Networking:</strong> WebDAV, low-latency streaming, IoT protocols
            </p>
        </div>
    );
}
