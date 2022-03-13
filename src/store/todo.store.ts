import { action, makeObservable, observable } from 'mobx';
import { TodoType } from 'pages/todoApp/addTodo/TodoType';

export class TodoStore {
    public todos: Array<TodoType>;
    constructor() {
        makeObservable(this, {
            todos: observable,
            addTask: action,
            deleteTask: action,
            changeMultiStatus: action,
            changeStatus: action,
            multiDeleteTasks: action,
        });

        this.todos = [];
    }

    public addTask(task: TodoType): void {
        this.todos.push(task);
    }

    public deleteTask(id: string): void {
        this.todos = this.todos.filter((task) => task.id !== id);
    }
    public changeStatus(id: string): void {
        const taskIndex = this.todos.findIndex((task) => task.id === id);
        this.todos[taskIndex].status = !this.todos[taskIndex].status;
    }
    public changeMultiStatus({ ids, status }: { ids: string[]; status: boolean }): void {
        ids.forEach((id) => {
            this.todos.forEach((task) => {
                if (task.id === id) {
                    task.status = status;
                }
            });
        });
    }
    public multiDeleteTasks(ids: string[]): void {
        ids.forEach((id) => {
            this.todos = this.todos.filter((task) => {
                return task.id !== id;
            });
        });
    }
}
