import { Injectable } from '@nestjs/common';	
import * as _ from 'lodash';	


export type User = {userId: number, username: string, password: string, roles: string[]};	
export type Role = any;	


@Injectable()	
export class UserService {	

    private readonly users: User[];	
    private readonly roles: any;	
    private readonly permissions: string[];	

    constructor() {	
        this.users = [	
          {	
            userId: 1,	
            username: 'lala',	
            password: 'lala',	
            roles: ["employee"],	
          },	
          {	
            userId: 2,	
            username: 'chris',	
            password: 'secret',	
            roles: ["employer"],	
          },	
          {	
            userId: 3,	
            username: 'maria',	
            password: 'guess',	
            roles: ["employer"],	
          },	
          {	
            userId: 0,	
            username: 'alex',	
            password: 'kaga',	
            roles: ["admin"],	
          }	
        ];	

        this.permissions = ["read", "write", "update", "delete"];	

        this.roles = {	
          admin: ["*"], 	
          employee: [this.permissions[0]], 	
          employer: [this.permissions[0], this.permissions[1], this.permissions[2]]	
        };	

      };	


      async findOne(username: string): Promise<User | undefined> {	
        return this.users.find(user => user.username === username);	
      }	

      async findUserPermissions(username: string): Promise<string[]> {	
        const user: User = this.users.find(user => user.username === username);	
        return _.flatMap(user.roles, role => this.roles[role]);	
      }	

}