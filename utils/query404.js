// 404 Error handling
module.exports = query404 = (res, query, message) => {
  if (!query) {
    const errors = {};
    errors.query = message;
    return res.status(404).json(errors);
  }
};