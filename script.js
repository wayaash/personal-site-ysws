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

// trail magic
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

// shader illusion
const shaderCanvas = document.getElementById('shader-canvas').getContext('2d')
const particleCanvas = document.getElementById('particle-canvas').getContext('2d')

