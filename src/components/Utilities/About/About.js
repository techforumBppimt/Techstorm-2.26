import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─────────────────────────────────────────
   EVENT PHOTOS — replace src with real URLs
───────────────────────────────────────── */
const EVENT_PHOTOS = [
  {
    id: 0, label: 'HACKATHON NIGHT', year: '2024',
    bg: 'linear-gradient(135deg,#1a0500 0%,#3d1200 50%,#1a0800 100%)',
    accent: '#FF6B00', emoji: '💻',
    caption: '300+ coders. 48 hours. Zero sleep. Maximum output.',
    src: null,
  },
  {
    id: 1, label: 'ROBO CLASH ARENA', year: '2024',
    bg: 'linear-gradient(135deg,#00050f 0%,#001a2e 50%,#000814 100%)',
    accent: '#00B4FF', emoji: '🤖',
    caption: 'Steel meets code. Bots battle for supremacy on the main stage.',
    src: null,
  },
  {
    id: 2, label: 'AI ARENA FINALS', year: '2024',
    bg: 'linear-gradient(135deg,#0d0018 0%,#1e0035 50%,#0a0015 100%)',
    accent: '#A855F7', emoji: '🧠',
    caption: 'Models trained, tested, and deployed live before 500 judges.',
    src: null,
  },
  {
    id: 3, label: 'PRIZE CEREMONY', year: '2024',
    bg: 'linear-gradient(135deg,#0f0a00 0%,#2a1f00 50%,#0f0900 100%)',
    accent: '#FFD700', emoji: '🏆',
    caption: '₹5 Lakhs awarded. Champions crowned. Legends made.',
    src: null,
  },
  {
    id: 4, label: 'CTF STORM', year: '2023',
    bg: 'linear-gradient(135deg,#150010 0%,#2d0025 50%,#0f0010 100%)',
    accent: '#D946EF', emoji: '🔒',
    caption: 'Ethical hacking at its finest. Capture. Crack. Conquer.',
    src: null,
  },
  {
    id: 5, label: 'CLOSING NIGHT', year: '2023',
    bg: 'linear-gradient(135deg,#1a0800 0%,#0d0018 50%,#001a2e 100%)',
    accent: '#FF8C00', emoji: '🎆',
    caption: 'Three days of chaos ends with one epic celebration.',
    src: null,
  },
];

/* ─────────────────────────────────────────
   SCROLL INFO CARDS
───────────────────────────────────────── */
const INFO_CARDS = [
  {
    icon: '⚡', title: 'WHAT IS TECHSTORM?', color: '#FF6B00', tag: 'EST. 2018',
    body: 'The ultimate annual technical festival where brilliant minds collide, innovations spark, and legends are born. Three days of hacking, building, and competing at its finest.',
  },
  {
    icon: '🎮', title: 'CHOOSE YOUR CLASS', color: '#00B4FF', tag: '30+ EVENTS',
    body: 'From lone-wolf coders to full-stack teams — pick your event category, register your squad, and enter the arena. Every skill level has a battlefield waiting.',
  },
  {
    icon: '🏆', title: 'PRIZE POOL', color: '#FFD700', tag: '₹5 LAKHS',
    body: 'Over ₹5,00,000 in prizes across all categories. Cash rewards, internships, mentorships, and direct placement opportunities with top-tier sponsors.',
  },
];

/* ─────────────────────────────────────────
   ARCADE BUTTON
───────────────────────────────────────── */
function ArcadeBtn({ direction, color, onClick }) {
  const [pressed, setPressed] = useState(false);
  const handle = () => { setPressed(true); setTimeout(() => setPressed(false), 140); onClick(); };
  return (
    <button onClick={handle} style={{
      width: '54px', height: '54px', borderRadius: '50%',
      background: pressed
        ? `radial-gradient(circle at 35% 35%, ${color}, ${color}aa)`
        : `radial-gradient(circle at 35% 35%, ${color}66, ${color}22)`,
      border: `3px solid ${color}`,
      boxShadow: pressed
        ? `0 0 24px ${color}, 0 0 48px ${color}66, inset 0 2px 4px rgba(255,255,255,0.25)`
        : `0 0 10px ${color}55, inset 0 -4px 0 rgba(0,0,0,0.5)`,
      cursor: 'pointer',
      transform: pressed ? 'scale(0.88) translateY(3px)' : 'scale(1)',
      transition: 'all 0.1s',
      fontSize: '20px', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {direction === 'left' ? '◀' : '▶'}
    </button>
  );
}

/* ─────────────────────────────────────────
   ARCADE MACHINE
───────────────────────────────────────── */
function ArcadeMachine({ current, onPrev, onNext, onSelect }) {
  const photo = EVENT_PHOTOS[current];
  const [beam, setBeam] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setBeam(b => (b + 1.5) % 100), 28);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ width: '290px', flexShrink: 0 }}>
      {/* Cabinet */}
      <div style={{
        background: 'linear-gradient(175deg, #1e0b00 0%, #0e0500 30%, #130700 70%, #090400 100%)',
        border: '4px solid #FF6B00',
        borderRadius: '15px 15px 15px 15px',
        boxShadow: '0 0 20px rgba(255,107,0,0.45), 0 0 300px rgba(255,107,0,0.15), inset 0 0 40px rgba(0,0,0,0.9)',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Cabinet top marquee */}
        <div style={{
          background: 'linear-gradient(180deg, #2e0f00, #1a0800)',
          padding: '10px 14px 8px',
          borderBottom: '3px solid #FF6B00',
          textAlign: 'center', position: 'relative',
        }}>
          {/* Corner pixels */}
          {[[true,true],[true,false],[false,true],[false,false]].map(([top,left], i) => (
            <div key={i} style={{
              position: 'absolute', width: '8px', height: '8px', background: '#FFD700',
              top: top ? '4px' : 'auto', bottom: !top ? '4px' : 'auto',
              left: left ? '4px' : 'auto', right: !left ? '4px' : 'auto',
            }} />
          ))}
          <div style={{ fontFamily: "'VT323', monospace", fontSize: '13px', color: '#FFD700', letterSpacing: '4px', marginTop: '2px' }}>
            GALLERY ARCADE
          </div>
        </div>

        {/* SCREEN */}
        <div style={{
          margin: '8px', position: 'relative',
          background: '#000', border: '4px solid #1a1a1a',
          borderRadius: '3px', overflow: 'hidden', aspectRatio: '4/2.8',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,1)',
        }}>
          {/* BG gradient */}
          <div style={{
            position: 'absolute', inset: 0, background: photo.bg,
            transition: 'background 0.5s ease', zIndex: 0,
          }} />

          {/* Image or pixel placeholder */}
          {photo.src ? (
            <img src={photo.src} alt={photo.label} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              position: 'absolute', inset: 0, zIndex: 1, transition: 'opacity 0.4s',
            }} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <div style={{ fontSize: '54px', filter: `drop-shadow(0 0 16px ${photo.accent}) drop-shadow(0 0 32px ${photo.accent}66)` }}>
                {photo.emoji}
              </div>
              <div style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: '8px',
                color: photo.accent, textShadow: `0 0 12px ${photo.accent}`,
                textAlign: 'center', padding: '0 10px', lineHeight: 1.9, letterSpacing: '1px',
              }}>{photo.label}</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '13px', color: '#555', letterSpacing: '2px' }}>
                [ PHOTO {current + 1}/{EVENT_PHOTOS.length} ]
              </div>
            </div>
          )}

          {/* CRT scanlines */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
          }} />
          {/* Beam */}
          <div style={{
            position: 'absolute', top: `${beam}%`, left: 0, right: 0, height: '5px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            zIndex: 4, pointerEvents: 'none',
          }} />
          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.78) 100%)',
          }} />
          {/* Glare */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '28%', zIndex: 6, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)',
          }} />
          {/* Year badge */}
          <div style={{
            position: 'absolute', top: '8px', right: '8px', zIndex: 7,
            fontFamily: "'Press Start 2P', monospace", fontSize: '7px',
            color: photo.accent, background: 'rgba(0,0,0,0.85)',
            border: `1px solid ${photo.accent}`, padding: '4px 7px', letterSpacing: '1px',
          }}>{photo.year}</div>
        </div>

        {/* Caption */}
        <div style={{
          margin: '0 10px 8px',
          padding: '7px 10px',
          background: 'rgba(0,0,0,0.75)',
          border: `1px solid ${photo.accent}30`,
          minHeight: '46px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: "'VT323', monospace", fontSize: '14px',
            color: '#999', letterSpacing: '0.5px', lineHeight: 1.5, textAlign: 'center',
          }}>
            {photo.caption}
          </div>
        </div>

        {/* ── CONTROL PANEL ── */}
        <div style={{
          background: 'linear-gradient(180deg, #100600, #080300)',
          borderTop: '3px solid #FF6B00',
          padding: '8px 14px 10px',
        }}>
          {/* Dot nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
            {EVENT_PHOTOS.map((p, i) => (
              <button key={i} onClick={() => onSelect(i)} style={{
                width: i === current ? '22px' : '8px', height: '8px',
                background: i === current ? photo.accent : '#2a2a2a',
                border: `1px solid ${i === current ? photo.accent : '#444'}`,
                cursor: 'pointer', padding: 0, transition: 'all 0.35s',
                boxShadow: i === current ? `0 0 8px ${photo.accent}` : 'none',
              }} />
            ))}
          </div>

          {/* Buttons + joystick */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <ArcadeBtn direction="left" color="#00B4FF" onClick={onPrev} />
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '11px', color: '#00B4FF', letterSpacing: '1px', opacity: 0.7 }}>PREV</div>
            </div>

            {/* Joystick */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'radial-gradient(circle at 38% 32%, #3a3a3a, #111)',
                border: '3px solid #444',
                boxShadow: '0 5px 10px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #555, #1a1a1a)',
                  border: '2px solid #666', boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.08)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '-14px', left: '50%', transform: 'translateX(-50%)',
                  width: '7px', height: '18px', background: 'linear-gradient(180deg, #666, #2a2a2a)', borderRadius: '4px',
                }} />
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '11px', color: '#444', letterSpacing: '1px', marginTop: '10px' }}>JOYSTICK</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <ArcadeBtn direction="right" color="#FF6B00" onClick={onNext} />
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '11px', color: '#FF6B00', letterSpacing: '1px', opacity: 0.7 }}>NEXT</div>
            </div>
          </div>

          {/* Action buttons ABCD */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
            {[['A','#FF4444'],['B','#FFD700'],['C','#44FF88'],['D','#4488FF']].map(([l, c]) => (
              <div key={l} style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${c}bb, ${c}44)`,
                border: `2px solid ${c}`,
                boxShadow: `0 0 8px ${c}55, inset 0 -3px 0 rgba(0,0,0,0.5)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Press Start 2P', monospace", fontSize: '9px', color: '#000', fontWeight: 'bold', cursor: 'pointer',
              }}>{l}</div>
            ))}
          </div>

          {/* Coin slot */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
            <div style={{ flex: 1, height: '5px', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '3px' }} />
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '10px', color: '#383838', letterSpacing: '2px' }}>INSERT COIN</div>
            <div style={{ flex: 1, height: '5px', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '3px' }} />
          </div>
        </div>

        {/* Base strip */}
        <div style={{
          height: '18px', borderTop: '2px solid #FF6B00',
          background: '#080300',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px',
        }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ width: '6px', height: '6px', background: i % 2 === 0 ? '#FF6B00' : '#FFD700', opacity: 0.5 }} />
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <div style={{ marginTop: '10px', textAlign: 'center', fontFamily: "'VT323', monospace", fontSize: '12px', color: '#383838', letterSpacing: '2px' }}>
        ← → ARROW KEYS TO BROWSE
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   INFO CARD
───────────────────────────────────────── */
function InfoCard({ card, isActive, progress, index, isMobile }) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { 
      threshold: 0.6,
      rootMargin: '0px -20% 0px -20%' 
    });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const active = isMobile ? inView : isActive;

  return (
    <div 
      ref={cardRef}
      style={{
        background: active ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.45)',
        border: `2px solid ${active ? card.color : 'rgba(255,255,255,0.06)'}`,
        padding: isMobile ? '20px 24px' : '16px 20px',
        width: isMobile ? '82vw' : 'auto',
        flexShrink: 0,
        scrollSnapAlign: isMobile ? 'center' : 'none',
        transition: isMobile ? 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        transform: active ? 'scale(1)' : (isMobile ? 'scale(0.9) translateY(10px)' : 'scale(0.96)'),
        opacity: active ? 1 : (isMobile ? 0.4 : 0.2),
        boxShadow: active ? `0 0 35px ${card.color}22, 0 8px 40px rgba(0,0,0,0.95)` : 'none',
        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Corner fill */}
      <div style={{
        position: 'absolute', top: 0, right: 15,
        width: '15px', height: '15px',
        background: active ? card.color : 'transparent',
        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
        transition: 'background 0.5s',
      }} />

      {/* Progress bar at bottom */}
      {!isMobile && active && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '4px', width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${card.color}, #fff, ${card.color})`,
          boxShadow: `0 0 10px ${card.color}`,
          transition: 'width 0.1s linear',
        }} />
      )}

      {/* Mobile-only pulsing border ring on first load */}
      {isMobile && active && (
        <div style={{
          position: 'absolute', inset: 0, 
          border: `1px solid ${card.color}`,
          opacity: 0.3,
          animation: 'pixelPulse 2s infinite',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {/* Icon box with flicker animation */}
        <div style={{
          fontSize: '24px',
          background: active ? `${card.color}22` : 'rgba(255,255,255,0.02)',
          border: `2px solid ${active ? card.color : '#1a1a1a'}`,
          padding: '8px 10px', lineHeight: 1, flexShrink: 0,
          transition: 'all 0.5s',
          boxShadow: active ? `0 0 15px ${card.color}44` : 'none',
          animation: active ? 'flicker 3s infinite' : 'none',
        }}>
          {card.icon}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(8px, 1.1vw, 10px)',
              color: active ? card.color : '#444',
              textShadow: active ? `0 0 10px ${card.color}` : 'none',
              letterSpacing: '1px', lineHeight: 1.6, transition: 'all 0.5s',
            }}>
              {card.title}
            </div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: '7px',
              color: active ? '#fff' : '#333',
              background: active ? card.color : 'transparent',
              border: `1px solid ${active ? card.color : '#222'}`,
              padding: '4px 8px', letterSpacing: '1px', flexShrink: 0,
              transition: 'all 0.5s',
            }}>
              {card.tag}
            </div>
          </div>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: 'clamp(14px, 1.7vw, 18px)',
            color: active ? '#eee' : '#2a2a2a',
            lineHeight: 1.6, letterSpacing: '0.5px', margin: 0,
            transition: 'color 0.5s',
          }}>
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN ABOUT SECTION
───────────────────────────────────────── */
export default function About() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [activeCard, setActiveCard]     = useState(0);
  const [cardProgress, setCardProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardsContainerRef = useRef(null);

  /* Handle resizing and GSAP setup */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* GSAP Horizontal Scroll for Mobile Cards */
  useLayoutEffect(() => {
    if (!isMobile) return;
    
    const cards = cardsContainerRef.current;
    if (!cards) return;

    // The total distance to move
    const totalMove = cards.scrollWidth; 
    
    let ctx = gsap.context(() => {
      gsap.to(cards, {
        x: () => -(totalMove - window.innerWidth + 40),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  /* Keyboard nav for arcade */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  setCurrentPhoto(p => (p - 1 + EVENT_PHOTOS.length) % EVENT_PHOTOS.length);
      if (e.key === 'ArrowRight') setCurrentPhoto(p => (p + 1) % EVENT_PHOTOS.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Scroll → card activation */
  useEffect(() => {
    const ZONE = 1 / INFO_CARDS.length;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const pct = Math.max(0, Math.min(1, -rect.top / scrollable));
      const idx = Math.min(Math.floor(pct / ZONE), INFO_CARDS.length - 1);
      const inZone = (pct - idx * ZONE) / ZONE;

      setActiveCard(idx);
      setCardProgress(Math.max(0, Math.min(1, inZone)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goPrev = useCallback(() => setCurrentPhoto(p => (p - 1 + EVENT_PHOTOS.length) % EVENT_PHOTOS.length), []);
  const goNext = useCallback(() => setCurrentPhoto(p => (p + 1) % EVENT_PHOTOS.length), []);

  /* Section is tall enough for each card to breathe */
  const SECTION_H = isMobile ? '350vh' : `${(INFO_CARDS.length + 1.2) * 100}vh`;

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: SECTION_H,
        minHeight: isMobile ? '100vh' : 'auto',
        background: 'linear-gradient(180deg,#0A0A0A 0%,#0A0E2E 40%,#0d0520 70%,#0A0A0A 100%)',
        paddingBottom: isMobile ? '80px' : '0',
        overflow: 'clip', // Prevents extra horizontal scrollbars
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ 
        textAlign: 'center', 
        paddingTop: isMobile ? '60px' : '80px', 
        paddingBottom: isMobile ? '40px' : '20px', 
        position: 'relative', 
        zIndex: 10,
        paddingLeft: '20px',
        paddingRight: '20px',
      }}>
        <div style={{ 
          fontFamily: "'VT323', monospace", 
          fontSize: 'clamp(14px, 4vw, 18px)', 
          color: 'var(--orange)', 
          letterSpacing: isMobile ? '3px' : '6px', 
          marginBottom: '8px' 
        }}>
          &gt; DATABASE LOADED: TECHSTORM_QUEST
        </div>
        <h2 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(16px, 5vw, 32px)',
          color: 'var(--yellow)', textShadow: '4px 4px 0 var(--orange)',
          letterSpacing: '2px', margin: 0,
          lineHeight: 1.4,
        }}>
          ABOUT THE STORM
        </h2>
      </div>

      {/* ── STICKY VIEWPORT ── */}
      <div style={{
        position: 'sticky', 
        top: isMobile ? 20 : 45,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : 'center',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(61,90,254,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,90,254,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          zIndex: 0,
        }} />

        {/* Content Area */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '0 20px' : '0 44px',
          width: '100%',
          maxWidth: '1240px',
          alignSelf: 'center',
          height: '100%',
        }}>
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '60px',
          }}>
            
            {/* Left: Arcade Machine */}
            <div style={{ 
              flexShrink: 0,
              transform: isMobile ? 'scale(0.70)' : 'none',
              marginTop: isMobile ? '-40px' : '0',
              marginBottom: isMobile ? '-80px' : '0',
              zIndex: 1,
            }}>
              <ArcadeMachine
                current={currentPhoto}
                onPrev={goPrev}
                onNext={goNext}
                onSelect={setCurrentPhoto}
              />
            </div>

            {/* Right: Info Area */}
            <div 
              ref={cardsWrapperRef}
              style={{
              flex: isMobile ? '0 0 50vh' : '0 0 520px',
              width: isMobile ? '100%' : '520px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '12px',
              overflowX: 'hidden',
              zIndex: 2,
            }}>
              {/* Swipe Guide for Mobile */}
              {isMobile && (
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '14px',
                  color: 'var(--orange)',
                  textAlign: 'center',
                  letterSpacing: '3px',
                  marginBottom: '10px',
                  animation: 'blink 2s infinite'
                }}>
                  ▼ SCROLL DOWN TO EXPLORE QUESTS ▼
                </div>
              )}

              {/* Cards Container */}
              <div 
                ref={cardsContainerRef}
                className="no-scrollbar"
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : 'column',
                  gap: isMobile ? '16px' : '12px',
                  width: isMobile ? 'fit-content' : '100%',
                  overflowX: 'visible',
                  scrollSnapType: 'none',
                  WebkitOverflowScrolling: 'touch',
                  padding: isMobile ? '20px 9vw' : '0',
                  marginLeft: isMobile ? '-29px' : '0',
                  marginRight: isMobile ? '-29px' : '0',
                  position: 'relative',
                  scrollbarWidth: 'none',
                }}>
                <style dangerouslySetInnerHTML={{ __html: `
                  .no-scrollbar::-webkit-scrollbar { display: none; }
                ` }} />
                {INFO_CARDS.map((card, i) => (
                  <InfoCard
                    key={i}
                    card={card}
                    index={i}
                    isMobile={isMobile}
                    isActive={isMobile ? true : (i === activeCard)}
                    progress={isMobile ? 1 : (i === activeCard ? cardProgress : 0)}
                  />
                ))}
              </div>

              {/* Status footer & Indicators */}
              <div style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'space-between',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                color: '#444',
                letterSpacing: '1px',
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {INFO_CARDS.map((c, i) => (
                    <div key={i} style={{
                      width: (!isMobile && i === activeCard) ? '20px' : '8px',
                      height: '8px',
                      background: (!isMobile && i === activeCard) ? c.color : '#222',
                      border: `1px solid ${(!isMobile && i === activeCard) ? c.color : '#333'}`,
                      borderRadius: isMobile ? '50%' : '0',
                      transition: 'all 0.4s ease',
                      opacity: isMobile ? 0.3 : 1
                    }} />
                  ))}
                </div>
                {!isMobile && <div>SYSTEM STATUS: ACTIVE {activeCard + 1}/5</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}