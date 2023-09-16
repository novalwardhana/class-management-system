export const GetSubjectDescription = {description: "Get data by subject id"}
export const GetSubjectParam = { name: 'id', type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b'}

export const GetSubjectSuccess = {
    description: 'Success get subject data', 
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: 'Success get subject data'},
            data: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '650553f181f3fa1b7cf4f7c2' },
                    subject_id: { type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b' },
                    name: { type: 'string', example: 'Belajar Al Quran 1' },
                    description: { type: 'string', example: 'Belajar Al Quran dan terjemahan' },
                    level: { type: 'string', example: 'expert' },
                    created_at: { type: 'string', example: '2023-09-16T14:06:25.732Z'},
                    updated_at: { type: 'string', example: '2023-09-16T14:06:25.733Z'},
                }
            }
        }
    }
}

export const GetSubjectNotFound = {
    description: 'Data not found',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Subject data with subject_id: 6f6b0851-adb3-4699-a849-5e5d806b3a1b`},
            data: {type: 'any', example: null}
        }
    }
}

export const GetSubjectInternalServerError = {
    description: 'Internal server error get subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}