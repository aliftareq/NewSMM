type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  rotation: number
  spin: number
  color: string
  life: number
  maxLife: number
  shape: "rect" | "circle" | "star"
}

const PALETTE_BY_LEVEL: Record<number, string[]> = {
  1: ["#e24377", "#ffc2c6", "#ffffff"],
  2: ["#e24377", "#f27b34", "#d8366b", "#ffffff"],
  3: ["#f27b34", "#d8366b", "#7e359c", "#e24377", "#ffe5ee"],
  4: ["#f27b34", "#d8366b", "#7e359c", "#21aeff", "#f2d422", "#ffffff"],
  5: ["#f27b34", "#d8366b", "#7e359c", "#21aeff", "#f2d422", "#08ae31", "#ffffff"],
}

function levelConfig(level: number) {
  const clamped = Math.min(5, Math.max(1, level))
  return {
    particleCount: 14 + clamped * 22,
    waves: clamped >= 4 ? 3 : clamped >= 2 ? 2 : 1,
    spread: 0.35 + clamped * 0.12,
    velocity: 4 + clamped * 1.8,
    gravity: 0.12 + clamped * 0.03,
    durationMs: 900 + clamped * 220,
    starRatio: clamped >= 3 ? 0.2 + clamped * 0.08 : 0,
    streamCount: clamped >= 5 ? 4 : clamped >= 3 ? 2 : 0,
  }
}

export function getGrowthLevelCelebrationDuration(level: number): number {
  return levelConfig(level).durationMs
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!
}

function createParticle(
  originX: number,
  originY: number,
  level: number,
  waveBoost: number,
): Particle {
  const palette = PALETTE_BY_LEVEL[level] ?? PALETTE_BY_LEVEL[1]!
  const cfg = levelConfig(level)
  const angle = (Math.random() * 2 - 1) * Math.PI * cfg.spread
  const speed = cfg.velocity * (0.6 + Math.random() * 0.8) * (1 + waveBoost * 0.15)
  const shapeRoll = Math.random()
  let shape: Particle["shape"] = "rect"
  if (shapeRoll < cfg.starRatio) {
    shape = "star"
  } else if (shapeRoll < cfg.starRatio + 0.25) {
    shape = "circle"
  }

  return {
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - (1.2 + level * 0.25),
    w: 4 + Math.random() * (3 + level * 0.6),
    h: 6 + Math.random() * (4 + level * 0.8),
    rotation: Math.random() * 360,
    spin: (Math.random() * 2 - 1) * (8 + level * 3),
    color: randomFrom(palette),
    life: 0,
    maxLife: cfg.durationMs * (0.85 + Math.random() * 0.4),
    shape,
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  const spikes = 5
  const outer = size
  const inner = size * 0.45
  let angle = -Math.PI / 2
  const step = Math.PI / spikes
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner
    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius)
    angle += step
  }
  ctx.closePath()
  ctx.fill()
}

function spawnBurst(
  particles: Particle[],
  originX: number,
  originY: number,
  level: number,
  waveIndex: number,
) {
  const cfg = levelConfig(level)
  const count = Math.floor(cfg.particleCount / cfg.waves)
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(originX, originY, level, waveIndex))
  }
}

export function playGrowthLevelCelebration(
  canvas: HTMLCanvasElement,
  level: number,
  originXPercent: number,
): () => void {
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    return () => {}
  }

  const dpr = window.devicePixelRatio || 1
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const clampedLevel = Math.min(5, Math.max(1, level))
  const cfg = levelConfig(clampedLevel)
  const originX = (originXPercent / 100) * width
  const originY = height * 0.78

  const particles: Particle[] = []
  spawnBurst(particles, originX, originY, clampedLevel, 0)

  if (cfg.streamCount > 0) {
    for (let s = 0; s < cfg.streamCount; s++) {
      const streamX = width * (0.2 + (s / Math.max(1, cfg.streamCount - 1)) * 0.6)
      for (let i = 0; i < 8 + clampedLevel * 3; i++) {
        particles.push(createParticle(streamX, height * 0.08, clampedLevel, s))
      }
    }
  }

  let wave = 1
  const waveTimer = window.setInterval(() => {
    if (wave >= cfg.waves) {
      window.clearInterval(waveTimer)
      return
    }
    spawnBurst(particles, originX, originY, clampedLevel, wave)
    wave += 1
  }, 180)

  let raf = 0
  const start = performance.now()

  const frame = (now: number) => {
    const elapsed = now - start
    ctx.clearRect(0, 0, width, height)

    for (const particle of particles) {
      particle.life = elapsed
      particle.vy += cfg.gravity
      particle.x += particle.vx
      particle.y += particle.vy
      particle.rotation += particle.spin

      const fade =
        particle.life > particle.maxLife * 0.65
          ? 1 - (particle.life - particle.maxLife * 0.65) / (particle.maxLife * 0.35)
          : 1

      if (fade <= 0) {
        continue
      }

      ctx.save()
      ctx.globalAlpha = Math.max(0, Math.min(1, fade))
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)
      ctx.fillStyle = particle.color

      if (particle.shape === "circle") {
        ctx.beginPath()
        ctx.arc(0, 0, particle.w * 0.6, 0, Math.PI * 2)
        ctx.fill()
      } else if (particle.shape === "star") {
        drawStar(ctx, 0, 0, particle.w)
      } else {
        ctx.fillRect(-particle.w / 2, -particle.h / 2, particle.w, particle.h)
      }
      ctx.restore()
    }

    if (elapsed < cfg.durationMs) {
      raf = requestAnimationFrame(frame)
    } else {
      ctx.clearRect(0, 0, width, height)
    }
  }

  raf = requestAnimationFrame(frame)

  return () => {
    window.clearInterval(waveTimer)
    cancelAnimationFrame(raf)
    ctx.clearRect(0, 0, width, height)
  }
}

export function getGrowthLevelPosition(
  level: number,
  minLevel: number,
  maxLevel: number,
): number {
  if (maxLevel <= minLevel) {
    return 0
  }
  return ((level - minLevel) / (maxLevel - minLevel)) * 100
}

/** Figma track stop positions (611px reference width). */
const GROWTH_FIGMA_TRACK_PX = 611

const GROWTH_LEVEL_STOP_PX: Record<number, number> = {
  1: 1,
  2: 134,
  3: 300.5,
  4: 457,
  5: 600,
}

const GROWTH_LEVEL_STOP_MIN_PX = GROWTH_LEVEL_STOP_PX[1]!
const GROWTH_LEVEL_STOP_MAX_PX = GROWTH_LEVEL_STOP_PX[5]!

function figmaStopPxToTrackPercent(stopPx: number): number {
  if (stopPx <= GROWTH_LEVEL_STOP_MIN_PX) {
    return (GROWTH_LEVEL_STOP_MIN_PX / GROWTH_FIGMA_TRACK_PX) * 100
  }
  if (stopPx >= GROWTH_LEVEL_STOP_MAX_PX) {
    return 100
  }
  return (stopPx / GROWTH_FIGMA_TRACK_PX) * 100
}

export function getGrowthLevelTrackPosition(
  level: number,
  minLevel: number,
  maxLevel: number,
): number {
  const stopPx = GROWTH_LEVEL_STOP_PX[level]
  if (stopPx !== undefined) {
    return figmaStopPxToTrackPercent(stopPx)
  }
  return getGrowthLevelPosition(level, minLevel, maxLevel)
}
