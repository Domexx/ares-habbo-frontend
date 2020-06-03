import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class MissingHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return 'TRANSLATION NOT FOUND';
    }
}
