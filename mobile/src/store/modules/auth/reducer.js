import produce from 'immer';

const INITIAL_STATE = {
  deliveryman: {},
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        const { avatar, ...deliveryman } = action.payload.deliveryman;
        draft.deliveryman = {
          ...deliveryman,
          avatar: avatar.url,
        };
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.deliveryman = {};
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
