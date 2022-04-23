const axios = require('axios')

module.exports = {
    fetchAnalizedUrl: async (url) => {
        const scanData = await axios.post('https://http-observatory.security.mozilla.org/api/v1/analyze?host='+ url)
        return scanData.data
    },

    fetchScanResult: async (scanId) => {
        const scanResult = await axios.get('https://http-observatory.security.mozilla.org/api/v1/getScanResults?scan=' + scanId)
        return scanResult.data
    }
}