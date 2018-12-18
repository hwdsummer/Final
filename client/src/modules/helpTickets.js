import {
  inject
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';
import {
  HelpTicket
} from '../resources/data/help-ticket-object';

@inject(HelpTicket)
export class HelpTickets {

  constructor(helpTicket) {
    this.helpTickets = helpTicket;
    this.showHelpTicketEditForm = false;
    this.message = "HelpTickets";
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
  }

  async activate() {
    await this.getHelpTicket();
  }

  showEditForm() {
    this.showHelpTicketEditForm = true;
    setTimeout(() => {
      $("#firstName").focus();
    }, 500);
  }

  async getHelpTicket() {
    await this.helpTickets.getHelpTickets(this.userObj);
  }
  attached() {
    feather.replace()
  }

  newHelpTicket() {
    this.helpTicket = {
      title: "",
      personId: this.userObj._id,
      ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
      status: 'new'
    };

    this.helpTicketContent = {
      personId: this.userObj._id,
      content: ""
    };
    this.showEditForm();
  }

  async editHelpTicket(helpTicket) {
    this.helpTicket = helpTicket;
    this.helpTicketContent = {
      personId: this.userObj._id,
      content: ""
    };
    await this.helpTickets.getHelpTicketsContents(helpTicket._id)
    this.showEditForm();
  }
  back() {
    this.showHelpTicketEditForm = false;
    this.showHelpTicketDisplayForm = false;
    this.filesToUpload = new Array();
    this.files = new Array();

  }

  changeFiles() {
    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
    for (var i = 0; i < this.files.length; i++) {
      let addFile = true;
      this.filesToUpload.forEach(item => {
        if (item.name === this.files[i].name) addFile = false;
      })
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  }

  async save() {
    if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {

      if (this.userObj.role !== 'user') {
        this.helpTicket.ownerId = this.userObj._id;
      }
      let helpTicket = {
        helpTicket: this.helpTicket,
        content: this.helpTicketContent
      };
      let serverResponse = await this.helpTickets.saveHelpTicket(helpTicket);
      if (this.filesToUpload && this.filesToUpload.length > 0) {
        this.helpTickets.uploadFile(this.filesToUpload, serverResponse.contentID);
      }
      await this.getHelpTicket();
      this.back();
    }
  }


  async delete() {
    if (this.helpTicket && this.helpTicketContent) {
      await this.helpTickets.delete(this.helpTicket);
      //await this.helpTicketContent.delete(this.helpTicketContent);
      await this.getHelpTicket();
      this.back();
    }
  }
}
