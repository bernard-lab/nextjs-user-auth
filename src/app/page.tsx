import Navbar from "@/components/Navbar";
import { SiSpringsecurity } from "react-icons/si";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      <Navbar LoggedIn={true} />
      <div className="bg-slate-400 min-h-screen flex flex-col w-full items-center gap-8">
        <h1 className="pt-8 text-center text02xl font-bold text-2xl">
          Home Page
        </h1>
        <SiSpringsecurity className="text-[200px] text-[#0063FB] text-center" />
        <Image src="./verify.svg" alt="veryify-logo" width={200} height={200} />
      </div>
    </>
  );
};

export default HomePage;
