import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TodoList } from 'src/app/core/models/Todolist.model';
import { TodoListService } from 'src/app/core/services/todo-list.service';
import { FormControl, Validators, FormGroup, AsyncValidatorFn, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo-list-edit',
  templateUrl: './todo-list-edit.component.html',
  styleUrls: ['./todo-list-edit.component.css']
})
export class TodoListEditComponent implements OnInit {

  constructor(
    private todoService:TodoListService,
    private route: ActivatedRoute
  ) { }

  groupForm:FormGroup;
  currentTodoList$:Observable<TodoList>

  ngOnInit(): void {
    const index$ = this.route.params.pipe(
      map(prms => Number(prms['id']))
      );
      
      this.currentTodoList$ = index$.pipe(
        switchMap(index => this.todoService.getTodoList(index))
        );

    this.buildForm();
  }

  buildForm()
  {
    this.groupForm = new FormGroup({
      caption:new FormControl('', Validators.required),
      description:new FormControl('', [
        Validators.minLength(10),
        Validators.required]),
      color:new FormControl(),
      icon:new FormControl()
    });
  }

  updateList()
  {
     this.currentTodoList$.pipe(
       map(todolist => 
        todolist = this.groupForm.value)
     );
     console.table(this.currentTodoList$);
  }
}
