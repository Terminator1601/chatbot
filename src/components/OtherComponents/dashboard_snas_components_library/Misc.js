// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateRandomString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function parseUrlParams(search) {
    if(search){
        return search
        .substring(1) // Remove the leading "?"
        .split("&")   // Split by "&"
        .reduce((params, param) => {
          const [key, value] = param.split("=");
          params[decodeURIComponent(key)] = decodeURIComponent(value);
          return params;
        }, {});
    }
   return null
}