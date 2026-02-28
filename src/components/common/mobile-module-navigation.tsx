"use client";

import Image from "next/image";
import { polygonIconsData, PolygonItem } from "../icons/icons";
import { useContextStore } from "@/global/useContextStore";
import { NavigationData } from "@/data/NavigationData";

export default function MobileModuleNavigation() {
  const { activeContextId } = useContextStore();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-300 shadow-md flex justify-between px-2 py-4 lg:hidden z-50">
      {polygonIconsData?.map((item: PolygonItem, index: number) => {
        const isActive = activeContextId === item.label;
        return (
          <button
            key={index}
            className={`
              flex items-center flex-col justify-center gap-y-1 w-full
              px-[2%] py-[0.5%] transition-all rounded-md
              ${isActive ? "bg-[#EFF2F2]" : "bg-white"}
            `}
          >
            {item.icon}
            <h6
              className={`body1 mt-1 hidden md:block transition-colors ${
                isActive ? "text-[#007AEC] font-medium" : "text-gray-500"
              }`}
            >
              {item.label}
            </h6>
          </button>
        );
      })}

      <div className="flex flex-col items-center justify-center w-full">
        <Image
          height={18}
          width={18}
          src={NavigationData.settingsAsset}
          alt="settings icon"
          className="block lg:hidden"
        />
        <h6 className="hidden md:block body1 mt-1">
          Settings
        </h6>
      </div>
    </div>
  );
}