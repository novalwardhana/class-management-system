export const CreateSubjectDescription = {description: "Create new subject data"}

export const CreateSubjectRequestBody = {
    type: 'object',
    properties: {
        name: { type: 'string', example: 'Belajar Al Quran 1' },
        description: { type: 'string', example: 'Belajar Al Quran dan terjemahan' },
        level: { type: 'string', example: 'expert' },
    },
    required: ['name', 'description', 'level'],
}

export const CreateSubjectSuccess = {
    description: 'Success create subject data', 
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: 'Success create subject data'},
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

export const CreateSubjectBadRequest = {
    description: 'Bad request create subject data',  
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

  export const CreateSubjectInternalServerError = {
    description: 'Internal server error create subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}