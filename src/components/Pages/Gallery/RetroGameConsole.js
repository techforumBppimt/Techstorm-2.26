import React, { useState, useEffect, useRef, useCallback } from 'react';
import './RetroGameConsole.css';

const GAMES = [
  {
    id: 1,
    key: 'doom',
    name: 'DOOM II',
    subtitle: 'THE CLASSIC FPS',
    archiveId: 'doom-2-play',
    color: '#ff4444',
    controls: [
      'WASD / ARROWS: MOVE',
      'CTRL / LCLICK: SHOOT',
      'SPACE: USE / OPEN DOOR',
      'SHIFT: RUN FASTER',
      'ALT+ARROWS: STRAFE',
      '1-7: SWITCH WEAPON',
    ],
  },
  {
    id: 2,
    key: 'mario',
    name: 'SUPER MARIO',
    subtitle: 'CLASSIC PLATFORMER',
    archiveId: 'Dos_Mario',
    color: '#44ff44',
    controls: ['ARROWS: MOVE', 'Z / CTRL: JUMP', 'X / ALT: RUN/FIRE', 'ENTER: START'],
  },
  {
    id: 3,
    key: 'prince',
    name: 'PRINCE OF PERSIA',
    subtitle: 'THE CLASSIC PLATFORMER',
    archiveId: 'msdos_Prince_of_Persia_1990',
    color: '#ffaa00',
    controls: ['ARROWS: MOVE/CLIMB', 'SHIFT: CAREFUL WALK', 'SPACE: DRINK POTION', 'A: DRAW SWORD'],
  },
  {
    id: 4,
    key: 'pacman',
    name: 'PAC-MAN',
    subtitle: 'THE CLASSIC ARCADE',
    archiveId: 'msdos_Pac-Man_1983',
    color: '#ffff00',
    controls: ['ARROWS: MOVE', 'EAT ALL DOTS', 'AVOID GHOSTS', 'POWER PELLET: HUNT'],
  },
];

const BOOT_SEQUENCE = [
  'TECHSTORM ARCADE SYSTEM v2.26',
  '══════════════════════════════',
  'BIOS v1.0 ... OK',
  'RAM CHECK ......... 640K OK',
  'GPU INIT .......... OK',
  'AUDIO SUBSYSTEM ... OK',
  '══════════════════════════════',
  'LOADING GAME CATALOG...',
  '',
  '  AVAILABLE TITLES:',
  '',
  '  [1] DOOM II',
  '      THE CLASSIC FPS',
  '',
  '  [2] SUPER MARIO',
  '      CLASSIC PLATFORMER',
  '',
  '  [3] PRINCE OF PERSIA',
  '      THE CLASSIC PLATFORMER',
  '',
  '  [4] PAC-MAN',
  '      THE CLASSIC ARCADE',
  '',
  '══════════════════════════════',
  'SELECT GAME [1-4]:',
];

const BOOT_DELAYS = BOOT_SEQUENCE.map((_, i) => {
  if (i < 7) return 110;
  if (i === 7) return 80;
  return 55;
});

const RetroGameConsole = () => {
  const [powerOn, setPowerOn] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [blink, setBlink] = useState(true);
  const [ledPulse, setLedPulse] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const iframeRef = useRef(null);
  const iframeWrapRef = useRef(null);
  const bootTimers = useRef([]);

  /* ── blinking cursor ── */
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  /* ── track fullscreen state ── */
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  /* ── fullscreen: scale iframe so Archive.org embed (fixed 560×384) fills viewport ── */
  const EMBED_W = 560;
  const EMBED_H = 384;
  useEffect(() => {
    const updateScale = () => {
      const el = iframeWrapRef.current;
      const isFs = !!document.fullscreenElement;
      if (!el || !isFs) {
        el?.style.removeProperty('--fs-scale');
        return;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.min(w / EMBED_W, h / EMBED_H, 4);
      el.style.setProperty('--fs-scale', String(scale));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    document.addEventListener('fullscreenchange', updateScale);
    document.addEventListener('webkitfullscreenchange', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      document.removeEventListener('fullscreenchange', updateScale);
      document.removeEventListener('webkitfullscreenchange', updateScale);
    };
  }, [isFullscreen]);

  const handleFullscreen = () => {
    // Fullscreen the wrapper div — more reliable than the cross-origin iframe itself.
    // The browser will block requestFullscreen() on a cross-origin iframe triggered
    // by a button outside it; fullscreening our own wrapper has no such restriction.
    const el = iframeWrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) req.call(el).catch(() => {});
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document).catch(() => {});
    }
  };

  useEffect(() => {
    /* iOS Safari bug: overflow:hidden on body stops cross-origin iframes from
       receiving touch events. On mobile the game fills the full viewport anyway
       (terminal is hidden), so there is nothing to scroll — no locking needed.
       CSS touch-action: none on the wrapper prevents page scroll gestures;
       CSS touch-action: auto on the iframe lets the browser deliver all touches
       directly into the cross-origin game content. */
    return undefined;
  }, [selectedGame]);

  useEffect(() => {
    if (!powerOn) return;
    setLedPulse(true);
    const t = setTimeout(() => setLedPulse(false), 1500);
    return () => clearTimeout(t);
  }, [powerOn]);

  /* ── scroll terminal to bottom ── */
  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [terminalLines]);

  /* ── focus input when boot is done and no game selected ── */
  useEffect(() => {
    if (bootComplete && !selectedGame && inputRef.current)
      inputRef.current.focus();
  }, [bootComplete, selectedGame]);

  /* ── boot sequence ── */
  const runBoot = useCallback(() => {
    let i = 0;
    const step = () => {
      const line = BOOT_SEQUENCE[i];          // snapshot before updater runs
      if (line !== undefined) {
        setTerminalLines((prev) => [...prev, line]);
      }
      i++;
      if (i < BOOT_SEQUENCE.length) {
        const t = setTimeout(step, BOOT_DELAYS[i]);
        bootTimers.current.push(t);
      } else {
        setBootComplete(true);
      }
    };
    const t = setTimeout(step, 300);
    bootTimers.current.push(t);
  }, []);

  const clearBootTimers = () => {
    bootTimers.current.forEach(clearTimeout);
    bootTimers.current = [];
  };

  const handlePower = () => {
    if (powerOn) {
      clearBootTimers();
      setPowerOn(false);
      setTerminalLines([]);
      setBootComplete(false);
      setSelectedGame(null);
      setInputValue('');
    } else {
      setTerminalLines([]);
      setBootComplete(false);
      setSelectedGame(null);
      setPowerOn(true);
      runBoot();
    }
  };

  /* ── game selection ── */
  const handleGameSelect = useCallback(
    (rawId) => {
      const id = parseInt(rawId, 10);
      const game = GAMES.find((g) => g.id === id);
      if (!game) {
        setTerminalLines((prev) => [
          ...prev,
          `> ${rawId}`,
          'ERROR: INVALID SELECTION.',
          'ENTER 1, 2, 3 OR 4:',
        ]);
        return;
      }
      setTerminalLines((prev) => [
        ...prev,
        `> ${id}`,
        `LOADING ${game.name}...`,
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
        'GAME READY!',
      ]);
      setIframeKey((k) => k + 1);
      setTimeout(() => setSelectedGame(game), 700);
    },
    []
  );

  const handleInputSubmit = (e) => {
    e.preventDefault();
    handleGameSelect(inputValue.trim());
    setInputValue('');
  };

  const handleEject = () => {
    setSelectedGame(null);
    setTerminalLines((prev) => [
      ...prev,
      '',
      '══════════════════════════════',
      'GAME SESSION ENDED.',
      '',
      'SELECT GAME [1-4]:',
    ]);
    setInputValue('');
  };

  return (
    <section className="retro-console-section" aria-label="Retro Arcade Console">
      {/* ── outer console shell ── */}
      <div className={`retro-console-shell${powerOn ? ' is-powered' : ''}${selectedGame ? ' is-game-active' : ''}`}>

        {/* ═══ TOP BAR ═══ */}
        <div className="retro-console-topbar">
          <div className="retro-console-brand">
            <span className="retro-brand-arrow">&#9654;</span>
            <span className="retro-brand-text">TECHSTORM&nbsp;ARCADE</span>
          </div>

          <div className="retro-console-topbar-right">
            <span className={`retro-led${powerOn ? ' led-on' : ' led-off'}${ledPulse ? ' led-pulse' : ''}`} aria-label={powerOn ? 'Power on' : 'Power off'} />
            <button
              className={`retro-power-btn${powerOn ? ' is-on' : ''}`}
              onClick={handlePower}
              aria-pressed={powerOn}
            >
              <span className="power-icon">⏻</span>
              <span className="power-label">{powerOn ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* ═══ MAIN PANEL ═══ */}
        <div className="retro-console-main">

          {/* ── Terminal panel ── */}
          <div className={`retro-terminal-panel${powerOn ? '' : ' is-off'}`}>
            <div className="retro-terminal-titlebar">
              <span className="tbar-dots">
                <span />
                <span />
                <span />
              </span>
              <span className="tbar-label">TERMINAL</span>
            </div>

            <div className="retro-terminal-body" ref={terminalRef}>
              {!powerOn ? (
                <div className="retro-offline-msg">
                  <div className="offline-icon">▪▪▪</div>
                  <div>SYSTEM OFFLINE</div>
                  <div className="offline-hint">PRESS POWER TO BOOT</div>
                </div>
              ) : (
                <>
                  {terminalLines.map((line, idx) => {
                    const l = typeof line === 'string' ? line : String(line ?? '');
                    return (
                      <div
                        key={idx}
                        className={[
                          'retro-tline',
                          l.startsWith('  [') ? 'tline-option' : '',
                          l.startsWith('>') ? 'tline-cmd' : '',
                          l.startsWith('ERROR') ? 'tline-error' : '',
                          l.startsWith('GAME READY') ? 'tline-ready' : '',
                          l.startsWith('LOADING') ? 'tline-loading' : '',
                          l.startsWith('▓') ? 'tline-bar' : '',
                          l.startsWith('══') ? 'tline-divider' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {l}
                      </div>
                    );
                  })}

                  {/* input row */}
                  {bootComplete && !selectedGame && (
                    <form
                      onSubmit={handleInputSubmit}
                      className="retro-input-row"
                      autoComplete="off"
                    >
                      <span className="retro-prompt-sym">&gt;&nbsp;</span>
                      <input
                        ref={inputRef}
                        className="retro-terminal-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        maxLength={1}
                        spellCheck={false}
                        autoComplete="off"
                        aria-label="Game selection input"
                      />
                      <span
                        className="retro-cursor-block"
                        aria-hidden="true"
                        style={{ opacity: blink ? 1 : 0 }}
                      >
                        █
                      </span>
                    </form>
                  )}

                  {/* quick-pick buttons */}
                  {bootComplete && !selectedGame && (
                    <div className="retro-quickpick">
                      {GAMES.map((g) => (
                        <button
                          key={g.id}
                          className="retro-qpick-btn"
                          onClick={() => handleGameSelect(g.id)}
                          style={{ '--game-color': g.color }}
                        >
                          <span className="qpick-num">[{g.id}]</span>
                          <span className="qpick-name">{g.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── Game screen ── */}
          <div className="retro-game-screen">
            <div className="retro-screen-bezel">
              {/* scanline overlay */}
              <div className="retro-scanlines" aria-hidden="true" />

              {!powerOn ? (
                <div className="retro-screen-state retro-screen-off">
                  <div className="no-signal-grid" aria-hidden="true" />
                  <span className="no-signal-text">NO SIGNAL</span>
                </div>
              ) : !selectedGame ? (
                <div className="retro-screen-state retro-screen-idle">
                  <div className="idle-pixel-anim" aria-hidden="true">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="idle-pixel" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <div className="idle-label">INSERT GAME</div>
                  <div className="idle-hint">SELECT FROM TERMINAL</div>
                  <div className="idle-btns">
                    {GAMES.map((g) => (
                      <button
                        key={g.id}
                        className="retro-idle-sel-btn"
                        onClick={() => handleGameSelect(g.id)}
                        style={{ '--game-color': g.color }}
                      >
                        [{g.id}]&nbsp;{g.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="retro-screen-state retro-screen-active">
                  <div className="retro-nowplaying-bar">
                    <span className="np-icon">▶</span>
                    <span className="np-text">NOW PLAYING:&nbsp;{selectedGame.name}</span>
                    <button
                      className="retro-fullscreen-btn"
                      onClick={handleFullscreen}
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                      {isFullscreen ? '✕ EXIT' : '⛶ FULL'}
                    </button>
                    <button className="retro-eject-btn" onClick={handleEject} aria-label="Eject game">
                      ⏏&nbsp;EJECT
                    </button>
                  </div>
                  <div
                    ref={iframeWrapRef}
                    className="retro-iframe-wrap"
                  >
                    <iframe
                      ref={iframeRef}
                      key={iframeKey}
                      src={`https://archive.org/embed/${selectedGame.archiveId}`}
                      width="560"
                      height="384"
                      frameBorder="0"
                      allow="fullscreen; gamepad"
                      webkitallowfullscreen="true"
                      mozallowfullscreen="true"
                      allowFullScreen
                      title={selectedGame.name}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM DECORATION BAR ═══ */}
        <div className="retro-console-bottombar">
          {/* D-pad — decorative */}
          <div className="retro-dpad" aria-hidden="true">
            <div className="dpad-row dpad-up"><span>▲</span></div>
            <div className="dpad-row dpad-mid"><span>◄</span><span className="dpad-center">✚</span><span>►</span></div>
            <div className="dpad-row dpad-down"><span>▼</span></div>
          </div>

          {/* dynamic status panel */}
          <div className="retro-status-panel">
            <div className="rsp-dot-row" aria-hidden="true">
              <span className={`rsp-dot${powerOn ? ' rsp-dot-on' : ''}`} />
              <span className={`rsp-dot${selectedGame ? ' rsp-dot-game' : ''}`} />
            </div>
            <div className="rsp-label">
              {!powerOn && 'SYSTEM OFFLINE'}
              {powerOn && !bootComplete && 'BOOTING...'}
              {powerOn && bootComplete && !selectedGame && 'SELECT A GAME'}
              {selectedGame && `▶ ${selectedGame.name}`}
            </div>
            <div className="rsp-hint">
              {!powerOn && 'PRESS POWER'}
              {powerOn && !selectedGame && 'TYPE 1-4 TO SELECT'}
              {selectedGame && 'EJECT BTN TO QUIT'}
            </div>
          </div>

          {/* controls panel */}
          <div className="retro-controls-panel">
            <div className="rcp-header">CONTROLS</div>
            {selectedGame ? (
              <div className="rcp-list">
                {selectedGame.controls.map((ctrl, i) => (
                  <div key={i} className="rcp-ctrl-line">{ctrl}</div>
                ))}
              </div>
            ) : (
              <div className="rcp-idle">SELECT A GAME</div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default RetroGameConsole;
