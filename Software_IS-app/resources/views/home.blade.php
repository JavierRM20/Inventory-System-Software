@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Bienvenido al Sistema de Inventarios</h1>
    <div class="row">
        <div class="col-md-4">
            <a href="{{ route('inventories.index') }}" class="btn btn-primary">Gestión de Inventarios</a>
        </div>
        <div class="col-md-4">
            <a href="{{ route('dispatch.index') }}" class="btn btn-primary">Despachos</a>
        </div>
        <div class="col-md-4">
            <a href="{{ route('reception.index') }}" class="btn btn-primary">Recepciones</a>
        </div>
    </div>
</div>
@endsection
