const generateUniqueId = (pattern='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => {
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function getUserIdFromLocalStorage() {
  return localStorage.getItem('userId');
}

function saveUserIdToLocalStorage(userId) {
  localStorage.setItem('userId', userId);
}

export { generateUniqueId, getUserIdFromLocalStorage, saveUserIdToLocalStorage };