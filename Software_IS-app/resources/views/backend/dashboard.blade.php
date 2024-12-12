<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script src="{{ asset('js/app.js') }}"></script>

    <title>Dashboard - Inventory System</title>
</head>
<body>
    <header>
        <h1>Dashboard - Inventory System</h1>
        <nav>
            <ul>
                <li><a href="{{ route('dashboard') }}">Inicio</a></li>
                <li><a href="{{ route('inventories.index') }}">Inventarios</a></li>
                <li><a href="{{ route('dispatch.index') }}">Despachos</a></li>
                <li><a href="{{ route('reception.index') }}">Recepciones</a></li>
                <li>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit">Cerrar Sesión</button>
                    </form>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <h2>Bienvenido, {{ Auth::user()->name }}</h2>
        <p>Selecciona una opción del menú para gestionar tu sistema de inventarios.</p>
    </main>

    <footer>
        <p>&copy; 2024 Inventory System</p>
    </footer>
</body>
</html>
