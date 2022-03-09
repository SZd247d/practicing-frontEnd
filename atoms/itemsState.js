import { atom } from 'recoil'

export const itemsState = atom({
  key: 'itemsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})
