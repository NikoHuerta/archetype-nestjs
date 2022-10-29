import { prop } from '@typegoose/typegoose';
import { RegisterEnum, RoleEnum } from '@enums';

export class User {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true, unique: true })
  public rut: string;

  @prop({ required: false, enum: RoleEnum, default: RoleEnum.client })
  public role: string;

  @prop({ required: false, enum: RegisterEnum, default: RegisterEnum.web })
  public source: string;

  @prop({ required: false, default: true })
  public active: boolean;
}
