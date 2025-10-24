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

function typeEffect() {
  if (idx < bootMsg.length) {
    typedElement.innerHTML += bootMsg.charAt(idx)
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
  navigator.clipboard.writeText('gamerzinfo72@gmail.com')
  copyBtn.innerText = 'Copied ⚡'
  setTimeout(() => (copyBtn.innerText = 'Copy email'), 1500)
})

document.addEventListener('keydown', (e) => {
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

const shaderCanvas = document.getElementById('shader-canvas').getContext('2d')
const particleCanvas = document.getElementById('particle-canvas').getContext('2d')

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
  shaderCanvas.clearRect(0, 0, shaderCanvas.canvas.width, shaderCanvas.canvas.height)
  particleCanvas.clearRect(0, 0, particleCanvas.canvas.width, particleCanvas.canvas.height)
  for (let j = 0; j < 10; j++) {
    shaderCanvas.fillStyle = 'hsl(' + Math.random() * 360 + ',70%,60%)'
    shaderCanvas.fillRect(Math.random() * shaderCanvas.canvas.width, Math.random() * shaderCanvas.canvas.height, 2, 2)
  }
  for (let j = 0; j < 20; j++) {
    particleCanvas.beginPath()
    particleCanvas.fillStyle = 'hsl(' + Math.random() * 360 + ',100%,50%)'
    particleCanvas.arc(Math.random() * particleCanvas.canvas.width, Math.random() * particleCanvas.canvas.height, Math.random() * 3, 0, Math.PI * 2)
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
  box.style.color = '#ff0f2d'
  box.style.padding = '20px 40px'
  box.style.fontFamily = 'monospace'
  box.style.border = '2px solid #ff0f2d'
  box.style.zIndex = 9999
  box.style.textShadow = '0 0 8px #ff0f2d'
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

function showMini() {
  miniTerm.classList.remove('mini-hidden')
  miniInput.focus()
  const pos = JSON.parse(localStorage.getItem('mini-pos') || 'null')
  if (pos) {
    miniTerm.style.left = pos.left
    miniTerm.style.top = pos.top
    miniTerm.style.transform = 'translate(0,0)'
  }
}
function hideMini() {
  miniTerm.classList.add('mini-hidden')
}
yTrigger.addEventListener('click', showMini)
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'y') showMini()
})
miniClose.addEventListener('click', hideMini)

let isDragging = false
let dragOffsetX = 0
let dragOffsetY = 0

miniTerm.addEventListener('mousedown', e => {
  isDragging = true
  dragOffsetX = e.clientX - miniTerm.getBoundingClientRect().left
  dragOffsetY = e.clientY - miniTerm.getBoundingClientRect().top
  miniTerm.style.transition = 'none'
})
document.addEventListener('mousemove', e => {
  if (!isDragging) return
  const left = e.clientX - dragOffsetX
  const top = e.clientY - dragOffsetY
  miniTerm.style.left = left + 'px'
  miniTerm.style.top = top + 'px'
  miniTerm.style.transform = 'translate(0,0)'
})
document.addEventListener('mouseup', () => {
  if (!isDragging) return
  isDragging = false
  localStorage.setItem('mini-pos', JSON.stringify({ left: miniTerm.style.left, top: miniTerm.style.top }))
  miniTerm.style.transition = ''
})

miniInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = miniInput.value.trim().toLowerCase()
    if (cmd === 'help') {
      const el = document.createElement('div')
      el.className = 'mline'
      el.textContent = 'help: commands: help | stats | cheer'
      miniBody.appendChild(el)
      miniBody.scrollTop = miniBody.scrollHeight
    } else if (cmd === 'stats') {
      const el = document.createElement('div')
      el.className = 'mline'
      el.textContent = 'matches: 48 • wins: 34 • captaincies: 2'
      miniBody.appendChild(el)
      miniBody.scrollTop = miniBody.scrollHeight
    } else if (cmd === 'cheer') {
      const el = document.createElement('div')
      el.className = 'mline'
      el.textContent = 'You cheer loudly. Teammates respond with echo.'
      miniBody.appendChild(el)
      miniBody.scrollTop = miniBody.scrollHeight
    } else {
      const el = document.createElement('div')
      el.className = 'mline'
      el.textContent = 'Unknown command: ' + cmd
      miniBody.appendChild(el)
      miniBody.scrollTop = miniBody.scrollHeight
    }
    miniInput.value = ''
  }
})
