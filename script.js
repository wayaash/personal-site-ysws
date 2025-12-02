const typedElement = document.getElementById('typed')
const chaosBtn = document.getElementById('chaos')
const copyBtn = document.getElementById('copy')
const trailRoot = document.getElementById('trail-root')
const statusRotator = document.getElementById('status-rotator')

const bloopers = [
  'System failure: vampire unleashed 🩸',
  'Warning: caffeine buffer overflow ☕',
  '404: Sleep not found',
  'You pressed B. The universe sighed.',
  'null yash.exe stopped responding',
  'Ghost in the code detected 👻',
  'Critical error: too much awesome'
]

const npcReplies = [
  'Yash: currently running on caffeine and bugs.',
  'Yash: if it works, I wrote it. If it broke, it was “legacy code”.',
  'Yash: kho-kho in the day, code-vampire at night.',
  'Yash: error 200: everything kinda fine, kinda not.',
  'Yash: I do not fear bugs. Bugs fear me.'
]

const quotes = [
  'Move fast and break things. Then fix the cool ones.',
  'Every bug is just a misunderstood feature.',
  'Sleep is a segmentation fault in real life.',
  'Done is better than perfect, but weird is better than normal.'
]

const statusLines = [
  'Just A Bored Lowkey!! ~ Wish Me Keep Growing!!',
  'Sometimes I break things on purpose. For science.',
  'Hacker-vampire online. Sunlight not recommended.',
  'If this site is flickering, it is a feature.'
]

let bootMsg = 'Booting modules…'
let idx = 0
let typingDone = false

if (typedElement) typedElement.textContent = ''

function typeEffect() {
  if (!typedElement) return
  if (idx < bootMsg.length) {
    typedElement.textContent += bootMsg.charAt(idx)
    idx++
    setTimeout(typeEffect, 80)
  } else {
    typingDone = true
    flickerLoop()
  }
}
typeEffect()

function flickerLoop() {
  if (!typingDone || !typedElement) return
  const chance = Math.random()
  typedElement.style.opacity = chance > 0.8 ? 0.4 + Math.random() * 0.6 : 1
  setTimeout(flickerLoop, 200 + Math.random() * 300)
}

if (chaosBtn) {
  chaosBtn.addEventListener('click', () => {
    document.body.style.transition = 'filter 0.2s ease'
    document.body.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)'
    document.body.style.transform = 'scale(1.02)'
    setTimeout(() => {
      document.body.style.filter = 'none'
      document.body.style.transform = 'none'
    }, 800)
    chaosBurst()
    if (Math.random() > 0.6) randomBlooper()
    if (Math.random() > 0.9) blueScreen()
  })
}

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = 'gamerzinfo72@gmail.com'
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        copyBtn.innerText = 'Copied ⚡'
        setTimeout(() => (copyBtn.innerText = 'Copy email'), 1500)
      }).catch(() => {
        fallbackCopy(email)
      })
    } else {
      fallbackCopy(email)
    }
  })
}

function fallbackCopy(text) {
  if (!copyBtn) return
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    copyBtn.innerText = 'Copied ⚡'
    setTimeout(() => (copyBtn.innerText = 'Copy email'), 1500)
  } catch (e) {
    copyBtn.innerText = 'Copy failed'
    setTimeout(() => (copyBtn.innerText = 'Copy email'), 1500)
  }
}

function isTyping(ev) {
  const target = ev.target || ev.srcElement
  if (!target) return false
  const tag = target.tagName ? target.tagName.toLowerCase() : ''
  return tag === 'input' || tag === 'textarea' || target.isContentEditable
}

function randomBlooper() {
  const msg = bloopers[Math.floor(Math.random() * bloopers.length)]
  glitchAlert(msg)
}

let inactivityTimer = null
function resetInactivity() {
  if (inactivityTimer) clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(randomBlooper, 14000)
}
resetInactivity()

document.addEventListener('mousemove', resetInactivity)
document.addEventListener('keydown', resetInactivity)

document.addEventListener('keydown', e => {
  handleGlobalKeys(e)
})

function handleGlobalKeys(e) {
  const k = e.key.toLowerCase()

  if (!isTyping(e)) {
    if (k === 'b') randomBlooper()
    if (k === 'y') showMini()
    if (k === 'h') toggleHackerMode()
    if (k === 'v') toggleVampireMode()
    if (k === 'escape') hideMini()
    if (e.ctrlKey && e.shiftKey && k === 'd') toggleDevPanel()
  }

  if (snakeActive) {
    if (e.key === 'ArrowUp' || k === 'w') {
      if (snakeDir.y === 1) return
      snakeDir = { x:0, y:-1 }
    } else if (e.key === 'ArrowDown' || k === 's') {
      if (snakeDir.y === -1) return
      snakeDir = { x:0, y:1 }
    } else if (e.key === 'ArrowLeft' || k === 'a') {
      if (snakeDir.x === 1) return
      snakeDir = { x:-1, y:0 }
    } else if (e.key === 'ArrowRight' || k === 'd') {
      if (snakeDir.x === -1) return
      snakeDir = { x:1, y:0 }
    }
  }
}

if (trailRoot) {
  document.addEventListener('mousemove', e => {
    const dot = document.createElement('div')
    dot.className = 'trail'
    dot.style.left = e.clientX + 'px'
    dot.style.top = e.clientY + 'px'
    dot.style.background = `hsl(${Math.random() * 360},100%,60%)`
    dot.style.boxShadow = '0 0 10px ' + dot.style.background
    trailRoot.appendChild(dot)
    setTimeout(() => dot.remove(), 1000)
  })
}

const starCanvas = document.getElementById('starfield')
const starCtx = starCanvas ? starCanvas.getContext('2d') : null
let stars = []

function initStars() {
  if (!starCanvas || !starCtx) return
  starCanvas.width = window.innerWidth
  starCanvas.height = window.innerHeight
  stars = []
  const count = 140
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      z: Math.random() * 1.5 + 0.5,
      s: Math.random() * 1.2 + 0.2
    })
  }
}

function drawStars() {
  if (!starCanvas || !starCtx) return
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height)
  for (let i = 0; i < stars.length; i++) {
    const st = stars[i]
    st.y += st.z
    if (st.y > starCanvas.height) {
      st.y = 0
      st.x = Math.random() * starCanvas.width
    }
    starCtx.globalAlpha = 0.3 + st.z * 0.4
    starCtx.fillStyle = '#ffffff'
    starCtx.fillRect(st.x, st.y, st.s, st.s)
  }
}

const shaderCanvasEl = document.getElementById('shader-canvas')
const particleCanvasEl = document.getElementById('particle-canvas')
const radarCanvasEl = document.getElementById('skills-radar')
const shaderCanvas = shaderCanvasEl ? shaderCanvasEl.getContext('2d') : null
const particleCanvas = particleCanvasEl ? particleCanvasEl.getContext('2d') : null
const radarCtx = radarCanvasEl ? radarCanvasEl.getContext('2d') : null

function resizeAllCanvases() {
  initStars()
  const ratio = window.devicePixelRatio || 1
  if (shaderCanvasEl && particleCanvasEl && shaderCanvas && particleCanvas) {
    ;[shaderCanvasEl, particleCanvasEl].forEach(c => {
      const w = c.clientWidth
      const h = c.clientHeight
      c.width = Math.floor(w * ratio)
      c.height = Math.floor(h * ratio)
      c.style.width = w + 'px'
      c.style.height = h + 'px'
    })
    shaderCanvas.setTransform(ratio,0,0,ratio,0,0)
    particleCanvas.setTransform(ratio,0,0,ratio,0,0)
  }
  drawSkillsRadar()
}
window.addEventListener('resize', resizeAllCanvases)
resizeAllCanvases()

const skillsData = [
  { label:'JS', value:0.9 },
  { label:'HTML', value:0.85 },
  { label:'CSS', value:0.8 },
  { label:'Shaders', value:0.75 },
  { label:'Weirdness', value:1.0 },
  { label:'Sports', value:0.9 }
]

function drawSkillsRadar() {
  if (!radarCanvasEl || !radarCtx) return
  const w = radarCanvasEl.width
  const h = radarCanvasEl.height
  radarCtx.clearRect(0, 0, w, h)
  const cx = w / 2
  const cy = h / 2
  const radius = Math.min(w, h) / 2 - 20
  radarCtx.strokeStyle = 'rgba(0,255,136,0.35)'
  radarCtx.lineWidth = 1
  for (let ring = 1; ring <= 3; ring++) {
    const r = (radius * ring) / 3
    radarCtx.beginPath()
    for (let i = 0; i < skillsData.length; i++) {
      const angle = (Math.PI * 2 * i) / skillsData.length - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) radarCtx.moveTo(x, y)
      else radarCtx.lineTo(x, y)
    }
    radarCtx.closePath()
    radarCtx.stroke()
  }
  radarCtx.beginPath()
  for (let i = 0; i < skillsData.length; i++) {
    const angle = (Math.PI * 2 * i) / skillsData.length - Math.PI / 2
    const r = radius * skillsData[i].value
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    if (i === 0) radarCtx.moveTo(x, y)
    else radarCtx.lineTo(x, y)
  }
  radarCtx.closePath()
  radarCtx.fillStyle = 'rgba(255,59,89,0.25)'
  radarCtx.fill()
  radarCtx.strokeStyle = 'rgba(255,59,89,0.8)'
  radarCtx.stroke()
}

let lastFrameTime = performance.now()
let fps = 0
let devPanelVisible = false
const devPanel = document.getElementById('dev-panel')
const devFps = document.getElementById('dev-fps')
const devParticles = document.getElementById('dev-particles')
const devMode = document.getElementById('dev-mode')

function toggleDevPanel() {
  devPanelVisible = !devPanelVisible
  if (devPanel) devPanel.classList.toggle('dev-hidden', !devPanelVisible)
}

let particleCount = 0

function animate() {
  const now = performance.now()
  const delta = now - lastFrameTime
  fps = 1000 / delta
  lastFrameTime = now

  drawStars()

  if (shaderCanvas && shaderCanvasEl && particleCanvas && particleCanvasEl) {
    shaderCanvas.clearRect(0, 0, shaderCanvasEl.width, shaderCanvasEl.height)
    particleCanvas.clearRect(0, 0, particleCanvasEl.width, particleCanvasEl.height)
    for (let j = 0; j < 10; j++) {
      shaderCanvas.fillStyle = 'hsl(' + Math.random() * 360 + ',70%,60%)'
      shaderCanvas.fillRect(Math.random() * shaderCanvasEl.width, Math.random() * shaderCanvasEl.height, 2, 2)
    }
    particleCount = 0
    for (let j = 0; j < 20; j++) {
      particleCanvas.beginPath()
      particleCanvas.fillStyle = 'hsl(' + Math.random() * 360 + ',100%,50%)'
      const r = Math.random() * 3
      particleCanvas.arc(Math.random() * particleCanvasEl.width, Math.random() * particleCanvasEl.height, r, 0, Math.PI * 2)
      particleCanvas.fill()
      particleCount++
    }
  }

  if (devPanelVisible && devFps && devParticles && devMode) {
    devFps.textContent = 'FPS: ' + fps.toFixed(0)
    devParticles.textContent = 'Particles: ' + particleCount
    let mode = 'normal'
    if (document.body.classList.contains('hacker-mode')) mode = 'hacker'
    if (document.body.classList.contains('vampire-mode')) mode = 'vampire'
    devMode.textContent = 'Mode: ' + mode
  }

  requestAnimationFrame(animate)
}
animate()

function chaosBurst() {
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('span')
    s.innerText = '*'
    s.style.position = 'fixed'
    s.style.left = Math.random() * window.innerWidth + 'px'
    s.style.top = Math.random() * window.innerHeight + 'px'
    s.style.color = `hsl(${Math.random() * 360},100%,70%)`
    s.style.fontSize = 10 + Math.random() * 20 + 'px'
    s.style.opacity = 0.7
    s.style.transition = 'transform 0.8s ease, opacity 1s'
    s.style.zIndex = 9997
    document.body.appendChild(s)
    setTimeout(() => {
      s.style.transform = 'translateY(-80px) scale(0)'
      s.style.opacity = 0
    }, 50)
    setTimeout(() => s.remove(), 1000)
  }
}

function glitchAlert(msg) {
  const box = document.createElement('div')
  box.innerText = msg
  box.style.position = 'fixed'
  box.style.left = '50%'
  box.style.top = '50%'
  box.style.transform = 'translate(-50%, -50%) scale(1)'
  box.style.background = '#000'
  box.style.color = '#ff3b59'
  box.style.padding = '20px 40px'
  box.style.fontFamily = 'monospace'
  box.style.border = '2px solid #ff3b59'
  box.style.zIndex = 9999
  box.style.textShadow = '0 0 8px #ff3b59'
  box.style.pointerEvents = 'none'
  document.body.appendChild(box)
  box.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: 'translate(-48%, -52%) scale(1.05)', opacity: 0.8 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
    ],
    { duration: 900, easing: 'ease-out' }
  )
  setTimeout(() => box.remove(), 1000)
}

function blueScreen() {
  const overlay = document.createElement('div')
  overlay.className = 'bsoverlay'
  overlay.textContent = 'A problem has been detected and Yash has decided this is funny.'
  document.body.appendChild(overlay)
  setTimeout(() => {
    overlay.style.opacity = '0'
  }, 500)
  setTimeout(() => {
    overlay.remove()
  }, 1200)
}

const THEME_KEY = 'yash-theme'

function applyStoredTheme() {
  let stored = null
  try {
    stored = localStorage.getItem(THEME_KEY)
  } catch (e) {
    stored = null
  }
  document.body.classList.remove('hacker-mode','vampire-mode')
  if (stored === 'hacker') document.body.classList.add('hacker-mode')
  if (stored === 'vampire') document.body.classList.add('vampire-mode')
}

function saveTheme() {
  let mode = 'base'
  if (document.body.classList.contains('hacker-mode')) mode = 'hacker'
  if (document.body.classList.contains('vampire-mode')) mode = 'vampire'
  try {
    localStorage.setItem(THEME_KEY, mode)
  } catch (e) {}
}

function toggleHackerMode() {
  document.body.classList.toggle('hacker-mode')
  if (document.body.classList.contains('hacker-mode')) {
    document.body.classList.remove('vampire-mode')
  }
  saveTheme()
}

function toggleVampireMode() {
  document.body.classList.toggle('vampire-mode')
  if (document.body.classList.contains('vampire-mode')) {
    document.body.classList.remove('hacker-mode')
  }
  saveTheme()
}

window.addEventListener('load', applyStoredTheme)

const yTrigger = document.getElementById('y-trigger')
const miniTerm = document.getElementById('mini-terminal')
const miniClose = document.getElementById('mini-close')
const miniInput = document.getElementById('mini-input')
const miniBody = document.getElementById('mini-body')
const miniHeader = document.getElementById('mini-header')

function showMini() {
  if (!miniTerm || !miniInput) return
  if (window.innerWidth <= 600) {
    miniTerm.style.width = '92%'
    miniTerm.style.left = '50%'
    miniTerm.style.right = 'auto'
    miniTerm.style.bottom = '80px'
    miniTerm.style.top = 'auto'
    miniTerm.style.transform = 'translate(-50%,0)'
  } else {
    let pos = null
    try {
      pos = JSON.parse(localStorage.getItem('mini-pos') || 'null')
    } catch (e) {
      pos = null
    }
    if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
      miniTerm.style.left = pos.left + 'px'
      miniTerm.style.top = pos.top + 'px'
      miniTerm.style.transform = 'translate(0,0)'
    } else {
      miniTerm.style.left = '50%'
      miniTerm.style.top = '50%'
      miniTerm.style.transform = 'translate(-50%,-50%)'
    }
  }
  miniTerm.classList.remove('mini-hidden')
  miniInput.focus()
}

function hideMini() {
  if (!miniTerm) return
  miniTerm.classList.add('mini-hidden')
  stopSnake()
}

if (yTrigger) yTrigger.addEventListener('click', showMini)
if (miniClose) {
  miniClose.addEventListener('click', e => {
    e.stopPropagation()
    hideMini()
  })
}

let isDragging = false
let dragOffsetX = 0
let dragOffsetY = 0

if (miniHeader && miniTerm) {
  miniHeader.addEventListener('mousedown', e => {
    if (e.button !== 0) return
    if (window.innerWidth <= 600) return
    const rect = miniTerm.getBoundingClientRect()
    isDragging = true
    dragOffsetX = e.clientX - rect.left
    dragOffsetY = e.clientY - rect.top
    miniTerm.style.transition = 'none'
  })
}

document.addEventListener('mousemove', e => {
  if (!isDragging || !miniTerm) return
  const left = e.clientX - dragOffsetX
  const top = e.clientY - dragOffsetY
  const clampedLeft = Math.max(8, Math.min(left, window.innerWidth - miniTerm.offsetWidth - 8))
  const clampedTop = Math.max(8, Math.min(top, window.innerHeight - miniTerm.offsetHeight - 8))
  miniTerm.style.left = clampedLeft + 'px'
  miniTerm.style.top = clampedTop + 'px'
  miniTerm.style.transform = 'translate(0,0)'
})

document.addEventListener('mouseup', () => {
  if (!isDragging || !miniTerm) return
  isDragging = false
  miniTerm.style.transition = ''
  const rect = miniTerm.getBoundingClientRect()
  try {
    localStorage.setItem('mini-pos', JSON.stringify({ left: Math.round(rect.left), top: Math.round(rect.top) }))
  } catch (e) {}
})

if (miniInput && miniBody) {
  miniInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmdRaw = miniInput.value.trim()
      const cmd = cmdRaw.toLowerCase()
      handleCommand(cmd, cmdRaw)
      miniInput.value = ''
    }
  })
}

function appendLine(text) {
  if (!miniBody) return
  const el = document.createElement('div')
  el.className = 'mline'
  el.textContent = text
  miniBody.appendChild(el)
  miniBody.scrollTop = miniBody.scrollHeight
}

let snakeActive = false
let snakeGridW = 16
let snakeGridH = 10
let snake = []
let snakeDir = { x:1, y:0 }
let snakeFood = null
let snakeTimer = null
let snakeView = null

function startSnake() {
  if (snakeActive || !miniBody) return
  snakeActive = true
  snake = [{ x:2, y:5 }, { x:1, y:5 }]
  snakeDir = { x:1, y:0 }
  snakeFood = { x:8, y:5 }
  snakeView = document.createElement('pre')
  snakeView.style.margin = '6px 0'
  snakeView.style.fontSize = '0.8rem'
  snakeView.className = 'mline'
  miniBody.appendChild(snakeView)
  snakeTimer = setInterval(tickSnake, 180)
}

function stopSnake() {
  snakeActive = false
  if (snakeTimer) clearInterval(snakeTimer)
  snakeTimer = null
  if (snakeView) snakeView.remove()
  snakeView = null
}

function tickSnake() {
  if (!snakeActive) return
  const head = snake[0]
  const nx = head.x + snakeDir.x
  const ny = head.y + snakeDir.y
  if (nx < 0 || nx >= snakeGridW || ny < 0 || ny >= snakeGridH) {
    appendLine('snake: you crashed into the void.')
    stopSnake()
    return
  }
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === nx && snake[i].y === ny) {
      appendLine('snake: you bit yourself. crunchy.')
      stopSnake()
      return
    }
  }
  snake.unshift({ x:nx, y:ny })
  if (snakeFood && nx === snakeFood.x && ny === snakeFood.y) {
    snakeFood = {
      x: Math.floor(Math.random() * snakeGridW),
      y: Math.floor(Math.random() * snakeGridH)
    }
  } else {
    snake.pop()
  }
  renderSnake()
}

function renderSnake() {
  if (!snakeView) return
  let grid = []
  for (let y = 0; y < snakeGridH; y++) {
    let row = ''
    for (let x = 0; x < snakeGridW; x++) {
      let ch = '.'
      if (snakeFood && snakeFood.x === x && snakeFood.y === y) ch = 'o'
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
          ch = i === 0 ? '@' : '#'
          break
        }
      }
      row += ch
    }
    grid.push(row)
  }
  snakeView.textContent = grid.join('\n')
  miniBody.scrollTop = miniBody.scrollHeight
}

function handleCommand(cmd, raw) {
  if (!miniBody) return
  if (cmd === 'help') {
    appendLine('help: help | stats | cheer | about | projects | quote | matrix | talk | snake | snake stop | theme | hacker | vampire | bsod | clear')
  } else if (cmd === 'stats') {
    appendLine('matches: 48 • wins: 34 • captaincies: 2')
  } else if (cmd === 'cheer') {
    appendLine('You cheer loudly. Teammates respond with echo.')
  } else if (cmd === 'about') {
    appendLine('Yash: 15, hacker-vampire, kho-kho enjoyer, chaos enthusiast.')
  } else if (cmd === 'projects') {
    appendLine('Projects: lava-frag, particle-dj, tiny rude website, and more WIP chaos.')
  } else if (cmd === 'quote') {
    const q = quotes[Math.floor(Math.random() * quotes.length)]
    appendLine('quote: ' + q)
  } else if (cmd === 'matrix') {
    appendLine('matrix: the code rain starts in your brain.')
    randomBlooper()
  } else if (cmd === 'talk' || cmd === 'talk yash' || cmd === 'yash') {
    const r = npcReplies[Math.floor(Math.random() * npcReplies.length)]
    appendLine(r)
  } else if (cmd === 'snake') {
    appendLine('snake: use arrow keys or WASD.')
    startSnake()
  } else if (cmd === 'snake stop') {
    appendLine('snake: stopping game.')
    stopSnake()
  } else if (cmd === 'theme') {
    if (!document.body.classList.contains('hacker-mode') && !document.body.classList.contains('vampire-mode')) {
      toggleHackerMode()
      appendLine('theme: hacker-mode on.')
    } else if (document.body.classList.contains('hacker-mode')) {
      toggleVampireMode()
      appendLine('theme: vampire-mode on.')
    } else {
      document.body.classList.remove('hacker-mode')
      document.body.classList.remove('vampire-mode')
      appendLine('theme: back to base.')
      saveTheme()
    }
  } else if (cmd === 'hacker') {
    toggleHackerMode()
    appendLine('mode: hacker.')
  } else if (cmd === 'vampire') {
    toggleVampireMode()
    appendLine('mode: vampire.')
  } else if (cmd === 'bsod') {
    appendLine('triggering fake blue screen...')
    blueScreen()
  } else if (cmd === 'clear') {
    miniBody.innerHTML = ''
  } else {
    appendLine('Unknown command: ' + raw)
  }
}

let statusIndex = 0
function rotateStatus() {
  if (!statusRotator) return
  statusIndex = (statusIndex + 1) % statusLines.length
  statusRotator.textContent = statusLines[statusIndex]
}
setInterval(rotateStatus, 7000)

const projectCards = document.querySelectorAll('.project')
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    if (window.innerWidth <= 980) card.classList.toggle('active')
  })
})
