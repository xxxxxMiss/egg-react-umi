export default {
  namespace: 'test',
  state: {
    title: null,
    snapshot: '',
  },

  effects: {},

  reducers: {
    test(state, { payload }) {
      console.log('======dva===', payload)
      return {
        ...state,
        ...payload,
        title: 'hello umi',
      }
    },
  },
}
