import React, { useEffect, useRef, useState, useCallback } from 'react';
import './PacManLoader.css';

/* ─────────────────────────────────────────────
   Grid / animation constants
───────────────────────────────────────────── */
const COLS        = 10;
const ROWS        = 10;          // 10×10 = 100 dots
const DOT_SPACING = 20;          // px between dot centres
const DOT_RADIUS  = 3;           // pellet radius
const PAC_RADIUS  = 9;           // Pac-Man radius
const PAC_SPEED   = 8;           // px per animation frame (~5 s to eat all 100 dots)
const MOUTH_SPEED = 0.18;        // radians per frame (mouth chop speed)
const ENTRY_BUF   = PAC_RADIUS + 20; // extra px before first / after last dot

const GRID_W      = (COLS - 1) * DOT_SPACING;   // 306 px
const GRID_H      = (ROWS - 1) * DOT_SPACING;   // 306 px

/* ─────────────────────────────────────────────
   Utility: draw one Pac-Man
   facingRight – true → facing right, false → left
───────────────────────────────────────────── */
function drawPacMan(ctx, x, y, radius, mouthAngle, facingRight, eyeColor) {
  ctx.save();
  ctx.translate(x, y);
  if (!facingRight) ctx.scale(-1, 1);   // mirror for leftward travel

  const m = Math.max(0.02, mouthAngle); // keep at least a sliver
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, m, Math.PI * 2 - m);
  ctx.closePath();
  ctx.fillStyle = '#FFD700';
  ctx.fill();

  // eye
  ctx.beginPath();
  ctx.arc(radius * 0.25, -radius * 0.45, radius * 0.14, 0, Math.PI * 2);
  ctx.fillStyle = eyeColor;
  ctx.fill();

  ctx.restore();
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const PacManLoader = ({ onComplete }) => {
  const canvasRef   = useRef(null);
  const overlayRef  = useRef(null);
  const [fadingOut, setFadingOut] = useState(false);

  /* Lock body scroll while the loader is visible */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* stable callback so the effect dep array stays clean */
  const handleDone = useCallback(() => {
    setFadingOut(true);
  }, []);

  /* when fade-out CSS transition ends → notify parent */
  const handleTransitionEnd = useCallback((e) => {
    // Only act on the opacity transition to avoid spurious fires
    if (e.propertyName === 'opacity' && fadingOut && onComplete) onComplete();
  }, [fadingOut, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { alpha: false });

    /* ── Resize canvas to fill the viewport ── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Build the dot grid (centred) ── */
    const gridX = (canvas.width  - GRID_W) / 2;
    const gridY = (canvas.height - GRID_H) / 2;

    const dots = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dots.push({
          x:     gridX + c * DOT_SPACING,
          y:     gridY + r * DOT_SPACING,
          eaten: false,
          row:   r,
          col:   c,
        });
      }
    }

    /* ── Animation state ── */
    // Row r even → L→R, odd → R→L  (snake pattern)
    let currentRow  = 0;
    let direction   = 1;                       // +1 right, -1 left
    let pacX        = gridX - ENTRY_BUF;       // start left of first dot
    let pacY        = gridY;
    let mouthAngle  = 0.35 * Math.PI;
    let mouthDir    = -1;                      // closing first
    let phase       = 'eating';               // 'eating' | 'done'
    let rafId;

    /* ── Main render loop ── */
    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;

      /* --- background --- */
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, W, H);

      /* --- subtle scanline overlay (retro feel) --- */
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      for (let sy = 0; sy < H; sy += 4) {
        ctx.fillRect(0, sy, W, 2);
      }

      if (phase === 'eating') {
        /* ── Move Pac-Man ── */
        pacX += PAC_SPEED * direction;

        /* ── Mouth chop animation ── */
        mouthAngle += MOUTH_SPEED * mouthDir;
        if (mouthAngle >= 0.40 * Math.PI) mouthDir = -1;
        if (mouthAngle <= 0.02)           mouthDir =  1;

        /* ── Eat dots in current row ── */
        for (const dot of dots) {
          if (!dot.eaten && dot.row === currentRow) {
            const hit = direction === 1
              ? pacX >= dot.x
              : pacX <= dot.x;
            if (hit) dot.eaten = true;
          }
        }

        /* ── Check row end ── */
        const rowEnd = direction === 1
          ? gridX + GRID_W + ENTRY_BUF
          : gridX         - ENTRY_BUF;

        const pastEnd = direction === 1
          ? pacX > rowEnd
          : pacX < rowEnd;

        if (pastEnd) {
          currentRow++;
          if (currentRow >= ROWS) {
            phase = 'done';
            handleDone();
          } else {
            direction = -direction;  // snake flip
            pacX = direction === 1
              ? gridX         - ENTRY_BUF
              : gridX + GRID_W + ENTRY_BUF;
            pacY = gridY + currentRow * DOT_SPACING;
          }
        }

        /* ── Draw remaining dots ── */
        for (const dot of dots) {
          if (!dot.eaten) {
            /* soft glow */
            const grd = ctx.createRadialGradient(
              dot.x, dot.y, 0,
              dot.x, dot.y, DOT_RADIUS * 2.2
            );
            grd.addColorStop(0,   'rgba(255,215,0,0.9)');
            grd.addColorStop(0.5, 'rgba(255,215,0,0.25)');
            grd.addColorStop(1,   'rgba(255,215,0,0)');
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
          }
        }

        /* ── Draw Pac-Man ── */
        // Small drop shadow
        ctx.save();
        ctx.shadowColor  = 'rgba(255,215,0,0.55)';
        ctx.shadowBlur   = 16;
        drawPacMan(ctx, pacX, pacY, PAC_RADIUS, mouthAngle, direction === 1, '#0d0d0d');
        ctx.restore();

        /* ── Loading text (retro pixel style) ── */
        const dotCount   = Math.floor(Date.now() / 380) % 4;
        const loadingStr = 'LOADING' + '.'.repeat(dotCount);
        ctx.save();
        ctx.font        = '8px "Press Start 2P", "Orbitron", monospace';
        ctx.textAlign   = 'center';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur  = 10;
        ctx.fillStyle   = '#FFD700';
        ctx.globalAlpha = 0.85;
        ctx.fillText(loadingStr, W / 2, gridY + GRID_H + 52);
        ctx.restore();

        /* ── Pixel-segmented progress bar ── */
        const eaten      = dots.filter(d => d.eaten).length;
        const progress   = eaten / 100;
        const barW       = GRID_W + 20;
        const barX       = (W - barW) / 2;
        const barY       = gridY + GRID_H + 64;
        const barH       = 5;
        const borderW    = 1;
        const segCount   = 20;
        const segGap     = 2;
        const segW       = (barW - (segCount - 1) * segGap) / segCount;
        const filledSegs = Math.round(progress * segCount);

        // gold pixel border
        ctx.fillStyle   = 'rgba(255,215,0,0.5)';
        ctx.fillRect(barX - borderW, barY - borderW, barW + borderW * 2, barH + borderW * 2);

        // dark inner background
        ctx.fillStyle = '#0d0d0d';
        ctx.fillRect(barX, barY, barW, barH);

        // filled segments
        for (let i = 0; i < filledSegs; i++) {
          const sx = barX + i * (segW + segGap);
          const isLast = i === filledSegs - 1;
          ctx.save();
          if (isLast && filledSegs > 0) {
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur  = 8;
          }
          ctx.fillStyle = i % 2 === 0 ? '#FF8C00' : '#FFA500';
          ctx.fillRect(sx, barY, segW, barH);
          ctx.restore();
        }
      }

      if (phase !== 'done') {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    /* ── Fallback 5-second maximum duration (animation should finish naturally first) ── */
    const timer = setTimeout(handleDone, 5000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
    };
  }, [handleDone]);

  return (
    <div
      ref={overlayRef}
      className={`pacman-loader-overlay${fadingOut ? ' pacman-loader-fadeout' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <canvas ref={canvasRef} className="pacman-loader-canvas" />
    </div>
  );
};

export default PacManLoader;
