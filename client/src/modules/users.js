import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'
@inject(Router, User)
export class Users {
    constructor(router, users) {
        this.router = router;
        this.users = users;
        this.message = 'users';
        this.showUserEditForm = false;
    }

    newUser() {
        this.user = {
            firstName: "",
            lastName: "",
            active: true,
            role: "user",
            email: "",
            password: ""
        }
        this.openEditForm();
    }

    async activate() {
        await this.getUsers();
    }
    attached() {
        feather.replace()
    }

    async getUsers() {
        await this.users.getUsers();
    }
    back() {
        this.showUserEditForm = false;
    }

    async save() {
        if (this.user && this.user.user && this.user.priotity
            && this.user.done) {
            await this.users.saveUser(this.user);
            await this.getUsers();
            this.back();
        }
    }

    async delete() {
        if (this.user) {
            await this.users.delete(this.user);
            await this.getUsers();
            this.back();
        }
    }
    editUser(user) {
        this.user = user;
        this.openEditForm();
    }

    openEditForm() {
        this.showUserEditForm = true;
        setTimeout(() => {$("#users").focus();}, 500);
    }


}