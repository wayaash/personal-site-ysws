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