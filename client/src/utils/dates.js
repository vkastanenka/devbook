export const postTime = time => {
  let timeMessage;
  const nowTime = new Date(Date.now());
  const postTime = new Date(time);
  
  const month = postTime.getMonth() + 1;
  const day = postTime.getDate();
  const year = postTime.getFullYear();

  if (nowTime.getMinutes() === postTime.getMinutes())
    timeMessage = `${nowTime.getSeconds() -
      postTime.getSeconds()} seconds ago`;
  else if (nowTime.getHours() === postTime.getHours())
    timeMessage = `${nowTime.getMinutes() -
      postTime.getMinutes()} minutes ago`;
  else if (nowTime.getDate() === postTime.getDate())
    timeMessage = `${nowTime.getHours() - postTime.getHours()} hours ago`;
  else timeMessage = `${month}/${day}/${year}`;

  return timeMessage;
};

export const MMDDYYYY = date => {
  const fullDate = new Date(date);

  const month = fullDate.getMonth() + 1;
  const day = fullDate.getDate();
  const year = fullDate.getFullYear();

  return `${month}/${day}/${year}`;
}