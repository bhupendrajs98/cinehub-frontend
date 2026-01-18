const WATCHLIST_KEY = "watchlist";

export const getWatchlist = () => {
  const data = localStorage.getItem(WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToWatchlist = (movie) => {
  const watchlist = getWatchlist();

  const exists = watchlist.find((m) => m._id === movie._id);
  if (!exists) {
    watchlist.push(movie);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }
};

export const removeFromWatchlist = (id) => {
  const watchlist = getWatchlist().filter((m) => m._id !== id);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
};

export const isInWatchlist = (id) => {
  return getWatchlist().some((m) => m._id === id);
};
