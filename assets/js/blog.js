const posts = [
  { title: 'How to Prevent Gum Disease', category: 'Prevention', excerpt: 'Daily habits and warning signs to protect your gums.', related: ['Top 7 Oral Hygiene Mistakes', 'Why Regular Cleanings Matter'] },
  { title: 'Dental Implants: Step-by-Step Guide', category: 'Implants', excerpt: 'What to expect before, during, and after implant surgery.', related: ['Bone Grafting Basics', 'Implant vs Bridge'] },
  { title: 'Braces or Aligners: Which Is Better?', category: 'Orthodontics', excerpt: 'Comparison by lifestyle, cost, and treatment timeline.', related: ['Retainers 101', 'Child Orthodontics'] },
  { title: 'Kids and Cavities: Parent Checklist', category: 'Pediatric', excerpt: 'Practical checklist to keep children cavity-free.', related: ['First Dental Visit', 'Healthy Snacks for Teeth'] }
];

function renderPosts(list) {
  const wrap = document.getElementById('blogPosts');
  if (!wrap) return;
  wrap.innerHTML = '';
  list.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'col-md-6 col-lg-4';
    card.innerHTML = `
      <div class="card blog-card h-100 hover-anim">
        <div class="card-body">
          <span class="badge text-bg-info mb-2">${post.category}</span>
          <h5>${post.title}</h5>
          <p>${post.excerpt}</p>
          <small class="text-muted">Related: ${post.related.join(', ')}</small>
        </div>
      </div>`;
    wrap.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts(posts);

  const search = document.getElementById('blogSearch');
  const category = document.getElementById('blogCategory');
  const filter = () => {
    const q = search.value.toLowerCase();
    const c = category.value;
    const filtered = posts.filter((p) => {
      const textMatch = p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      const catMatch = c === 'All' || p.category === c;
      return textMatch && catMatch;
    });
    renderPosts(filtered);
  };

  search?.addEventListener('input', filter);
  category?.addEventListener('change', filter);
});
