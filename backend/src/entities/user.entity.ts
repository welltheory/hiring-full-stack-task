import _ from 'lodash';
import { BaseEntity } from './base.entity';

export type UserEntityData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export class UserEntity extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;

  constructor(data: UserEntityData) {
    super(data);
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  /**
   * Get the full name of the user
   * @returns The full name of the user
   */
  get fullName(): string {
    return _.compact([this.firstName, this.lastName]).join(' ');
  }
}
