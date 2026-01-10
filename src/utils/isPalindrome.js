

export const isPalindrome = ( text ) => {

    if (!text ) return false;

    const normalized = text.toLowerCase()
                        .replace(/[^a-z0-9]/g, '');

    const reversed = normalized.split('').reverse().join('');

    return normalized === reversed; 

} ;
