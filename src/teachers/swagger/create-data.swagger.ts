export const CreateTeacherDescription = {description: "Create new teacher data"}

export const CreateTeacherRequestBody = {
    type: 'object',
    properties: {
        full_name: {type: 'string', example:'Noval Wardhana'},
        date_of_birth: { type: 'string', example:'1995-01-01'},
        employee_id_number: {type: 'string', example:'19950101'},
        email: {type: 'string', example:'noval@gmail.com'},
        phone_number: {type: 'string', example:'085741123456'},
        address: {type: 'string', example:'Yogyakarta Indonesia'},
    },
    required: ['full_name', 'date_of_birth', 'employee_id_number', 'email', 'phone_number', 'address'],
}

export const CreateTeacherSuccess = {
    description: 'Success create teacher data', 
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: 'Success create teacher data'},
            data: {
                type: 'object',
                properties: {
                    full_name: {type: 'string', example: 'Noval Wardhana'},
                    date_of_birth: {type: 'string', example: '1995-01-01'},
                    employee_id_number: {type: 'string', example: '19950101'},
                    email: {type: 'string', example: 'noval@gmail.com'},
                    phone_number: {type: 'string', example: '085741123456'},
                    address: {type: 'string', example: 'Yogyakarta Indonesia'}
                }
            }
        }
    }
}

export const CreateTeacherBadRequest = {
    description: 'Bad request create teacher data',  
    schema: {
        type: 'object',
        properties: {
            message: {
                type: 'array',
                items: {
                    type: 'string',
                    example: [
                        'full_name should not be empty',
                        'date_of_birth must be a Date instance',
                        'date_of_birth should not be empty',
                        'employee_id_number should not be empty',
                        'email must be an email',
                        'email should not be empty',
                        'phone_number should not be empty',
                        'address should not be empty'
                    ]
                }
            },
            error: {type: 'string', example: 'Bad Request'},
            statusCode: {type: 'number', example: 400}
        }
    }
  }

export const CreateTeacherInternalServerError = {
    description: 'Internal server error create teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}