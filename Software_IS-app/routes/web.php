<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\DispatchController;
use App\Http\Controllers\ReceptionController;
use App\Http\Controllers\HomeController;

    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::post('/login', [UserController::class, 'login'])->name('login.submit');
    Route::post('/registrar', [UserController::class, 'register'])->name('register.submit');

    Route::middleware('auth')->group(function () {
    Route::get('/backend', function () {
        return view('backend.dashboard');
    })->name('dashboard');

    // Rutas para Inventarios
    Route::resource('/inventories', InventoryController::class);

    // Rutas para Despachos
    Route::resource('/dispatch', DispatchController::class);

    // Rutas para Recepciones
    Route::resource('/reception', ReceptionController::class);

    // Cerrar sesión
    Route::post('/logout', function () {
        Auth::logout();
        return redirect('/login');
    })->name('logout');
});
