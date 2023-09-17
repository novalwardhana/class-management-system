export const DeleteClassDescription = {description: "Delete data by class_id"}
export const DeleteClassParam = { name: 'id', type: 'string', example: '26cc5a2e-5ff3-4def-a927-e0fbb3349756'}

export const DeleteClassSuccess = {
    description: 'Success delete class data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success delete class data with class_id: 26cc5a2e-5ff3-4def-a927-e0fbb3349756`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteClassNotFound = {
    description: `Class data not found`,  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Class data with class_id: 26cc5a2e-5ff3-4def-a927-e0fbb3349756 is not found`},
            data: {type: 'any', example: null}
        }
    }
}

export const DeleteClassInternalServerError = {
    description: 'Internal server error when class teacher data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}