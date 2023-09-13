import { Class } from '../entity/class.entity';

export class SuccessResponse {
    constructor(public status_code: number, public message: string, public data: Object | any | Class | String) {}
}