
import DashboardHeader from '@/components/common/dashboard-header'
import MobileModuleNavigation from '@/components/common/mobile-module-navigation'
import DashboardSidebar from '@/components/dashboard-sidebar/dashboard-sidebar'
import ChatMessages from '@/components/ChatMessages/chat-messages'
import MessagingWorkspace from '@/components/messaging-workspace'
import ConversationInsightPanel from '@/components/conversation-insight-panel'

const Inbox = () => {


    return (
        <>
            <div className='w-[96%] lg:w-full mx-auto'>
                <DashboardHeader />
                <div className=" flex  lg:mt-[0.5%] md:gap-x-[0.5rem] lg:gap-x-[0.5%] rounded-xl overflow-hidden">
                    <DashboardSidebar openSidebar={false} />
                    <MessagingWorkspace />
                    <ChatMessages />
                    <ConversationInsightPanel open={false} />
                    <MobileModuleNavigation />
                </div>
            </div>
        </>
    )
}

export default Inbox