import { mount } from '@vue/test-utils';
import ToDoList from '@/components/TodoList.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

jest.mock('axios');
jest.mock('sweetalert2');

describe('ToDoList.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ToDoList);
  });

  it('displays tasks when the API request is successful', async () => {    
    axios.get.mockResolvedValue({ data: [{ id: 1, title: 'Test Task', description: 'This is a test task' }] });
    await wrapper.vm.fetchTasks();
    expect(wrapper.text()).toContain('Test Task');
    expect(wrapper.text()).toContain('This is a test task');
  });

  it('shows an error message if fetching tasks fails', async () => {    
    axios.get.mockRejectedValue(new Error('API error'));
    await wrapper.vm.fetchTasks();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Failed to load tasks', 'error');
  });

  it('adds a task when the form is submitted', async () => {
    axios.post.mockResolvedValue({ data: { id: 2, title: 'New Task', description: 'New task description' } });
    await wrapper.setData({ title: 'New Task', description: 'New task description' });
    await wrapper.find('form').trigger('submit.prevent');    
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/tasks', {
      title: 'New Task',
      description: 'New task description',
    });
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'success',
        title: 'Success',
        text: 'Task added successfully!',
      })
    );
  });

  it('shows an error message when adding a task fails', async () => {
    axios.post.mockRejectedValue(new Error('Failed to add task'));
    await wrapper.setData({ title: 'New Task', description: 'New task description' });
    await wrapper.find('form').trigger('submit.prevent');
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add task',
      })
    );
  });

  it('marks a task as done and updates the list', async () => {
    axios.patch.mockResolvedValue({ data: { id: 1, title: 'Test Task', description: 'This task is done' } });
    wrapper.setData({
      tasks: [{ id: 1, title: 'Test Task', description: 'This is a test task' }],
    });
    await wrapper.find('button').trigger('click');
    console.log('axios.patch calls:', axios.patch.mock.calls);
    console.log('Swal.fire calls:', Swal.fire.mock.calls);   
  });
  it('shows an error message when marking a task as done fails', async () => {
    axios.patch.mockRejectedValue(new Error('Failed to update task'));    
    wrapper.setData({
      tasks: [{ id: 1, title: 'Test Task', description: 'This is a test task' }],
    });
    await wrapper.find('button').trigger('click');
  });
});
