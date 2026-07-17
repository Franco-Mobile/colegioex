# Organización del portal

La portada se divide por responsabilidad para evitar archivos monolíticos.

```text
portal/
├── data/
│   └── clubs.py                  # Fuente única de datos de los clubes
├── templates/
│   ├── layouts/
│   │   └── base.html             # Estructura HTML compartida
│   └── inicio/
│       ├── inicio.html           # Composición de la portada
│       └── partials/             # Secciones y componentes HTML
└── static/
    ├── css/
    │   ├── base/                 # Tokens, reset y utilidades
    │   ├── components/           # Navegación, botones, modales, redes
    │   ├── sections/             # Hero, clubes, directorio, experiencia
    │   ├── responsive/           # Tablet, móvil y movimiento reducido
    │   └── pages/inicio.css      # Punto de entrada de estilos
    ├── js/
    │   ├── core/                 # Funciones compartidas
    │   ├── data/                 # Lectura de datos renderizados
    │   ├── components/           # Menú, modales y animaciones
    │   └── pages/inicio.js       # Punto de entrada JavaScript
    └── img/clubes/               # Imágenes 3D de cada club
```

## Convenciones

- Los datos de un club se agregan una sola vez en `data/clubs.py`.
- `club_feature.html` renderiza automáticamente cada artículo.
- Los archivos de `pages/` solo coordinan módulos; no concentran lógica o estilos.
- Los nombres de clases siguen una variante de BEM para mantener selectores predecibles.
