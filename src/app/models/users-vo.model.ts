import { SignUpFormControls } from "./sign-up-form-controls.model";

export class UsersVO {
    userId?: number;
    password: string;
    name: string;
    email: string;
    mobile: number;
    gender?: string;
    isActive?: boolean;
    dlValue?: string;
    dlVerified?: boolean;
    isSocialUser?: boolean;
    socialUserType?: string;

    constructor(signUpFormUser: SignUpFormControls) {
        this.name = signUpFormUser.name;
        this.email = signUpFormUser.email;
        this.mobile = signUpFormUser.phoneNumber;
        this.password = signUpFormUser.password;
    }
}
