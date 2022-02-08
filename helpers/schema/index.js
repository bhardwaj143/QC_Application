import Joi from 'joi';

// Validation Cases
export const validationSchema = (action) => {
    switch (action) {
        case 'ADD_TEAM': {
            return {
                teamName: Joi.string().required(),
                teamcity: Joi.string().required()
            };
        }
        case 'LOGIN': {
            return {
                mobile: Joi.number().required(),
              };
        }
        case 'ADD_UMPIRE_SCORER': {
            return {
                name: Joi.string().optional(),
                mobile: Joi.string().optional()
            };
        }
    }
    return {};
};
