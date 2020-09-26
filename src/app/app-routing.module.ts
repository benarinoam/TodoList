import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { TodoItemsListComponent } from './components/todo-items-list/todo-items-list.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { TodoListEditComponent } from './components/todo-list-edit/todo-list-edit.component';


const routes: Routes =
[
  {path: '', redirectTo: 'home', pathMatch: 'full'}, 
  {path: 'home', component: HomeComponent}, 
  {path: 'Lists', component: TodoListsComponent}, 
  {path: 'Lists/:id', component: TodoItemsListComponent},
  {path: 'Lists/:id/Edit', component:TodoListEditComponent},
  // {path: 'Lists/:id/edit', 
  //   component:TodoItemsListComponent, 
  //   canActivate: [AuthGuard]},
  {path: 'Items', component: TodoItemsListComponent},
  {path: '**', component: PathNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
