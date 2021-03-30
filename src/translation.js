const axios = require('axios').default;
const constants = require('./constants');
const FormData = require('form-data');
const utils = require('./utils');

// Functions

const createTextTranslation = async (accessToken, params, textContent) => {
    var body = JSON.stringify({
        sourceLanguageId: params.sourceLanguageId,
        targetLanguageId: params.targetLanguageId,
        model: params.model,
        submissionType: params.submissionType,
        inputFormat: params.inputFormat,
        translationMode: params.translationMode,
        input: textContent,
    });

    var config = {
        method: 'post',
        url: `${constants.baseApiEndpoint}/mt/translations/async`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
        data: body,
    };

    try {
        const response = await axios(config);
        return response.data.requestId;
    } catch (error) {
        console.log(error);
    }
};

const retrieveTextTranslation = async (accessToken, requestId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/mt/translations/async/${requestId}/content`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.translation;
    } catch (error) {
        console.log(error);
    }
};

const createFileTranslation = async (accessToken, params, streamContent) => {
    let data = new FormData();

    data.append('input', streamContent);
    data.append('sourceLanguageId', params.sourceLanguageId);
    data.append('targetLanguageId', params.targetLanguageId);
    data.append('model', params.model);
    data.append('inputFormat', params.inputFormat);

    var config = {
        method: 'post',
        url: `${constants.baseApiEndpoint}/mt/translations/async`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
            ...data.getHeaders(),
        },
        data: data,
    };

    try {
        const response = await axios(config);
        return response.data.requestId;
    } catch (error) {
        console.log(error);
    }
};

const retrieveFileTranslation = async (accessToken, requestId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/mt/translations/async/${requestId}/content`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const checkTranslationStatus = async (accessToken, requestId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/mt/translations/async/${requestId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.translationStatus;
    } catch (error) {
        console.log(error);
    }
};

const identifySourceTextLanguage = async (accessToken, params, streamContent) => {
    var body = JSON.stringify({
        input: streamContent,
        inputFormat: params.inputFormat,
    });
    
    var config = {
        method: 'post',
        url: `${constants.baseApiEndpoint}/multi-language-identification/async`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
        data: body,
    };

    try {
        const response = await axios(config);
        return response.data.requestId;
    } catch (error) {
        console.log(error);
    }
};

const identifySourceFileLanguage = async (accessToken, params, streamContent) => {
    let data = new FormData();

    data.append('input', streamContent);
    data.append('inputFormat', params.inputFormat);
    
    var config = {
        method: 'post',
        url: `${constants.baseApiEndpoint}/multi-language-identification/async`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
            ...data.getHeaders(),
        },
        data: data,
    };

    try {
        const response = await axios(config);
        return response.data.requestId;
    } catch (error) {
        console.log(error);
    }
};

const checkIdentificationStatus = async (accessToken, requestId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/multi-language-identification/async/${requestId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.status;
    } catch (error) {
        console.log(error);
    }
};

const retrieveFileIdentification = async (accessToken, requestId) => {
    var config = {
        method: 'get',
        url: `${constants.baseApiEndpoint}/multi-language-identification/async/${requestId}/result`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Trace-ID': utils.generateTraceId(),
        },
    };

    try {
        const response = await axios(config);
        return response.data.languages[0];
    } catch (error) {
        console.log(error);
    }
};

// Exports

module.exports = {
    createTextTranslation: createTextTranslation,
    retrieveTextTranslation: retrieveTextTranslation,
    createFileTranslation: createFileTranslation,
    retrieveFileTranslation: retrieveFileTranslation,
    checkTranslationStatus: checkTranslationStatus,
    identifySourceTextLanguage: identifySourceTextLanguage,
    identifySourceFileLanguage: identifySourceFileLanguage,
    checkIdentificationStatus: checkIdentificationStatus,
    retrieveFileIdentification: retrieveFileIdentification,
};
