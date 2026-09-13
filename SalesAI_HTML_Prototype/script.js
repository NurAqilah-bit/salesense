
const navButtons = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const toast = document.getElementById('toast');

function showPage(id){
  pages.forEach(p => p.classList.toggle('active-page', p.id === id));
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.page === id));
  window.scrollTo({top:0, behavior:'smooth'});
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove('show'), 2200);
}

document.getElementById('file-input')?.addEventListener('change', e => {
  const file = e.target.files[0];
  document.getElementById('file-name').textContent = file ? file.name : '';
  if(file) showToast('Demo upload selected: ' + file.name);
});

document.getElementById('fake-upload')?.addEventListener('click', () => {
  showToast('Upload interaction shown for prototype only.');
});

const quickInput = document.getElementById('quick-question');
document.querySelectorAll('.suggestion').forEach(btn => {
  btn.addEventListener('click', () => {
    quickInput.value = btn.dataset.q;
    showPage('ask-ai');
    const aiInput = document.getElementById('ai-input');
    setTimeout(() => {
      aiInput.value = btn.dataset.q;
      aiInput.focus();
    }, 100);
  });
});

document.getElementById('quick-send')?.addEventListener('click', () => {
  if(!quickInput.value.trim()) return;
  showPage('ask-ai');
  const aiInput = document.getElementById('ai-input');
  setTimeout(() => {
    aiInput.value = quickInput.value;
    document.getElementById('ai-send').click();
  }, 100);
});

function addChat(text){
  const log = document.getElementById('chat-log');
  const user = document.createElement('div');
  user.className = 'chat user';
  user.textContent = text;
  log.appendChild(user);

  const ai = document.createElement('div');
  ai.className = 'chat ai';
  ai.innerHTML = '<strong>SalesAI:</strong><br>This is a simulated prototype response. In the full research system, the assistant would answer using the uploaded sales data and calculated analytics.';
  log.appendChild(ai);
  log.scrollTop = log.scrollHeight;
}

document.getElementById('ai-send')?.addEventListener('click', () => {
  const input = document.getElementById('ai-input');
  const text = input.value.trim();
  if(!text) return;
  addChat(text);
  input.value = '';
});

document.getElementById('ai-input')?.addEventListener('keydown', e => {
  if(e.key === 'Enter') document.getElementById('ai-send').click();
});

document.querySelectorAll('.prompt-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('ai-input').value = btn.textContent;
    document.getElementById('ai-input').focus();
  });
});

document.querySelectorAll('.secondary-btn').forEach(btn => {
  btn.addEventListener('click', () => showToast('Preview shown as a concept feature.'));
});

document.querySelectorAll('.switch').forEach(sw => {
  sw.addEventListener('click', () => sw.classList.toggle('on'));
});

document.querySelector('.primary-btn')?.addEventListener('click', () => showToast('Settings saved in prototype.'));
