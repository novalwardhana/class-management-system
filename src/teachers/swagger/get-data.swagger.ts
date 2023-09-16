export const GetTeacherDescription = {description: "Get data by teacher id"}
export const GetTeacherParam = { name: 'id', type: 'string', example: 'ae167e22-7696-4271-a495-0fb65b4d05ec'}

export const GetTeacherSuccess = {
    description: 'Success get teacher data', 
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: 'Success get teacher data'},
            data: {
                type: 'object',
                properties: {
                    _id: {type: 'string', example: '6505275ac37da523e51cc10e'},
                    teacher_id: {type: 'string', example: 'ae167e22-7696-4271-a495-0fb65b4d05ec'},
                    full_name: {type: 'string', example: 'Noval Wardhana'},
                    date_of_birth: {type: 'string', example: '1995-01-01'},
                    employee_id_number: {type: 'string', example: '19950101'},
                    email: {type: 'string', example: 'noval@gmail.com'},
                    phone_number: {type: 'string', example: '085741123456'},
                    address: {type: 'string', example: 'Yogyakarta Indonesia'},
                    created_at: {type: 'string', example: '2023-09-16T10:56:10.721Z'},
                    updated_at: {type: 'string', example: '2023-09-16T10:56:10.723Z'}
                }
            }
        }
    }
}

export const GetTeacherNotFound = {
    description: 'Data not found',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Teacher data with teacher_id: ae167e22-7696-4271-a495-0fb65b4d05ec is not found`},
            data: {type: 'any', example: null}
        }
    }
}

export const GetTeacherInternalServerError = {
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
