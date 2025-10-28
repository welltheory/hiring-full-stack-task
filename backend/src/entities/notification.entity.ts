import { BaseEntity } from './base.entity';

export type NotificationEntityData = {
  id: string;
  userId: string;
  message: string;
  type: string;
  readAt: Date | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export class NotificationEntity extends BaseEntity {
  userId: string;
  message: string;
  type: string;
  readAt: Date | null;

  constructor(data: NotificationEntityData) {
    super(data);
    this.userId = data.userId;
    this.message = data.message;
    this.type = data.type;
    this.readAt = data.readAt;
  }

  get isRead(): boolean {
    return this.readAt !== null;
  }
}
