export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isStrongPassword = (value) => value.length >= 8 && /\d/.test(value) && /[a-zA-Z]/.test(value);

export const getGuestId = () => {
  const KEY = 'mern_shop_guest_id';
  let guestId = localStorage.getItem(KEY);
  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(KEY, guestId);
  }
  return guestId;
};

export const clearGuestId = () => {
  localStorage.removeItem('mern_shop_guest_id');
};
