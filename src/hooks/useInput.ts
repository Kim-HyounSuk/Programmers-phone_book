import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

type TUseInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
type TUseInputReturn<T> = [T, TUseInputHandler, Dispatch<SetStateAction<T>>];

const useInput = <T>(init: T): TUseInputReturn<T> => {
	const [value, setValue] = useState(init);

	const handler: TUseInputHandler = useCallback((e) => {
		setValue(e.target.value as T);
	}, []);

	return [value, handler, setValue];
};

export default useInput;
