import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator } from 'class-validator';
  
@ValidatorConstraint({ name: 'is24HourTime', async: false })
export class Is24HourTimeConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (!value) return true;

        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(value);
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be in 24-hour time format (HH:mm).`;
    }
}
  
export function Is24HourTime() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: {},
        constraints: [],
        validator: Is24HourTimeConstraint,
        });
    };
}