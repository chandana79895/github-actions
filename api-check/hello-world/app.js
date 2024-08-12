'use strict';

exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // List of allowed IP addresses
    const allowedIPs = ['14.99.84.194', '49.204.91.61']; 

    // Get the IP address of the request
    const clientIP = headers['x-forwarded-for'] ? headers['x-forwarded-for'][0].value.split(',')[0].trim() : '';

    // Check if the IP address is allowed
    if (!allowedIPs.includes(clientIP)) {
        return {
            status: '403',
            statusDescription: 'Forbidden',
        };
    }

    return request;
};
