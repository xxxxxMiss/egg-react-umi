export default {
  namespace: 'user',
  state: {
    username: null,
  },

  effects: {},

  reducers: {
    setUsername(state, { payload }) {
      // in immer mode
      state.username = payload.name
    },
  },
}
