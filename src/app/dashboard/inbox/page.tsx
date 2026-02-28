
"use client"
import DashboardHeader from '@/components/common/dashboard-header'
import MobileModuleNavigation from '@/components/common/mobile-module-navigation'
import DashboardSidebar from '@/components/dashboard-sidebar/dashboard-sidebar'
import ChatMessages from '@/components/ChatMessages/chat-messages'
import MessagingWorkspace from '@/components/messaging-workspace'
import ConversationInsightPanel from '@/components/conversation-insight-panel'
import { useContextStore } from '@/global/useContextStore'
import { useRouter } from 'next/navigation'
import { ArrowRight, Briefcase,  } from 'lucide-react'
import ConversationPanel from '@/components/ChatMessages/chat-messages'

const Inbox = () => {
 const {activeContextId} = useContextStore();
  const router = useRouter();
  
  if (!activeContextId ) {
    return (
 <div className="min-h-screen flex items-center justify-center bg-[#05070C] px-6 relative overflow-hidden">

        {/* Soft Background Glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#007AEC]/15 blur-[160px] rounded-full top-[-200px] left-[-200px]" />

        <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-14 text-center shadow-2xl">

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#007AEC]/10 border border-[#007AEC]/30 p-6 rounded-2xl">
              <Briefcase className="w-10 h-10 text-[#007AEC]" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-semibold text-white mb-5">
            Inbox Workspace Setup Required
          </h1>

          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            To access conversations, collaboration tools, and insights,
            please select a workspace module from your dashboard.
            <br />
            Each module activates a dedicated messaging environment.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/")}
            className="group bg-[#007AEC] hover:bg-[#0066cc] text-white px-10 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-[#007AEC]/40 flex items-center justify-center gap-3 mx-auto"
          >
            Select Workspace Module
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          {/* Helper Text */}
          <p className="text-white/30 text-sm mt-6">
            This ensures structured communication and secure module-based access.
          </p>
        </div>
      </div>
    );
  }

    return (
        <>
            <div className='w-[96%] lg:w-full mx-auto lg:px-[1%] lg:pt-[1%]' >
                <DashboardHeader />
                <div className=" flex  lg:mt-[0.5%] md:gap-x-[0.5rem] lg:gap-x-[0.5%] rounded-xl overflow-hidden">
                    <DashboardSidebar openSidebar={false} />
                    <MessagingWorkspace />
                    <ConversationPanel />
                    <ConversationInsightPanel open={false} />
                    <MobileModuleNavigation />
                </div>
            </div>
        </>
    )
}

export default Inbox