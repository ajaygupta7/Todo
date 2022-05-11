import { Component, OnInit } from '@angular/core';
import { TaskerService } from '../services/tasker.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.page.html',
  styleUrls: ['./todo-task.page.scss'],
})
export class TodoTaskPage implements OnInit {

  task: any = '';
  todoList: any = [];
  toggleSort: Boolean = true;
  selectedTask: any;
  constructor(
    private taskerService: TaskerService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todoList = this.taskerService.fetchTodos();
  }

  // new task adding
  addTask() {
    // avoid empty task
    if (this.task.trim() == '') return;
    let sameFound = this.todoList.filter(task => task.name == this.task.trim());
    // confirmation for duplication
    if (sameFound.length > 0) {
      if(confirm('Same task exist! Continue?') !== true) {
        return;
      }
    }
    if(this.selectedTask && this.selectedTask.id) {
      this.todoList.forEach(task => {
        if(task.id == this.selectedTask.id) {
          task.name = this.task.trim();
        }
      });
      this.selectedTask = undefined;
    } else {
      this.todoList.push({ id: this.todoList.length, name: this.task.trim() });
    }
    console.log(this.todoList);
    setTimeout(() => { this.task = ""; }, 0);
    this.taskerService.updateTodos(this.todoList);
  }

  editTask(task) {
    this.selectedTask = task;
    this.task = task.name;
  }
  // remove task
  removeTask(taskId: Number) {
    console.log('ajay test');
    this.todoList = this.todoList.filter(task => task.id !== taskId);
    this.taskerService.updateTodos(this.todoList);
  }

  // sort Todo
  sortingTask() {
    this.toggleSort = !this.toggleSort;
    let that = this;

    console.log('sorting tasks');
    this.todoList.sort(function (x, y) {
      // console.log('x: ', x.isChecked, 'Y: ', y.isChecked);
      if (that.toggleSort) {
        return (x.isChecked === y.isChecked && x.name > y.name) ? 0 : x.isChecked ? -1 : 1;
      } else {
        return (x.isChecked === y.isChecked && x.name > y.name) ? 0 : y.isChecked ? -1 : 1;
      }
    });
  }
}
