'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const INITIAL_MESSAGE = `Hi! 👋 I'm the MageMatch assistant.
I help connect store owners with verified 
Magento developers.

To get started — what platform is your 
store built on? Magento 2 Open Source, 
Adobe Commerce, or Adobe Commerce Cloud?`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  const isSendDisabled = useMemo(
    () => isTyping || inputValue.trim().length === 0,
    [isTyping, inputValue]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasOpenedRef.current) {
      setMessages([{ role: 'assistant', content: INITIAL_MESSAGE }]);
      hasOpenedRef.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    const openChat = () => {
      setIsOpen(true);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    };

    window.addEventListener('openChat', openChat);
    return () => {
      window.removeEventListener('openChat', openChat);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isTyping) {
      inputRef.current?.focus();
    }
  }, [messages.length, isTyping, isOpen]);

  async function sendUserMessage(content: string) {
    const trimmedContent = content.trim();
    if (isTyping || trimmedContent.length === 0) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmedContent,
    };
    const outgoingMessages = [...messages, userMessage];

    setMessages(outgoingMessages);
    setInputValue('');
    inputRef.current?.focus();
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: outgoingMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assistant response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content:
          typeof data.message === 'string' && data.message.trim().length > 0
            ? data.message
            : 'Sorry — I could not generate a response just now.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry — something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  async function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSendDisabled) return;
    await sendUserMessage(inputValue);
  }

  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'assistant');
  const showOptInButtons =
    !isTyping &&
    typeof lastAssistantMessage?.content === 'string' &&
    (lastAssistantMessage.content.includes('One last thing — would you also like to') ||
      lastAssistantMessage.content.includes('Yes / No'));

  return (
    <>
      <button
        id="chat"
        onClick={() => {
          setIsOpen(true);
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        }}
        className="fixed right-6 bottom-6 z-50 rounded-full bg-[#F97316] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#ea6a10] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/70"
        aria-label="Open MageMatch assistant"
      >
        <span className="inline-flex items-center gap-2 animate-pulse">
          Get Matched ✦
        </span>
      </button>

      <div
        className={`fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-6 opacity-0 pointer-events-none'
        } inset-0 h-dvh w-full rounded-none sm:inset-auto sm:right-6 sm:bottom-24 sm:h-135 sm:w-95 sm:rounded-2xl`}
        role="dialog"
        aria-modal="true"
        aria-label="MageMatch Assistant Chat"
      >
        <div className="bg-[#F97316] px-4 py-3 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold leading-tight">MageMatch Assistant</h2>
              <p className="text-xs text-orange-100">Find your perfect Magento developer</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-[#ea6a10]"
              aria-label="Close MageMatch assistant"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-white px-4 py-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === 'user'
                    ? 'rounded-br-md bg-[#F97316] text-white'
                    : 'rounded-bl-md bg-[#F3F4F6] text-zinc-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-[#F3F4F6] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
                </div>
              </div>
            </div>
          )}

          {showOptInButtons ? (
            <div className="flex justify-start">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => sendUserMessage('Yes')}
                  className="rounded-full bg-[#F97316] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[#ea6a10]"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => sendUserMessage('No')}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                  No
                </button>
              </div>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="border-t border-zinc-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Type your message..."
              className="h-10 flex-1 rounded-lg border border-zinc-300 px-3 text-sm outline-none transition focus:border-[#F97316]"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isSendDisabled}
              className="h-10 rounded-lg bg-[#F97316] px-4 text-sm font-semibold text-white transition hover:bg-[#ea6a10] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-zinc-500">Powered by MageMatch AI</p>
        </form>
      </div>
    </>
  );
}
