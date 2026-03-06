# Canarias Racing Team Web

[![tomas2p](https://img.shields.io/badge/Developed_by-Tomas2p-c97a00?style=for-the-badge)](https://github.com/tomas2p)
[![LICENSE](https://img.shields.io/badge/License-GPL--3.0-white?style=for-the-badge)](LICENSE)
![Astro](https://img.shields.io/badge/Built_with-Astro-0f172a?style=for-the-badge&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styled_with-TailwindCSS-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/UI-DaisyUI-5a0fc8?style=for-the-badge&logo=daisyui&logoColor=white)
![Content Collections](https://img.shields.io/badge/Content-Astro%20Collections-0ea5a4?style=for-the-badge&logo=astro&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/tomas2p?style=for-the-badge&name=Status)](https://vercel.com/tomas2ps-projects/crteam-web)
[![Bun](https://img.shields.io/badge/Runtime-Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

Sitio web oficial del primer equipo de Fórmula Student de Canarias.  
Desarrollado con **Astro**, **TailwindCSS** y **DaisyUI**. El sistema de noticias ahora usa las **Content Collections** de Astro (Markdown con frontmatter) y está completamente integrado con el build de Astro.

## 💡 Desarrollo

### Configuración .env

No se requiere una integración externa para las noticias. Si su proyecto usa variables de entorno para otras integraciones, añádalas aquí. Ejemplo:

```env
# Ejemplo de variables de entorno (si aplica)
# SITE_URL=https://crteam.es
```

### ⚠️ Advertencia de seguridad

> **Nota**: Las advertencias de seguridad relacionadas con `path-to-regexp` y dependencias de Vercel/Astro fueron solucionadas utilizando la configuración de `overrides` en `package.json`:
>
> ```json
> "overrides": {
>   "@astrojs/vercel": {
>     "path-to-regexp": "8.2.0"
>   }
> }
> ```

### Comandos principales

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Previsualizar build
```

### Tecnologías

- **Astro**: Framework principal con SSR
- **TailwindCSS**: Estilos optimizados para producción
- **DaisyUI**: Componentes UI modernos
- **TypeScript**: Tipado estático robusto
-- **Content Collections**: Noticias y posts en `src/content/news/` (Markdown + frontmatter)
- **Vercel**: Despliegue y hosting
- **Poppins & Inter**: Fuentes modernas optimizadas

## 📝 Estado del proyecto

### ✅ Completado

- [x] **Infraestructura base**: Configuración completa de Astro + Vercel
- [x] **Componentes principales**: Hero, Navbar, Footer, Gallery, Cards, etc.
- [x] **Sistema de noticias**: Migrado a Content Collections (Markdown en `src/content/news/`)
- [x] **Diseño responsive**: Optimizado para móvil, tablet y desktop
- [x] **Tipografía moderna**: Fuentes Poppins e Inter optimizadas
- [x] **Galería de partners**: Sistema automático de logos destacados
- [x] **Despliegue continuo**: Pipeline automático en Vercel
- [x] **Optimización**: Imágenes, CSS y rendimiento mejorados
- [x] **Analytics y métricas**: Vercel Analytics activo
- [x] **SEO avanzado con metadatos dinámicos**: astro-seo y metadatos por página
- [x] **Wallpapers**: Descarga de pack oficial desde el footer

### 🚧 Próximas mejoras

- [ ] **Páginas adicionales**: About, Projects, Contact, Team, Gallery
- [ ] **Sistema de búsqueda en noticias**

### 💡 Ideas futuras

- **Mejorar la gestión de contenido**: Considerar una solución más eficiente para la gestión de noticias y contenido:
  - Usar un CMS más robusto o bien migrar a un sistema completamente local.
  - Implementar **Astro Collections** para gestionar los posts directamente en el proyecto.
  - Convertir los PDFs existentes a contenido web y crear un panel de control para subir PDFs e imágenes de forma sencilla.

## 🌐 URLs

- **Producción**: [crteam.es](https://crteam.es)
- **Desarrollo**: `localhost:[PORT]`

---

**Canarias Racing Team** 🏎️ | Desarrollado por [@tomas2p](https://github.com/tomas2p) | Julio 2025
