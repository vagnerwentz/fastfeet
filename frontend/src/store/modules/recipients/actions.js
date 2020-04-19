export function addRecipientRequest(data) {
  return {
    type: '@recipient/ADD_REQUEST',
    payload: { data },
  };
}

export function updateRecipientRequest(data, id) {
  return {
    type: '@recipient/UPDATE_REQUEST',
    payload: { data, id },
  };
}
