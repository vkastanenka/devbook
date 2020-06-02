module.exports = completeURL = (url) => {
  if (url === '') return '';

  let completeURL;
  if (url.startsWith("www.")) completeURL = `https://${url}`;
  else if (!url.startsWith("https://www.")) completeURL = `https://www.${url}`;
  else if (url.startsWith("https://www.")) completeURL = url;

  return completeURL;
};
