type Message = {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#2D6A4F] text-white rounded-tr-sm'
            : 'bg-gray-100 text-[#1B1B1B] rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>

      {!isUser && message.sources && message.sources.length > 0 && (
        <div className="flex flex-wrap gap-1 max-w-[85%]">
          {message.sources.map((source) => (
            <span
              key={source}
              className="text-xs px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full font-medium"
            >
              {source}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export type { Message }
