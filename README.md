# TodoApp

Aplicación para gestionar tareas (To-Do List), desarrollada como práctica de control de versiones con Git, GitHub y WSL.

---

## Objetivo del Proyecto

El objetivo de este proyecto es aprender y practicar:

- Clonar un repositorio en WSL.
- Crear y cambiar de ramas.
- Hacer commits, push y pull.
- Mejorar el frontend (HTML/CSS) desde la rama `feature/frontend`.
- Desarrollar una aplicación funcional de tareas con persistencia de datos y frontend atractivo.

---

## Tecnologías Utilizadas

- HTML / CSS / JavaScript
- Node.js / Express
- PostgreSQL (si aplica)
- Git + GitHub
- WSL (Ubuntu)

---

## Instalación y Ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/YeimiG/todoApp.git
cd todoApp
Levantar los servicios con Docker:

docker-compose up --build
Acceder al frontend desde el navegador:

Frontend principal: http://localhost:8080

Backend (si aplica): http://localhost:3000

```
Funcionalidades

-Agregar tareas: Escribir el nombre de la tarea y hacer clic en "Agregar".

-Marcar tareas como completadas: Botón de completar que cambia el estado de la tarea.

-Editar tareas (si aplica).

-Eliminar tareas: Botón de eliminar con confirmación.

-Persistencia: Las tareas se guardan y se mantienen entre reinicios.

Flujo de Trabajo con Git

Crear una rama para mejoras de frontend:
git checkout -b feature/frontend

Agregar cambios:
git add .

Confirmar cambios:
git commit -m "Mejora en estilos del frontend"

Subir la rama al repositorio remoto: 
git push origin feature/frontend 

Una vez revisada y aprobada, se puede fusionar con main.

Pruebas y Validación

Estado de los servicios: Verificar que todo_frontend, todo_backend y todo_db estén en estado Up.

Pruebas de CRUD:

-Inicio de la aplicación: No hay tareas.

-Crear una tarea: La tarea aparece en el listado.

-Completar una tarea: El estado cambia visualmente (tachado o cambio de color).

-Eliminar una tarea: Se solicita confirmación y luego se elimina. 

Diseño y Estilo

-Interfaz moderna con colores suaves y botones visibles.

-Cuadro principal destacado con sombra y bordes redondeados.

-Botones de acción (Agregar, Completar, Eliminar) con colores diferenciados y tamaño adecuado.

-Estilo responsivo y limpio para mejor experiencia de usuario.

Descripción Final

Nuestra  aplicación de lista de tareas permite organizar el trabajo diario de manera sencilla y profesional. Se centra en la funcionalidad básica y en una interfaz atractiva con CSS moderno y colores agradables.
