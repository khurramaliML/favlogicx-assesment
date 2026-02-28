"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";
import { Polygon } from "./polygon";
import loaderGif from "@/assets/Bannerloader.gif";
import { polygonIconsData, PolygonItem } from "../icons/icons";
import { useWorkspaceStore } from "@/global/usePolygonStore";
import { useRouter } from "next/navigation";

interface ModuleLoaderStateProps {

  activeModule: PolygonItem;
  workspaceStatus: string;
  renderIcon?: () => React.ReactNode;
}

const ModuleLoaderHero = () => {
  const { workspaceStatus, setActiveModule:setActivePolygon, setWorkspaceStatus } = useWorkspaceStore();
  const [activeModule, setActiveModule] = useState<PolygonItem | null>(null);
  const router = useRouter();

  const handleModuleSelect = (module: PolygonItem) => {
    setActiveModule(module);
    setActivePolygon(module.label);
    setWorkspaceStatus("loading");

    setTimeout(() => {
      router.push("/dashboard/inbox");
    }, 3000);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full items-center min-h-screen bg-[#05070C] overflow-hidden flex justify-center">
      <Image
        src="/Loading Skeleton.png"
        alt=""
        fill={false}
        width={2000}
        height={2000}
        className="fixed inset-0 transform pointer-events-none translate-y-full lg:translate-none"
      />

      <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[90%] lg:w-[98%] h-[95svh] rounded-2xl border-2 border-white/10 bg-white/4 px-6 pt-6 pb-20 backdrop-blur-[30px] sm:rounded-3xl" />
      </div>

      <div className="flex lg:block flex-col items-center w-full">
        <div className="hidden lg:block">
          {polygonIconsData?.map((item, index) => (
            <Polygon
              key={index}
              onClick={() => handleModuleSelect(item)}
              className={clsx(
                "lg:absolute cursor-pointer z-10 transition-all duration-500 ease-in-out mt-[10%]",
                item.position,
                item.size
              )}
            >
              {item.icon}
            </Polygon>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-40 md:gap-x-0 gap-y-4 z-10 mt-8 mx-auto md:ml-6 md:mb-10   md:w-full lg:hidden">
          <AnimatePresence>
            {polygonIconsData
              .slice(0, 5)
              .filter((item) => item.id !== activeModule?.id)
              .map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  <Polygon
                    onClick={() => handleModuleSelect(item)}
                    className={clsx(
                      item.size,
                      "cursor-pointer transition-all duration-500 ease-in-out"
                    )}
                  >
                    <div className="flex justify-center flex-col items-center">
                      {item.icon}
                      <div className="border-b-2 mt-2 w-full border-white" />
                      <p className="font-bold text-white text-xs">
                        {item.label}
                      </p>
                    </div>
                  </Polygon>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <motion.div
          key={`${workspaceStatus}-${activeModule?.id ?? ""}`}
          initial="hidden"
          animate="visible"
          variants={workspaceStatus === "loading" ? fadeUpVariant : undefined}
          className="mix-blend-screen lg:transform text-center w-full"
        >
          {activeModule ? (
            <ModuleLoaderActiveState
              activeModule={activeModule}
              workspaceStatus={workspaceStatus}
            />
          ) : (
            <ModuleLoaderIdleState />
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Idle State
const ModuleLoaderIdleState = () => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="size-64 lg:size-[18vw] mx-auto rounded-full flex items-center  justify-center relative transform border-4 border-[#005bb5]"
  >
    <div className="w-full h-full bg-[#05070C]/10 rounded-full flex items-center justify-center">
      <h1 className="text-white text-lg lg:text-xl w-[60%] text-center leading-tight">
  Select a module to begin data extraction
      </h1>
    </div>
  </motion.div>
);

// Active State
const ModuleLoaderActiveState = ({
  activeModule,
  workspaceStatus,
}: ModuleLoaderStateProps) => (
  <div className={`relative -mt-8 lg:mt-0`}>
    <div
      className={`relative mx-auto flex items-center justify-center size-48 lg:size-[13vw]`}
    >
      {workspaceStatus === "loading" ? (
        <motion.img
          src={loaderGif.src}
          alt={`Loading ${activeModule.label} data`}
          className="w-full h-full pointer-events-none object-cover rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <div className="w-full h-full rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full p-1 slow-spin bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(210,100%,70%,0.18)_0%,hsla(210,100%,49%,0.08)_50%,hsla(210,100%,45%,0)_80%)] border-4 border-[#007AEC]" />
          <div className="w-full h-full bg-[#05070C] rounded-full flex items-center justify-center" />
        </div>
      )}

      {/* ICON CENTER */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Polygon
          active={true}
          className="relative size-20 lg:size-[5vw] 2xl:size-20 flex items-center justify-center"
        >
          {activeModule.icon}
        </Polygon>
      </motion.div>
    </div>

    {/* ===== RESTORED TEXT BLOCK ===== */}
    <motion.h1
      className="text-white relative z-10 my-[1%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
     Extracting {activeModule.label}...
    </motion.h1>

    <motion.p
      className="roz-text text-white font-light w-[60%] lg:w-full mx-auto text-[1rem]  lg:text-[1vw] 2xl:text-[1.125rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
     Retrieving and processing your {activeModule.label} data. Please wait...
    </motion.p>
  </div>
);
export default ModuleLoaderHero;