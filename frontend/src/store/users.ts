import { createSlice, createSelector } from '@reduxjs/toolkit';
import { WS } from '../types/ws';
import { actions as api } from './api';
import { token, headers } from './utils/rest-headers';

const slice = createSlice({
  name: 'users',
  initialState: {
    fetched: false,
    list: [] as Entity.User[],
  },
  reducers: {
    fetched: (users, { payload }: Store.Action<Entity.User[]>) => {
      users.list.push(...payload);
      users.fetched = true;
    },
    updated: (users, { payload }: Store.Action<WS.Args.UserUpdate>) => {
      const user = users.list.find(u => u.id === payload.userId);
      Object.assign(user, payload.partialUser);
    },
    deleted: (users, { payload }: Store.Action<WS.Args.UserDelete>) => {
      const index = users.list.findIndex(u => u.id === payload.userId);
      users.list.splice(index, 1);
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

// >v6: replace with REST when adding dms
export const fetchUsers = () => (dispatch) => {
  dispatch(api.restCallBegan({
    onSuccess: [actions.fetched.type],
    headers: headers(),
    url: '/users',
  }));
}

export const updateSelf = (payload: Partial<Entity.User>) => (dispatch) => {
  dispatch(api.wsCallBegan({
    event: 'USER_UPDATE',
    data: { ...payload, token } as WS.Params.UserUpdate,
  }));
}

export const deleteSelf = () => (dispatch) => {
  dispatch(api.wsCallBegan({ event: 'USER_DELETE' }));
}

export const getUser = (id: string) =>
  createSelector<Store.AppState, Entity.User[], Entity.User | undefined>(
    state => state.entities.users.list,
    users => users.find(u => u.id === id),
  );
