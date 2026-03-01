<img width="2557" height="1333" alt="image" src="https://github.com/user-attachments/assets/be7356fb-f335-47f6-b100-2f2726304c17" />

# Modern Engineer Portfolio | Adrià Suárez Batllori
A personal portfolio built with a focus on modular CSS design and interactive 3D rendering.

---

# Built With
- Three.js - 3D library for the interactive background sphere.
- Vanilla JavaScript - Lightweight logic for theme management and UI interactions.
- Custom CSS3 - Wide glassmorphism system using fluid typography (clamp) and CSS variables.
- HTML5 - Semantic structure for high accessibility and SEO.

# Project Stucture
```plaintext
portfolio/
├── index.html            # Main landing page & skills
├── assets/
│   ├── css/
│   │   └── styles.css    # Centralized glassmorphism system
│   ├── js/
│   │   ├── sphere.js     # Three.js background implementation
│   │   ├── theme.js      # Dark/Light mode logic & persistence
│   │   └── top.js        # Smooth-scroll functionality
│   ├── html/             # Subpages
│   │   ├── about.html    # Engineering journey & values
│   │   ├── projects.html # Technical project showcase
│   │   ├── contact.html  # Communication channels
│   │   └── legal.html    # Privacy & legal terms
│   ├── icons/            # Optimized SVG assets
│   └── videos/           # Brand motion assets
└── README.md
```

# Local Development
Since this project uses Three.js and ES6 modules, it requires a local server to avoid CORS issues. You can use the VS Code "Live Server" extension or Python:
```pyhton
# Using Python
python3 -m http.server 8000
```

# Key Engineering Highlights
- Decoupled Architecture: Clean separation between 3D rendering logic, theme management, and content.
- Adaptive Glassmorphism: High-contrast esmerilated glass effect optimized for both Light and Dark modes.
- Performance: Streamlined 3D animation loop and optimized SVG assets to maintain a steady 60 FPS.
