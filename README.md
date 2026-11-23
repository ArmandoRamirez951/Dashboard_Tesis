# Aranea Telecom - Sistema BI & Dashboard Operativo 🕸️📡

Plataforma de inteligencia de negocios y gestión operativa diseñada para centralizar, controlar y analizar los flujos de trabajo (Work Orders) de Aranea Telecom.

## 🚀 Sobre el Proyecto
Este proyecto fue conceptualizado para solucionar la fragmentación de la información en el área operativa. Reemplaza el uso de hojas de cálculo aisladas y comunicaciones informales mediante una interfaz centralizada de **carga cognitiva baja**.

### Características Principales:
* **Single Page Application (Mockup):** Interfaz fluida y reactiva (SPA) que no requiere recargas de página.
* **Diseño Premium & Glassmorphism:** Implementación en CSS nativo con paleta cromática corporativa (Azul Marino y Esmeralda).
* **Módulos de Gestión:**
  * Vista de Operaciones en Tiempo Real
  * Directorio y Estatus de Técnicos
  * Motor simulado de Reportes y Exportación
* **Data Visualization:** Tableros gerenciales impulsados por `Chart.js` (Líneas de Volumen, Productividad en Barras, Dona de Incidencias y Radar de SLA).

## 🛠️ Tecnologías Utilizadas
* HTML5 (Semántico)
* CSS3 (Variables, Flexbox, CSS Grid, Animaciones, Glassmorphism)
* Vanilla JavaScript (ES6+)
* [Chart.js](https://www.chartjs.org/) (Gráficos Interactivos)
* [FontAwesome](https://fontawesome.com/) (Iconografía)
* [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) (Tipografía)

## 📂 Estructura de Archivos
```text
/
├── index.html   # Estructura principal del Dashboard SPA, KPIs, vistas y modales
├── styles.css   # Hoja de estilos (tema claro corporativo)
├── script.js    # Datos estáticos, diccionario de KPIs, filtros y gráficos (Chart.js)
├── tesis.py     # Servidor local en Python para iniciar el dashboard (python tesis.py)
├── .nojekyll    # Configuración de despliegue estático en GitHub Pages
└── .gitignore   # Exclusión de archivos temporales y caché
```

## 💻 Instrucciones de Uso Local
El proyecto incluye un lanzador ligero en Python estándar (sin dependencias externas).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Sistema_Tesis_Aranea.git
   ```
2. En la carpeta raíz del proyecto, inicia el servidor ejecutando:
   ```bash
   python tesis.py
   ```
3. Se abrirá automáticamente tu navegador en `http://127.0.0.1:8080`.
4. **Credenciales de prueba:**
   * **Usuario:** `admin`
   * **Contraseña:** `1234`

---
*Desarrollado para el proyecto de tesis.*
