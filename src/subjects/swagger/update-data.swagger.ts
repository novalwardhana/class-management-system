export const UpdateSubjectDescription = {description: "Update data by subject id"}
export const UpdateSubjectParam = { name: 'id', type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b'}
export const UpdateSubjectRequestBody = {
    type: 'object',
    properties: {
        name: { type: 'string', example: 'Belajar Al Quran 1' },
        description: { type: 'string', example: 'Belajar Al Quran dan terjemahan' },
        level: { type: 'string', example: 'expert' },
    },
    required: ['name', 'description', 'level'],
}

export const UpdateSubjectSuccess = {
    description: 'Success update subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success update subject data with subject_id: 6f6b0851-adb3-4699-a849-5e5d806b3a1b`},
            data: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Belajar Al Quran 1' },
                    description: { type: 'string', example: 'Belajar Al Quran dan terjemahan' },
                    level: { type: 'string', example: 'expert' },
                }
            }
        }
    }
}

export const UpdateSubjectBadRequest = {
    description: 'Success update subject data',  
    schema: {
        type: 'object',
        properties: {
            message: {
                type: 'array',
                items: {
                    type: 'string',
                    example: [
                        'name should not be empty',
                        'level must be one of the following values: 0, 1, 2',
                        'level should not be empty'
                    ]
                }
            },
            error: {type: 'string', example: 'Bad Request'},
            statusCode: {type: 'number', example: 400}
        }
    }
}

export const UpdateSubjectNotFound = {
    description: `Subject data not found`,  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Subject data with subject_id: 6f6b0851-adb3-4699-a849-5e5d806b3a1b is not found`},
            data: {type: 'any', example: null}
        }
    }
}

export const UpdateSubjectInternalServerError = {
    description: 'Internal server error when update subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}