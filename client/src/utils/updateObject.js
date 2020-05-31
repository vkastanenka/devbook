// Updates object key value pairs
export default (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}