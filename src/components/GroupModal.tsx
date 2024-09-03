import { LOCAL_STORAGE_GROUP } from '@/Constants';
import useInput from '@/hooks/useInput';
import styled from '@emotion/styled';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
} from 'react';

interface IProps {
	setModal: Dispatch<SetStateAction<boolean>>;
	setGroups: Dispatch<SetStateAction<string[]>>;
	groups: string[];
}

const GroupModal = ({ setModal, setGroups, groups }: IProps) => {
	const [input, onChangeInput, setInput] = useInput('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleCloseModal = useCallback(() => {
		setModal((prev) => !prev);
	}, [setModal]);

	const handleGroups = useCallback(
		(groupname: string) => {
			setGroups((prev) => {
				if (prev.length === 1) return prev;

				const updated = prev.filter((group) => group !== groupname);
				localStorage.setItem(LOCAL_STORAGE_GROUP, JSON.stringify(updated));

				return updated;
			});
		},
		[setGroups],
	);

	const onClickGroupBtn = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();

			if (input.trim() === '') return;

			setGroups((prev) => {
				const updated = new Set([...prev, input]);
				localStorage.setItem(LOCAL_STORAGE_GROUP, JSON.stringify([...updated]));
				setInput('');
				setTimeout(() => {
					inputRef.current?.focus();
				}, 0);

				return [...updated];
			});
		},
		[input, setGroups, setInput],
	);

	useEffect(() => {
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	}, []);

	return (
		<Container>
			<button onClick={handleCloseModal}>닫기</button>
			<Content>
				<ul>
					{groups.map((group) => (
						<div key={group}>
							<li>{group}</li>
							<button onClick={() => handleGroups(group)}>X</button>
						</div>
					))}
				</ul>
				<div>
					<input
						type="text"
						value={input}
						onChange={onChangeInput}
						placeholder="새 그룹 이름"
						ref={inputRef}
					/>
					<button onClick={onClickGroupBtn}>추가</button>
				</div>
			</Content>
		</Container>
	);
};

export default GroupModal;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);

	& > button {
		padding: 0.5rem;
		background-color: tomato;
		color: white;
	}
`;

const Content = styled.div`
	background-color: white;
	padding: 1rem;

	& > ul {
		margin-bottom: 1rem;
		& > div {
			display: flex;

			& > li {
				flex: 1;
			}
		}
	}

	& > div {
		display: flex;

		& > input {
			flex: 1;
			padding: 0.5rem;
		}

		& > button {
			background-color: lightgray;
			padding: 0.5rem;
			border: 1px solid black;
		}
	}
`;
