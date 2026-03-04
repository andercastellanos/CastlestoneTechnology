import VAConversationList from "@/components/va/VAConversationList"
import MessageThread from "@/components/portal/MessageThread"

export default async function VAInboxPage(props: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await props.searchParams

  return (
    <div className="flex h-full overflow-hidden">
      {/* Conversation list — hidden on mobile when thread is open */}
      <div className={`flex flex-col border-r border-[#e6dbc9] bg-white ${id ? "hidden md:flex" : "flex"} w-full md:w-80 lg:w-96 shrink-0`}>
        <VAConversationList activeId={id} />
      </div>

      {/* Message thread or empty state */}
      <div className={`flex-1 ${id ? "flex" : "hidden md:flex"} flex-col`}>
        {id ? (
          <MessageThread conversationId={id} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-[#555555]">Select a conversation</p>
            <p className="text-xs text-[#aaaaaa]">Choose a conversation from the list to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  )
}
