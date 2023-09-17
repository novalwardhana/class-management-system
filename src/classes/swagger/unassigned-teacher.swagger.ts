export const UnassignedTeacherClassDescription = {description: "Set unassigned teacher by class_id"}
export const UnassignedTeacherClassParam = { name: 'id', type: 'string', example: '26cc5a2e-5ff3-4def-a927-e0fbb3349756'}

export const UnassignedTeacherClassSuccess = {
    description: 'Success set unassigned-teacher class data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success set unassigned-teacher class data with class_id: 26cc5a2e-5ff3-4def-a927-e0fbb3349756`},
            data: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '6505e1db2184cf30746aea64' },
                    class_id: { type: 'string', example: '26cc5a2e-5ff3-4def-a927-e0fbb3349756' },
                    title: { type: 'string', example: 'Belajar Alquran Lanjutan 1' },
                    teacher: {type: 'object', example: null},
                    subject : {
                        type: 'object',
                        properties: {
                            _id: { type: 'string', example: '650553f181f3fa1b7cf4f7c2' },
                            subject_id: { type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b' },
                            name: { type: 'string', example: 'Belajar Al Quran 1' },
                            description: { type: 'string', example: 'Belajar Al Quran dan terjemahan' },
                            level: { type: 'string', example: 'expert' },
                            created_at: { type: 'string', example: '2023-09-16T23:47:36.054Z'},
                            updated_at: { type: 'string', example: '2023-09-17T00:34:23.256Z'},
                        }
                    },
                    date: { type: 'string', example: '2023-09-15'},
                    start_time: { type: 'string', example: '11:00'},
                    end_time: { type: 'string', example: '15:35'},
                    duration: { type: 'number', example: 275},
                    status: { type: 'string', example: 'active'},
                    reference_teacher_id: { type: 'string', example: null},
                    reference_subject_id: { type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b'},
                    created_at: { type: 'string', example: '2023-09-17T00:11:55.255Z'},
                    updated_at: { type: 'string', example: '2023-09-17T00:11:55.256Z'},
                }
            }
        }
    }
}

export const UnassignedTeacherClassNotFound = {
    description: 'Data not found',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 404},
            message: {type: 'string', example: `Class data with class_id: 26cc5a2e-5ff3-4def-a927-e0fbb3349756 is not found`},
            data: {type: 'any', example: null}
        }
    }
}

export const UnassignedTeacherClassInternalServerError = {
    description: 'Internal server error get class data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 500},
            message: {type: 'string', example: 'Internal server error'},
            data: {type: 'any', example: null}
        }
    }
}