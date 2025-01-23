<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreToDoRequest;
use App\Http\Requests\UpdateToDoRequest;
use App\Http\Resources\ToDoResource;
use App\Models\ToDo;
use Illuminate\Http\Resources\Json\JsonResource;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResource
    {
        return ToDoResource::collection(ToDo::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreToDoRequest $request)
    {
        $data = $request->validated();
        $todo = ToDo::create($data);
        return new ToDoResource($todo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return new ToDoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateToDoRequest $request, ToDo $todo)
    {
        $todo->update($request->validated());
        return new ToDoResource($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToDo $todo)
    {
        return ($todo->delete())
            ? response()->noContent()
            : abort(500)
            ;
        
    }
}
