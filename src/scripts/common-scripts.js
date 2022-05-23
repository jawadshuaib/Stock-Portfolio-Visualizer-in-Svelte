const generateUniqueId = (pattern='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => {
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function getUserIdFromLocalStorage() {
  return sanitizeString(localStorage.getItem('userId'));
}

function saveUserIdToLocalStorage(userId) {
  localStorage.setItem('userId', sanitizeString(userId));
}

function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}

export { generateUniqueId, getUserIdFromLocalStorage, saveUserIdToLocalStorage };