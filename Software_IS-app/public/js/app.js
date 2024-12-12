const fondo = document.querySelector(".fondo");
const loginlink =document.querySelector(".login-link");
const registrarlink = document.querySelector(".registrar-link");
const btn =document.querySelector(".btn");
const iconocerrar = document.querySelector(".icono-cerrar");


registrarlink.addEventListener("click", () => {
    fondo.classList.add('active');
});

loginlink.addEventListener("click", () => {
    fondo.classList.remove('active');
});

btn.addEventListener("click", () => {
    fondo.classList.add('active-btn');
});


iconocerrar.addEventListener("click", () => {
    fondo.classList.remove('active-btn');
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.registrar form');
    const loginForm = document.querySelector('.login form');

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('input[name="username"]').value;
        const email = registerForm.querySelector('input[name="email"]').value;
        const password = registerForm.querySelector('input[name="password"]').value;

        const response = await fetch('http://localhost:3000/registrar', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();
        alert(result.message);
    });

    // Manejo del formulario de inicio de sesión
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.token) {
            alert('Login Exitoso!');
            // Guardar el token en el almacenamiento local o en una cookie
            localStorage.setItem('token', result.token);
            // Redirigir a la página de inventario
        window.location.href = 'inventory.html';
        } else {
            alert(result.message);
        }
    });
});
