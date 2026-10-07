Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 13;

let chartsRendered = false;

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------------- LOGIN ----------------
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const errorMsg = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if(user === 'admin' && pass === '1234') {
            loginScreen.style.opacity = '0';
            setTimeout(() => {
                loginScreen.style.display = 'none';
                dashboardScreen.style.display = 'flex';
                dashboardScreen.style.opacity = '0';
                
                setTimeout(() => {
                    dashboardScreen.style.transition = 'opacity 0.5s ease';
                    dashboardScreen.style.opacity = '1';
                    if(!chartsRendered) {
                        renderCharts();
                        chartsRendered = true;
                    }
                }, 50);
            }, 300);
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
        }, 300);
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
            if(targetView) {
                targetView.style.display = 'block';
            }
        });
    });

    // ---------------- LOGICA DE MODALES Y BOTONES GLOBALES ----------------
    const modalOverlay = document.getElementById('modal-overlay');
    const modals = document.querySelectorAll('.modal-card');
    const closeBtns = document.querySelectorAll('.close-modal');

    function openModal(modalId) {
        modals.forEach(m => m.style.display = 'none');
        const targetModal = document.getElementById(modalId);
        if(targetModal) {
            targetModal.style.display = 'block';
            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.classList.add('active'), 10);
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.style.display = 'none', 300);
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    // Capturar clics en TODOS los botones para lanzar modales
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if(!btn) return;
        
        const text = btn.textContent.trim();
        
        // Excepciones para no interceptar el login o close
        if(btn.classList.contains('close-modal') || btn.classList.contains('logout-item') || btn.type === 'submit' && btn.closest('#login-form')) {
            return;
        }

        // Lógica de Modales de Formulario (Botones internos)
        if(btn.classList.contains('action-modal-btn')) {
            e.preventDefault();
            closeModal();
            alert("✅ ¡Acción realizada exitosamente! (Datos simulados procesados)");
            return;
        }

        // Mapeo de botones a acciones/modales
        if(text.includes('Nueva Orden')) {
            e.preventDefault();
            document.getElementById('modal-order-title').textContent = "Nueva Orden de Trabajo";
            openModal('modal-order');
        } 
        else if(text.includes('Editar')) {
            e.preventDefault();
            document.getElementById('modal-order-title').textContent = "Editar Orden de Trabajo";
            openModal('modal-order');
        }
        else if(text.includes('Detalle')) {
            e.preventDefault();
            openModal('modal-detail');
        }
        else if(text.includes('Asignar Orden')) {
            e.preventDefault();
            openModal('modal-assign');
        }
        else if(text.includes('Descargar Excel') || text.includes('Descargar PDF')) {
            e.preventDefault();
            alert("📥 Generando reporte de descarga... (Simulación)");
        }
        else if(text.includes('Guardar Cambios')) {
            e.preventDefault();
            alert("💾 ¡Preferencias del sistema guardadas correctamente!");
        }
    });

});

// ---------------- RENDER GRÁFICOS ----------------
function renderCharts() {
    
    // Gráfico de Líneas (Full Width)
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [
                {
                    label: 'Solicitudes Recibidas',
                    data: [45, 52, 38, 60],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Órdenes Completadas',
                    data: [40, 48, 35, 55],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false } } },
            plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: 'rgba(11, 25, 44, 0.9)', padding: 10, cornerRadius: 8 } }
        }
    });

    // Nuevo: Gráfico Radar
    const ctxRadar = document.getElementById('radarChart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'],
            datasets: [{
                label: 'Cumplimiento SLA %',
                data: [95, 88, 92, 85, 98],
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: '#10b981',
                pointBackgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { angleLines: { color: 'rgba(255,255,255,0.1)' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#94a3b8', font: {size: 12} }, ticks: { display: false } } },
            plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(11, 25, 44, 0.9)' } }
        }
    });

    // Nuevo: Gráfico de Barras Horizontales
    const ctxHBar = document.getElementById('horizontalBarChart').getContext('2d');
    new Chart(ctxHBar, {
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
            scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' } }, y: { grid: { display: false } } },
            plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(11, 25, 44, 0.9)', padding: 10 } }
        }
    });

    // Gráfico de Barras Normal
    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['J. Pérez', 'M. Gómez', 'L. Torres', 'R. Sánchez', 'A. Ruiz'],
            datasets: [
                { label: 'Completadas', data: [7, 4, 8, 5, 6], backgroundColor: '#10b981', borderRadius: 4, barPercentage: 0.6 },
                { label: 'En Proceso', data: [2, 5, 1, 3, 2], backgroundColor: '#38bdf8', borderRadius: 4, barPercentage: 0.6 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, border: { display: false } } },
            plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: 'rgba(11, 25, 44, 0.9)', padding: 10, cornerRadius: 8 } }
        }
    });

    // Gráfico de Dona
    const ctxDonut = document.getElementById('donutChart').getContext('2d');
    new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Bloqueo Ductos', 'Cliente Ausente', 'Falta Material', 'Otros'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#ef4444', '#f59e0b', '#38bdf8', '#64748b'],
                borderWidth: 0, hoverOffset: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '75%',
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 20, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: 'rgba(11, 25, 44, 0.9)', padding: 10, cornerRadius: 8 } }
        }
    });
}
