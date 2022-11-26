import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  title : any
  dueDate : any

  task = {}

  constructor(public modalCtrl:ModalController, public tasksService: TasksService) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalCtrl.dismiss(this.task);
  }

  async saveTask(){
    let exactMatch = new RegExp("\\b(" + "mobile" + ")\\b","gi");

    //validations
    if(String(this.title).length < 3 || String(this.title).length > 50 ){
      alert('The title is out of the values');
      return;
    }

    if(!this.title.match(exactMatch)){
      alert('Does not contains the mobile word');
      return;
    }

    let convertedCreatedDate = new Date().toLocaleDateString()

    this.task = ({taskTitle : this.title, createdDate: convertedCreatedDate ,dueDate : this.dueDate, isCompleted : false})
    let randomKey = Date.now() + this.title;

    //call storage service for add new task
    await this.tasksService.addNewTask(randomKey, this.task);

    this.closeModal()
  }

}
