export const GetSubjectsDescription = {description: "Get all the subject's data"}
export const GetSubjectsQueryPage = {name: "page", type: Number, required: true, description: ""}
export const GetSubjectsQueryLimit = {name: "limit", type: Number, required: true, description: ""}

export const GetSubjectsSuccess = { 
    description: 'Success get subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: 'Success get subject data'},
            data: {
                type: 'object',
                properties: {
                    page: {type: 'number', example: 1},
                    per_page: {type: 'number', example: 2},
                    total_page: {type: 'number', example: 5},
                    total_data: {type: 'number', example: 10},
                    data: {
                        type: 'array',
                        items: {
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
        }
    }
}

export const GetSubjectsBadRequest = { 
    description: 'Bad request get subject data',  
    schema: {
        type: 'object',
        properties: {
            message: {
                type: 'array',
                items: {
                    type: 'string',
                    example: [
                        'page must be an integer number',
                        'page should not be empty',
                        'limit must be an integer number',
                        'limit should not be empty'
                    ]
                }
            },
            error: {type: 'string', example: 'Bad Request'},
            statusCode: {type: 'number', example: 400}
        }
    }
}

export const GetSubjectsInternalServerError = {
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