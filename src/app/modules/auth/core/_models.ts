import {User} from "../../../models/iam/User.ts";

export interface AuthModel {
    data: User
    token: string,
    impersonatedUserId?: number
}