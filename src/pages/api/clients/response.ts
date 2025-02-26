export const response = (objectReponse: any, code: number) => {
    return new Response(JSON.stringify(objectReponse),
        { status: code, headers: { 'Content-Type': 'application/json' } });
}