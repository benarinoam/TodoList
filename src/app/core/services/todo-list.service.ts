import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,of} from 'rxjs';
import { map,filter,find, last,mergeMap, toArray} from 'rxjs/operators';
import { TodoList } from '../models/Todolist.model';
import { TodoItem } from '../models/TodoItem.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private TODO_LISTS:TodoList[];
  private TODO_LISTS_ITEMS:TodoItem[];

  constructor() { }

  private currentList = new BehaviorSubject(0);
  private currentListItems = new BehaviorSubject(0);

  getCurrentList():Observable<TodoList>
  {
    return this.currentList.pipe(
       map(index => this.TODO_LISTS[index])
    );
  }

  getCurrentListItem():Observable<TodoItem>
  {
    return this.currentListItems.pipe(
       map(index => this.TODO_LISTS_ITEMS[index])
    );
  }

  getListOfTodoItems():Observable<TodoItem>
  {
    return this.currentListItems.pipe(
      map(index => this.TODO_LISTS_ITEMS[index]),
      filter(item => item.listId===this.currentList.value),
    );
  }

  getTodoList(id:number):Observable<TodoList>
  {
    console.log(this.currentList.value);
    if (id===-1)
    {
       this.currentList.next(this.currentList.value + 1);
    }
    return this.currentList.pipe(
      map(index => this.TODO_LISTS[index]),
      filter(item => item.id===id)
    );
  }

  getTodoListItem(id:number):Observable<TodoItem>
  {
    return this.currentListItems.pipe(
      map(index => this.TODO_LISTS_ITEMS[index]),
      filter(item => item.id===id)
    );
  }

  AddList(strCaption:string, strDescription:string, strColor:string, strIcon:string): Promise<number>
  {
    this.currentList.next(this.currentList.value+1);
    
    this.TODO_LISTS.push(
        {id:this.currentList.value,
          caption:strCaption,
          descrption:strDescription,
          color:strColor,
          image:strIcon}
      )

      return this.currentList.pipe(
        last()
      ).toPromise();
  }

  ModifyList(list: TodoList): Promise<void>
  {
    this.getTodoList(list.id).pipe(
      map(todoList => 
        {
          todoList.caption = list.caption,
          todoList.color = list.color,
          todoList.descrption = list.descrption,
          todoList.image = list.image
        })
    );

    return Promise.resolve();
  }
  AddTodoItem(strListId, strCaption): Promise<number>
  {
    this.currentListItems.next(this.currentListItems.value + 1);

    this.TODO_LISTS_ITEMS.push(
      {
        id:this.currentListItems.value,
        listId:strListId,
        caption:strCaption,
        isCompleted:false
      }
    );

    return this.currentListItems.pipe(
      last()
    ).toPromise();
  }

  MarkAsCompleted(itemId): Promise<void>
  {
     this.getTodoListItem(itemId).pipe(
       map(item => 
        {
          item.isCompleted = true;
        }
       )
     );

     return Promise.resolve();
  }  
    

  async DeleteList(listId): Promise<void>
  {
    
    let PList = 
     this.currentList.pipe(
       map(index => this.TODO_LISTS[index]),
       filter(item => item.id!==listId),
       toArray()
     ).toPromise();

     this.TODO_LISTS = await PList;

     let PItems =
     this.currentListItems.pipe(
       map(index => this.TODO_LISTS_ITEMS[index]),
       filter(item => item.listId!==listId),
       toArray()
     ).toPromise();

     this.TODO_LISTS_ITEMS = await PItems;

     return Promise.resolve();

  }
}
