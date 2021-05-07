# RWS LanguageWeaver Cloud GitHub Action

## RWS Language Weaver Translation 

Fast, secure, real-time translation powered by Linguistic AI

### Summary
Machine Translation is a key enabling technology that allows businesses and customers to communicate in real time, without language barriers. The RWS Language Weaver Translation app for ServiceNow is built on state-of-the-art proprietary AI-technology that detects and translates text in any language or format. Language Weaver supports seamless dynamic translation of knowledge base content, chats, incident tickets, and other snippets text input, directly within your instance. All translations are carried out securely and in a matter of seconds, allowing you to focus the task at hand without worrying about language.

Language Weaver can be deployed as a secure cloud solution via our Language Weaver Cloud offering, or on-premise behind your firewall with our Language Weaver Edge offering.

## Registration

To enable administrators more finite insight into usage information SDL Machine Translation Cloud provides two authentication methods via the REST API: Client ID with Secret AND Username with Password.

Both authentication methods are compliant with OAuth2 industry standards. Using one of the two authentication options or both depends on the workflow that you are integrating Machine Translation (MT) into.

Use https://www.rws.com/translation/language-weaver/ to register and obtain your clientId and clientCecret.

## Usage

```yaml
name: Resources - LanguageWeaver Cloud Machine Translation
uses: RwsTranslationTechnologies/mtactions@v1.0.0
with:
    client-id: ${{ secrets.CLIENT_ID }}
    client-secret: ${{ secrets.CLIENT_SECRET }}
    source-path: '${{ env.WORKSPACE }}/src/MyConsoleApp/Resources'
    target-languages: 'fra,ger'
    translation-model: null
```
Parameters description:

1. 'client-id' and 'client-secret' are used to authenticate to the LanguageWeaver Cloud API, they will be provided by RWS.
2. 'source-path' represents the path to the resources to be translated. It can either be the path to a folder, stating that all files in that folder should be translated, or the path to a file, stating that only that file will be translated.
3. 'target-languages' represents the target language or languages in which the source files are translated. It can either be a single target language ('fra') or multiple target languages ('fra,ger').
4. 'translation-model' represents the dictionary model used for specialized translations (if not present, the default generic model will be used).

Each translated file will be added on on the same folder level as the source file (the name will include the target language, e.g. test-fra.txt).
