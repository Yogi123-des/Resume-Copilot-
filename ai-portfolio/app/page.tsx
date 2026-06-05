"use client";



import { useState, useEffect, useRef } from 'react';

import profileData from '../profile.json';

import {

  Mic, MicOff, Send, Briefcase, GraduationCap,

  Code, MailIcon, PhoneIcon, User, Bot, Sparkles, HeartHandshake

} from 'lucide-react';



interface Message {

  role: 'user' | 'assistant';

  content: string;

}



export default function Home() {

 

  const [messages, setMessages] = useState<Message[]>([

    {

      role: 'assistant',

      content: `Hi! I'm the AI Copilot for Yogesh Kumar Saxena. Ask me anything about my Physics & Computer Science background at BITS Goa, my game development projects, or my marketing and stand-up comedy experience!`

    }

  ]);

  const [input, setInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [isListening, setIsListening] = useState(false);



  const chatEndRef = useRef<HTMLDivElement>(null);

  const recognitionRef = useRef<any>(null);



 

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);



 

  const parsedSkills = profileData.skills[0]

    ? profileData.skills[0].split(',').map(skill => skill.trim())

    : [];



  const compiledProjects = [

    { ...profileData["project 1"][0], title: profileData["project 1"][0].title },

    { ...profileData["project 2"][0], title: profileData["project 2"][0].title },

    { ...profileData["project 3"][0], title: profileData["project 3"][0].title },

    { ...profileData["project 4"][0], title: profileData["project 4"][0].title },

    {

      title: "Ideal Gas Simulation",

      description: profileData["project 5"][0].description,

      techStack: profileData["project 5"][0].techStack,

      liveLink: undefined

    }

  ];



  const compiledExperience = [

    {

      role: profileData["work experience 1"][0].role,

      source: profileData["work experience 1"][0].company,

      duration: profileData["work experience 1"][0].duration,

      highlights: profileData["work experience 1"][0].highlights

    },

    {

      role: profileData["work experience 2"][0].role,

      source: profileData["work experience 2"][0].club,

      duration: profileData["work experience 2"][0].duration,

      highlights: profileData["work experience 2"][0].highlights

    },

    {

      role: profileData["work experience 3"][0].role,

      source: (profileData["work experience 3"][0] as any).Club || (profileData["work experience 3"][0] as any).company,

      duration: profileData["work experience 3"][0].duration,

      highlights: profileData["work experience 3"][0].highlights

    }

  ];



  useEffect(() => {

    if (typeof window !== 'undefined') {

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {

        const rec = new SpeechRecognition();

        rec.continuous = false;

        rec.interimResults = false;

        rec.lang = 'en-US';



        rec.onresult = (event: any) => {

          const transcript = event.results[0][0].transcript;

          setInput(transcript);

          setIsListening(false);

        };

        rec.onerror = () => setIsListening(false);

        rec.onend = () => setIsListening(false);



        recognitionRef.current = rec;

      }

    }

  }, []);



  const toggleListening = () => {

    if (!recognitionRef.current) {

      alert("Voice recognition is not supported or initialized in this browser.");

      return;

    }

    if (isListening) {

      recognitionRef.current.stop();

      setIsListening(false);

    } else {

      setIsListening(true);

      recognitionRef.current.start();

    }

  };



  const handleSendMessage = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!input.trim() || isLoading) return;



    const userMessage = input.trim();

    setInput('');

   

    const updatedMessages: Message[] = [...messages, { role: 'user', content: userMessage }];

    setMessages(updatedMessages);

    setIsLoading(true);



    try {

      const response = await fetch('/api/chat', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ messages: updatedMessages }),

      });



      if (!response.ok) throw new Error("Failed to contact API backend route");

      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

    } catch (error) {

      setMessages(prev => [...prev, { role: 'assistant', content: "System communication latency error: Check your backend router log execution traces." }]);

    } finally {

      setIsLoading(false);

    }

  };



  return (

   

    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row antialiased font-sans selection:bg-sky-500/20">

     

      {/* ================= LEFT PROFILE GRID ================= */}

      <section className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-800 custom-scrollbar md:h-screen flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950">

        <div>

          {/* Main Context Card Header */}

          <div className="mb-10 animate-fade-in">

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-medium mb-4">

              <Sparkles size={12} /> Yogesh's Resume

            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">

              {profileData.about.name}

            </h1>

            <p className="text-lg text-sky-400 mt-2 font-medium leading-normal">{profileData.about.role}</p>

            <p className="text-slate-300 mt-4 leading-relaxed max-w-xl text-sm">{profileData.about.summary}</p>

           

            {/* Contact Grid Section */}

            <div className="flex flex-col gap-2 mt-6 max-w-md">

               <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/40 border border-slate-800 rounded-lg text-slate-300 text-sm cursor-default">

                  <MailIcon size={16} className="text-sky-400" />

                  <span>{profileData.contact.email || "saxenayogesh459@gmail.com"}</span>

               </div>

               <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/40 border border-slate-800 rounded-lg text-slate-300 text-sm cursor-default">

                  <PhoneIcon size={16} className="text-sky-400" />

                  <span>{profileData.contact.phone || "+91 7017362735"}</span>

               </div>

               <div className="flex gap-2 w-full">

                  <a

                    href={profileData.contact.github}

                    target="_blank"

                    rel="noreferrer"

                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-white text-sm hover:bg-slate-800 transition-colors"

                  >

                    <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.061.069-.061 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>

                    <span>GitHub</span>

                  </a>

                  <a

                    href={profileData.contact.linkedin}

                    target="_blank"

                    rel="noreferrer"

                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-white text-sm hover:bg-slate-800 transition-colors"

                  >

                    <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>

                    <span>LinkedIn</span>

                  </a>

               </div>

            </div>

          </div>



          <hr className="border-slate-800 my-6" />



          {/* Core TechStack Section */}

          <div className="mb-10">

            <h2 className="text-xs font-bold flex items-center gap-2 text-sky-400 mb-4 uppercase tracking-wider">

              <Code size={14} className="text-sky-400" /> Core TechStack and Other Skills

            </h2>

            <div className="flex flex-wrap gap-2">

              {parsedSkills.map((skill, index) => (

                <span key={index} className="px-3 py-1.5 bg-slate-950/50 border border-slate-800 text-slate-300 rounded-md text-xs font-mono">

                  {skill}

                </span>

              ))}

            </div>

          </div>



          {/* Technical & Scientific Projects */}

          <div className="mb-10">

            <h2 className="text-xs font-bold flex items-center gap-2 text-sky-400 mb-4 uppercase tracking-wider">

              <Briefcase size={14} className="text-sky-400" /> Technical & Scientific Projects

            </h2>

            <div className="space-y-4">

              {compiledProjects.map((proj, idx) => {

                const projectLink = (proj as any).liveLink || (proj as any)["GitHub Link"];

                return (

                  <div key={idx} className="p-5 bg-gradient-to-b from-slate-950/40 to-slate-950/10 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">

                    <div className="flex justify-between items-baseline">

                      <h3 className="font-semibold text-white text-sm">{proj.title}</h3>

                      {projectLink && (

                        <a href={projectLink} target="_blank" rel="noreferrer" className="text-xs text-sky-400 hover:underline">

                          Link →

                        </a>

                      )}

                    </div>

                    <p className="text-slate-300 text-xs mt-2 leading-relaxed">{proj.description}</p>

                   

                    <div className="flex flex-wrap gap-1.5 mt-3">

                      {Array.isArray(proj.techStack) ? (

                        proj.techStack.map((tech, i) => (

                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-950 text-slate-300 rounded">{tech}</span>

                        ))

                      ) : (

                        proj.techStack && proj.techStack.split(',').map((tech, i) => (

                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-950 text-slate-300 rounded">{tech.trim()}</span>

                        ))

                      )}

                    </div>

                  </div>

                );

              })}

            </div>

          </div>



          {/* Work & Leadership Experience */}

          <div className="mb-10">

            <h2 className="text-xs font-bold flex items-center gap-2 text-sky-400 mb-4 uppercase tracking-wider">

              <GraduationCap size={14} className="text-sky-400" /> Work & Leadership Experience

            </h2>

            <div className="space-y-4">

              {compiledExperience.map((exp, idx) => (

                <div key={idx} className="border-l-2 border-slate-700 pl-4 py-0.5 ml-1">

                  <div className="flex justify-between items-baseline flex-wrap gap-1">

                    {/* Headings and subheadings now use absolute pristine white layout */}

                    <h3 className="font-semibold text-white text-sm">

                      {exp.role} <span className="text-white font-normal">at {exp.source}</span>

                    </h3>

                    {/* Timeline positions flipped uniformly to white */}

                    <span className="text-xs font-mono text-white font-medium">{exp.duration}</span>

                  </div>

                  <ul className="list-disc list-inside text-slate-300 text-xs mt-2 space-y-1 pl-0.5">

                    {exp.highlights.map((bullet, i) => <li key={i}>{bullet}</li>)}

                  </ul>

                </div>

              ))}

            </div>

          </div>



          {/* Volunteering Section */}

          <div className="mb-6">

            <h2 className="text-xs font-bold flex items-center gap-2 text-sky-400 mb-4 uppercase tracking-wider">

              <HeartHandshake size={14} className="text-sky-400" /> Peer & Social Volunteering

            </h2>

            {profileData["volunteering experience"].map((vol, idx) => (

              <div key={idx} className="border-l-2 border-slate-700 pl-4 py-0.5 ml-1">

                <div className="flex justify-between items-baseline flex-wrap gap-1">

                  <h3 className="font-semibold text-white text-sm">

                    {vol.role} <span className="text-white font-normal">for {(vol as any).Organisation}</span>

                  </h3>

                  <span className="text-xs font-mono text-white font-medium">{vol.duration}</span>

                </div>

                <ul className="list-disc list-inside text-slate-300 text-xs mt-2 pl-0.5">

                  {vol.highlights.map((bullet, i) => <li key={i}>{bullet}</li>)}

                </ul>

              </div>

            ))}

          </div>



          {/* Academic Profile Track */}

          <div className="mb-6 pt-4 border-t border-slate-800">

            <h2 className="text-xs font-bold flex items-center gap-2 text-sky-400 mb-3 uppercase tracking-wider">

              Education Status

            </h2>

            {profileData.education.map((edu, idx) => (

              <div key={idx} className="text-xs">

                <p className="font-semibold text-white">{edu.degree}</p>

                <p className="text-slate-300 mt-0.5">{edu.institution} | <span className="text-white font-mono">{edu.year}</span></p>

              </div>

            ))}

          </div>

        </div>



        <p className="text-[10px] text-slate-500 font-mono mt-8">© {new Date().getFullYear()} Yogesh Kumar Saxena — BITS Goa Compiler Mode</p>

      </section>



      {/* ================= RIGHT INTERACTIVE AGENT ================= */}

      <section className="w-full md:w-1/2 flex flex-col bg-slate-900/60 md:h-screen">

       

        {/* Banner Status Frame */}

        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between backdrop-blur-sm">

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">

              <Bot size={16} />

            </div>

            <div>

              <h2 className="text-xs font-semibold text-white">Yogesh's AI Assistant</h2>

              <p className="text-[10px] text-sky-400 flex items-center gap-1 mt-0.5">

                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span> Anti-Hallucination Guardrails Active

              </p>

            </div>

          </div>

        </div>



        {/* Messaging Container Track */}

        <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">

          {messages.map((msg, index) => (

            <div key={index} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>

              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${

                msg.role === 'user'

                  ? 'bg-slate-950/80 text-slate-200 border border-slate-800'

                  : 'bg-slate-950/80 text-sky-400 border border-slate-800'

              }`}>

                {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}

              </div>

              <div className={`p-4 rounded-xl text-xs leading-relaxed ${

                msg.role === 'user'

                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md font-medium'

                  : 'bg-slate-950/40 border border-slate-800 text-slate-200 rounded-tl-none'

              }`}>

                <p className="whitespace-pre-wrap">{msg.content}</p>

              </div>

            </div>

          ))}



          {/* Computing Feedback State */}

          {isLoading && (

            <div className="flex gap-3 max-w-[85%]">

              <div className="w-7 h-7 rounded-full bg-slate-950/80 border border-slate-800 flex items-center justify-center text-sky-400">

                <Bot size={13} />

              </div>

              <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl rounded-tl-none flex items-center gap-1">

                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]"></span>

                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]"></span>

                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"></span>

              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>



        {/* Input Interface Layout */}

        <div className="p-4 border-t border-slate-800 bg-slate-950/30 backdrop-blur-sm">

          <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto relative items-center">

           

            <button

              type="button"

              onClick={toggleListening}

              className={`p-3 rounded-xl border transition-all shrink-0 ${

                isListening

                  ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'

                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'

              }`}

              title={isListening ? "Mute Microphone" : "Dictate Prompt Input"}

            >

              {isListening ? <MicOff size={16} /> : <Mic size={16} />}

            </button>



            <input

              type="text"

              value={input}

              onChange={(e) => setInput(e.target.value)}

              placeholder={isListening ? "Listening closely..." : "Ask about Physics projects, Game Development, Academic expieriences or comedy..."}

              disabled={isListening}

              className="flex-1 p-3 bg-slate-950/60 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl text-xs focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 disabled:opacity-50 transition-all"

            />



            <button

              type="submit"

              disabled={!input.trim() || isLoading}

              className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl transition-all shadow-lg flex items-center justify-center shrink-0"

            >

              <Send size={16} />

            </button>

          </form>

        </div>

      </section>

    </main>

  );

}

