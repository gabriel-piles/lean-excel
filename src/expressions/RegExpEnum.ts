export enum RegExpEnum{
    FORMULA = '^=',
    VOID_STRING = '^\s*$',
    KEY = "[A-Z][0-9]{1,2}",
    SUM = '((SUM\\()([^\\)]+)\\))',
    AVG = '((AVG\\()([^\\)]+)\\))',
}