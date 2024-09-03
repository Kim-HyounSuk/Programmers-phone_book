import Form from '@/components/Form';
import { IData } from '@/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LOCAL_STORAGE_PHONE_BOOK } from '@/Constants';
import List from '@/components/List';
import useInput from '@/hooks/useInput';
import Search from '@/components/Search';
import styled from '@emotion/styled';
import Header from '@/layouts/Header';
import Main from '@/layouts/Main';

const App = () => {
	const [data, setData] = useState<IData[]>([]);
	const [query, onChangeQuery, setQuery] = useInput('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const storagedData = localStorage.getItem(LOCAL_STORAGE_PHONE_BOOK);
		const parsed = storagedData ? JSON.parse(storagedData) : [];

		setData(parsed);
	}, []);

	const onKeyUpInput = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				const filter = data.filter((item) => {
					return (
						item.name.includes(query) ||
						item.group.includes(query) ||
						item.note?.includes(query) ||
						item.phoneNum.includes(query)
					);
				});

				setData(filter);
				inputRef.current?.focus();
			}
		},
		[data, query],
	);

	const onClearQuery = useCallback(() => {
		setQuery('');

		const storagedData = localStorage.getItem(LOCAL_STORAGE_PHONE_BOOK);
		const parsed = storagedData ? JSON.parse(storagedData) : [];
		setData(parsed);

		inputRef.current?.focus();
	}, [setQuery]);

	return (
		<Container>
			<Header />
			<Main>
				<SectionL>
					<Form setData={setData} />
				</SectionL>
				<SectionR>
					<Search
						query={query}
						onChangeQuery={onChangeQuery}
						onClearQuery={onClearQuery}
						onKeyUp={onKeyUpInput}
						inputRef={inputRef}
					/>
					<List data={data} setData={setData} />
				</SectionR>
			</Main>
		</Container>
	);
};

export default App;

const Container = styled.div`
	width: 100%;
	height: 100%;
	justify-content: center;
`;

const SectionL = styled.section`
	flex: 1;
`;

const SectionR = styled.section`
	flex: 1.5;
`;
