"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";
import { Hexagon } from "./Hexagon";
import loaderGif from "@/assets/Bannerloader.gif";
import { polygonIconsData, PolygonItem } from "../icons/icons";
import { useContextStore } from "@/global/useContextStore";
import { useRouter } from "next/navigation";

interface ModuleLoaderStateProps {

  selectedContext: PolygonItem;
  contextPhase: string;
  renderIcon?: () => React.ReactNode;
}

const ModuleLoaderHero = () => {
  const { contextPhase, setActiveContext, setContextPhase } = useContextStore();
  const [selectedContext, setSelectedContext] = useState<PolygonItem | null>(null);
  const router = useRouter();

const handleContextSelect = (context: PolygonItem) => {
  setSelectedContext(context);
  setActiveContext(context.label);
  setContextPhase("loading");

  router.prefetch("/dashboard/inbox");

  setTimeout(() => {
    router.replace("/dashboard/inbox");
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
            <Hexagon
              key={index}
              onClick={() => handleContextSelect(item)}
              className={clsx(
                "lg:absolute cursor-pointer z-10 transition-all duration-500 ease-in-out mt-[10%]",
                item.position,
                item.size
              )}
            >
              {item.icon}
            </Hexagon>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-40 md:gap-x-0 gap-y-4 z-10 mt-8 mx-auto md:ml-6 md:mb-10   md:w-full lg:hidden">
          <AnimatePresence>
            {polygonIconsData
              .slice(0, 5)
              .filter((item) => item.id !== selectedContext?.id)
              .map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  <Hexagon
                    onClick={() => handleContextSelect(item)}
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
                  </Hexagon>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <motion.div
          key={`${contextPhase}-${selectedContext?.id ?? ""}`}
          initial="hidden"
          animate="visible"
          variants={contextPhase === "loading" ? fadeUpVariant : undefined}
          className="mix-blend-screen lg:transform text-center w-full"
        >
          {selectedContext ? (
            <ContextLoadingState
              selectedContext={selectedContext}
              contextPhase={contextPhase}
            />
          ) : (
            <ContextIdleState />
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Idle State
const ContextIdleState = () => (
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
const ContextLoadingState = ({
  selectedContext,
  contextPhase,
}: ModuleLoaderStateProps) => (
  <div className={`relative -mt-8 lg:mt-0`}>
    <div
      className={`relative mx-auto flex items-center justify-center size-48 lg:size-[13vw]`}
    >
      {contextPhase === "loading" ? (
        <motion.img
          src={loaderGif.src}
          alt={`Loading ${selectedContext.label} data`}
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
        <Hexagon
          active={true}
          className="relative size-20 lg:size-[5vw] 2xl:size-20 flex items-center justify-center"
        >
          {selectedContext.icon}
        </Hexagon>
      </motion.div>
    </div>
    <motion.h1
      className="text-white relative z-10 my-[1%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      Initializing {selectedContext.label} Workspace
    </motion.h1>

    <motion.p
      className="roz-text text-white font-light w-[60%] lg:w-full mx-auto text-[1rem]  lg:text-[1vw] 2xl:text-[1.125rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      We’re preparing your environment and syncing relevant data.
  This will only take a moment.

    </motion.p>
  </div>
);
export default ModuleLoaderHero;