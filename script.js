const typedElement = document.getElementById('typed')
const chaosBtn = document.getElementById('chaos')
const copyBtn = document.getElementById('copy')
const trailRoot = document.getElementById('trail-root')
const bloopers = [
  'System failure: vampire unleashed 🩸',
  'Warning: caffeine buffer overflow ☕',
  '404: Sleep not found',
  'You pressed B. The universe sighed.',
  'null yash.exe stopped responding',
  'Ghost in the code detected 👻',
  'Critical error: too much awesome'
]

let bootMsg = 'Booting modules…'
let idx = 0
let typingDone = false

typedElement.textContent = ''

function typeEffect() {
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
  if (!typingDone) return
  const chance = Math.random()
  if (chance > 0.8) {
    typedElement.style.opacity = 0.4 + Math.random() * 0.6
  } else {
    typedElement.style.opacity = 1
  }
  setTimeout(flickerLoop, 200 + Math.random() * 300)
}

chaosBtn.addEventListener('click', () => {
  document.body.style.transition = 'filter 0.2s ease'
  document.body.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)'
  document.body.style.transform = 'scale(1.02)'
  setTimeout(() => {
    document.body.style.filter = 'none'
    document.body.style.transform = 'none'
  }, 800)
  chaosBurst()
})

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

function fallbackCopy(text) {
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

document.addEventListener('keydown', (e) => {
  if (isTyping(e)) return
  if (e.key.toLowerCase() === 'b') {
    const msg = bloopers[Math.floor(Math.random() * bloopers.length)]
    glitchAlert(msg)
  }
})

const trails = []
document.addEventListener('mousemove', (e) => {
  const dot = document.createElement('div')
  dot.className = 'trail'
  dot.style.left = e.clientX + 'px'
  dot.style.top = e.clientY + 'px'
  dot.style.background = `hsl(${Math.random() * 360},100%,60%)`
  dot.style.boxShadow = '0 0 10px ' + dot.style.background
  trailRoot.appendChild(dot)
  trails.push(dot)
  setTimeout(() => dot.remove(), 1000)
})

const shaderCanvasEl = document.getElementById('shader-canvas')
const particleCanvasEl = document.getElementById('particle-canvas')
const shaderCanvas = shaderCanvasEl.getContext('2d')
const particleCanvas = particleCanvasEl.getContext('2d')

function resizeCanvases() {
  const ratio = window.devicePixelRatio || 1
  ;[shaderCanvasEl, particleCanvasEl].forEach(c => {
    const w = c.clientWidth
    const h = c.clientHeight
    c.width = Math.floor(w * ratio)
    c.height = Math.floor(h * ratio)
    c.style.width = w + 'px'
    c.style.height = h + 'px'
  })
  shaderCanvas.setTransform(ratio, 0, 0, ratio, 0, 0)
  particleCanvas.setTransform(ratio, 0, 0, ratio, 0, 0)
}
window.addEventListener('resize', resizeCanvases)
resizeCanvases()

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
    document.body.appendChild(s)
    setTimeout(() => {
      s.style.transform = 'translateY(-80px) scale(0)'
      s.style.opacity = 0
    }, 50)
    setTimeout(() => s.remove(), 1000)
  }
}

function animate() {
  shaderCanvas.clearRect(0, 0, shaderCanvasEl.width, shaderCanvasEl.height)
  particleCanvas.clearRect(0, 0, particleCanvasEl.width, particleCanvasEl.height)
  for (let j = 0; j < 10; j++) {
    shaderCanvas.fillStyle = 'hsl(' + Math.random() * 360 + ',70%,60%)'
    shaderCanvas.fillRect(Math.random() * shaderCanvasEl.width, Math.random() * shaderCanvasEl.height, 2, 2)
  }
  for (let j = 0; j < 20; j++) {
    particleCanvas.beginPath()
    particleCanvas.fillStyle = 'hsl(' + Math.random() * 360 + ',100%,50%)'
    particleCanvas.arc(Math.random() * particleCanvasEl.width, Math.random() * particleCanvasEl.height, Math.random() * 3, 0, Math.PI * 2)
    particleCanvas.fill()
  }
  requestAnimationFrame(animate)
}
animate()

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
  box.setAttribute('role', 'status')
  box.setAttribute('aria-live', 'polite')
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

const yTrigger = document.getElementById('y-trigger')
const miniTerm = document.getElementById('mini-terminal')
const miniClose = document.getElementById('mini-close')
const miniInput = document.getElementById('mini-input')
const miniBody = document.getElementById('mini-body')
const miniHeader = document.getElementById('mini-header')

function showMini() {
  if (window.innerWidth <= 600) {
    miniTerm.style.left = ''
    miniTerm.style.top = ''
    miniTerm.style.right = '12px'
    miniTerm.style.bottom = '84px'
    miniTerm.style.transform = 'none'
  } else {
    const pos = JSON.parse(localStorage.getItem('mini-pos') || 'null')
    if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
      miniTerm.style.left = pos.left + 'px'
      miniTerm.style.top = pos.top + 'px'
      miniTerm.style.transform = 'translate(0,0)'
      miniTerm.style.right = ''
      miniTerm.style.bottom = ''
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
  miniTerm.classList.add('mini-hidden')
}

yTrigger.addEventListener('click', showMini)

document.addEventListener('keydown', e => {
  if (isTyping(e)) return
  if (e.key.toLowerCase() === 'y') showMini()
})

miniClose.addEventListener('click', e => {
  e.stopPropagation()
  hideMini()
})

miniClose.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.stopPropagation()
    hideMini()
  }
})

let isDragging = false
let dragOffsetX = 0
let dragOffsetY = 0

miniHeader.addEventListener('mousedown', e => {
  if (e.button !== 0) return
  if (e.target === miniClose || miniClose.contains(e.target)) return
  isDragging = true
  const rect = miniTerm.getBoundingClientRect()
  dragOffsetX = e.clientX - rect.left
  dragOffsetY = e.clientY - rect.top
  miniTerm.style.transition = 'none'
})

document.addEventListener('mousemove', e => {
  if (!isDragging) return
  const left = e.clientX - dragOffsetX
  const top = e.clientY - dragOffsetY
  const clampedLeft = Math.max(8, Math.min(left, window.innerWidth - miniTerm.offsetWidth - 8))
  const clampedTop = Math.max(8, Math.min(top, window.innerHeight - miniTerm.offsetHeight - 8))
  miniTerm.style.left = clampedLeft + 'px'
  miniTerm.style.top = clampedTop + 'px'
  miniTerm.style.transform = 'translate(0,0)'
})

document.addEventListener('mouseup', () => {
  if (!isDragging) return
  isDragging = false
  miniTerm.style.transition = ''
  const rect = miniTerm.getBoundingClientRect()
  localStorage.setItem('mini-pos', JSON.stringify({ left: Math.round(rect.left), top: Math.round(rect.top) }))
})

miniInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = miniInput.value.trim().toLowerCase()
    const el = document.createElement('div')
    el.className = 'mline'
    if (cmd === 'help') {
      el.textContent = 'help: commands: help | stats | cheer'
    } else if (cmd === 'stats') {
      el.textContent = 'matches: 48 • wins: 34 • captaincies: 2'
    } else if (cmd === 'cheer') {
      el.textContent = 'You cheer loudly. Teammates respond with echo.'
    } else {
      el.textContent = 'Unknown command: ' + cmd
    }
    miniBody.appendChild(el)
    miniBody.scrollTop = miniBody.scrollHeight
    miniInput.value = ''
  }
})

window.addEventListener('load', () => {
  const pos = JSON.parse(localStorage.getItem('mini-pos') || 'null')
  if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
    const left = Math.max(8, Math.min(pos.left, window.innerWidth - 64))
    const top = Math.max(8, Math.min(pos.top, window.innerHeight - 64))
    miniTerm.style.left = left + 'px'
    miniTerm.style.top = top + 'px'
    miniTerm.style.transform = 'translate(0,0)'
  }
})
