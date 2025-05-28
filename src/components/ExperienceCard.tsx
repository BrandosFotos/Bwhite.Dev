// ElectronicsCard.jsx

export default function ElectronicsCard() {
    return (
        <div className='m-9 rounded-4xl border border-white/20 bg-white/20 p-9 shadow-lg backdrop-blur-md transition duration-300 hover:bg-white/25 hover:shadow-2xl'>
            <h2 className='mb-4 text-2xl font-semibold'>Electronics & Embedded Systems Expertise</h2>

            <p className='mb-4 leading-relaxed'>
                I have a strong background in integrating hardware with software, focusing on embedded systems, IoT
                devices, and real-time data acquisition. My projects combine low-level programming, hardware
                interfacing, and cloud/app integration to create seamless user experiences and automation solutions.
            </p>

            <h3 className='mb-2 text-xl font-semibold'>Key Projects and Skills:</h3>
            <ul className='mb-4 list-inside list-disc space-y-2'>
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
            <h3 className='mb-2 text-xl font-semibold'>Technical Proficiencies:</h3>
            <p className=''>
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
