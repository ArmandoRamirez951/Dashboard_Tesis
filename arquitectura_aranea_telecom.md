# Arquitectura y Diseño del Sistema BI para Aranea Telecom

Esta propuesta define la arquitectura, el modelo de base de datos, el diseño de la interfaz y la lógica de backend para la nueva plataforma de gestión operativa de Aranea Telecom.

## 1. Modelo de Datos (Esquema Relacional SQL)

El siguiente modelo de datos está diseñado para soportar el ciclo de vida completo de las órdenes de trabajo y registrar los tiempos exactos para alimentar el Dashboard.

```sql
-- 1. Catálogo de Roles
CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL, -- Ej: 'Gerencia', 'Coordinacion', 'Tecnico'
    nivel_acceso INT NOT NULL,
    descripcion VARCHAR(255)
);

-- 2. Tabla de Usuarios del Sistema
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rol_id INT NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (rol_id) REFERENCES Roles(id)
);

-- 3. Directorio de Clientes Corporativos
CREATE TABLE Clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_empresa VARCHAR(150) NOT NULL,
    contacto_principal VARCHAR(100),
    telefono VARCHAR(20),
    direccion_sitio VARCHAR(255)
);

-- 4. Órdenes de Trabajo (Core)
CREATE TABLE OrdenesTrabajo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    creada_por INT NOT NULL, -- Usuario (Coordinador)
    tecnico_asignado INT,    -- Usuario (Técnico)
    
    titulo VARCHAR(150) NOT NULL,
    descripcion_problema TEXT,
    estado VARCHAR(50) DEFAULT 'Pendiente', -- Estados: Pendiente, Asignada, En camino, En proceso, Detenida, Finalizada
    
    -- Control de Tiempos y SLA
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_limite_sla DATETIME NOT NULL, -- Plazo máximo acordado con el cliente
    fecha_completada DATETIME,
    
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id),
    FOREIGN KEY (creada_por) REFERENCES Usuarios(id),
    FOREIGN KEY (tecnico_asignado) REFERENCES Usuarios(id)
);

-- 5. Bitácora de Tiempos e Incidencias (Audit Trail)
-- Esta tabla elimina la transcripción manual, guardando cada cambio de estado.
CREATE TABLE BitacoraOrdenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL,
    usuario_id INT NOT NULL, -- Quien realiza la acción
    
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50) NOT NULL,
    
    es_incidencia BOOLEAN DEFAULT FALSE,
    tipo_incidencia VARCHAR(100), -- Ej: 'Bloqueo de ductos', 'Cliente ausente'
    notas TEXT,
    
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (orden_id) REFERENCES OrdenesTrabajo(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
```

---

## 2. Lógica Backend para Cálculo de KPIs

Los siguientes cálculos se procesarían en el backend (ej. Node.js, Python/Django) a partir de las tablas de base de datos, para alimentar las gráficas del dashboard en tiempo real.

### KPI 1: Tasa de órdenes cerradas en tiempo (SLA Compliance)
**Objetivo:** Medir el porcentaje de órdenes que se finalizaron antes de que venciera su tiempo límite.
**Fórmula:**
```text
(Órdenes Completadas con fecha_completada <= fecha_limite_sla) 
--------------------------------------------------------------  * 100
(Total de Órdenes Completadas en el periodo seleccionado)
```
**Lógica SQL base:**
```sql
SELECT 
    (SUM(CASE WHEN fecha_completada <= fecha_limite_sla THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS tasa_sla
FROM OrdenesTrabajo 
WHERE estado = 'Finalizada' AND fecha_creacion BETWEEN @Inicio AND @Fin;
```

### KPI 2: Tiempo promedio de resolución de los servicios (MTTR)
**Objetivo:** Conocer cuánto tarda Aranea Telecom desde que se crea la solicitud hasta que se resuelve.
**Fórmula:**
```text
Suma total de (fecha_completada - fecha_creacion)
--------------------------------------------------
(Total de Órdenes Completadas)
```
*Nota: Si se desea saber solo el "Tiempo de trabajo en sitio", la fórmula restaría la fecha en que la bitácora marcó "En Proceso" contra "Finalizada".*

### KPI 3: Porcentaje de órdenes con incidencia
**Objetivo:** Identificar qué tan recurrentes son los bloqueos operativos.
**Fórmula:**
```text
(Órdenes que tienen al menos 1 registro en BitacoraOrdenes con es_incidencia = TRUE)
------------------------------------------------------------------------------------- * 100
(Total de Órdenes creadas/asignadas en el periodo)
```

### KPI 4: Volumen de órdenes asignadas y completadas por técnico
**Objetivo:** Evaluar la productividad y el balanceo de cargas.
**Fórmula / Lógica SQL base:**
```sql
SELECT 
    u.nombre_completo AS Tecnico,
    COUNT(o.id) AS Total_Asignadas,
    SUM(CASE WHEN o.estado = 'Finalizada' THEN 1 ELSE 0 END) AS Total_Completadas
FROM OrdenesTrabajo o
JOIN Usuarios u ON o.tecnico_asignado = u.id
WHERE o.fecha_creacion BETWEEN @Inicio AND @Fin
GROUP BY u.id;
```

---

## 3. Esquema del Dashboard Operativo (Gerencia / Coordinación)

El diseño del frontend debe seguir el principio de "Carga Cognitiva Baja", con una disposición de lectura de arriba hacia abajo (Overview -> Detalles).

### Layout Estructural (Grid)

```text
+-----------------------------------------------------------------------------------------+
| [Logo Aranea]    |   Filtros Globales: [Rango de Fechas]  [Seleccionar Técnico]         | Perfil |
+-----------------------------------------------------------------------------------------+
|                                  KPI CARDS (Resumen)                                    |
| +--------------------+ +--------------------+ +--------------------+ +--------------------+ |
| | Tasa Cumplim. SLA  | | Tiempo Promedio    | | % con Incidencias  | | Órdenes Abiertas   | |
| |       92%          | |      2h 15m        | |       18%          | |        14          | |
| |  [+2% vs mes ant.] | |  [-10m vs mes ant] | | [+5% vs mes ant.]  | |                    | |
| +--------------------+ +--------------------+ +--------------------+ +--------------------+ |
+-----------------------------------------------------------------------------------------+
|                GRÁFICOS ANALÍTICOS (Distribución)                                       |
|                                                                                         |
| +-----------------------------------------+ +-----------------------------------------+ |
| | Productividad por Técnico (Barras Apil) | | Distribución de Incidencias (Donut)     | |
| |                                         | |                                         | |
| | [Tecnico 1] ■■■■■■■□□ (7/9)             | |  ( / ) 45% Bloqueo Ductos               | |
| | [Tecnico 2] ■■■■□□□□□ (4/9)             | | (  |  ) 30% Cliente Ausente             | |
| | [Tecnico 3] ■■■■■■■■□ (8/9)             | |  ( \ ) 25% Falta Material               | |
| +-----------------------------------------+ +-----------------------------------------+ |
+-----------------------------------------------------------------------------------------+
|                DETALLE DE OPERACIONES EN TIEMPO REAL (Data Table)                       |
|                                                                                         |
| | ID  | Cliente         | Técnico     | Estado actual | Última Actualización | Acciones | |
| | 101 | Corp. Alpha     | J. Pérez    | En proceso    | Hace 15 min          | [Ver]    | |
| | 102 | Beta Networks   | M. Gómez    | Detenida      | Hace 45 min          | [Ver]    | |
| | 103 | Gamma S.A.      | L. Torres   | En camino     | Hace 5 min           | [Ver]    | |
|                                                                                         |
| [ < Anterior ]                                                          [ Siguiente > ] |
+-----------------------------------------------------------------------------------------+
```

### Comportamiento Dinámico (UX)
1. **Drill-down (Desagregación):** Si el gerente hace clic en el KPI del "18% de incidencias", la tabla inferior filtra automáticamente solo las órdenes que presentaron problemas, permitiendo investigar la causa raíz de inmediato.
2. **Alertas Visuales:** La columna "Estado actual" en la tabla usará *badges* semánticos de color: 
   - Verde: *Finalizada*
   - Azul: *En Proceso* / *En Camino*
   - Amarillo: *Pendiente* / *Asignada*
   - Rojo: *Detenida* (Llama inmediatamente la atención del coordinador).
3. **App Móvil (Técnicos):** El layout para técnicos omite las analíticas. Muestra botones grandes (Touch-friendly) para facilitar el cambio de estado (Ej: un botón gigante que dice "Llegué al sitio (Empezar a trabajar)", que por debajo envía una llamada a la API insertando en `BitacoraOrdenes`).
