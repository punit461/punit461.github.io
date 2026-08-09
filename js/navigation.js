document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const navigation = document.querySelector('.nav-links');
  if (!nav || !navigation) return;

  let toggle = nav.querySelector('.nav-toggle');
  if (!toggle) {
    navigation.id = 'primary-navigation';
    toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'primary-navigation');
    toggle.innerHTML = '<span class="sr-only">Toggle navigation</span><span></span><span></span><span></span>';
    nav.insertBefore(toggle, navigation);
  }

  const closeNavigation = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeNavigation();
  });
});
