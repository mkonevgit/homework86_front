import {PersistedStateType} from "./reducerTypes";


export const loadFromLocalStorage = () => {
  try {
    const serializedState: string | null = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
}

export const saveToLocalStorage = (state: PersistedStateType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState)
  } catch (err) {
    console.log("Could not save state");
  }
}