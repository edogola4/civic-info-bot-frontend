'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage, { Message } from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import TypingIndicator from '@/components/TypingIndicator'
import ExampleQuestions from '@/components/ExampleQuestions'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    setError(null)
    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversation_history: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer, sources: data.sources },
      ])
    } catch {
      setError('Unable to connect. Please try again.')
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  const showExamples = messages.length === 0 && !loading

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2D6A4F] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">KE</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-[#1B1B1B] leading-tight">Kenya Civic Info Bot</h1>
              <p className="text-xs text-gray-500 leading-tight">Ask me anything about Kenya's Constitution, voting rights, or county government</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 ml-12">
            Powered by Anthropic Claude · Grounded on official Kenyan sources
          </p>
        </div>
      </header>

      {/* Scrollable chat area */}
      <main className="flex-1 overflow-y-auto py-4">
        <div className="max-w-2xl mx-auto px-4 flex flex-col gap-4">
          {showExamples && <ExampleQuestions onSelect={sendMessage} />}

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {loading && (
            <div className="flex items-start">
              <TypingIndicator />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input + footer — pinned to bottom, never overlaps chat */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 pt-3 pb-2">
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
        <p className="text-[10px] text-gray-300 text-center pb-2 px-4">
          Built by Brandon Ogola · brandonogola.dev ·{' '}
          Sources: Kenya Constitution 2010 · IEBC · County Government Info
        </p>
      </div>
    </div>
  )
}
