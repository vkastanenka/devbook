// Creates a filtered object that has filtered key value pairs from the passed in object
module.exports = filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  // For each key in the passed in object, if array of allowedFields includes the element, create a key value pair
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};