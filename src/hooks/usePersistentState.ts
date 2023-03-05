import { SetStateAction, useCallback, useEffect, useState } from "react";
import localForage from "localforage";
import { useAutoUpdatingRef } from "./useAutoUpdatingRef";
import { checkIsVariableFunction } from "../typeGuards/checkIsVariableFunction";
import { getJSONValueFromLocalStorage } from '../functions/getJSONValueFromLocalStorage';
import { setJSONValueInLocalStorage } from '../functions/setJSONValueInLocalStorage';

/**
 * React hook for having a state value that is saved in IndexedDB
 * This hook will persist the state indefinitely. If you want the data to clear at the end of the user's session use the useSessionState hook.
 *
 * @template DataType Type of data to be saved in state. Can be passed explicitly or inferred by the default value
 * @param {string} key The key to be used to store and retrieve the data
 * @param {DataType} defaultData Default value for the state
 * @return {*}  {[DataType, (newData: DataType) => void]} Data and setter for the state
 */
export const usePersistentState = <DataType = never>(
  key: string,
  defaultData: DataType
): [DataType, (newData: SetStateAction<DataType>) => void] => {
  const [data, setData] = useState<DataType>(defaultData);
  const defaultDataRef = useAutoUpdatingRef(defaultData);

  useEffect(() => {
    const savedData = getJSONValueFromLocalStorage<DataType>(key);
    if (!savedData) return setData(defaultDataRef.current);
    setData(savedData);
    // Disable exhaustive-deps because it is erroring due to DataType, a type, not being included
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultDataRef]);

  const setAndSaveData = useCallback(
    (newState: SetStateAction<DataType>) => {
      setData((previousState) => {
        const newData = checkIsVariableFunction(newState)
          ? newState(previousState)
          : newState;
        setJSONValueInLocalStorage(key, newData);
        return newData;
      });
    },
    // Disable exhaustive-deps because it is erroring due to DataType, a type, not being included
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  return [data, setAndSaveData];
};
