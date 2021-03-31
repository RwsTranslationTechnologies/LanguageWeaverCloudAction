# SDL MT Cloud GitHub Action

## Usage

```yaml
name: Resources - Machine Translation
uses: sdluktrade/mtactions@v1.0.0
with:
    client-id: ${{ secrets.BEGLOBAL_CLIENT_ID }}
    client-secret: ${{ secrets.BEGLOBAL_CLIENT_SECRET }}
    source-path: '${{ env.WORKSPACE }}/src/MyConsoleApp/Resources'
    target-languages: 'fra,ger'
    translation-model: null
```
Parameters description:

1. 'client-id' and 'client-secret' are used to authenticate to the SDL MT Cloud API, they will be provided by SDL.
2. 'source-path' represents the path to the resources to be translated. It can either be the path to a folder, stating that all files in that folder should be translated, or the path to a file, stating that only that file will be translated.
3. 'target-languages' represents the target language or languages in which the source files are translated. It can either be a single target language ('fra') or multiple target languages ('fra,ger').
4. 'translation-model' represents the dictionary model used for specialized translations (if not present, the default generic model will be used).

Each translated file will be added on on the same folder level as the source file (the name will include the target language, e.g. test-fra.txt).
