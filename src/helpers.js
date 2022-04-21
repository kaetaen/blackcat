
module.exports = { 
    urlParser: (url) => {
        if (url.includes('http://') || (url.includes('https://'))){
            return url
        } else {
            return  'https://' + url            
        }
    }
}