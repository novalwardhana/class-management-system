import { Teacher } from '../entity/teacher.entity';

export class SuccessResponse {
    constructor(public status_code: number, public message: string, public data: Object | any | Teacher | String) {}
}