export const SetArchivedClassDescription = {description: "Set archived by class_id"}
export const SetArchivedClassParam = { name: 'id', type: 'string', example: '26cc5a2e-5ff3-4def-a927-e0fbb3349756'}

export const SetArchivedClassSuccess = {
    description: 'Success set archived class data',  
    schema: {
        type: 'object',
        properties: {
            status_code: {type: 'number', example: 200},
            message: {type: 'string', example: `Success set archived class data with class_id: 26cc5a2e-5ff3-4def-a927-e0fbb3349756`},
            data: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '6505e1db2184cf30746aea64' },
                    class_id: { type: 'string', example: '26cc5a2e-5ff3-4def-a927-e0fbb3349756' },
                    title: { type: 'string', example: 'Belajar Alquran Lanjutan 1' },
                    teacher: {
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
                            created_at: {type: 'string', example: '2023-09-16T12:41:15.230Z'},
                            updated_at: {type: 'string', example: '2023-09-16T13:44:58.554Z'}
                        }
                    },
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
                    status: { type: 'string', example: 'archived'},
                    reference_teacher_id: { type: 'string', example: 'ae167e22-7696-4271-a495-0fb65b4d05ec'},
                    reference_subject_id: { type: 'string', example: '6f6b0851-adb3-4699-a849-5e5d806b3a1b'},
                    created_at: { type: 'string', example: '2023-09-17T00:11:55.255Z'},
                    updated_at: { type: 'string', example: '2023-09-17T00:11:55.256Z'},
                }
            }
        }
    }
}

export const SetArchivedClassNotFound = {
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

export const SetArchivedClassInternalServerError = {
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