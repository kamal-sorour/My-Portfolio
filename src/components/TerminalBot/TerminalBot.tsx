"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Send, Bot, Loader2, Sparkles, Code2, Command } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user' | 'system';
}

const TerminalBot = () => {
    const tHero = useTranslations('hero');
    const tChat = useTranslations('chatBot');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    const qaList = tChat.raw('qa') as { keywords: string[], answer: string }[];
    const greetings = tChat.raw('greetings') as string[];

    // States
    const [mode, setMode] = useState<'typing' | 'booting' | 'chat'>('typing');
    const [codeText, setCodeText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [bootLogs, setBootLogs] = useState<string[]>([]);
    
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const profileCode = [
        `  name: "${tHero('code.name')}",`,
        `  age: ${tHero('code.age')},`,
        `  location: "${tHero('code.location')}",`,
        `  role: "${tHero('code.role')}",`,
        `  hardWorker: ${tHero('code.hardWorker')}`,
    ].join('\n');

    const suggestedQuestions = isArabic 
        ? ["من هو كمال؟", "ما هي مهاراتك؟", "أخبرني عن مشاريعك", "كيفية التواصل؟"]
        : ["Who are you?", "What are your skills?", "Tell me about projects", "How to contact?"];

    // 1. الأنيميشن الخاص بكتابة الكود
    useEffect(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            index += 1;
            setCodeText(profileCode.slice(0, index));

            if (index >= profileCode.length) {
                clearInterval(typeInterval);
                setIsTypingComplete(true); // نوقف هنا ومينقلش للشات لوحده
            }
        }, 30);

        return () => clearInterval(typeInterval);
    }, [profileCode]);

    // 2. حل مشكلة السكرول المزعجة (عزل السكرول داخل التيرمنال فقط)
    useEffect(() => {
        if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages, mode, isBotTyping, bootLogs]);

    // 3. اللمسة الإبداعية: Boot Sequence Transition
    const launchAssistant = () => {
        setMode('booting');
        const logs = [
            "[OK] Starting Kamal.dev AI Kernel...",
            "[OK] Mounting portfolio file systems...",
            "[OK] Bypassing mainframe security (just kidding)...",
            "[OK] Loading Natural Language Processing modules...",
            "Initializing Assistant Interface..."
        ];
        
        let currentLog = 0;
        const logInterval = setInterval(() => {
            setBootLogs(prev => [...prev, logs[currentLog]]);
            currentLog++;
            
            if (currentLog === logs.length) {
                clearInterval(logInterval);
                setTimeout(() => {
                    setMode('chat');
                    setMessages([{ id: Date.now(), text: tChat('greetingResponse'), sender: 'bot' }]);
                }, 800);
            }
        }, 400); // سرعة ظهور رسائل الإقلاع
    };

    // 4. منطق إرسال الرسائل والأوامر السرية (Secret Commands)
    const handleSend = (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        const userMessage: Message = { id: Date.now(), text: textToSend, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        const lowerInput = textToSend.toLowerCase().trim();

        // 🌟 الأوامر السرية للتيرمنال
        if (lowerInput === 'clear') {
            setTimeout(() => setMessages([]), 200);
            return;
        }
        if (lowerInput === 'date') {
            setTimeout(() => setMessages(prev => [...prev, { id: Date.now(), text: new Date().toString(), sender: 'system' }]), 200);
            return;
        }
        if (lowerInput === 'sudo hire kamal') {
            setTimeout(() => setMessages(prev => [...prev, { 
                id: Date.now(), 
                text: "🎉 ACCESS GRANTED: You just made a great decision! Please contact kamalsorour0@gmail.com immediately.", 
                sender: 'system' 
            }]), 500);
            return;
        }
        if (lowerInput === 'sudo fire kamal') {
            setTimeout(() => setMessages(prev => [...prev, { 
                id: Date.now(), 
                text: "⚠️ ACCESS DENIED: You can't fire me! I'm indispensable. 😎",
                sender: 'system' 
            }]), 500);
            return;
        }
        if (lowerInput === 'sudo help') {
            setTimeout(() => setMessages(prev => [...prev, { 
                id: Date.now(),
                text: "Available commands:\n- clear: Clear the console\n- date: Show current date\n- sudo hire kamal: Contact Kamal for opportunities\n- sudo fire kamal: Attempt to fire Kamal (not recommended)\n- sudo help: Show this help message",
                sender: 'system' 
            }]), 500);
            return;
        }

        setIsBotTyping(true);

        setTimeout(() => {
            let responseText = tChat('default');

            if (greetings.some(g => lowerInput.includes(g))) {
                responseText = tChat('greetingResponse');
            } else {
                const match = qaList.find(q => q.keywords.some(k => lowerInput.includes(k)));
                if (match) responseText = match.answer;
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot' }]);
            setIsBotTyping(false);
        }, 600);
    };

    return (
        <div className="relative w-full max-w-lg perspective-1000 mx-auto group z-20" dir="ltr">
            
            {/* 🌟 Floating Decorations حول التيرمنال */}
            <div className="absolute -top-10 -left-10 text-primary/30 animate-float pointer-events-none hidden md:block">
                <Code2 size={48} className="transform -rotate-12" />
            </div>
            <div className="absolute -bottom-8 -right-8 text-purple-500/30 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '1.5s' }}>
                <Command size={40} className="transform rotate-12" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full animate-pulse-glow pointer-events-none z-0" />

            {/* نافذة الـ Terminal */}
            <div className="relative z-10 bg-[#1e1e1e]/95 backdrop-blur-2xl rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-700/50 transform transition-all duration-700 hover:shadow-primary/20 hover:border-primary/40 flex flex-col h-112.5">
                
                {/* شريط الأزرار العلوي (Mac Style) */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#404040]">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
                    </div>
                    <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
                        {mode === 'typing' ? (
                            <><Terminal size={12} /> profile.config.js</>
                        ) : mode === 'booting' ? (
                            <><Loader2 size={12} className="animate-spin" /> booting...</>
                        ) : (
                            <><Bot size={12} className="text-primary animate-pulse" /> kamal-assistant.sh</>
                        )}
                    </div>
                    <div className="w-12" />
                </div>

                {/* شاشة العرض (Scrollable Container) */}
                <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-5 font-mono text-sm custom-scrollbar relative scroll-smooth"
                    role="log"
                    aria-live="polite"
                >
                    {/* 1. وضع الكتابة الأولية */}
                    {mode === 'typing' && (
                        <div className="text-gray-300 whitespace-pre-wrap">
                            <span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">Developer</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#d4d4d4]">{'{'}</span><br />
                            {codeText}
                            {!isTypingComplete && <span className="animate-pulse w-2 h-4 inline-block bg-primary align-middle ml-1" />}
                            
                            {isTypingComplete && (
                                <div className="animate-fade-in mt-2">
                                    <span className="text-[#d4d4d4]">{'};'}</span>
                                    <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-col items-start gap-4">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider">System ready. Assistant available.</p>
                                        <button 
                                            onClick={launchAssistant}
                                            className="group flex items-center gap-2 text-primary hover:text-white bg-primary/10 hover:bg-primary py-2 px-4 rounded-lg transition-all border border-primary/30 font-semibold"
                                            aria-label={isArabic ? 'بدء تشغيل المساعد الذكي' : 'Launch Kamal AI assistant'}
                                        >
                                            <span className="text-gray-400 group-hover:text-white transition-colors">&gt;</span>
                                            ./launch_kamal_ai.sh
                                            <Sparkles size={16} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2. وضع الإقلاع (Boot Sequence) */}
                    {mode === 'booting' && (
                        <div className="space-y-1 animate-fade-in font-mono text-xs md:text-sm">
                            {bootLogs.map((log, i) => (
                                <div key={i} className="text-emerald-400">
                                    <span className="opacity-50 mr-2">[{new Date().getMilliseconds()}]</span>
                                    {log}
                                </div>
                            ))}
                            <div className="animate-pulse text-gray-500 mt-2">_</div>
                        </div>
                    )}

                    {/* 3. وضع الشات */}
                    {mode === 'chat' && (
                        <div className="space-y-5 animate-fade-in pb-4">
                            <div className="text-gray-500 mb-6 border-b border-gray-700/50 pb-2 text-xs">
                                System: Assistant online. Type 'sudo help' for available commands. Try 'sudo hire kamal' for a surprise. type 'sudo fire kamal' for a fun response. Enjoy! 🚀
                            </div>
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex gap-3 text-[13px] md:text-sm">
                                    <span className="shrink-0 mt-0.5">
                                        {msg.sender === 'user' ? (
                                            <span className="text-blue-400">~/guest$</span>
                                        ) : msg.sender === 'system' ? (
                                            <span className="text-yellow-400">system#</span>
                                        ) : (
                                            <span className="text-primary">kamal@bot&gt;</span>
                                        )}
                                    </span>
                                    <span className={`leading-relaxed ${
                                        msg.sender === 'user' ? 'text-gray-300' : 
                                        msg.sender === 'system' ? 'text-yellow-300 font-bold' : 'text-emerald-400'
                                    }`}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))}
                            {isBotTyping && (
                                <div className="flex gap-3 text-gray-500 animate-pulse text-sm">
                                    <span className="text-primary">kamal@bot&gt;</span>
                                    <span>processing...</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* مكان إدخال الرسائل والأسئلة المقترحة */}
                <div className={`transition-all duration-500 ease-in-out border-t border-[#404040] bg-[#252526] ${mode === 'chat' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none hidden'}`}>
                    
                    {/* الأسئلة المقترحة (FAQ) */}
                    <div className="px-4 py-3 bg-[#1e1e1e] flex items-center gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap border-b border-[#333]">
                        {suggestedQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(q)}
                                disabled={isBotTyping}
                                className="text-xs bg-[#2d2d2d] hover:bg-primary/20 text-gray-400 hover:text-primary border border-gray-700/50 hover:border-primary/50 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* الإدخال */}
                    <div className="flex items-center h-14 px-4 gap-2">
                        <span className="text-blue-400 font-mono text-sm shrink-0">~/guest$</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={isArabic ? 'اكتب سؤالك هنا...' : 'Type a command...'}
                            className={`flex-1 bg-transparent text-gray-300 font-mono text-sm focus:outline-none placeholder:text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`}
                            dir="auto"
                            autoComplete="off"
                            aria-label={isArabic ? 'اكتب سؤالك هنا...' : 'Type a command...'}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isBotTyping}
                            className="text-primary hover:text-white transition-colors disabled:opacity-50 p-2"
                            aria-label={isArabic ? 'إرسال الرسالة' : 'Send message'}
                        >
                            <Send size={16} className={isArabic ? 'transform rotate-180' : ''} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalBot;