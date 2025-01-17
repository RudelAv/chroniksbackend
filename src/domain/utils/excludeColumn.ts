export function exclude(result: any, arg1: string[]) {
    const excludedResult = { ...result._doc };
    arg1.forEach((key) => {
        delete excludedResult[key];
    });
    return excludedResult;
}