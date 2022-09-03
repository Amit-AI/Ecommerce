module.exports = errorCatcher => (req, res, next) =>{
    Promise.resolve(errorCatcher(req, res, next)).catch(next);
}