export const GetTeachersDescription = {description: "Get all the teacher's data"}

export const GetTeachersQueryPage = {name: "page", type: Number, required: true, description: ""}
export const GetTeachersQueryLimit = {name: "limit", type: Number, required: true, description: ""}

export const GetTeachersSuccess = { 
    description: 'Success get teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: 'Success get teacher data'},
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
                                _id: { type: 'string', example: '6505275ac37da523e51cc10e' },
                                teacher_id: { type: 'string', example: 'ae167e22-7696-4271-a495-0fb65b4d05ec' },
                                full_name: { type: 'string', example: 'Noval Wardhana'},
                                date_of_birth: { type: 'string', format: 'date', example: '1995-01-01'},
                                employee_id_number: { type: 'string', example: '19950101'},
                                email: { type: 'string', format: 'email', example: 'noval@gmail.com'},
                                phone_number: { type: 'string', example: '085741123456'},
                                address: { type: 'string', example: 'Yogyakarta Indonesia'},
                                created_at: { type: 'string', example: '2023-09-16T10:56:10.721Z'},
                                updated_at: { type: 'string', example: '2023-09-16T10:56:10.721Z'},
                            }
                        }
                    }
                }
            }
        }
    }
}

export const GetTeachersBadRequest = { 
    description: 'Bad request get teacher data',  
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

export const GetTeachersInternalServerError = {
    description: 'Internal server error get teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}