const API_URL = 'http://localhost:3000/tasks';

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const loadingMessage = document.getElementById('loading-message');

    // Función para renderizar la lista de tareas
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            taskList.innerHTML = '<p>No hay tareas pendientes.</p>';
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.dataset.id = task.id;
            
            li.innerHTML = `
                <span>${task.title}</span>
                <button class="toggle-btn" data-completed="${task.completed ? 'false' : 'true'}">
                    ${task.completed ? 'Deshacer' : 'Completar'}
                </button>
                <button class="delete-btn">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Función para obtener tareas de la API
    async function fetchTasks() {
        loadingMessage.style.display = 'block';
        try {
            const response = await fetch(API_URL);
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            taskList.innerHTML = '<p style="color: red;">No se pudo conectar al Backend.</p>';
        } finally {
            loadingMessage.style.display = 'none';
        }
    }

    // Manejador para agregar nuevas tareas
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        if (!title) return;

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            taskInput.value = ''; // Limpiar input
            fetchTasks(); // Recargar lista
        } catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    });

    // Manejador para Completar/Eliminar
    taskList.addEventListener('click', async (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        const taskId = li.dataset.id;
        
        if (e.target.classList.contains('toggle-btn')) {
            const completed = e.target.dataset.completed === 'true';
            try {
                await fetch(`${API_URL}/${taskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: completed })
                });
                fetchTasks();
            } catch (error) {
                console.error('Error al actualizar tarea:', error);
            }
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                try {
                    await fetch(`${API_URL}/${taskId}`, {
                        method: 'DELETE'
                    });
                    fetchTasks();
                } catch (error) {
                    console.error('Error al eliminar tarea:', error);
                }
            }
        }
    });

    // Cargar tareas al iniciar
    fetchTasks();
});
