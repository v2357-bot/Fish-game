const USERS_KEY = 'msc_users';
const SESSION_KEY = 'msc_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function updatePortal() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  const guest = document.getElementById('guestView');
  const logged = document.getElementById('loggedView');
  if (!guest || !logged) return;

  if (!session) {
    guest.classList.remove('d-none');
    logged.classList.add('d-none');
    return;
  }

  guest.classList.add('d-none');
  logged.classList.remove('d-none');
  document.getElementById('patientName').textContent = session.name;
  document.getElementById('apptList').innerHTML = `
    <li class="list-group-item">16 Apr 2026 — Hygienist Cleaning</li>
    <li class="list-group-item">04 Jun 2026 — Orthodontist Review</li>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const register = document.getElementById('registerForm');
  const login = document.getElementById('loginForm');
  const logout = document.getElementById('logoutBtn');

  register?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(register);
    const users = getUsers();
    users.push({ name: fd.get('name'), email: fd.get('email'), password: fd.get('password') });
    saveUsers(users);
    alert('Registration successful. You can log in now.');
    register.reset();
  });

  login?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(login);
    const users = getUsers();
    const match = users.find((u) => u.email === fd.get('email') && u.password === fd.get('password'));
    if (!match) {
      alert('Invalid credentials');
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(match));
    updatePortal();
  });

  logout?.addEventListener('click', () => {
    localStorage.removeItem(SESSION_KEY);
    updatePortal();
  });

  updatePortal();
});
