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
    }
    return {};
};
