# Configuración de la base de datos MySQL (Hostinger)

## 1. Ejecutar el schema en phpMyAdmin

1. Abrí el panel de Hostinger → **Bases de datos** → **phpMyAdmin**
2. En el panel izquierdo, seleccioná la base de datos `u764418639_ciudadania`
3. Hacé clic en la pestaña **SQL**
4. Copiá y pegá el contenido del archivo `schema.sql`
5. Hacé clic en **Ejecutar**

Deberías ver las tablas: `usuarios`, `progreso_subtemas`, `estado_usuario`, `password_resets`.

---

## 2. Variables de entorno para desarrollo local

Creá (o verificá) el archivo `.env.local` en la raíz del proyecto:

```env
DB_HOST=srv884.hstgr.io
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=u764418639_ciudadania
```

Para que la conexión remota funcione desde tu máquina local, debés agregar tu IP en Hostinger:
**Bases de datos** → **Acceso MySQL remoto** → agregar tu IP actual.

---

## 3. Variables de entorno en Vercel (producción)

En el dashboard de Vercel, andá a tu proyecto → **Settings** → **Environment Variables** y agregá:

| Variable | Valor |
|---|---|
| `DB_HOST` | `srv884.hstgr.io` |
| `DB_PORT` | `3306` |
| `DB_USER` | tu usuario |
| `DB_PASSWORD` | tu contraseña |
| `DB_NAME` | `u764418639_ciudadania` |

---

## 4. Autorizar las IPs de Vercel en Hostinger

Vercel usa IPs dinámicas. Las opciones son:

**Opción A (recomendada):** Autorizar `0.0.0.0/0` en MySQL remoto de Hostinger — permite conexiones desde cualquier IP. Suficiente para un proyecto de este tipo.

**Opción B:** Agregar las IPs estáticas de Vercel (requieren plan Pro de Vercel).

Para agregar acceso: **Hostinger** → **Bases de datos** → **Acceso MySQL remoto** → agregar la IP o rango.

---

## 5. Deploy en Vercel

```bash
# Instalar CLI de Vercel (si no lo tenés)
npm i -g vercel

# Desde la raíz del proyecto
vercel

# En producción
vercel --prod
```

O conectar el repositorio GitHub directamente desde vercel.com — Vercel detecta Next.js automáticamente.
