import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageSquare, Send, Sparkles, X } from "lucide-react";

const CHAT_ENDPOINT = (import.meta.env.VITE_CHAT_ENDPOINT as string | undefined) ?? "/api/chat";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  isError?: boolean;
}

function extractAnswer(payload: unknown): string {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const candidate = record.answer ?? record.response ?? record.result ?? record.message;
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }
  return "I couldn't find a clear answer for that. Try rephrasing your question.";
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={`${keyPrefix}-${index}`}>{part}</span>
    )
  );
}

function normalizeListBreaks(text: string): string {
  return text
    .replace(/\s+(\d+[.)])\s+(?=\S)/g, "\n$1 ")
    .replace(/\s+-\s+(?=\S)/g, "\n- ");
}

function MessageContent({ text }: { text: string }) {
  const lines = normalizeListBreaks(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const bulletMatch = line.match(/^[-*]\s+(.*)/);
        const numberedMatch = line.match(/^(\d+)[.)]\s+(.*)/);

        if (bulletMatch) {
          return (
            <div key={index} className="flex gap-2 pl-1">
              <span className="text-muted-foreground">-</span>
              <span>{renderInline(bulletMatch[1], `${index}`)}</span>
            </div>
          );
        }

        if (numberedMatch) {
          return (
            <div key={index} className="flex gap-2 pl-1">
              <span className="text-muted-foreground">{numberedMatch[1]}.</span>
              <span>{renderInline(numberedMatch[2], `${index}`)}</span>
            </div>
          );
        }

        return <p key={index}>{renderInline(line, `${index}`)}</p>;
      })}
    </div>
  );
}

function createId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I'm Abhishek's AI assistant. Ask me about his projects, skills, or experience.",
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || isSending) return;

    const userMessage: ChatMessage = { id: createId(), role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorText =
          (data && typeof data === "object" && typeof (data as { message?: unknown }).message === "string"
            ? (data as { message: string }).message
            : undefined) ?? "The assistant is temporarily unavailable. Please try again shortly.";
        setMessages((prev) => [
          ...prev,
          { id: createId(), role: "assistant", text: errorText, isError: true },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", text: extractAnswer(data) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: "Network error. Please check your connection and try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass mb-4 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/20 bg-primary/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <p className="text-sm font-semibold text-foreground">Ask about Abhishek</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/40 hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.isError
                        ? "bg-destructive/10 text-destructive"
                        : "bg-white/70 text-foreground"
                    }`}
                  >
                    {message.role === "assistant" && !message.isError ? (
                      <MessageContent text={message.text} />
                    ) : (
                      <span className="whitespace-pre-wrap">{message.text}</span>
                    )}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-sm text-muted-foreground">
                    <Loader2 size={14} className="animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/20 px-3 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question..."
                disabled={isSending}
                className="flex-1 rounded-full border border-border bg-white/60 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                aria-label="Send message"
                className="inline-flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
