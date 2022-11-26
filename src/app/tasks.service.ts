import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    await this.storage.create();
  }

  async addNewTask(key: any, value: any) {
    await this.storage.set(key, value);
  }

  async editTask(key: any, updatedTask: any){
    await this.storage.set(key, updatedTask);
  }

  async deleteTask(key: any){
    await this.storage.remove(key);

  }
  async getTasks(){
    let allTasks: any = [];
    await this.storage.forEach((value, key, index) => {
      allTasks.push({'key': key, 'value': value});
    });

    console.log("allTasks", allTasks);
    return allTasks;
  }




}
