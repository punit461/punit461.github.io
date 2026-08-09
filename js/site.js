const CATEGORY_LABELS = {
  ai: 'AI/ML',
  web: 'Web Apps',
  tools: 'Tools',
  learning: 'Learning'
};

async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderProjectCard(project, options = {}) {
  const { compact = false } = options;
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category;
  const liveButton = project.liveUrl
    ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live Demo</a>`
    : '';
  const blogButton = project.blogSlug
    ? `<a href="${escapeHtml(project.blogSlug)}" class="btn btn-secondary">Read Blog</a>`
    : '';
  const image = project.imageUrl
    ? `<img class="project-image" src="${escapeHtml(project.imageUrl)}" alt="Preview of ${escapeHtml(project.name)}" loading="lazy" referrerpolicy="no-referrer">`
    : '';

  return `
    <div class="glass-panel project-card" data-category="${escapeHtml(project.category)}">
      ${image}
      <div class="project-card-header">
        <h3>${escapeHtml(project.name)}</h3>
        <div class="project-tags">
          <span class="tag tag-${escapeHtml(project.category)}">${escapeHtml(categoryLabel)}</span>
          <span class="tag tag-lang">${escapeHtml(project.language)}</span>
        </div>
      </div>
      <p>${escapeHtml(project.description)}</p>
      <div class="btn-container project-links">
        <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View on GitHub</a>
        ${liveButton}
        ${blogButton}
      </div>
    </div>
  `;
}

function renderBlogCard(post) {
  const projectTag = post.tag
    ? `<span class="tag tag-ai">${escapeHtml(post.tag)}</span>`
    : '';

  return `
    <div class="glass-panel project-card">
      <div class="project-card-header">
        <h3>${escapeHtml(post.title)}</h3>
        ${projectTag}
      </div>
      <p class="blog-meta">Published: ${escapeHtml(post.dateDisplay)} &bull; ${escapeHtml(post.readTime)}</p>
      <p>${escapeHtml(post.excerpt)}</p>
      <div class="btn-container">
        <a href="${escapeHtml(post.slug)}" class="btn btn-secondary">Read Article</a>
      </div>
    </div>
  `;
}

async function renderFeaturedProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const projects = await fetchJSON('data/projects.json');
    const featured = projects.filter((project) => project.featured);
    container.innerHTML = featured.map((project) => renderProjectCard(project)).join('');
  } catch (error) {
    container.innerHTML = '<p class="error-message">Unable to load featured projects.</p>';
    console.error(error);
  }
}

async function renderAllProjects(containerId, filterBarId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const projects = await fetchJSON('data/projects.json');
    container.innerHTML = projects.map((project) => renderProjectCard(project)).join('');

    if (filterBarId) {
      setupProjectFilters(filterBarId, container);
    }
  } catch (error) {
    container.innerHTML = '<p class="error-message">Unable to load projects.</p>';
    console.error(error);
  }
}

function setupProjectFilters(filterBarId, container) {
  const filterBar = document.getElementById(filterBarId);
  if (!filterBar) return;

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    const filter = button.dataset.filter;
    filterBar.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });

    container.querySelectorAll('.project-card').forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? '' : 'none';
    });
  });
}

async function renderBlogPosts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const posts = await fetchJSON('data/blog.json');
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    container.innerHTML = posts.map((post) => renderBlogCard(post)).join('');
  } catch (error) {
    container.innerHTML = '<p class="error-message">Unable to load blog posts.</p>';
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'home') {
    renderFeaturedProjects('featured-projects');
  }

  if (page === 'projects') {
    renderAllProjects('projects-grid', 'project-filters');
  }

  if (page === 'blog') {
    renderBlogPosts('blog-posts');
  }
});
