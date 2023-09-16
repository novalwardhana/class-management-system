export const UpdateTeacherDescription = {description: "Update data by teacher id"}
export const UpdateTeacherParam = { name: 'id', type: 'string', example: 'ae167e22-7696-4271-a495-0fb65b4d05ec'}
export const UpdateTeacherRequestBody = {
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

export const UpdateTeacherSuccess = {
    description: 'Success create teacher data', 
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success update teacher data with teacher id: ae167e22-7696-4271-a495-0fb65b4d05ec`},
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

export const UpdateTeacherNotFound = {
    description: 'Teacher data not found', 
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Teacher data with teacher_id: ae167e22-7696-4271-a495-0fb65b4d05ec is not found`},
            data: {type: 'any', example: null}
        }
    }
}

export const UpdateTeacherInternalServerError = {
    description: 'Internal server error when update teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}