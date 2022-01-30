export const responseMessages = {
    'ACCOUNT_DISABLED': 'Your account is disabled please contact to admin',
    'ALREADY_EXIST': 'Aleardy Exist Please Login',
    'ALREADY_REGISTER': 'Email already registered',
    'REGISTERD': 'Registered Successfully',
    'INVALID_EMAIL': 'Email not exist',
    'INCORRECT_PASSWORD': 'Incorrect password',
    'LOGIN': 'Logged in successfully',
    'USER_NOT_FOUND': 'User not found',
    'UNAUTHORIZED': 'Unauthorized',
    'USER_NOTFOUND': 'User not found',
    'UPDATE_USER': 'Profile Completed successfully',
    'FETCH_USER': 'Fetch user successfully',
    'FETCH_USERS': 'Fetch all user successfully',
    'DELETE_USER': 'User deleted successfully',
    'ADD_TEAM': 'Team Added successfully',
    'FETCH_TEAM': 'Fetch team successfully',
    'FETCH_TEAMS': 'Fetch all team successfully',
    'TEAM_NOT_FOUND': 'Team not found',
    'DELETE_TEAM': 'Team deleted successfully',
    'UPDATE_TEAM_DETAILS': 'Team details udpated successfully',
    'PLAYER_ADDED': 'Player In The Added successfully',
}

export const notificationPayload = {}

export const statusCodes = {
    'SUCCESS': 200,
    'RECORD_CREATED': 201,
    'BAD_REQUEST': 400,
    'AUTH_ERROR': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'INVALID_REQUEST': 405,
    'RECORD_ALREADY_EXISTS': 409,
    'SERVER_ERROR': 500
}

const makeResponse = async (res, statusCode, success, message, payload = null, meta = {}) =>
    new Promise(resolve => {
        res.status(statusCode)
            .send({
                success,
                code: statusCode,
                message,
                data: payload,
                meta
            });
        resolve(statusCode);
    });

export { makeResponse };
