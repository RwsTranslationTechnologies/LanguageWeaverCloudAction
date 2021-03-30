const axios = require('axios').default;
const details = require('../package.json');

const wait = (milliseconds) => {
    return new Promise((resolve) => {
        if (typeof milliseconds !== 'number') {
            throw new Error('milliseconds not a number');
        }
        setTimeout(() => resolve('done!'), milliseconds);
    });
};

const downloadFileContentFromUrl = async (url) => {
    var config = {
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const generateTraceId = () => {
    let dt = new Date().getTime();
    
    const guid = '4xxx-yxxx'.replace(/[xy]/g,  (c) => {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    
    return `GitHub-${details.version}-${guid}`;
}

module.exports = {
    wait: wait,
    downloadFileContentFromUrl: downloadFileContentFromUrl,
    generateTraceId: generateTraceId
};
