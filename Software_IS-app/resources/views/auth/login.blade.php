<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/0e2f5244ae.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script src="{{ asset('js/app.js') }}"></script>
    <link rel="shortcut icon" href="{{ asset('css/IconoWeb.png') }}" type="image/x-icon">
    <title>Inventory System</title>
</head>
<body>
    <header>
    <h2 class="logo">Inventory System</h2>
        
    <nav class="navegacion">
            <a href="#">Inicio</a>
            <a href="#">Informacion</a>
            <a href="#">Servicios</a>
            <a href="#">Contactos</a>
            <a href="#">Comunidad</a>

            <button class="btn">Iniciar Sesión</button>
    </nav>
    </header>
    <div class="fondo">
        <span class="icono-cerrar"><i class="fa-solid fa-xmark"></i></span>

        <div class="contenedor-form login">
            <h2>Iniciar Sesión</h2>
            <form action="{{ route('login.submit') }}" method="POST">
            @csrf
                <div class="contenedor-input">
                    <span class="icono"><i class="fa-solid fa-envelope"></i></span>
                    <input type="email" name="email" required>
                    <label for="#">Correo electronico</label>
                </div>

                <div class="contenedor-input">
                    <span class="icono"><i class="fa-solid fa-lock"></i></span>
                    <input type="password" name="password" required>
                    <label for="#">Contraseña</label>
                </div>
            
            <div class="recordar">
                <label for="#"><input type="checkbox">Recordar Sesión</label>
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            
            <button type="submit" class="btn">Iniciar Sesión</button>

            <div class="registrar">
                <p>¿No tienes cuenta? <a href="#" class="registrar-link">Registrarse</a></p>
            </div>
        </form>
    </div>

    <div class="contenedor-form registrar">
        <h2>Registrarse</h2>
        <form action="{{ route('register.submit') }}" method="POST">
        @csrf
            <div class="contenedor-input">
                <span class="icono"><i class="fa-solid fa-user"></i></span>
                <input type="text" name="username" required>
                <label for="#">Nombre de Usuario</label>
            </div>
            
            <div class="contenedor-input">
                <span class="icono"><i class="fa-solid fa-envelope"></i></span>
                <input type="email" name="email" required>
                <label for="#">Correo electronico</label>
            </div>

            <div class="contenedor-input">
                <span class="icono"><i class="fa-solid fa-lock"></i></span>
                <input type="password" name="password" required>
                <label for="#">Contraseña</label>
            </div>

            <div class="recordar">
                <label for="#"><input type="checkbox">Acepto los terminos y condiciones</label>
            </div>

            <button type="submit" class="btn">Registrarme</button>

            <div class="registrar">
                <p>¿Ya tienes una cuenta?<a href="#" class="login-link">Iniciar Sesión</a></p> 
            </div>
        </form>
    </div>
    </div>
</body>
</html>