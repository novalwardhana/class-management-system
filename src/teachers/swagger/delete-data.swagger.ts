export const DeleteTeacherDescription = {description: "Delete data by teacher id"}
export const DeleteTeacherParam = { name: 'id', type: 'string', example: 'ae167e22-7696-4271-a495-0fb65b4d05ec'}

export const DeleteTeacherSuccess = {
    description: 'Success delete teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success delete teacher data with teacher id: ae167e22-7696-4271-a495-0fb65b4d05ec`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteTeacherNotFound = {
    description: `Teacher data not found`,  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Teacher data with teacher_id: ae167e22-7696-4271-a495-0fb65b4d05ec is not found`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteTeacherNotAcceptable = {
    description: 'Data not acceptable because already use in class data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 406},
            message: {type: 'string', example: `Cannot delete teacher data, teacher_id: ae167e22-7696-4271-a495-0fb65b4d05ec already used in class collection`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteTeacherInternalServerError = {
    description: 'Internal server error when delete teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}