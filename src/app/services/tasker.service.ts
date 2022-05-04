import { Injectable } from '@angular/core';
import { isJSDocReturnTag } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class TaskerService {

  constructor() { }

  updateTodos(todos) {
    localStorage.setItem('masterList',JSON.stringify(todos));
  }

  fetchTodos() {
    let todos: any;
    todos = localStorage.getItem('masterList') ? JSON.parse(localStorage.getItem('masterList')) : [];
    todos.sort(function (x, y) {
      return (x.id < y.id) ? 1 : (x.id > y.id) ? -1 : 0;
    });
    return todos || [];
  }
}
