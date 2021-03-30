const axios = require('axios').default;
const constants = require('./constants');
const utils = require('./utils');

// Functions

const getAccessToken = async (clientId, clientSecret) => {
    const body = JSON.stringify({
        clientId: clientId,
        clientSecret: clientSecret,
    });

    const config = {
        method: 'post',
        url: `${constants.baseApiEndpoint}/token`,
        headers: {
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
        data: body,
    };

    try {
        const response = await axios(config);
        return response.data.accessToken;
    } catch (error) {
        console.log(error);
    }
};

const getAccountId = async (accessToken) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/accounts/api-credentials/self`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.accountId;
    } catch (error) {
        console.log(error);
    }
};

const getLanguagePairs = async (accessToken, accountId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/accounts/${accountId}/subscriptions/language-pairs`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.languagePairs;
    } catch (error) {
        console.log(error);
    }
};

const getDictionaries = async (accessToken, accountId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/accounts/${accountId}/dictionaries`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.dictionaries;
    } catch (error) {
        console.log(error);
    }
};

// Exports

module.exports = {
    getAccessToken: getAccessToken,
    getAccountId: getAccountId,
    getLanguagePairs: getLanguagePairs,
    getDictionaries: getDictionaries,
};
