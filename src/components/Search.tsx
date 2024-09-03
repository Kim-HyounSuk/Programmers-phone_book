import styled from '@emotion/styled';
import React, { RefObject } from 'react';

interface IProps {
	query: string;
	onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClearQuery: () => void;
	onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	inputRef: RefObject<HTMLInputElement>;
}

const Search = ({
	query,
	onChangeQuery,
	onClearQuery,
	onKeyUp,
	inputRef,
}: IProps) => {
	return (
		<Container>
			<input
				type="text"
				value={query}
				onChange={onChangeQuery}
				onKeyUp={onKeyUp}
				placeholder="검색어를 입력 후 엔터를 누르세요."
				ref={inputRef}
			/>
			<button onClick={onClearQuery}>전체리스트 보기</button>
		</Container>
	);
};

export default Search;

const Container = styled.div`
	padding-bottom: 5rem;
	display: flex;
	gap: 0.5rem;

	& > input {
		all: unset;
		padding: 0.75rem;
		background-color: skyblue;
		border-radius: 0.5rem;
		flex: 1;
	}

	& > button {
		padding: 0.75rem;
		background-color: #20639b;
		border-radius: 0.5rem;
		color: white;
	}
`;
