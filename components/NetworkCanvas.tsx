'use client'

import { useEffect, useRef } from 'react'

const E = { r: 245, g: 245, b: 243 }
const S = { r: 107, g: 107, b: 107 }

const FOV = 900

// Z path: 4 waypoints → 3 segments (bottom-bar, diagonal, top-bar)
// Traced bottom → top: P0(bottom-left) → P1(bottom-right) → P2(top-left) → P3(top-right)
const Z_PTS = [
  { x: -1.00, y:  0.68, z:  0.50 },  // P0 bottom-left  (close)
  { x:  1.00, y:  0.68, z: -0.50 },  // P1 bottom-right (far)
  { x: -1.00, y: -0.68, z: -0.50 },  // P2 top-left     (far)
  { x:  1.00, y: -0.68, z:  0.50 },  // P3 top-right    (close)
]

function zLerp(t: number, scale: number) {
  const seg = Math.min(2, Math.floor(t * 3))
  const u   = t * 3 - seg
  const a   = Z_PTS[seg], b = Z_PTS[seg + 1]
  return {
    x: (a.x + (b.x - a.x) * u) * scale,
    y: (a.y + (b.y - a.y) * u) * scale,
    z: (a.z + (b.z - a.z) * u) * scale * 0.55,
  }
}

interface Node {
  t: number
  speed: number
  baseR: number
  bright: boolean
  phase: number
  phaseSpeed: number
  sx: number; sy: number; sz: number
}

interface Spark {
  a: number; b: number
  t: number; speed: number; dir: 1 | -1
}

const TOTAL = 22

// Pre-assign sizes: 4 large accent, 7 medium, 11 small
const NODE_SIZES: [number, boolean][] = [
  [6.2, true], [5.8, true], [6.5, true], [5.5, true],   // 4 large
  [2.8, true], [2.4, true], [2.6, true], [3.0, true], [2.2, true], [2.7, true], [2.5, true],  // 7 medium
  [1.1, false], [0.9, false], [1.3, false], [1.0, false], [1.2, false],  // 5 small dim
  [1.1, true],  [0.9, true],  [1.2, true],  [1.0, true],  [1.3, true],  [1.1, true],           // 6 small bright
]

interface NetworkCanvasProps {
  isAr?: boolean
}

export default function NetworkCanvas({ isAr = false }: NetworkCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {  // eslint-disable-line react-hooks/exhaustive-deps
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let nodes: Node[] = []
    let sparks: Spark[] = []
    let rotY = 0
    let coreP = 0

    const sc = () => Math.min(canvas!.offsetWidth * 0.28, canvas!.offsetHeight * 0.36)

    function resize() {
      canvas!.width  = canvas!.offsetWidth  * window.devicePixelRatio
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
      init()
    }

    function init() {
      // All nodes on the Z path, evenly staggered
      nodes = NODE_SIZES.map(([baseR, bright], i) => ({
        t: i / TOTAL,
        speed: 0.00072 + (i % 5) * 0.000055,   // slight speed variation by group
        baseR,
        bright,
        phase: (i / TOTAL) * Math.PI * 2,
        phaseSpeed: 0.009 + Math.random() * 0.009,
        sx: 0, sy: 0, sz: 0,
      }))

      sparks = Array.from({ length: 35 }, () => {
        const a = Math.floor(Math.random() * TOTAL)
        let   b = Math.floor(Math.random() * TOTAL)
        if (b === a) b = (a + 1) % TOTAL
        return { a, b, t: Math.random(), speed: 0.004 + Math.random() * 0.005, dir: 1 as 1 | -1 }
      })
    }

    function rotateY(x: number, z: number, a: number) {
      return {
        rx:  x * Math.cos(a) + z * Math.sin(a),
        rz: -x * Math.sin(a) + z * Math.cos(a),
      }
    }

    function proj(x: number, y: number, z: number, cx: number, cy: number) {
      const s = FOV / Math.max(1, FOV + z)
      return { px: cx + x * s, py: cy + y * s, ps: Math.max(0.01, s) }
    }

    function draw() {
      const w  = canvas!.offsetWidth
      const h  = canvas!.offsetHeight
      const s  = sc()
      const cx = w * (isAr ? 0.42 : 0.58)
      const cy = h * 0.50

      ctx!.clearRect(0, 0, w, h)

      rotY  += 0.0028
      coreP += 0.016

      // Advance all nodes along Z path
      nodes.forEach(n => {
        n.t = (n.t + n.speed) % 1
        n.phase += n.phaseSpeed
        const pos = zLerp(n.t, s)
        const { rx, rz } = rotateY(pos.x, pos.z, rotY)
        n.sx = rx; n.sy = pos.y; n.sz = rz
      })

      // Depth alpha helper
      const maxSc = FOV / (FOV - s)
      const minSc = FOV / (FOV + s)
      const da = (z: number) => {
        const sv = FOV / Math.max(1, FOV + z)
        return Math.max(0.05, (sv - minSc) / (maxSc - minSc))
      }

      // Connection lines between nearby nodes
      const connD = s * 0.72
      for (let i = 0; i < TOTAL; i++) {
        for (let j = i + 1; j < TOTAL; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.sx - b.sx, dy = a.sy - b.sy, dz = a.sz - b.sz
          const d  = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (d >= connD) continue
          const fade  = 1 - d / connD
          const depth = da((a.sz + b.sz) / 2)
          const { px: ax, py: ay }   = proj(a.sx, a.sy, a.sz, cx, cy)
          const { px: bx, py: by }   = proj(b.sx, b.sy, b.sz, cx, cy)
          ctx!.beginPath()
          ctx!.moveTo(ax, ay)
          ctx!.lineTo(bx, by)
          ctx!.strokeStyle = `rgba(${S.r},${S.g},${S.b},${fade * 0.26 * depth})`
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }

      // Sparks with trails
      sparks.forEach(sp => {
        sp.t += sp.speed * sp.dir
        if (sp.t >= 1) { sp.t = 1; sp.dir = -1 }
        if (sp.t <= 0) { sp.t = 0; sp.dir =  1 }
        const na = nodes[sp.a], nb = nodes[sp.b]
        const dx = na.sx - nb.sx, dy = na.sy - nb.sy, dz = na.sz - nb.sz
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) > connD * 2.2) return
        const TRAIL = 10
        for (let k = TRAIL; k >= 0; k--) {
          const tc = Math.max(0, Math.min(1, sp.t - k * 0.012 * sp.dir))
          const tx = na.sx + (nb.sx - na.sx) * tc
          const ty = na.sy + (nb.sy - na.sy) * tc
          const tz = na.sz + (nb.sz - na.sz) * tc
          const { px, py, ps } = proj(tx, ty, tz, cx, cy)
          const alp = (1 - k / TRAIL) * 0.85 * (0.15 + 0.85 * da(tz))
          ctx!.beginPath()
          ctx!.arc(px, py, Math.max(0.3, (k === 0 ? 2.6 : 1.3 * (1 - k / TRAIL)) * ps), 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${E.r},${E.g},${E.b},${alp})`
          ctx!.fill()
        }
      })

      // Draw nodes back → front
      const sorted = [...nodes].sort((a, b) => b.sz - a.sz)
      sorted.forEach(n => {
        const { px, py, ps } = proj(n.sx, n.sy, n.sz, cx, cy)
        const r     = Math.max(0.4, n.baseR * ps)
        const depth = da(n.sz)
        const col   = n.bright ? E : S
        const alpha = (n.bright ? 0.95 : 0.35) * depth

        if (n.baseR >= 5.5) {
          // Large accent node
          const hR   = r * 7.0
          const halo = ctx!.createRadialGradient(px, py, r * 0.3, px, py, hR)
          halo.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${0.20 * depth})`)
          halo.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`)
          ctx!.beginPath(); ctx!.arc(px, py, hR, 0, Math.PI * 2)
          ctx!.fillStyle = halo; ctx!.fill()
          for (const [m, op] of [[4.0, 0.05], [2.5, 0.14], [1.6, 0.32]] as [number, number][]) {
            ctx!.beginPath(); ctx!.arc(px, py, r * m, 0, Math.PI * 2)
            ctx!.strokeStyle = `rgba(${col.r},${col.g},${col.b},${op * depth})`
            ctx!.lineWidth = 0.8; ctx!.stroke()
          }
        } else if (n.baseR >= 2.2) {
          for (const [m, op] of [[2.8, 0.06], [1.7, 0.16]] as [number, number][]) {
            ctx!.beginPath(); ctx!.arc(px, py, r * m, 0, Math.PI * 2)
            ctx!.strokeStyle = `rgba(${col.r},${col.g},${col.b},${op * depth})`
            ctx!.lineWidth = 0.5; ctx!.stroke()
          }
        } else {
          ctx!.beginPath(); ctx!.arc(px, py, r * 2.0, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(${col.r},${col.g},${col.b},${0.08 * depth})`
          ctx!.lineWidth = 0.5; ctx!.stroke()
        }

        ctx!.beginPath(); ctx!.arc(px, py, r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`
        ctx!.fill()
      })

      // Central intelligence core
      const cR = 11 + 3.0 * Math.sin(coreP)

      const outerG = ctx!.createRadialGradient(cx, cy, 0, cx, cy, cR * 11)
      outerG.addColorStop(0,   `rgba(${E.r},${E.g},${E.b},0.07)`)
      outerG.addColorStop(0.5, `rgba(${E.r},${E.g},${E.b},0.025)`)
      outerG.addColorStop(1,   `rgba(${E.r},${E.g},${E.b},0)`)
      ctx!.beginPath(); ctx!.arc(cx, cy, cR * 11, 0, Math.PI * 2)
      ctx!.fillStyle = outerG; ctx!.fill()

      const innerG = ctx!.createRadialGradient(cx, cy, 0, cx, cy, cR * 4.5)
      innerG.addColorStop(0,    `rgba(${E.r},${E.g},${E.b},0.90)`)
      innerG.addColorStop(0.20, `rgba(${E.r},${E.g},${E.b},0.50)`)
      innerG.addColorStop(0.55, `rgba(${E.r},${E.g},${E.b},0.08)`)
      innerG.addColorStop(1,    `rgba(${E.r},${E.g},${E.b},0)`)
      ctx!.beginPath(); ctx!.arc(cx, cy, cR * 4.5, 0, Math.PI * 2)
      ctx!.fillStyle = innerG; ctx!.fill()

      for (const [m, op, lw] of [[3.5, 0.06, 0.6], [2.2, 0.14, 0.7], [1.5, 0.28, 0.8]] as [number, number, number][]) {
        ctx!.beginPath(); ctx!.arc(cx, cy, cR * m, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(${E.r},${E.g},${E.b},${op})`
        ctx!.lineWidth = lw; ctx!.stroke()
      }

      ctx!.beginPath(); ctx!.arc(cx, cy, cR, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${E.r},${E.g},${E.b},1.0)`; ctx!.fill()

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('resize', resize) }
  }, [isAr])

  return (
    <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
  )
}
