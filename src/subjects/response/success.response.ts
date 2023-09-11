import { Subject } from '../entity/subject.entity';

export class SuccessResponse {
    constructor(public status_code: number, public message: string, public data: Object | any | Subject | String) {}
}