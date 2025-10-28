import dayjs from 'dayjs';

export type BaseEntityData = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: BaseEntityData) {
    this.id = data.id;
    this.createdAt = dayjs(data.createdAt).toDate();
    this.updatedAt = dayjs(data.updatedAt).toDate();
  }
}
