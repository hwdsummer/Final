import {
  inject
} from 'aurelia-framework';
import {
  DataServices
} from './data-services';

@inject(DataServices)
export class User {
  constructor(data) {
    this.data = data;
    this.USER_SERVICE = 'users';
  }
  async saveUser(user) {
    let serverResponse;
    if (user) {
      if (user._id) {
        serverResponse = await this.data.put(user, this.USER_SERVICE);
      } else {
        serverResponse = await this.data.post(user, this.USER_SERVICE);
      }
      return serverResponse;
    }
  }

  async getUsers() {
    let response = await this.data.get(this.USER_SERVICE);
    if (!response.error) {
      this.usersArray = response;
    } else {
      this.usersArray = [];
    }
  }
  async delete(user) {
    if (user && user._id) {
      await this.data.delete(this.USER_SERVICE + '/' + user._id)
    }
  }




}
