import {
  inject
} from 'aurelia-framework';
import {
  DataServices
} from './data-services';

@inject(DataServices)
export class HelpTicket {
  constructor(data) {
    this.data = data;
    this.HELP_TICKET_SERVICE = 'helpTickets';
    this.HELP_TICKET_CONTENT_SERVICE = 'helpTicketsContents';
  }

  async getHelpTickets(userObj) {
    let url = this.HELP_TICKET_SERVICE;
    if (userObj.role == 'user') {
      url += '/user/' + userObj._id;
    }
    let response = await this.data.get(url);
    if (!response.error) {
      this.helpTicketsArray = response;
    } else {
      this.helpTicketsArray = [];
    }
  }

  async saveHelpTicket(helpTicket) {
    let serverResponse;
    if (helpTicket) {
      if (helpTicket.helpTicket._id) {
        serverResponse = await this.data.put(helpTicket, this.HELP_TICKET_SERVICE);
      } else {
        serverResponse = await this.data.post(helpTicket, this.HELP_TICKET_SERVICE);
      }
      return serverResponse;
    }
  }

  async getHelpTicketsContents(helpTicketId) {
    if (helpTicketId) {
      let url = this.HELP_TICKET_CONTENT_SERVICE + '/helpTicket/' + helpTicketId;
      let response = await this.data.get(url);
      if (!response.error) {
        this.helpTicketContentsArray = response;
      } else {
        this.helpTicketContentsArray = [];
      }
    }
  }
  async delete(helpTicket) {
    if (helpTicket && helpTicket._id) {

      await this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicket._id);
      
    }
  }

  async uploadFile(files, id) {
    await this.data.uploadFiles(files, this.HELP_TICKET_CONTENT_SERVICE + "/upload/" + id);
  }


}
