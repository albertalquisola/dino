export function setCurrentCity(address, placeId) {
  return {
    type: 'SET_CURRENT_CITY',
    payload: { address, placeId },
  };
}

export default { setCurrentCity };