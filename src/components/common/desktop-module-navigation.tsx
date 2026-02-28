"use client";

import { useWorkspaceStore } from "@/global/usePolygonStore";
import { polygonIconsData, PolygonItem } from "../icons/icons";
import clsx from "clsx";

const DesktopModuleNavigation = () => {
  const { activeModuleKey } = useWorkspaceStore();

  return (
    <div className="hidden lg:flex items-center gap-x-[2%]">
      {polygonIconsData?.map((item: PolygonItem, index: number) => {
        const isActive = activeModuleKey === item.label;

        return (
          <button
            key={index}
            className={clsx(
              "flex items-center gap-x-[10%] transition-all lg:rounded-[0.5vw]",
              isActive
                ? "px-[3%] py-[1.5%] bg-[#EFF2F2]"
                : "px-[2%] py-[0.5%] bg-white"
            )}
          >
            {item.icon}
            <h6 className="font-bold">{item.label}</h6>
          </button>
        );
      })}
    </div>
  );
};

export default DesktopModuleNavigation;