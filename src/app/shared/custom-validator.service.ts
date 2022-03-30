import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
    /**
     * Validates that child controls in the form group are equal
     */
    static childrenEqual = (formGroup: FormGroup): { childrenNotEqual: boolean; } | null => {
        const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
        const isValid = otherControlNames.every(controlName => formGroup.get(controlName)?.value === formGroup.get(firstControlName)?.value);
        return isValid ? null : { childrenNotEqual: true };
    }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control?.parent?.invalid && control?.touched);
    }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the control is invalid and it has been touched
 */
 export class ConfirmValidMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control?.invalid && control?.touched);
    }
}

/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
    phoneNumber: /^((\\+91-?)|0)?[0-9]{10}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
    name: 'Name is required',
    email: 'Email must be a valid email address(Ex: username@domain)',
    phoneNumber: 'Phone Number must be valid(Ex: 8888888888 or 088888888 or +91-88888888)',
    password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
    confirmPassword: 'Passwords must match'
};