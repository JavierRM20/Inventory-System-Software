<?php
namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = Inventory::all();
        return view('backend.inventories.index', compact('inventories'));
    }

    public function create()
    {
        return view('backend.inventories.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'location' => 'required|string|max:255',
        ]);

        Inventory::create($request->all());
        return redirect()->route('inventories.index')->with('success', 'Producto agregado al inventario.');
    }

    public function edit(Inventory $inventory)
    {
        return view('backend.inventories.edit', compact('inventory'));
    }

    public function update(Request $request, Inventory $inventory)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'location' => 'required|string|max:255',
        ]);

        $inventory->update($request->all());
        return redirect()->route('inventories.index')->with('success', 'Producto actualizado.');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return redirect()->route('inventories.index')->with('success', 'Producto eliminado del inventario.');
    }
}
