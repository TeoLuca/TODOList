import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  @Input() task: any;

  editTaskTitle : any
  editTaskDueDate : any
  editTaskcreatedDate: any

  editTaskObj = {}

  constructor(public modalCtrl:ModalController, public service:TasksService) { }

  ngOnInit() {
    //binding data
    this.editTaskTitle = this.task.value.taskTitle;
    this.editTaskDueDate = this.task.value.dueDate;

  }

  async dismis(){
    await this.modalCtrl.dismiss();
  }

  async saveTask(){
    let exactMatch = new RegExp("\\b(" + "mobile" + ")\\b","gi");
    //validations
    if(String(this.editTaskTitle).length < 3 || String(this.editTaskTitle).length > 50 ){
      alert('The title is out of the values');
      return;
    }

    if(!this.editTaskTitle.match(exactMatch)){
      alert('Does not contains the mobile word');
      return;
    }

    let convertedCreatedDate = new Date().toLocaleDateString()
    this.editTaskObj = ({taskTitle : this.editTaskTitle, createdDate: convertedCreatedDate ,dueDate : this.editTaskDueDate})
    let key = this.task.key;
    await this.service.editTask(key, this.editTaskObj);
    this.dismis();
  }
}
