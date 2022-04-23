
module.exports = { 
    urlParser: (url) => {
        if (url.includes('http://') || (url.includes('https://'))){
            url = url.replace(/(https:\/\/)|(http:\/\/)/g,'')
        }
        return url
    
    }
}