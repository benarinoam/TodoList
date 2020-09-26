import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './components/home/home.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { TodoItemsListComponent } from './components/todo-items-list/todo-items-list.component';
import { TodoListEditComponent } from './components/todo-list-edit/todo-list-edit.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PathNotFoundComponent,
    TodoItemsListComponent,
    TodoListEditComponent,
    TodoListsComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
