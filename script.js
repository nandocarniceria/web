document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SEGUIMIENTO DE SECCIÓN ACTIVA EN NAVBAR ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 130) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. SCROLL CONTROLADO PARA ENLACES RÁPIDOS MÓVIL Y DROPDOWN ---
    const scrollLinks = document.querySelectorAll('.mobile-quick-nav a, .dropdown-menu a');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                const navbarHeight = window.innerWidth <= 768 ? 80 : 90;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. GESTIÓN DEL FORMULARIO INTEGRADO PARA WHATSAPP ---
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const telefonoNum = "+541128633584"; 
            const nombre = document.getElementById('nombre').value.trim();
            const mensajeUsuario = document.getElementById('mensaje_usuario').value.trim();

            const textoMensaje = `Hola Nando! Mi nombre es *${nombre}*.\n\n*Consulta:* ${mensajeUsuario}`;
            const mensajeCodificado = encodeURIComponent(textoMensaje);
            const urlWhatsApp = `https://wa.me/${telefonoNum}?text=${mensajeCodificado}`;

            window.open(urlWhatsApp, '_blank');
        });
    }

    // --- 4. MENÚ HAMBURGUESA ---
    const hamburgerBtn  = document.getElementById('hamburgerBtn');
    const mobilePanel   = document.getElementById('mobileNavPanel');
    const menuOverlay   = document.getElementById('menuOverlay');
    const mobileClose   = document.getElementById('mobileNavClose');

    function openMenu() {
        hamburgerBtn.classList.add('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobilePanel.classList.add('is-open');
        mobilePanel.setAttribute('aria-hidden', 'false');
        menuOverlay.classList.add('is-visible');
        document.body.classList.add('menu-is-open');
    }

    function closeMenu() {
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobilePanel.classList.remove('is-open');
        mobilePanel.setAttribute('aria-hidden', 'true');
        menuOverlay.classList.remove('is-visible');
        document.body.classList.remove('menu-is-open');
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mobilePanel.classList.contains('is-open') ? closeMenu() : openMenu();
        });
    }

    if (mobileClose)   mobileClose.addEventListener('click', closeMenu);
    if (menuOverlay)   menuOverlay.addEventListener('click', closeMenu);

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // --- 5. SUBMENÚ DESPLEGABLE DENTRO DEL PANEL MÓVIL ---
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const parent = toggle.closest('.mobile-dropdown');
            const isOpen = parent.classList.contains('is-open');

            // Cerrar todos los otros dropdowns abiertos
            document.querySelectorAll('.mobile-dropdown.is-open').forEach(d => {
                if (d !== parent) {
                    d.classList.remove('is-open');
                    d.querySelector('.mobile-dropdown-toggle').setAttribute('aria-expanded', 'false');
                }
            });

            parent.classList.toggle('is-open', !isOpen);
            toggle.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    // --- 6. CERRAR PANEL AL HACER CLICK EN CUALQUIER LINK DEL MENÚ MÓVIL ---
    const mobilePanelLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-footer a');

    mobilePanelLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    closeMenu();
                    // Pequeño delay para que la animación de cierre se vea bien
                    setTimeout(() => {
                        const navbarHeight = 90;
                        const targetPosition = targetSection.offsetTop - navbarHeight;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }, 200);
                }
            } else {
                closeMenu();
            }
        });
    });
});