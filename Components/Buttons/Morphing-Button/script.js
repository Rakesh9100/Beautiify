const body = document.querySelector('body');

body.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  body.style.setProperty('--scene-rx', 24 - y * 48 + "deg");
  body.style.setProperty('--scene-ry', x * 48 - 24 + "deg");
});

const states = {
  idle: {
    angle: '0deg',
    timingFunction: 'ease-in-out'
  },
  sending: {
    angle: '120deg',
    timingFunction: 'cubic-bezier(.5,1,.5,1.25)'    
  },
  done: {
    angle: '240deg',
    timingFunction: 'cubic-bezier(.5,-1,.6,1)'
  },
}

demo.onclick = () => {
  setState('sending')
  setTimeout(() => setState('done'), 3800)
  setTimeout(() => setState('idle'), 5000)
}

function setState(state) {
  demo.style.setProperty('--stateAngle', states[state].angle);
  demo.style.setProperty('--ttf', states[state].timingFunction);
  
  demo.style.setProperty('--poinerEvents', state === 'idle' ? 'all' : 'none');
}