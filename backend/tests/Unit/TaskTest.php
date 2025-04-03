<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class TaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test task creation.
     *
     * @return void
     */
    public function test_task_creation()
    {        
        $task = Task::create([
            'title' => 'Test Task',
            'description' => 'Test Description',
            'status' => 'pending'
        ]);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'description' => 'Test Description',
        ]);
    }
    

    /**
     * Test if task title is required.
     *
     * @return void
     */
    public function test_task_title_is_required()
    {
        $response = $this->post('/tasks', [
            'description' => 'Description without title',
            'status' => 'pending',
        ]);
        $response->assertSessionHasErrors('title');
        $this->assertDatabaseMissing('tasks', [
            'description' => 'Description without title'
        ]);
    }


    /**
     * Test task description is required.
     *
     * @return void
     */
    public function test_task_description_is_required()
    {
        $response = $this->post('/tasks', [
            'title' => 'Task with no description',
            'status' => 'pending',
        ]);
        $response->assertSessionHasErrors('description');
        $this->assertDatabaseMissing('tasks', [
            'title' => 'Task with no description',
            'status' => 'pending',
        ]);
    }
    /**
     * Test task can be marked as done.
     *
     * @return void
     */
    public function test_task_marked_as_done()
    {
            $task = Task::create([
                'title' => 'Task to Mark as Done',
                'description' => 'This task will be marked as done.',
                'status' => 'pending'
            ]);
            $task->update(['status' => 'completed']);
            $this->assertEquals('completed', $task->status);
    }

}
