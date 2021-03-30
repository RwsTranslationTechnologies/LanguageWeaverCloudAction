const baseApiEndpoint = 'https://translate-api.sdlbeglobal.com/v4';

const translationStatus = {
    Init: 'INIT',
    Translating: 'TRANSLATING',
    Done: 'DONE',
    Failed: 'FAILED',
};

const sourceLanguageIdentificationStatus = {
    Init: 'INIT',
    Identifying: 'IN_PROGRESS',
    Done: 'DONE',
    Failed: 'FAILED',
}

const inputFormats = [
    {
        name: 'PLAIN',
        extensions: ['.txt'],
        mimeType: 'text/plain',
    },
    {
        name: 'XLINE',
        extensions: ['.xline'],
        mimeType: 'text/x-line',
    },
    {
        name: 'HTML',
        extensions: ['.htm', '.html', '.xhtml'],
        mimeType: 'text/html',
    },
    {
        name: 'XML',
        extensions: ['.xml'],
        mimeType: 'text/xml',
    },
    {
        name: 'SLDXML',
        extensions: ['.sldxml'],
        mimeType: 'text/sdlxml',
    },
    {
        name: 'TMX',
        extensions: ['.tmx'],
        mimeType: 'text/x-tmx',
    },
    {
        name: 'XLIFF',
        extensions: ['.xliff'],
        mimeType: 'application/x-xliff',
    },
    {
        name: 'BCM',
        extensions: ['.bcm'],
        mimeType: 'application/x-json-bcm',
    },
    {
        name: 'PDF',
        extensions: ['.pdf'],
        mimeType: 'application/pdf',
    },
    {
        name: 'RTF',
        extensions: ['.rtf'],
        mimeType: 'application/rtf',
    },
    {
        name: 'DOCX',
        extensions: ['.docx', '.dotx', '.docm', '.dotm'],
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    {
        name: 'XLSX',
        extensions: ['.xlsx', '.xltx', '.xlsm', '.xltm', '.xlam', '.xlsb'],
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    {
        name: 'PPTX',
        extensions: ['.pptx', '.potx', '.ppsx', '.pptm', '.potm', '.ppsm'],
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    },
    {
        name: 'DOC',
        extensions: ['.doc', '.dot'],
        mimeType: 'application/msword',
    },
    {
        name: 'XLS',
        extensions: ['.xls', '.xlt', '.xla'],
        mimeType: 'application/vnd.ms-excel',
    },
    {
        name: 'PPT',
        extensions: ['.ppt', '.pot', '.pps'],
        mimeType: 'application/vnd.ms-powerpoint',
    },
    {
        name: 'ODT',
        extensions: ['.odt'],
        mimeType: 'application/vnd.oasis.opendocument.text',
    },
    {
        name: 'ODS',
        extensions: ['.ods'],
        mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
    },
    {
        name: 'ODP',
        extensions: ['.odp'],
        mimeType: 'application/vnd.oasis.opendocument.presentation',
    },
    {
        name: 'GIF',
        extensions: ['.gif'],
        mimeType: 'image/gif',
    },
    {
        name: 'JPG',
        extensions: ['.jpg', '.jpeg'],
        mimeType: 'image/jpeg',
    },
    {
        name: 'PNG',
        extensions: ['.png'],
        mimeType: 'image/png',
    },
];

module.exports = {
    baseApiEndpoint: baseApiEndpoint,
    status: translationStatus,
    inputFormats: inputFormats,
    identificationStatus: sourceLanguageIdentificationStatus,
};
