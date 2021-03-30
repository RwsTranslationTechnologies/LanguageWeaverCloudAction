const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

const utils = require('./utils');
const constants = require('./constants');
const account = require('./account');
const translation = require('./translation');


async function run() {
    try {
        // Read actions inputs
        const clientId = core.getInput('client-id');
        const clientSecret = core.getInput('client-secret');
        const sourcePath = core.getInput('source-path');
        let translationModel = core.getInput('translation-model');
        const targetLanguages = core.getInput('target-languages');

        // Validate inputs
        if (!clientId) {
            core.error(`Missing client-id input parameter.`);
        }

        if (!clientSecret) {
            core.error(`Missing client-secret input parameter.`);
        }

        if (!sourcePath) {
            core.error(`Missing source path input parameter.`);
        }

        if (!translationModel) {
            translationModel = 'generic';

            core.info(`No dictionary translation model was supplied, the default one will be used.`);
        }

        if (!targetLanguages) {
            core.error(`Missing target-language input parameter.`);
        }

        core.info(`File or files to translate at location: ${sourcePath}`);
        core.info(`Target language: ${targetLanguages}`);
        core.info(`Translation model: ${translationModel}`);

        // Authenticate againt MT Cloud
        const authToken = await account.getAccessToken(clientId, clientSecret); 

        let fileList;

        if (fs.existsSync(sourcePath)) {
            if (!fs.statSync(sourcePath).isDirectory()) {
              fileList = [sourcePath];
            }
            else {
              const walkSync = dir => 
                fs.readdirSync(dir).reduce((files, file) => {
                  const name = path.join(dir, file);
                  const isDirectory = fs.statSync(name).isDirectory();
                  return isDirectory ? [...files, ...walkSync(name)] : [...files, name];
                }, []);
  
              fileList = walkSync(sourcePath);                                             
            }
        }

        let languageDetected = false;
        let identifiedSourceLanguage;

        for (let filePath of fileList) {
            let inputFormatDetected;
            let extensionOfFile = path.extname(filePath);

            if (constants.inputFormats.some(x => x.extensions.some(y => y === extensionOfFile))) {
              inputFormatDetected = constants.inputFormats.find(x => x.extensions.some(y => y === extensionOfFile)).name;

              core.info(`Input type is ${inputFormatDetected}`);
            }
            else {
              core.info(`${filePath} can't be translated, file type not supported!`);

              continue;
            }

            // Read source file
            core.info(`Reading file at ${filePath}...`);
  
            let content;
            if (fs.existsSync(filePath)) {
              let sourceBuffer = fs.readFileSync(filePath, 'utf8');
              content = [`${sourceBuffer.toString()}`];
            }

            if (!languageDetected)
            {
                core.info(`Detecting source language for files...`);   

                const languageIdentificationParams = {
                    inputFormat: inputFormatDetected,
                };

                let identificationRequestId = await translation.identifySourceTextLanguage(authToken, languageIdentificationParams, content[0]);

                // Check identification process status
                let identificationStatus = await translation.checkIdentificationStatus(authToken, identificationRequestId);
  
                while (identificationStatus !== constants.identificationStatus.Done) {
                    await utils.wait(250);
                    identificationStatus = await translation.checkIdentificationStatus(authToken, identificationRequestId);
                }

                core.info(`Retrieving the identified source language...`);
                let result = await translation.retrieveFileIdentification(authToken, identificationRequestId);

                languageDetected = true;
                identifiedSourceLanguage = result.code;

                core.info(`${identifiedSourceLanguage} is set as the source language for all files.`);   
            }
  
            core.info(`Translating...`);

            const listOfTargetLanguages = targetLanguages.split(',');

            for (let targetLanguage of listOfTargetLanguages) {
              // Create translation options
              const params = {
                sourceLanguageId: identifiedSourceLanguage,
                targetLanguageId: targetLanguage,
                model: translationModel,
                submissionType: 'text',
                inputFormat: inputFormatDetected,
                translationMode: 'quality',
              };
  
              // Send to translations
              let requestId = await translation.createTextTranslation(authToken, params, content);
  
              // Check status
              let status = await translation.checkTranslationStatus(authToken, requestId);
  
              while (status !== constants.status.Done) {
                await utils.wait(250);
                status = await translation.checkTranslationStatus(authToken, requestId);
              }
  
              // Retrieve translation
              core.info(`Retrieving...`);
  
              let result = await translation.retrieveTextTranslation(authToken, requestId);
  
              // Write to new file
              core.info(`Writing file...`);
  
              let fileExtension = path.extname(filePath);
              let fileName = path.basename(filePath, fileExtension);
  
              let newFileName = `${fileName}-${targetLanguage}`;
  
              let targetPath = filePath.replace(`${fileName}${fileExtension}`, `${newFileName}${fileExtension}`);
  
              fs.writeFile(targetPath, result, (err) => {
                if (err) {
                  throw err;
                }
            
                core.info(`Done.`);
              });
            }
        }               
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
