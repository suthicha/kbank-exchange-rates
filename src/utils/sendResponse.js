const sendResponse = (res, dataObj, statusCode = 200, statusText = 'success') => {
    res.status(statusCode).json({
        status: statusText,
        requestTime: Date.now(), 
        data: dataObj
    })
}

module.exports = sendResponse;