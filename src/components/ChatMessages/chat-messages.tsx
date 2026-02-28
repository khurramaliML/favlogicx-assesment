
"use client"
import { headerButtons } from "@/data/ChatData";
import Image from "next/image";
import { BackArrowIcon, DetailsIcon } from "@/icons/icons";
import clsx from "clsx";
import ConversationThread from "./ConversationThread";
import { useSidebarStore } from "@/global/useSidebarStore";

export default function ConversationPanel() {
const { isSidebarVisible, toggleSidebar } = useSidebarStore();
  return (
<div
  className={clsx(
    "shadow-sm rounded-xl bg-[#FAFAF8] hidden lg:block lg:h-[calc(100vh-70px)] xl:h-[calc(100vh-90px)] 2xl:h-[calc(100vh-110px)] scrollbar-hide overflow-y-auto",
"w-[44%]"  )}
>

      {/* HEADER */}
      <header className=" sticky top-[0%] bg-[#FAFAF8] z-40 ">
     <div className="p-2 lg:p-[0.5vw] 2xl:p-2 flex items-center justify-between border-b border-gray-300 ">
      {!isSidebarVisible&& <button onClick={toggleSidebar }><BackArrowIcon className="w-7 h-7"/></button>}
         <h4 className="capitalize font-bold">Ava Harris</h4>

        <div className="flex items-center gap-x-1">
          {headerButtons.map((btn, index) => (
            <button
              key={index}
              className="p-[4%] flex justify-center items-center rounded-md size-8 bg-gray-100 hover:bg-black transition-all duration-150 group"
            >
              <Image
                src={btn.icon}
                alt="header-icon"
                width={18}
                height={18}
                className="group-hover:invert group-hover:brightness-0 size-[1.2rem] lg:size-[1vw]  2xl:size-[1.2rem] "
              />
            </button>
          ))}
          <button ><DetailsIcon className="lg:size-[1.2vw] 2xl:size-[1.2rem]"/></button>
        </div>
        </div>
      </header>
  <ConversationThread/>
    </div>
  );
}
