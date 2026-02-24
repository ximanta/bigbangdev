import React, { useState, useRef, useEffect } from 'react'
import './index.css'

const AGENTS = [
    { id: 'Architect', icon: '🏛', label: 'Architect', desc: 'System Design & PRD', color: '#a78bfa', glow: '#7c3aed' },
    { id: 'Developer', icon: '💻', label: 'Developer', desc: 'Code Generation', color: '#60a5fa', glow: '#2563eb' },
    { id: 'QA Critic', icon: '🔍', label: 'QA Critic', desc: 'Quality Assurance', color: '#fbbf24', glow: '#d97706' },
    { id: 'Doc Engineer', icon: '📝', label: 'Doc Engineer', desc: 'Documentation', color: '#f472b6', glow: '#db2777' },
    { id: 'DevOps Engineer', icon: '🚀', label: 'DevOps Engineer', desc: 'GitHub & Deploy', color: '#34d399', glow: '#059669' },
]

const AGENT_MAP = Object.fromEntries(AGENTS.map(a => [a.id, a]))

const classifyIntent = (text) => {
    const deployWords = ['live', 'deploy', 'ship', 'production', 'release', 'push', 'publish']
    return deployWords.some(w => text.toLowerCase().includes(w)) ? 'deploy' : 'build'
}

export default function App() {
    const [prompt, setPrompt] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [statuses, setStatuses] = useState({})        // agentId -> 'working' | 'done' | 'error'
    const [activeAgent, setActiveAgent] = useState(null) // spotlight agent (never Doc Engineer — it's background)
    const [events, setEvents] = useState([])            // unified timeline
    const [files, setFiles] = useState([])
    const [deployUrl, setDeployUrl] = useState(null)
    const [thinkingMap, setThinkingMap] = useState({})  // per-agent latest message text
    const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
    const termRef = useRef(null)
    const sourceRef = useRef(null)

    useEffect(() => {
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
    }, [events])

    const addEvent = (kind, agent, text, extra = {}) => {
        setEvents(prev => [...prev, { id: Date.now() + Math.random(), kind, agent, text, ...extra }])
    }

    // Shared SSE wiring — call after state reset, with explicit intent so backend never misclassifies
    const startPipeline = async (promptText, intent) => {
        setIsRunning(true)
        if (sourceRef.current) { sourceRef.current.close(); sourceRef.current = null }
        try {
            const res = await fetch('http://localhost:8090/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: promptText, intent }),
            })
            if (!res.ok) throw new Error('Backend error')

            const source = new EventSource('http://localhost:8090/api/stream')
            sourceRef.current = source

            source.onmessage = (ev) => {
                const d = JSON.parse(ev.data)
                if (d.agent) {
                    if (d.agent !== 'Doc Engineer') setActiveAgent(d.agent)
                    setStatuses(prev => ({ ...prev, [d.agent]: d.status }))
                }
                if (d.data) {
                    setThinkingMap(prev => ({ ...prev, [d.agent]: d.data }))
                    addEvent('log', d.agent, d.data, { status: d.status })
                }
                if (d.file) {
                    setFiles(prev => [...prev, d.file])
                    addEvent('file', d.agent, d.file)
                }
                if (d.url) {
                    setDeployUrl(d.url)
                    addEvent('deploy', d.agent, d.url)
                }
                const isDone = d.status === 'error'
                    || (d.status === 'done' && (d.agent === 'DevOps Engineer' || d.agent === 'System'))
                if (isDone) {
                    source.close()
                    sourceRef.current = null
                    setIsRunning(false)
                    setActiveAgent(null)
                }
            }
            source.onerror = () => {
                source.close()
                sourceRef.current = null
                setIsRunning(false)
            }
        } catch (e) {
            addEvent('log', 'System', `Error: ${e.message}`, { status: 'error' })
            setIsRunning(false)
        }
    }

    const handleGenerate = async () => {
        if (!prompt.trim() || isRunning) return
        const intent = classifyIntent(prompt)
        if (intent === 'build') {
            setEvents([])
            setFiles([])
            setDeployUrl(null)
            setActiveAgent(null)
            setStatuses({})
            setThinkingMap({})
        } else {
            setStatuses(prev => { const s = { ...prev }; delete s['DevOps Engineer']; return s })
            setActiveAgent(null)
        }
        await startPipeline(prompt, intent)
    }

    // One-click deploy — calls /api/deploy directly, never touches /api/generate
    const handleShip = async () => {
        if (isRunning) return
        setStatuses(prev => { const s = { ...prev }; delete s['DevOps Engineer']; return s })
        setActiveAgent(null)
        setIsRunning(true)
        if (sourceRef.current) { sourceRef.current.close(); sourceRef.current = null }
        try {
            const res = await fetch('http://localhost:8090/api/deploy', { method: 'POST' })
            if (!res.ok) throw new Error('Deploy error')

            const source = new EventSource('http://localhost:8090/api/stream')
            sourceRef.current = source

            source.onmessage = (ev) => {
                const d = JSON.parse(ev.data)
                if (d.agent) {
                    if (d.agent !== 'Doc Engineer') setActiveAgent(d.agent)
                    setStatuses(prev => ({ ...prev, [d.agent]: d.status }))
                }
                if (d.data) {
                    setThinkingMap(prev => ({ ...prev, [d.agent]: d.data }))
                    addEvent('log', d.agent, d.data, { status: d.status })
                }
                if (d.url) {
                    setDeployUrl(d.url)
                    addEvent('deploy', d.agent, d.url)
                }
                const isDone = d.status === 'error'
                    || (d.status === 'done' && (d.agent === 'DevOps Engineer' || d.agent === 'System'))
                if (isDone) {
                    source.close()
                    sourceRef.current = null
                    setIsRunning(false)
                    setActiveAgent(null)
                }
            }
            source.onerror = () => {
                source.close()
                sourceRef.current = null
                setIsRunning(false)
            }
        } catch (e) {
            addEvent('log', 'System', `Deploy error: ${e.message}`, { status: 'error' })
            setIsRunning(false)
        }
    }

    const agentInfo = (id) => AGENT_MAP[id] || { color: '#94a3b8', glow: '#475569', icon: '◎', label: id }

    return (
        <div className="app">
            {/* ── HEADER ── */}
            <header className="header">
                <div className="brand">
                    <div className="brand-wordmark">
                        <span className="bw-big">BIGBANG</span><span className="bw-dev">.DEV</span>
                    </div>
                    <div className="brand-tagline">IMAGINE&nbsp;|&nbsp;COOK&nbsp;|&nbsp;SHIP</div>
                </div>
                <div className="prompt-area">
                    <span className="prompt-label">APP PROMPT</span>
                    <div className="prompt-row">
                        <textarea
                            className="prompt-input"
                            rows={2}
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleGenerate()
                                }
                            }}
                            placeholder="e.g. A cooking recipe website with search and favourites"
                            disabled={isRunning}
                        />
                        <button className={`gen-btn ${isRunning ? 'busy' : ''}`} onClick={handleGenerate} disabled={isRunning}>
                            <span className="btn-indicator" />
                            <span className="btn-label">{isRunning ? 'BUILDING' : 'GENERATE'}</span>
                            <span className="btn-chevron">{isRunning ? <span className="spin">◌</span> : '›'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Removed PIPELINE BAR */}

            {/* ── MAIN 3-COLUMN ── */}
            <main className="workspace">

                {/* LEFT: Agent sidebar */}
                <aside className="agent-sidebar">
                    <div className="panel-label">AGENTS</div>
                    {AGENTS.map(ag => {
                        const st = statuses[ag.id] || 'idle'
                        const isActive = activeAgent === ag.id
                        return (
                            <div
                                key={ag.id}
                                className={`acard acard-${st} ${isActive ? 'acard-active' : ''}`}
                                style={{ '--c': ag.color, '--g': ag.glow }}
                            >
                                <div className="acard-colorbar" />
                                <div className="acard-top">
                                    <span className="acard-icon">{ag.icon}</span>
                                    <div className="acard-meta">
                                        <span className="acard-name">{ag.label}</span>
                                        <span className="acard-desc">{ag.desc}</span>
                                    </div>
                                    <div className="acard-status">
                                        {st === 'working' && <div className="spinner" />}
                                        {st === 'done' && <div className="checkmark">✓</div>}
                                        {st === 'error' && <div className="errmark">✗</div>}
                                    </div>
                                </div>
                                {/* Show thinking strip for active agent, AND always for Doc Engineer while working */}
                                {(isActive || ag.id === 'Doc Engineer') && st === 'working' && (
                                    <div className={`acard-thinking ${ag.id === 'Doc Engineer' ? 'acard-thinking-bg' : ''}`}>
                                        <span className="dot-1">•</span>
                                        <span className="dot-2">•</span>
                                        <span className="dot-3">•</span>
                                        <span className="thinking-text">
                                            {(thinkingMap[ag.id] || '').slice(0, 60)}
                                            {(thinkingMap[ag.id] || '').length > 60 ? '…' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {isRunning && activeAgent && (
                        <div className="active-badge" style={{ '--c': agentInfo(activeAgent).color }}>
                            <span className="live-dot" />
                            {activeAgent} is working
                        </div>
                    )}
                </aside>

                {/* CENTER: Terminal */}
                <div className="terminal" ref={termRef}>
                    <div className="term-header">
                        <div className="term-dots">
                            <span className="td td-r" /><span className="td td-y" /><span className="td td-g" />
                        </div>
                        <span className="term-title">LIVE EVENT STREAM</span>
                        <span className="term-badge">{isRunning ? <><span className="live-dot small" /> LIVE</> : events.length > 0 ? 'COMPLETE' : 'READY'}</span>
                    </div>
                    <div className="term-body">
                        {events.length === 0 && !isRunning && (
                            <div className="term-idle">
                                <p className="term-prompt">$ <span className="cursor-blink">▊</span></p>
                                <p className="term-hint">Enter a prompt above and press Generate</p>
                            </div>
                        )}
                        {events.map(ev => {
                            const ag = agentInfo(ev.agent)
                            if (ev.kind === 'file') return (
                                <div key={ev.id} className="te te-file">
                                    <span className="te-agent" style={{ color: ag.color }}>[{ev.agent}]</span>
                                    <span className="te-check">✓</span>
                                    <span className="te-filepath">{ev.text}</span>
                                </div>
                            )
                            if (ev.kind === 'deploy') return (
                                <div key={ev.id} className="te te-deploy">
                                    <span className="te-agent" style={{ color: ag.color }}>[{ev.agent}]</span>
                                    <span className="te-deploy-tag">🚀 LIVE</span>
                                    <a className="te-url" href={ev.text} target="_blank" rel="noreferrer">{ev.text}</a>
                                </div>
                            )
                            return (
                                <div key={ev.id} className={`te te-log te-${ev.status}`}>
                                    <span className="te-agent" style={{ color: ag.color }}>[{ev.agent}]</span>
                                    <span className="te-text">{ev.text}</span>
                                </div>
                            )
                        })}
                        {isRunning && <div className="cursor-line"><span className="cursor-blink">▊</span></div>}
                    </div>
                </div>

                {/* RIGHT: File tree → Preview */}
                <div className={`output-panel ${isPreviewExpanded ? 'expanded' : ''}`}>
                    <div className="panel-header">
                        <div className="panel-label">{deployUrl ? 'LIVE PREVIEW' : 'OUTPUT'}</div>
                        <div className="panel-actions">
                            {deployUrl?.startsWith('http://localhost') && !isRunning && (
                                <button className="ship-btn" onClick={handleShip}>
                                    <span className="ship-dot" />
                                    SHIP TO PRODUCTION
                                </button>
                            )}
                            {deployUrl && (
                                <button
                                    className="expand-btn"
                                    onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                                    title={isPreviewExpanded ? "Collapse" : "Expand"}
                                >
                                    {isPreviewExpanded ? '⤓ Collapse' : '⤢ Expand'}
                                </button>
                            )}
                        </div>
                    </div>
                    {deployUrl ? (
                        <iframe src={deployUrl} className="preview-frame" title="Live Preview" />
                    ) : (
                        <div className="filetree">
                            {files.length === 0 ? (
                                <div className="filetree-empty">
                                    <div className="empty-icon">📦</div>
                                    <p>Files will appear here as they are generated</p>
                                </div>
                            ) : (
                                <>
                                    <div className="filetree-root">
                                        <span>📁</span> workspace/src/
                                    </div>
                                    {files.map((f, i) => (
                                        <div key={i} className="filetree-item">
                                            <span className="fi-icon">📄</span>
                                            <span className="fi-name">{f}</span>
                                        </div>
                                    ))}
                                    {isRunning && activeAgent === 'Developer' && (
                                        <div className="filetree-item writing">
                                            <span className="fi-icon">✍</span>
                                            <span className="fi-name">writing…</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

            </main>
        </div>
    )
}
