const starCanvas=document.getElementById('starfield')
const ctx=starCanvas.getContext('2d')

const matrixCanvas=document.createElement('canvas')
const mctx=matrixCanvas.getContext('2d')
matrixCanvas.style.position='fixed'
matrixCanvas.style.inset=0
matrixCanvas.style.zIndex=9997
matrixCanvas.style.pointerEvents='none'
matrixCanvas.style.display='none'
document.body.appendChild(matrixCanvas)

function resize(){
starCanvas.width=innerWidth
starCanvas.height=innerHeight
matrixCanvas.width=innerWidth
matrixCanvas.height=innerHeight
}
resize()
addEventListener('resize',resize)

let stars=[]
for(let i=0;i<160;i++)stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,z:0.5+Math.random()})

function drawStars(){
ctx.clearRect(0,0,starCanvas.width,starCanvas.height)
for(let s of stars){
s.y+=s.z
if(s.y>starCanvas.height){s.y=0;s.x=Math.random()*starCanvas.width}
ctx.fillStyle='rgba(255,255,255,0.6)'
ctx.fillRect(s.x,s.y,1.5,1.5)
}
requestAnimationFrame(drawStars)
}
drawStars()

const typed=document.getElementById('typed')
let boot='Booting modules...'
let ti=0
function type(){
if(ti<boot.length){
typed.textContent+=boot[ti++]
setTimeout(type,80)
}
}
type()

const mini=document.getElementById('mini-terminal')
const openBtn=document.getElementById('y-trigger')
const closeBtn=document.getElementById('mini-close')
const input=document.getElementById('mini-input')
const body=document.getElementById('mini-body')

body.style.whiteSpace='pre-wrap'
body.style.wordBreak='break-word'
body.style.padding='8px'

function write(t){
const lines=String(t).split('\n')
for(let line of lines){
const d=document.createElement('div')
d.textContent=line
body.appendChild(d)
}
body.scrollTop=body.scrollHeight
}

openBtn.onclick=()=>{
mini.classList.remove('mini-hidden')
input.focus()
}

closeBtn.onclick=()=>mini.classList.add('mini-hidden')

let chaosLevel=0
function addChaos(v){chaosLevel=Math.min(100,chaosLevel+v)}
function decayChaos(){chaosLevel=Math.max(0,chaosLevel-0.04)}
setInterval(decayChaos,200)

const bloopers=[
'404 sleep not found',
'System instability rising',
'Too much caffeine detected',
'Null pointer in brain',
'Vampire mode hungers',
'You pressed B. The universe sighed.',
'Chaos accepted.'
]

function triggerBlooper(){
addChaos(4)
const msg=bloopers[Math.floor(Math.random()*bloopers.length)]
if(!mini.classList.contains('mini-hidden')) write(msg)
else{
const d=document.createElement('div')
d.textContent=msg
d.style.position='fixed'
d.style.left='50%'
d.style.top='50%'
d.style.transform='translate(-50%,-50%)'
d.style.background='#000'
d.style.color='#ff3b59'
d.style.border='2px solid #ff3b59'
d.style.padding='16px 24px'
d.style.zIndex=9999
document.body.appendChild(d)
setTimeout(()=>d.remove(),1000)
}
}

const chaosBtn=document.getElementById('chaos')
chaosBtn.onclick=()=>{
addChaos(12)
document.body.style.filter='hue-rotate('+Math.random()*360+'deg)'
setTimeout(()=>document.body.style.filter='none',800)
if(Math.random()>0.5) triggerBlooper()
}

const copyBtn=document.getElementById('copy')
copyBtn.onclick=()=>{
navigator.clipboard.writeText('gamerzinfo72@gmail.com').then(()=>{
copyBtn.textContent='Copied'
setTimeout(()=>copyBtn.textContent='Copy email',1500)
})
}

let fps=0,last=performance.now()
const dev=document.getElementById('dev-panel')
const df=document.getElementById('dev-fps')
const dp=document.getElementById('dev-particles')
const dm=document.getElementById('dev-mode')
let devOn=false

document.addEventListener('keydown',e=>{
if(e.ctrlKey&&e.key.toLowerCase()==='q'){
devOn=!devOn
dev.classList.toggle('dev-hidden',!devOn)
}
})

setInterval(()=>{
let now=performance.now()
fps=1000/(now-last)
last=now
if(devOn){
df.textContent='FPS: '+fps.toFixed(0)
dp.textContent='Particles: '+stars.length
dm.textContent='Mode: '+(document.body.className||'base')+' | Chaos '+chaosLevel.toFixed(0)
}
},500)

let snakeActive=false
let snakeDir={x:1,y:0}
let snakeTimer=null
let eatenText=[]
const snakeEl=document.createElement('div')
snakeEl.style.position='fixed'
snakeEl.style.width='14px'
snakeEl.style.height='14px'
snakeEl.style.background='#ff3b59'
snakeEl.style.zIndex=10000
snakeEl.style.display='none'
document.body.appendChild(snakeEl)

function collectTextNodes(){
let nodes=[]
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null)
let n
while(n=w.nextNode()){
if(n.parentElement&&n.textContent.trim()) nodes.push(n)
}
return nodes
}

function eatText(x,y){
for(let n of collectTextNodes()){
const r=n.parentElement.getBoundingClientRect()
if(x>r.left&&x<r.right&&y>r.top&&y<r.bottom){
if(n.textContent.length){
eatenText.push({n:n,t:n.textContent})
n.textContent=n.textContent.slice(0,-1)
addChaos(1)
return
}
}
}
}

function startSnake(){
if(snakeActive)return
snakeActive=true
snakeDir={x:1,y:0}
snakeEl.style.left=innerWidth/2+'px'
snakeEl.style.top=innerHeight/2+'px'
snakeEl.style.display='block'
snakeTimer=setInterval(()=>{
let x=parseFloat(snakeEl.style.left)+snakeDir.x*8
let y=parseFloat(snakeEl.style.top)+snakeDir.y*8
snakeEl.style.left=x+'px'
snakeEl.style.top=y+'px'
eatText(x,y)
},60)
}

function stopSnake(){
snakeActive=false
clearInterval(snakeTimer)
snakeEl.style.display='none'
for(let e of eatenText)e.n.textContent=e.t
eatenText=[]
}

addEventListener('keydown',e=>{
if(!snakeActive) return
if(document.activeElement===input) return
if(e.key==='ArrowUp'||e.key==='w')snakeDir={x:0,y:-1}
if(e.key==='ArrowDown'||e.key==='s')snakeDir={x:0,y:1}
if(e.key==='ArrowLeft'||e.key==='a')snakeDir={x:-1,y:0}
if(e.key==='ArrowRight'||e.key==='d')snakeDir={x:1,y:0}
})

const chars='01'
let drops=[]
let matrixOn=false

function initMatrix(){
drops=[]
const cols=Math.floor(matrixCanvas.width/14)
for(let i=0;i<cols;i++)drops[i]=Math.random()*matrixCanvas.height
}

function drawMatrix(){
if(!matrixOn) return
mctx.fillStyle='rgba(0,0,0,0.08)'
mctx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height)
mctx.fillStyle='#00ff66'
mctx.font='14px monospace'
for(let i=0;i<drops.length;i++){
const text=chars[Math.floor(Math.random()*chars.length)]
mctx.fillText(text,i*14,drops[i])
drops[i]+=14+(chaosLevel*0.05)
if(drops[i]>matrixCanvas.height)drops[i]=0
}
requestAnimationFrame(drawMatrix)
}

function toggleMatrix(){
matrixOn=!matrixOn
if(matrixOn){
matrixCanvas.style.display='block'
initMatrix()
drawMatrix()
}else{
matrixCanvas.style.display='none'
}
}

document.addEventListener('keydown',e=>{
const k=e.key.toLowerCase()

if(k==='y'){
mini.classList.remove('mini-hidden')
input.focus()
return
}

if(document.activeElement===input) return

if(k==='b') triggerBlooper()
if(k==='h'){document.body.classList.add('hacker-mode');document.body.classList.remove('vampire-mode')}
if(k==='v'){document.body.classList.add('vampire-mode');document.body.classList.remove('hacker-mode')}
if(k==='q'&&!e.ctrlKey){document.body.classList.remove('hacker-mode');document.body.classList.remove('vampire-mode')}
})

let history=[]
let histIndex=0
const commands=[
'help','stats','about','projects','quote','matrix','talk',
'snake unleash','snake stop','snake reset',
'hacker','vampire','theme','bsod','clear','clear --hard',
'whoami','neofetch','uptime','skills','resume','fortune',
'panic','logs','history','echo','date','time',
'chaos level','chaos reset','visitor','sysinfo','credits','exit'
]

input.addEventListener('keydown',e=>{
if(e.key==='ArrowUp'){if(histIndex>0)input.value=history[--histIndex]||''}
if(e.key==='ArrowDown'){if(histIndex<history.length-1)input.value=history[++histIndex]||''}
if(e.key==='Tab'){
e.preventDefault()
const m=commands.filter(c=>c.startsWith(input.value))
if(m.length)input.value=m[0]
}
if(e.key==='Enter'){
const cmd=input.value.trim()
input.value=''
history.push(cmd)
histIndex=history.length
execute(cmd.toLowerCase())
}
})

function execute(cmd){
addChaos(0.5)
if(cmd==='help')write(commands.join(' | '))
else if(cmd==='stats')write('FPS '+fps.toFixed(0)+' | Particles '+stars.length+' | Chaos '+chaosLevel.toFixed(0))
else if(cmd==='about')write('Yash Raghuwanshi — hacker-vampire, kho-kho player, Hack Club')
else if(cmd==='projects')write('lava-frag | particle-dj | terminal-vampire')
else if(cmd==='quote'||cmd==='fortune')triggerBlooper()
else if(cmd==='matrix')toggleMatrix()
else if(cmd==='talk')triggerBlooper()
else if(cmd==='snake unleash'){write('snake unleashed');startSnake()}
else if(cmd==='snake stop'){write('snake stopped');stopSnake()}
else if(cmd==='snake reset'){stopSnake();startSnake()}
else if(cmd==='hacker'){document.body.classList.add('hacker-mode');document.body.classList.remove('vampire-mode')}
else if(cmd==='vampire'){document.body.classList.add('vampire-mode');document.body.classList.remove('hacker-mode')}
else if(cmd==='panic'){chaosLevel=0;stopSnake();matrixOn=false;matrixCanvas.style.display='none';write('system stabilized')}
else if(cmd==='history')write(history.join('\n'))
else if(cmd.startsWith('echo '))write(cmd.slice(5))
else if(cmd==='date')write(new Date().toDateString())
else if(cmd==='time')write(new Date().toLocaleTimeString())
else if(cmd==='chaos level')write('chaos '+chaosLevel.toFixed(0))
else if(cmd==='chaos reset'){chaosLevel=0;write('chaos reset')}
else if(cmd==='whoami')write('yash@terminal-vampire')
else if(cmd==='neofetch')write('OS: ChaosOS\nUser: Yash\nUptime: '+Math.floor(performance.now()/1000)+'s')
else if(cmd==='uptime')write(Math.floor(performance.now()/1000)+' seconds')
else if(cmd==='skills')write('JS ████████ HTML ███████ CSS ██████ SHADERS ███████ SPORTS ████████')
else if(cmd==='resume')write('resume.pdf downloading... done')
else if(cmd==='visitor')write('returning visitor')
else if(cmd==='sysinfo')write('threads unstable | caffeine high')
else if(cmd==='credits')write('built by Yash Raghuwanshi')
else if(cmd==='clear')body.textContent=''
else if(cmd==='clear --hard'){body.textContent='';history=[]}
else if(cmd==='exit')mini.classList.add('mini-hidden')
else write('command not found: '+cmd)
}

/* ===== MOVABLE MINI TERMINAL (ADDED, SAFE) ===== */

let dragging=false
let offX=0
let offY=0

mini.addEventListener('mousedown',e=>{
if(e.target===input)return
dragging=true
const r=mini.getBoundingClientRect()
offX=e.clientX-r.left
offY=e.clientY-r.top
})

document.addEventListener('mousemove',e=>{
if(!dragging)return
let l=e.clientX-offX
let t=e.clientY-offY
l=Math.max(8,Math.min(l,innerWidth-mini.offsetWidth-8))
t=Math.max(8,Math.min(t,innerHeight-mini.offsetHeight-8))
mini.style.left=l+'px'
mini.style.top=t+'px'
mini.style.transform='translate(0,0)'
})

document.addEventListener('mouseup',()=>dragging=false)

mini.addEventListener('touchstart',e=>{
const r=mini.getBoundingClientRect()
const t=e.touches[0]
dragging=true
offX=t.clientX-r.left
offY=t.clientY-r.top
},{passive:true})

document.addEventListener('touchmove',e=>{
if(!dragging)return
const t=e.touches[0]
let l=t.clientX-offX
let y=t.clientY-offY
l=Math.max(8,Math.min(l,innerWidth-mini.offsetWidth-8))
y=Math.max(8,Math.min(y,innerHeight-mini.offsetHeight-8))
mini.style.left=l+'px'
mini.style.top=y+'px'
mini.style.transform='translate(0,0)'
},{passive:true})

document.addEventListener('touchend',()=>dragging=false)
/* ===== TUTORIAL SYSTEM (KEY: M) ===== */

const tutorialOverlay=document.createElement('div')
tutorialOverlay.style.position='fixed'
tutorialOverlay.style.inset='0'
tutorialOverlay.style.background='rgba(0,0,0,0.92)'
tutorialOverlay.style.color='#00ff88'
tutorialOverlay.style.fontFamily='monospace'
tutorialOverlay.style.padding='24px'
tutorialOverlay.style.zIndex='10001'
tutorialOverlay.style.display='none'
tutorialOverlay.style.overflow='auto'

tutorialOverlay.innerHTML=
'<div style="max-width:720px;margin:auto">'+
'<h2>WELCOME TO TERMINAL VAMPIRE</h2>'+
'<p>This site is interactive. Everything reacts.</p>'+
'<hr>'+
'<p><b>GLOBAL KEYS</b></p>'+
'<p>Y → Open mini terminal</p>'+
'<p>M → Open this tutorial</p>'+
'<p>B → Trigger bloopers</p>'+
'<p>H → Hacker mode</p>'+
'<p>V → Vampire mode</p>'+
'<p>Q → Return to normal mode</p>'+
'<p>CTRL + Q → Developer panel</p>'+
'<hr>'+
'<p><b>TERMINAL COMMANDS</b></p>'+
'<p>help | stats | about | projects</p>'+
'<p>matrix | snake unleash | snake stop</p>'+
'<p>chaos level | chaos reset</p>'+
'<p>whoami | neofetch | uptime</p>'+
'<p>skills | resume | credits</p>'+
'<hr>'+
'<p><b>FUN STUFF</b></p>'+
'<p>Snake eats real text from the page</p>'+
'<p>Matrix reacts to chaos</p>'+
'<p>Chaos increases unpredictability</p>'+
'<p>Modes affect visuals</p>'+
'<hr>'+
'<p style="opacity:.7">Click / Tap anywhere to close</p>'+
'</div>'

tutorialOverlay.onclick=()=>tutorialOverlay.style.display='none'
document.body.appendChild(tutorialOverlay)

/* Ensure M always works and does not trigger commands */
document.addEventListener('keydown',e=>{
if(e.key.toLowerCase()==='m'){
if(document.activeElement===input) return
tutorialOverlay.style.display='block'
}
})
