import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todo } from '../resources/data/todo-object'
@inject(Router, Todo)
export class Todos {
    constructor(router, todos) {
        this.router = router;
        this.todos = todos;
        this.message = 'todos';
        this.showTodoEditForm = false;
    }

    newTodo() {
        this.todo = {
            todo: "",
            priotity: "High",
            done: false
        }
        //this.showTodoEditForm = false;
        this.openEditForm();

    }
    async activate() {
        await this.getTodos();
    }
    attached() {
        feather.replace()
    }

    async getTodos() {
        await this.todos.getTodos();
    }
    back() {
        this.showTodoEditForm = false;
    }

    async save() {
        if (this.todo && this.todo.todo && this.todo.priotity
            && this.todo.done) {
            await this.todos.saveTodo(this.todo);
            await this.getTodos();
            this.back();
        }
    }

    async delete() {
        if (this.todo) {
            await this.todos.delete(this.todo);
            await this.getTodos();
            this.back();
        }
    }
    editTodo(todo){
        this.todo = todo;
        this.openEditForm();
        }
        
    openEditForm(){
        this.showTodoEditForm = true;
        //setTimeout(() => {$("#todos").focus();}, 500);
        }
        

}