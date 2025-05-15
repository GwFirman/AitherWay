'use client';

// import Link from "next/link";

interface HeroProps {
    backgroundImage?: string;
}


const Hero: React.FC<HeroProps> = ({backgroundImage = "/images/HeroBeach.jpg"}) => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-800/50 to-transparent"></div>
            </div>
        </div>
    );

};

export default Hero;