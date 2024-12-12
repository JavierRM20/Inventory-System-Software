<h1>Inventarios</h1>
<a href="{{ route('inventories.create') }}">Agregar Producto</a>
<table>
    <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Ubicación</th>
        <th>Acciones</th>
    </tr>
    @foreach($inventories as $inventory)
    <tr>
        <td>{{ $inventory->product_name }}</td>
        <td>{{ $inventory->quantity }}</td>
        <td>{{ $inventory->location }}</td>
        <td>
            <a href="{{ route('inventories.edit', $inventory) }}">Editar</a>
            <form action="{{ route('inventories.destroy', $inventory) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit">Eliminar</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>
