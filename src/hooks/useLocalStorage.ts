import {SetStateAction, useState} from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  const setStoredValue = (newValue: SetStateAction<T>) => {
    setValue((prevValue) => {
      const finalValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prevValue) : newValue;
      localStorage.setItem(key, JSON.stringify(finalValue));
      return finalValue;
    });
  };

  return [value, setStoredValue] as const;
};

export default useLocalStorage;