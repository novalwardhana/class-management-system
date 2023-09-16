export const DeleteSubjectDescription = {description: "Delete data by subject id"}
export const DeleteSubjectParam = { name: 'id', type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b'}

export const DeleteSubjectSuccess = {
    description: 'Success delete subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success delete subject data with subject id: 6f6b0851-adb3-4699-a849-5e5d806b3a1b`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteSubjectNotFound = {
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

export const DeleteSubjectNotAcceptable = {
    description: 'Data not acceptable because already use in class data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 406},
            message: {type: 'string', example: `Cannot delete subject data, subject_id: 6f6b0851-adb3-4699-a849-5e5d806b3a1b already used in class collection`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteSubjectInternalServerError = {
    description: 'Internal server error when delete subject data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}