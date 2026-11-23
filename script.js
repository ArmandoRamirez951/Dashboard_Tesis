Chart.defaults.color = '#475569';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 13;

// ---------------- CONJUNTO DE DATOS ESTÁTICOS (1 MES DE OPERACIÓN: OCTUBRE 2026) ----------------
const STATIC_ORDERS = [
    { id: '#101', fecha: '2026-10-28', semana: 'sem4', cliente: 'Corp. Alpha', tecnico: 'J. Pérez', estado: 'En Proceso', incidencia: 'Ninguna', sla: 'A tiempo', mttrMin: 125, respIncMin: null, retrabajo: false, direccion: 'Av. Principal 102, Edificio B', reporte: 'Reemplazo de conector de fibra óptica en panel principal.' },
    { id: '#102', fecha: '2026-10-28', semana: 'sem4', cliente: 'Beta Networks', tecnico: 'M. Gómez', estado: 'Detenida', incidencia: 'Bloqueo Ductos', sla: 'Vencido', mttrMin: 195, respIncMin: 42, retrabajo: false, direccion: 'Blvd. Industrial 450', reporte: 'Ducto subterráneo obstruido en registro 3; requiere desazolve.' },
    { id: '#103', fecha: '2026-10-27', semana: 'sem4', cliente: 'Gamma S.A.', tecnico: 'L. Torres', estado: 'En Camino', incidencia: 'Ninguna', sla: 'En riesgo', mttrMin: 140, respIncMin: null, retrabajo: false, direccion: 'Calle Reforma 88', reporte: 'Unidad en tránsito hacia sitio para enlace dedicado.' },
    { id: '#104', fecha: '2026-10-26', semana: 'sem4', cliente: 'Omega Corp', tecnico: 'A. Ruiz', estado: 'Finalizada', incidencia: 'Ninguna', sla: 'A tiempo', mttrMin: 110, respIncMin: null, retrabajo: false, direccion: 'Parque Tecnológico L-4', reporte: 'Certificación de enlace y entrega conforme con cliente.' },
    { id: '#105', fecha: '2026-10-25', semana: 'sem4', cliente: 'Logistics MX', tecnico: 'J. Pérez', estado: 'Finalizada', incidencia: 'Cliente Ausente', sla: 'En riesgo', mttrMin: 155, respIncMin: 35, retrabajo: false, direccion: 'Av. Central 123', reporte: 'Reprogramación de acceso por ausencia inicial de contacto.' },
    { id: '#106', fecha: '2026-10-24', semana: 'sem4', cliente: 'Consultores Y', tecnico: 'M. Gómez', estado: 'Pendiente', incidencia: 'Falta Material', sla: 'Vencido', mttrMin: 180, respIncMin: 45, retrabajo: false, direccion: 'Torre Norte, Piso 4', reporte: 'En espera de patch cord LC/APC de 15 metros.' },
    { id: '#107', fecha: '2026-10-22', semana: 'sem3', cliente: 'Global Market', tecnico: 'L. Torres', estado: 'Finalizada', incidencia: 'Ninguna', sla: 'A tiempo', mttrMin: 95, respIncMin: null, retrabajo: false, direccion: 'Plaza Sur, L-12', reporte: 'Instalación de router empresarial y pruebas de latencia.' },
    { id: '#108', fecha: '2026-10-20', semana: 'sem3', cliente: 'Industrias W', tecnico: 'R. Sánchez', estado: 'Detenida', incidencia: 'Bloqueo Ductos', sla: 'Vencido', mttrMin: 210, respIncMin: 40, retrabajo: true, direccion: 'Parque Ind. Bodega 2', reporte: 'Ticket reabierto por atenuación; ducto colapsado en acometida.' },
    { id: '#109', fecha: '2026-10-18', semana: 'sem3', cliente: 'Financiera Sol', tecnico: 'A. Ruiz', estado: 'Finalizada', incidencia: 'Ninguna', sla: 'A tiempo', mttrMin: 130, respIncMin: null, retrabajo: false, direccion: 'Av. Insurgentes 900', reporte: 'Migración de enlace redundante completada sin cortes.' },
    { id: '#110', fecha: '2026-10-15', semana: 'sem2', cliente: 'DataHub Centro', tecnico: 'L. Torres', estado: 'Finalizada', incidencia: 'Ninguna', sla: 'A tiempo', mttrMin: 115, respIncMin: null, retrabajo: false, direccion: 'Calle Juárez 210', reporte: 'Fusión de 4 hilos de fibra monomodo finalizada.' },
    { id: '#111', fecha: '2026-10-12', semana: 'sem2', cliente: 'Grupo Norte', tecnico: 'R. Sánchez', estado: 'En Proceso', incidencia: 'Cliente Ausente', sla: 'En riesgo', mttrMin: 150, respIncMin: 30, retrabajo: false, direccion: 'Carretera Nacional Km 8', reporte: 'Esperando autorización de caseta de vigilancia.' },
    { id: '#112', fecha: '2026-10-10', semana: 'sem2', cliente: 'Clínica Vida', tecnico: 'J. Pérez', estado: 'Finalizada', incidencia: 'Otros', sla: 'A tiempo', mttrMin: 135, respIncMin: 36, retrabajo: false, direccion: 'Av. Salud 55', reporte: 'Ajuste menor por ventana eléctrica del cliente.' },
    { id: '#113', fecha: '2026-10-06', semana: 'sem1', cliente: 'Retail Express', tecnico: 'M. Gómez', estado: 'Finalizada', incidencia: 'Bloqueo Ductos', sla: 'A tiempo', mttrMin: 160, respIncMin: 41, retrabajo: true, direccion: 'Centro Comercial Este', reporte: 'Reapertura resuelta mediante ruta aérea alterna.' },
    { id: '#114', fecha: '2026-10-03', semana: 'sem1', cliente: 'Constructora Z', tecnico: 'A. Ruiz', estado: 'Finalizada', incidencia: 'Ninguna', sla: 'A tiempo', mttrMin: 105, respIncMin: null, retrabajo: false, direccion: 'Zona Poniente 34', reporte: 'Enlace punto a punto alineado y validado.' }
];

// Resumen semanal agregado del mes estático (4 semanas)
const WEEKLY_SUMMARY = {
    sem1: { label: 'Semana 1', recibidas: 45, completadas: 40, incidencias: 8, abiertas: 5, sla: 91, mttr: '2h 20m', respInc: '41 min', retrabajo: '4%' },
    sem2: { label: 'Semana 2', recibidas: 52, completadas: 48, incidencias: 9, abiertas: 4, sla: 93, mttr: '2h 12m', respInc: '37 min', retrabajo: '5%' },
    sem3: { label: 'Semana 3', recibidas: 38, completadas: 35, incidencias: 7, abiertas: 3, sla: 90, mttr: '2h 18m', respInc: '39 min', retrabajo: '6%' },
    sem4: { label: 'Semana 4', recibidas: 60, completadas: 55, incidencias: 11, abiertas: 14, sla: 92, mttr: '2h 15m', respInc: '38 min', retrabajo: '5%' }
};

// ---------------- FICHAS TÉCNICAS DE LOS 8 KPIs ----------------
const KPI_SPECS = {
    ordenes_abiertas: {
        nombre: 'Órdenes Abiertas',
        definicion: 'Cantidad de órdenes de trabajo activas en flujo operativo que aún no alcanzan el estado Finalizada.',
        formula: 'COUNT(OrdenesTrabajo) WHERE estado IN ("Pendiente", "Asignada", "En Camino", "En Proceso", "Detenida")',
        frecuencia: 'Tiempo real (simulado en corte estático)',
        responsable: 'Coordinación de Despacho',
        decision: 'Evaluar la saturación de la cola operativa y decidir la aceptación o reprogramación de servicios urgentes.'
    },
    cumplimiento_sla: {
        nombre: 'Tasa de Cumplimiento SLA',
        definicion: 'Porcentaje de órdenes finalizadas dentro del plazo máximo contractual acordado con el cliente.',
        formula: '(Órdenes con fecha_completada <= fecha_limite_sla / Total de Órdenes Finalizadas) × 100',
        frecuencia: 'Semanal / Mensual',
        responsable: 'Gerencia de Operaciones',
        decision: 'Detectar desviaciones territoriales o técnicas y activar planes de contingencia mediante semáforos Rojo/Amarillo/Verde.'
    },
    mttr: {
        nombre: 'MTTR (Tiempo Medio de Resolución)',
        definicion: 'Duración promedio transcurrida desde la creación de la orden hasta su cierre definitivo en bitácora.',
        formula: 'Σ(fecha_completada - fecha_creacion) / Total de Órdenes Finalizadas',
        frecuencia: 'Semanal / Mensual',
        responsable: 'Coordinación Técnica',
        decision: 'Identificar tiempos muertos en traslados o ejecución y optimizar rutas y protocolos de intervención.'
    },
    incidencias_tipo: {
        nombre: 'Incidencias por Tipo (% con Incidencias)',
        definicion: 'Proporción y desglose categórico de órdenes que registraron bloqueos o contratiempos operativos en campo.',
        formula: '(Órdenes con ≥1 registro es_incidencia = TRUE / Total de Órdenes del periodo) × 100',
        frecuencia: 'Diaria / Semanal',
        responsable: 'Supervisión de Campo',
        decision: 'Atacar causas raíz previas al despacho (bloqueo de ductos, cliente ausente, falta de material).'
    },
    carga_tecnico: {
        nombre: 'Carga de Trabajo por Técnico',
        definicion: 'Distribución promedio y apilada de órdenes completadas, en proceso y detenidas asignadas a cada técnico.',
        formula: 'Total de Órdenes Asignadas / Número de Técnicos Activos (desglosado por estado)',
        frecuencia: 'Diaria',
        responsable: 'Coordinación de Despacho',
        decision: 'Rebalancear asignaciones para evitar cuellos de botella en técnicos saturados.'
    },
    ordenes_cerradas: {
        nombre: 'Órdenes Cerradas (Productividad)',
        definicion: 'Volumen total y porcentaje de absorción de solicitudes concluidas satisfactoriamente en el periodo.',
        formula: 'COUNT(OrdenesTrabajo) WHERE estado = "Finalizada"',
        frecuencia: 'Semanal / Mensual',
        responsable: 'Gerencia de Operaciones',
        decision: 'Medir la capacidad instalada de resolución frente al crecimiento de la demanda semanal.'
    },
    tiempo_respuesta_inc: {
        nombre: 'Tiempo Medio de Respuesta a Incidencias',
        definicion: 'Tiempo promedio que tarda coordinación en atender o escalar una incidencia desde su registro en bitácora.',
        formula: 'Σ(fecha_atencion_incidencia - fecha_registro_incidencia) / Total de Incidencias Atendidas',
        frecuencia: 'Diaria / Semanal',
        responsable: 'Mesa de Control / Despacho',
        decision: 'Reducir el tiempo que las cuadrillas permanecen detenidas en sitio esperando autorización o soporte.'
    },
    tasa_retrabajo: {
        nombre: 'Tasa de Retrabajo',
        definicion: 'Porcentaje de órdenes finalizadas que debieron reabrirse por persistencia de falla o inconformidad.',
        formula: '(Órdenes Reabiertas / Total de Órdenes Finalizadas) × 100',
        frecuencia: 'Mensual',
        responsable: 'Aseguramiento de Calidad Técnica',
        decision: 'Detectar necesidades de capacitación técnica o refuerzo de pruebas de certificación antes del cierre.'
    }
};

// ---------------- ESTADO GLOBAL DE FILTROS ----------------
const filterState = {
    period: 'mes',
    technician: 'todos',
    status: 'todos',
    incidentType: 'todos',
    drillMode: null,
    search: ''
};

let chartsRendered = false;
let lineChartInstance = null;
let barChartInstance = null;
let donutChartInstance = null;
let radarChartInstance = null;
let hBarChartInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------------- LOGIN ----------------
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const errorMsg = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value.trim();

        if (user === 'admin' && pass === '1234') {
            loginScreen.style.opacity = '0';
            setTimeout(() => {
                loginScreen.style.display = 'none';
                dashboardScreen.style.display = 'flex';
                dashboardScreen.style.opacity = '0';
                
                setTimeout(() => {
                    dashboardScreen.style.transition = 'opacity 0.4s ease';
                    dashboardScreen.style.opacity = '1';
                    if (!chartsRendered) {
                        renderCharts();
                        chartsRendered = true;
                    }
                    applyFiltersAndRender();
                }, 50);
            }, 250);
        } else {
            errorMsg.style.display = 'block';
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 400);
        }
    });

    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        dashboardScreen.style.opacity = '0';
        setTimeout(() => {
            dashboardScreen.style.display = 'none';
            loginScreen.style.display = 'flex';
            void loginScreen.offsetWidth;
            loginScreen.style.opacity = '1';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            errorMsg.style.display = 'none';
        }, 250);
    });

    // ---------------- NAVEGACIÓN SIDEBAR ----------------
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const views = document.querySelectorAll('.view-section');
    const headerTitle = document.querySelector('.header-title h2');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.style.display = 'none');
            
            this.classList.add('active');
            headerTitle.textContent = this.querySelector('span').textContent;
            
            const targetId = this.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.style.display = 'block';
        });
    });

    // ---------------- FILTROS GLOBALES ----------------
    const periodSelect = document.getElementById('filter-period');
    const techSelect = document.getElementById('filter-technician');
    const statusSelect = document.getElementById('filter-status');
    const resetBtn = document.getElementById('btn-reset-filters');
    const clearTableBtn = document.getElementById('btn-clear-table-filters');
    const dailySearchInput = document.getElementById('daily-search-input');

    periodSelect.addEventListener('change', () => {
        filterState.period = periodSelect.value;
        applyFiltersAndRender();
    });
    techSelect.addEventListener('change', () => {
        filterState.technician = techSelect.value;
        applyFiltersAndRender();
    });
    statusSelect.addEventListener('change', () => {
        filterState.status = statusSelect.value;
        filterState.drillMode = null;
        applyFiltersAndRender();
    });
    dailySearchInput.addEventListener('input', () => {
        filterState.search = dailySearchInput.value.trim().toLowerCase();
        renderDailyTable(getFilteredOrders());
    });

    function resetAllFilters() {
        filterState.period = 'mes';
        filterState.technician = 'todos';
        filterState.status = 'todos';
        filterState.incidentType = 'todos';
        filterState.drillMode = null;
        filterState.search = '';
        periodSelect.value = 'mes';
        techSelect.value = 'todos';
        statusSelect.value = 'todos';
        dailySearchInput.value = '';
        document.querySelectorAll('.kpi-card[data-drill]').forEach(c => c.classList.remove('kpi-active-filter'));
        applyFiltersAndRender();
    }

    resetBtn.addEventListener('click', resetAllFilters);
    clearTableBtn.addEventListener('click', resetAllFilters);

    // ---------------- DRILL-DOWN DESDE KPI CARDS ----------------
    document.querySelectorAll('.kpi-card[data-drill]').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.kpi-info-btn')) return;

            const mode = this.getAttribute('data-drill');
            const isAlreadyActive = this.classList.contains('kpi-active-filter');

            document.querySelectorAll('.kpi-card[data-drill]').forEach(c => c.classList.remove('kpi-active-filter'));

            if (isAlreadyActive) {
                filterState.drillMode = null;
            } else {
                this.classList.add('kpi-active-filter');
                filterState.drillMode = mode === 'todas' ? null : mode;
            }

            applyFiltersAndRender();
            document.getElementById('daily-table-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ---------------- FICHAS TÉCNICAS Y DICCIONARIO DE INDICADORES ----------------
    document.querySelectorAll('.kpi-info-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const key = this.getAttribute('data-kpi-spec');
            openKpiSpecModal(key);
        });
    });

    document.getElementById('btn-open-dictionary').addEventListener('click', openDictionaryModal);

    // ---------------- BÚSQUEDA EN ÓRDENES DE TRABAJO ----------------
    const ordersSearch = document.getElementById('orders-search-input');
    if (ordersSearch) {
        ordersSearch.addEventListener('input', function() {
            const q = this.value.toLowerCase();
            document.querySelectorAll('#orders-management-table tbody tr').forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    // ---------------- EXPORTACIÓN FUNCIONAL EXCEL (CSV) Y PDF ----------------
    document.getElementById('btn-export-excel').addEventListener('click', function(e) {
        e.preventDefault();
        exportOrdersToCSV();
    });

    document.getElementById('btn-export-pdf').addEventListener('click', function(e) {
        e.preventDefault();
        exportPrintablePDF();
    });

    // ---------------- MODALES GENERALES ----------------
    const modalOverlay = document.getElementById('modal-overlay');
    const modals = document.querySelectorAll('.modal-card');
    const closeBtns = document.querySelectorAll('.close-modal');

    window.openModal = function(modalId) {
        modals.forEach(m => m.style.display = 'none');
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.style.display = 'block';
            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.classList.add('active'), 10);
        }
    };

    window.closeModal = function() {
        modalOverlay.classList.remove('active');
        setTimeout(() => { modalOverlay.style.display = 'none'; }, 250);
    };

    closeBtns.forEach(btn => btn.addEventListener('click', window.closeModal));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) window.closeModal();
    });

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const text = btn.textContent.trim();

        if (btn.classList.contains('close-modal') || btn.classList.contains('kpi-info-btn') || btn.id === 'btn-open-dictionary' || btn.id === 'btn-export-excel' || btn.id === 'btn-export-pdf' || btn.id === 'btn-reset-filters' || btn.id === 'btn-clear-table-filters' || (btn.type === 'submit' && btn.closest('#login-form'))) {
            return;
        }

        if (btn.classList.contains('action-modal-btn')) {
            e.preventDefault();
            window.closeModal();
            return;
        }

        if (text.includes('Nueva Orden')) {
            e.preventDefault();
            document.getElementById('modal-order-title').textContent = 'Nueva Orden de Trabajo';
            window.openModal('modal-order');
        } else if (text.includes('Editar')) {
            e.preventDefault();
            document.getElementById('modal-order-title').textContent = 'Editar Orden de Trabajo';
            window.openModal('modal-order');
        } else if (btn.classList.contains('btn-order-detail')) {
            e.preventDefault();
            const orderId = btn.getAttribute('data-order-id');
            openOrderDetailModal(orderId);
        } else if (text.includes('Asignar Orden')) {
            e.preventDefault();
            window.openModal('modal-assign');
        } else if (text.includes('Guardar Cambios')) {
            e.preventDefault();
            alert('Preferencias guardadas en sesión local (configuración no conectada a backend).');
        }
    });
});

// ---------------- LÓGICA DE FILTRADO Y ACTUALIZACIÓN ----------------
function getFilteredOrders() {
    return STATIC_ORDERS.filter(order => {
        if (filterState.period !== 'mes' && order.semana !== filterState.period) return false;
        if (filterState.technician !== 'todos' && order.tecnico !== filterState.technician) return false;
        if (filterState.status !== 'todos' && order.estado !== filterState.status) return false;
        if (filterState.incidentType !== 'todos' && order.incidencia !== filterState.incidentType) return false;

        if (filterState.drillMode === 'abiertas' && order.estado === 'Finalizada') return false;
        if (filterState.drillMode === 'finalizadas' && order.estado !== 'Finalizada') return false;
        if (filterState.drillMode === 'incidencias' && order.incidencia === 'Ninguna') return false;
        if (filterState.drillMode === 'sla-riesgo' && order.sla === 'A tiempo') return false;
        if (filterState.drillMode === 'retrabajo' && !order.retrabajo) return false;

        if (filterState.search) {
            const haystack = `${order.fecha} ${order.id} ${order.cliente} ${order.tecnico} ${order.incidencia} ${order.estado}`.toLowerCase();
            if (!haystack.includes(filterState.search)) return false;
        }
        return true;
    });
}

function applyFiltersAndRender() {
    const filtered = getFilteredOrders();
    updateKpiCards(filtered);
    renderDailyTable(filtered);
    updateChartsFromFilters(filtered);
    renderActiveFilterChips();
}

function updateKpiCards(orders) {
    const isGlobalUnfiltered = filterState.period === 'mes' && filterState.technician === 'todos' && filterState.status === 'todos' && filterState.incidentType === 'todos' && !filterState.drillMode;

    if (isGlobalUnfiltered) {
        document.getElementById('kpi-val-abiertas').textContent = '14';
        document.getElementById('kpi-val-sla').textContent = '92%';
        document.getElementById('kpi-val-mttr').textContent = '2h 15m';
        document.getElementById('kpi-val-incidencias').textContent = '18%';
        document.getElementById('kpi-val-carga').innerHTML = '8.6 <span style="font-size:1rem; color:var(--text-muted)">ord/téc</span>';
        document.getElementById('kpi-val-cerradas').textContent = '178';
        document.getElementById('kpi-val-resp-inc').textContent = '38 min';
        document.getElementById('kpi-val-retrabajo').textContent = '5%';
        updateSlaTrafficLight(92);
        return;
    }

    const total = orders.length;
    const abiertas = orders.filter(o => o.estado !== 'Finalizada').length;
    const cerradas = orders.filter(o => o.estado === 'Finalizada').length;
    const conInc = orders.filter(o => o.incidencia !== 'Ninguna').length;
    const retrabajoCount = orders.filter(o => o.retrabajo).length;
    const slaOk = orders.filter(o => o.sla === 'A tiempo').length;

    const slaPct = total ? Math.round((slaOk / total) * 100) : 0;
    const incPct = total ? Math.round((conInc / total) * 100) : 0;
    const retrabajoPct = total ? Math.round((retrabajoCount / total) * 100) : 0;

    const avgMttr = total ? Math.round(orders.reduce((acc, o) => acc + o.mttrMin, 0) / total) : 0;
    const mttrStr = total ? `${Math.floor(avgMttr / 60)}h ${avgMttr % 60}m` : '0h 0m';

    const incOrders = orders.filter(o => o.respIncMin !== null);
    const avgResp = incOrders.length ? Math.round(incOrders.reduce((acc, o) => acc + o.respIncMin, 0) / incOrders.length) : 0;

    const uniqueTechs = new Set(orders.map(o => o.tecnico)).size || 1;
    const carga = (total / uniqueTechs).toFixed(1);

    document.getElementById('kpi-val-abiertas').textContent = abiertas;
    document.getElementById('kpi-val-sla').textContent = `${slaPct}%`;
    document.getElementById('kpi-val-mttr').textContent = mttrStr;
    document.getElementById('kpi-val-incidencias').textContent = `${incPct}%`;
    document.getElementById('kpi-val-carga').innerHTML = `${carga} <span style="font-size:1rem; color:var(--text-muted)">ord/téc</span>`;
    document.getElementById('kpi-val-cerradas').textContent = cerradas;
    document.getElementById('kpi-val-resp-inc').textContent = incOrders.length ? `${avgResp} min` : 'N/A';
    document.getElementById('kpi-val-retrabajo').textContent = `${retrabajoPct}%`;
    updateSlaTrafficLight(slaPct);
}

function updateSlaTrafficLight(slaPct) {
    const label = document.getElementById('kpi-sla-label');
    if (slaPct >= 90) {
        label.textContent = 'Óptimo';
        label.className = 'text-success';
    } else if (slaPct >= 85) {
        label.textContent = 'En riesgo';
        label.className = 'text-warning';
    } else {
        label.textContent = 'Crítico';
        label.className = 'text-danger';
    }
}

function renderDailyTable(orders) {
    const tbody = document.getElementById('daily-table-body');
    if (!orders.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:2rem;">No hay registros diarios que coincidan con los filtros seleccionados.</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => {
        let statusClass = 'badge-info';
        if (order.estado === 'Finalizada') statusClass = 'badge-success';
        else if (order.estado === 'Detenida') statusClass = 'badge-danger';
        else if (order.estado === 'En Camino' || order.estado === 'Pendiente') statusClass = 'badge-warning';

        let slaDotClass = 'sla-green';
        if (order.sla === 'En riesgo') slaDotClass = 'sla-yellow';
        else if (order.sla === 'Vencido') slaDotClass = 'sla-red';

        return `
            <tr>
                <td>${order.fecha}</td>
                <td><strong>${order.id}</strong></td>
                <td>${order.cliente}</td>
                <td>${order.tecnico}</td>
                <td>${order.incidencia}</td>
                <td><span class="sla-traffic-lights"><span class="sla-dot ${slaDotClass}"></span> ${order.sla}</span></td>
                <td><span class="badge ${statusClass}">${order.estado}</span></td>
                <td><button class="action-btn btn-order-detail" data-order-id="${order.id}">Detalle</button></td>
            </tr>
        `;
    }).join('');
}

function renderActiveFilterChips() {
    const bar = document.getElementById('active-filters-bar');
    const chipsContainer = document.getElementById('active-filter-chips');
    const resetBtn = document.getElementById('btn-reset-filters');

    const chips = [];
    if (filterState.period !== 'mes') chips.push(`Periodo: ${WEEKLY_SUMMARY[filterState.period]?.label || filterState.period}`);
    if (filterState.technician !== 'todos') chips.push(`Técnico: ${filterState.technician}`);
    if (filterState.status !== 'todos') chips.push(`Estado: ${filterState.status}`);
    if (filterState.incidentType !== 'todos') chips.push(`Incidencia: ${filterState.incidentType}`);
    if (filterState.drillMode) chips.push(`Vista KPI: ${filterState.drillMode}`);

    if (chips.length > 0) {
        bar.style.display = 'flex';
        resetBtn.style.display = 'inline-flex';
        chipsContainer.innerHTML = '<span><i class="fa-solid fa-filter"></i> Filtros activos:</span>' + chips.map(c => `<span class="filter-chip">${c}</span>`).join('');
    } else {
        bar.style.display = 'none';
        resetBtn.style.display = 'none';
        chipsContainer.innerHTML = '';
    }
}

// ---------------- RENDERIZADO Y NAVEGACIÓN CRUZADA DE GRÁFICOS ----------------
function renderCharts() {
    // 1. Tendencia Semanal: Órdenes e Incidencias (Líneas)
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    lineChartInstance = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [
                {
                    label: 'Solicitudes Recibidas',
                    data: [45, 52, 38, 60],
                    borderColor: '#0284c7',
                    backgroundColor: 'rgba(2, 132, 199, 0.12)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Órdenes Completadas',
                    data: [40, 48, 35, 55],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.12)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Órdenes con Incidencia',
                    data: [8, 9, 7, 11],
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.08)',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            onClick: (evt, elements) => {
                if (elements.length > 0) {
                    const idx = elements[0].index;
                    const semKey = `sem${idx + 1}`;
                    filterState.period = filterState.period === semKey ? 'mes' : semKey;
                    document.getElementById('filter-period').value = filterState.period;
                    applyFiltersAndRender();
                }
            },
            scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(15, 23, 42, 0.06)', drawBorder: false } } },
            plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.92)', padding: 10, cornerRadius: 8 } }
        }
    });

    // 2. Carga de Trabajo por Técnico (Barras Apiladas)
    const ctxBar = document.getElementById('barChart').getContext('2d');
    barChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['J. Pérez', 'M. Gómez', 'L. Torres', 'R. Sánchez', 'A. Ruiz'],
            datasets: [
                { label: 'Completadas', data: [7, 4, 8, 5, 6], backgroundColor: '#10b981', borderRadius: 4, barPercentage: 0.6 },
                { label: 'En Proceso', data: [2, 3, 1, 2, 2], backgroundColor: '#0284c7', borderRadius: 4, barPercentage: 0.6 },
                { label: 'Detenidas', data: [0, 2, 0, 1, 0], backgroundColor: '#ef4444', borderRadius: 4, barPercentage: 0.6 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            onClick: (evt, elements) => {
                if (elements.length > 0) {
                    const idx = elements[0].index;
                    const tech = barChartInstance.data.labels[idx];
                    filterState.technician = filterState.technician === tech ? 'todos' : tech;
                    document.getElementById('filter-technician').value = filterState.technician;
                    applyFiltersAndRender();
                }
            },
            scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { color: 'rgba(15, 23, 42, 0.06)', drawBorder: false }, border: { display: false } } },
            plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.92)', padding: 10, cornerRadius: 8 } }
        }
    });

    // 3. Incidencias por Tipo (Dona)
    const ctxDonut = document.getElementById('donutChart').getContext('2d');
    donutChartInstance = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Bloqueo Ductos', 'Cliente Ausente', 'Falta Material', 'Otros'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#ef4444', '#f59e0b', '#0284c7', '#64748b'],
                borderWidth: 0, hoverOffset: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '72%',
            onClick: (evt, elements) => {
                if (elements.length > 0) {
                    const idx = elements[0].index;
                    const incType = donutChartInstance.data.labels[idx];
                    filterState.incidentType = filterState.incidentType === incType ? 'todos' : incType;
                    applyFiltersAndRender();
                }
            },
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.92)', padding: 10, cornerRadius: 8 } }
        }
    });

    // 4. Cumplimiento SLA por Región (Radar)
    const ctxRadar = document.getElementById('radarChart').getContext('2d');
    radarChartInstance = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'],
            datasets: [{
                label: 'Cumplimiento SLA %',
                data: [95, 88, 92, 85, 98],
                backgroundColor: 'rgba(5, 150, 105, 0.18)',
                borderColor: '#059669',
                pointBackgroundColor: ['#10b981', '#f59e0b', '#10b981', '#ef4444', '#10b981'],
                pointRadius: 5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { suggestedMin: 75, suggestedMax: 100, angleLines: { color: 'rgba(15, 23, 42, 0.1)' }, grid: { color: 'rgba(15, 23, 42, 0.1)' }, pointLabels: { color: '#475569', font: { size: 12 } }, ticks: { display: false } } },
            plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.92)' } }
        }
    });

    // 5. Motivos de Cancelación (Barras Horizontales)
    const ctxHBar = document.getElementById('horizontalBarChart').getContext('2d');
    hBarChartInstance = new Chart(ctxHBar, {
        type: 'bar',
        data: {
            labels: ['Cliente Ausente', 'Permisos Extra', 'Clima Adverso', 'Falla Externa'],
            datasets: [{
                label: 'Cantidad',
                data: [12, 8, 5, 3],
                backgroundColor: '#ef4444',
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true, maintainAspectRatio: false,
            scales: { x: { grid: { color: 'rgba(15, 23, 42, 0.06)' } }, y: { grid: { display: false } } },
            plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.92)', padding: 10 } }
        }
    });
}

function updateChartsFromFilters(filteredOrders) {
    if (!chartsRendered) return;

    const isUnfiltered = filterState.period === 'mes' && filterState.technician === 'todos' && filterState.status === 'todos' && filterState.incidentType === 'todos' && !filterState.drillMode;

    // Resaltar barra de técnico seleccionado en barChart
    const techs = ['J. Pérez', 'M. Gómez', 'L. Torres', 'R. Sánchez', 'A. Ruiz'];
    if (isUnfiltered) {
        barChartInstance.data.datasets[0].data = [7, 4, 8, 5, 6];
        barChartInstance.data.datasets[1].data = [2, 3, 1, 2, 2];
        barChartInstance.data.datasets[2].data = [0, 2, 0, 1, 0];
        donutChartInstance.data.datasets[0].data = [45, 30, 15, 10];
    } else {
        barChartInstance.data.datasets[0].data = techs.map(t => filteredOrders.filter(o => o.tecnico === t && o.estado === 'Finalizada').length);
        barChartInstance.data.datasets[1].data = techs.map(t => filteredOrders.filter(o => o.tecnico === t && (o.estado === 'En Proceso' || o.estado === 'En Camino' || o.estado === 'Pendiente')).length);
        barChartInstance.data.datasets[2].data = techs.map(t => filteredOrders.filter(o => o.tecnico === t && o.estado === 'Detenida').length);

        const incTypes = ['Bloqueo Ductos', 'Cliente Ausente', 'Falta Material', 'Otros'];
        const counts = incTypes.map(type => filteredOrders.filter(o => o.incidencia === type).length);
        donutChartInstance.data.datasets[0].data = counts.some(c => c > 0) ? counts : [0, 0, 0, 0];
    }

    barChartInstance.update();
    donutChartInstance.update();
}

// ---------------- MODALES DE FICHA TÉCNICA, DICCIONARIO Y DETALLE ----------------
function openKpiSpecModal(key) {
    const spec = KPI_SPECS[key];
    if (!spec) return;
    document.getElementById('kpi-spec-title').textContent = `Ficha Técnica: ${spec.nombre}`;
    document.getElementById('kpi-spec-body').innerHTML = `
        <table class="spec-table">
            <tr><th>Nombre</th><td><strong>${spec.nombre}</strong></td></tr>
            <tr><th>Definición</th><td>${spec.definicion}</td></tr>
            <tr><th>Fórmula</th><td><code>${spec.formula}</code></td></tr>
            <tr><th>Frecuencia</th><td>${spec.frecuencia}</td></tr>
            <tr><th>Responsable</th><td>${spec.responsable}</td></tr>
            <tr><th>Decisión que apoya</th><td>${spec.decision}</td></tr>
        </table>
    `;
    window.openModal('modal-kpi-spec');
}

function openDictionaryModal() {
    const html = Object.values(KPI_SPECS).map(spec => `
        <div class="dictionary-item">
            <h4>${spec.nombre}</h4>
            <table class="spec-table">
                <tr><th>Definición</th><td>${spec.definicion}</td></tr>
                <tr><th>Fórmula</th><td><code>${spec.formula}</code></td></tr>
                <tr><th>Frecuencia</th><td>${spec.frecuencia}</td></tr>
                <tr><th>Responsable</th><td>${spec.responsable}</td></tr>
                <tr><th>Decisión que apoya</th><td>${spec.decision}</td></tr>
            </table>
        </div>
    `).join('');
    document.getElementById('dictionary-body').innerHTML = html;
    window.openModal('modal-dictionary');
}

function openOrderDetailModal(orderId) {
    const order = STATIC_ORDERS.find(o => o.id === orderId);
    if (!order) return;
    document.getElementById('modal-detail-content').innerHTML = `
        <p style="margin-bottom:0.5rem;"><strong>Orden:</strong> ${order.id} &nbsp;|&nbsp; <strong>Fecha:</strong> ${order.fecha}</p>
        <p style="margin-bottom:0.5rem;"><strong>Cliente:</strong> ${order.cliente}</p>
        <p style="margin-bottom:0.5rem;"><strong>Técnico:</strong> ${order.tecnico}</p>
        <p style="margin-bottom:0.5rem;"><strong>Estado:</strong> ${order.estado} &nbsp;|&nbsp; <strong>SLA:</strong> ${order.sla}</p>
        <p style="margin-bottom:0.5rem;"><strong>Incidencia:</strong> ${order.incidencia}</p>
        <p style="margin-bottom:0.5rem;"><strong>Dirección:</strong> ${order.direccion}</p>
        <hr style="border-color: var(--border-color); margin: 1rem 0;">
        <p style="color:var(--text-muted); font-size:0.85rem;"><strong>Reporte del Técnico:</strong> "${order.reporte}"</p>
    `;
    window.openModal('modal-detail');
}

// ---------------- EXPORTACIÓN REAL EN CLIENTE (CSV PARA EXCEL Y PDF IMPRIMIBLE) ----------------
function exportOrdersToCSV() {
    const reportType = document.getElementById('report-type').value;
    const start = document.getElementById('report-date-start').value || '2026-10-01';
    const end = document.getElementById('report-date-end').value || '2026-10-31';

    const rows = STATIC_ORDERS.filter(o => o.fecha >= start && o.fecha <= end);
    const headers = ['Fecha', 'ID', 'Cliente', 'Tecnico', 'Estado', 'Incidencia', 'Semaforo_SLA', 'MTTR_Min'];
    const csvLines = [
        `"Aranea Telecom - Reporte Operativo - Tipo: ${reportType}"`,
        headers.join(','),
        ...rows.map(o => [o.fecha, o.id, `"${o.cliente}"`, `"${o.tecnico}"`, `"${o.estado}"`, `"${o.incidencia}"`, `"${o.sla}"`, o.mttrMin].join(','))
    ];

    const blob = new Blob(['\uFEFF' + csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte_${reportType}_${start}_${end}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportPrintablePDF() {
    const reportType = document.getElementById('report-type').value;
    const start = document.getElementById('report-date-start').value || '2026-10-01';
    const end = document.getElementById('report-date-end').value || '2026-10-31';
    const rows = STATIC_ORDERS.filter(o => o.fecha >= start && o.fecha <= end);

    const win = window.open('', '_blank');
    if (!win) {
        alert('Habilita las ventanas emergentes para generar la vista de impresión PDF.');
        return;
    }
    win.document.write(`
        <html lang="es">
        <head>
            <title>Reporte ${reportType} - Aranea Telecom</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
                th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
                th { background: #f1f5f9; }
            </style>
        </head>
        <body>
            <h2>Aranea Telecom — Reporte de ${reportType.toUpperCase()}</h2>
            <p>Periodo: ${start} al ${end} | Registros: ${rows.length}</p>
            <table>
                <thead><tr><th>Fecha</th><th>ID</th><th>Cliente</th><th>Técnico</th><th>Estado</th><th>Incidencia</th><th>SLA</th></tr></thead>
                <tbody>
                    ${rows.map(o => `<tr><td>${o.fecha}</td><td>${o.id}</td><td>${o.cliente}</td><td>${o.tecnico}</td><td>${o.estado}</td><td>${o.incidencia}</td><td>${o.sla}</td></tr>`).join('')}
                </tbody>
            </table>
            <script>window.onload = () => window.print();</script>
        </body>
        </html>
    `);
    win.document.close();
}
