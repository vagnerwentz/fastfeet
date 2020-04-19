export function addDeliverymanRequest(data) {
  return {
    type: '@deliveryman/ADD_REQUEST',
    payload: { data },
  };
}

export function updateDeliverymanRequest(data, id) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { data, id },
  };
}
