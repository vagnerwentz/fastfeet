export function addOrderRequest(data) {
  return {
    type: '@order/ADD_REQUEST',
    payload: { data },
  };
}

export function updateOrderRequest(data, id) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: { data, id },
  };
}
