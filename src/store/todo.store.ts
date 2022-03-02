import { makeAutoObservable } from 'mobx';
import { TodoType } from 'pages/todoApp/addTodo/TodoType';

export class TodoStore {
    public todos: Array<TodoType>;
    constructor() {
        makeAutoObservable(this);
        this.todos = [];
    }

    public addTask(task: TodoType) {
        this.todos.push(task);
    }

    public deleteTask(id: string) {
        this.todos = this.todos.filter((task) => task.id !== id);
    }
    public changeStatue(id: string) {
        const taskIndex = this.todos.findIndex((task) => task.id === id);
        this.todos[taskIndex].status = !this.todos[taskIndex].status;
    }
    public changeMultiStatue(ids: string[], status: boolean) {
        ids.map((id) => {
            this.todos.map((task) => {
                if (task.id === id) {
                    task.status = status;
                    return task;
                }
                return task;
            });
        });
    }
    public multiDeleteTasks(ids: string[]) {
        ids.forEach((id) => {
            this.todos = this.todos.filter((task) => {
                return task.id !== id;
            });
        });
    }
}
