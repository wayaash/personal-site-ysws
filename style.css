const typed=document.getElementById('typed')
const chaos=document.getElementById('chaos')
const copy=document.getElementById('copy')
const trailRoot=document.getElementById('trail-root')
const logFeed=document.getElementById('log-feed')
const mainBox=document.getElementById('mainBox')
const bloopers=[
 'System failure: vampire unleashed 🩸',
 'Warning: caffeine buffer overflow ☕',
 '404: Sleep not found',
 'You pressed B. The universe sighed.',
 'null yash.exe stopped responding',
 'Ghost in the code detected 👻',
 'Critical error: too much awesome'
]

let msg='Booting modules…'
let i=0
function typeIt(){
 if(i<msg.length){typed.innerHTML+=msg.charAt(i);i++;setTimeout(typeIt,70)}
}
typeIt()

// glow flicker
setInterval(()=>{typed.style.opacity=Math.random()>0.5?0.8:1},400)

// chaos color
chaos.addEventListener('click',()=>{
 document.body.classList.toggle('breathe')
 document.body.style.filter='hue-rotate('+Math.random()*360+'deg)'
 pulse()
 chaosBurst()
})

function pulse(){
 mainBox.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],
 {duration:600,iterations:1})
}

copy.addEventListener('click',()=>{
 navigator.clipboard.writeText('gamerzinfo72@gmail.com')
 copy.innerText='Copied ⚡'
 setTimeout(()=>copy.innerText='Copy email',1500)
})

// blooper key
document.addEventListener('keydown',e=>{
 if(e.key.toLowerCase()==='b'){
  const msg=bloopers[Math.floor(Math.random()*bloopers.length)]
  glitch(msg)
 }
})

// cursor trails
document.addEventListener('mousemove',e=>{
 const dot=document.createElement('div')
 dot.className='trail'
 dot.style.left=e.clientX+'px'
 dot.style.top=e.clientY+'px'
 dot.style.background='hsl('+Math.random()*360+',100%,60%)'
 dot.style.boxShadow='0 0 10px '+dot.style.background
 trailRoot.appendChild(dot)
 setTimeout(()=>dot.remove(),800)
})

// parallax tilt
document.addEventListener('mousemove',e=>{
 const x=(window.innerWidth/2-e.clientX)/50
 const y=(window.innerHeight/2-e.clientY)/50
 mainBox.style.transform='rotateY('+x+'deg) rotateX('+y+'deg)'
})
document.addEventListener('mouseleave',()=>mainBox.style.transform='rotateY(0) rotateX(0)')

// chaos burst visuals
function chaosBurst(){
 for(let i=0;i<25;i++){
  const s=document.createElement('span')
  s.innerText='*'
  s.style.position='fixed'
  s.style.left=Math.random()*window.innerWidth+'px'
  s.style.top=Math.random()*window.innerHeight+'px'
  s.style.color='hsl('+Math.random()*360+',100%,70%)'
  s.style.fontSize=10+Math.random()*20+'px'
  s.style.opacity=0.7
  s.style.transition='transform 0.8s ease, opacity 1s'
  document.body.appendChild(s)
  setTimeout(()=>{s.style.transform='translateY(-80px) scale(0)';s.style.opacity=0},50)
  setTimeout(()=>s.remove(),1000)
 }
}

// glitch alert
function glitch(t){
 const box=document.createElement('div')
 box.innerText=t
 Object.assign(box.style,{
  position:'fixed',left:'50%',top:'50%',transform:'translate(-50%,-50%)',
  background:'#000',color:'#ff0f2d',padding:'20px 40px',border:'2px solid #ff0f2d',
  fontFamily:'monospace',zIndex:9999,textShadow:'0 0 8px #ff0f2d'
 })
 document.body.appendChild(box)
 box.animate([{opacity:1},{opacity:0}],{duration:900})
 setTimeout(()=>box.remove(),1000)
}

// fake shader + particles
const shader=document.getElementById('shader-canvas').getContext('2d')
const particle=document.getElementById('particle-canvas').getContext('2d')
function animate(){
 shader.clearRect(0,0,shader.canvas.width,shader.canvas.height)
 particle.clearRect(0,0,particle.canvas.width,particle.canvas.height)
 for(let j=0;j<10;j++){
  shader.fillStyle='hsl('+Math.random()*360+',70%,60%)'
  shader.fillRect(Math.random()*shader.canvas.width,Math.random()*shader.canvas.height,2,2)
 }
 for(let j=0;j<20;j++){
  particle.beginPath()
  particle.fillStyle='hsl('+Math.random()*360+',100%,50%)'
  particle.arc(Math.random()*particle.canvas.width,Math.random()*particle.canvas.height,Math.random()*3,0,Math.PI*2)
  particle.fill()
 }
 requestAnimationFrame(animate)
}
animate()

// rolling logs
const logs=[
 '[OK] vampire mode active',
 '[WARN] caffeine intake high',
 '[SYS] particles operational',
 '[NOTE] moon visibility: 97%',
 '[ERR] shader overthinking again',
 '[PING] hackclub node responding'
]
setInterval(()=>{
 const el=document.createElement('div')
 el.textContent=logs[Math.floor(Math.random()*logs.length)]
 el.style.opacity=0
 logFeed.appendChild(el)
 setTimeout(()=>el.style.opacity=1,50)
 if(logFeed.children.length>8)logFeed.removeChild(logFeed.firstChild)
},2000)
