export interface TimeRange {
    labelKey: string;
    value: string;
    labelShortKey: string;
}

export const timeRanges: TimeRange[] = [{
    labelKey: 'shortTerm.label',
    value: 'short_term',
    labelShortKey: 'shortTerm.labelShort'
}, {
    labelKey: 'mediumTerm.label',
    value: 'medium_term',
    labelShortKey: 'mediumTerm.labelShort'
}, {
    labelKey: 'longTerm.label',
    value: 'long_term',
    labelShortKey: 'longTerm.labelShort'
}];
