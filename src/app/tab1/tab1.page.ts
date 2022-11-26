import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task-modal/add-new-task.page';
import { EditTaskPage } from '../edit-task/edit-task.page';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tasksList : any = [];

  today : number =  Date.now();


  constructor(public modalCtrl:ModalController, public storage:TasksService) {
    this.getAllTasksFromStorage();
  }

  async renderAddNewTaskModal(){
    const addTaskModal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });

  addTaskModal.onDidDismiss().then(task =>{
      this.tasksList.push(task.data);
      this.getAllTasksFromStorage()
    })

    return addTaskModal.present();
  }

  async renderEditTaskPage(task:any){
    const editTaskModal = await this.modalCtrl.create({
      component: EditTaskPage,
      componentProps : {task: task}
    })

    editTaskModal.onDidDismiss().then(task => {
      this.getAllTasksFromStorage()
    })

    return editTaskModal.present();
  }

  async deleteTask(key:any){
    await this.storage.deleteTask(key);
    this.getAllTasksFromStorage();

  }

  async getAllTasksFromStorage(){
    this.tasksList = await this.storage.getTasks();
  }

  async completeTask(task: any){
    task.value.isCompleted = true;
    this.storage.editTask(task.key, task.value).then(() => this.getAllTasksFromStorage());
  }


}
