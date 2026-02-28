"use client";

import { getChatMessages } from "@/api/chatDetails";
import { Message } from "@/data/ChatData";
import { useWorkspaceStore } from "@/global/usePolygonStore";
import { TickIcon } from "@/icons/icons";
import { useDelayedQuery } from "@/lib/useDelayedQuery";
import Image from "next/image";


function MessageSkeleton({ isUser }: { isUser?: boolean }) {
  return (
    <div
      className={`flex w-full mt-4 ${
        isUser ? "justify-end" : "justify-start"
      } animate-pulse`}
    >
      <div
        className={`
          max-w-[70%] xl:max-w-[40%]
          rounded-[0.45rem] px-4 py-3
          ${isUser ? "bg-[#EDE3FD]" : "bg-[#EFF2F2]"}
        `}
      >
        <div className="h-3 w-32 bg-gray-300 rounded mb-2" />
        <div className="h-3 w-48 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
function MessagesSkeleton() {
  return (
    <>
      <MessageSkeleton />
      <MessageSkeleton isUser />
      <MessageSkeleton />
      <MessageSkeleton isUser />
      <MessageSkeleton />
    </>
  );
}
export default function ChatMessagesInner() {
const { workspaceStatus,  } = useWorkspaceStore();
const { data: messages=[], isLoading } =
  useDelayedQuery<Message[]>({
    cacheKey: ["single-chat"],
    requestHandler: getChatMessages,
    isActive: workspaceStatus === "loading",
    minimumDelay: 6000,
  });
   const getTime = (date?: string) =>
    new Date(date ? new Date(date).getTime() : new Date().getTime()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
const leftIcons = [
  { src: "/icons/image-upload.svg", alt: "img" },
  { src: "/icons/video.svg", alt: "video" },
  { src: "/icons/document.svg", alt: "document" },
  { src: "/icons/emoji.svg", alt: "emoji" },
  { src: "/icons/reply.svg", alt: "reply" },
];

const rightIcons = [
  { src: "/icons/flash.svg", alt: "flash" },
  { src: "/icons/mic.svg", alt: "mic" },
];
  return (
    <>
      <div className="px-4 xl:px-[2%] w-full">
        <div className="h-[80vh] xl:h-[calc(100vh-200px)] my-[2%] scrollbar-hide overflow-y-auto">
          {/* DATE */}
          <div className="flex justify-center sticky top-[2%] z-10 mb-8 xl:mb-[2%]">
            <p className="px-4 xl:px-[2%] py-2 xl:py-[1%] bg-[#EFF2F2] rounded-md ">
              28 August 2025
            </p>
          </div>

 {isLoading ? 
  <MessagesSkeleton />: (messages?.map((msg) => {
    const isUser = msg?.user?.id % 2 === 0;

    return (
      <div
        key={msg.id}
        className={`flex w-full gap-x-[1%] mt-4 xl:mt-[2%] ${
          isUser
            ? "justify-end items-end"
            : "justify-start items-start"
        }`}
      >
        {/* USER TIME + TICK */}
        {isUser && (
          <div className="text-right hidden xl:block opacity-70">
            <p>   10:45 AM</p>
            <TickIcon className="size-[0.9rem] text-[#4FB6EC]" />
          </div>
        )}

        {/* MESSAGE BUBBLE */}
        <div
          className={`
            inline-flex w-fit gap-x-4 xl:gap-x-0 items-end
            max-w-[75%] xl:max-w-[40%]
            rounded-[0.45rem]
            px-4 py-1
            xl:px-[1.5%] xl:py-[1%]
            wrap-break-word
            ${isUser ? "bg-[#EDE3FD]" : "bg-[#EFF2F2]"}
          `}
        >
          <p>{msg.body}</p>

          {/* MOBILE TIME */}
          <p className="flex items-end xl:hidden opacity-70 gap-x-2">
             10:45 AM
            {isUser && (
              <TickIcon className="w-[0.9rem] h-[0.9rem] text-[#4FB6EC]" />
            )}
          </p>
        </div>

        {/* OTHER USER TIME */}
        {!isUser && (
          <p className="hidden xl:block opacity-70">
              10:45 AM
          </p>
        )}
      </div>
    );
  })
)}

        </div>
      </div>
        <div className="w-full xl:w-[97%] mx-auto shadow-md xl:rounded-xl sticky bottom-[6.8%] md:bottom-18 lg:bottom-[2%] bg-white border-t-2 border-gray-300 xl:border-t-0  p-4 xl:p-[2%]">

          <input
            type="text"
            placeholder="Type Something..."
            className="w-full bg-transparent xl:h-[2vw]   2xl:h-12 mb-4 xl:mb-[2%]  xl:text-[0.8vw] 2xl:text-[1rem] text-black placeholder:text-black/30 placeholder:font-medium focus:outline-none"
          />
        <div className="flex justify-between">
  {/* LEFT ICONS */}
  <div className="flex items-center gap-4">
    {leftIcons.map((icon, index) => (
      <Image
        key={index}
        src={icon.src}
        alt={icon.alt}
        width={24}
        height={24}
          className="size-[1.2rem] xl:size-[1vw] 2xl:size-[1.2rem]"
      />
    ))}
  </div>

  {/* RIGHT ICONS */}
  <div className="flex items-center gap-6 ml-4">
    {rightIcons.map((icon, index) => (
      <Image
        key={index}
        src={icon.src}
        alt={icon.alt}
        width={22}
        height={22}
          className="size-[1.2rem] xl:size-[1vw] 2xl:size-[1.2rem]"
      />
    ))}
  </div>
</div>


      </div>
    </>
  );
}
