import {
	INIT_GROUP_LIST,
	LOCAL_STORAGE_GROUP,
	LOCAL_STORAGE_PHONE_BOOK,
	VALIDATE_REGEX,
} from '@/Constants';
import useInput from '@/hooks/useInput';
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import Input from './common/Input';
import { IData } from '@/types';
import Group from './common/Group';
import styled from '@emotion/styled';

interface IProps {
	setData: Dispatch<SetStateAction<IData[]>>;
}

const Form = ({ setData }: IProps) => {
	const [name, onChangeName, setName] = useInput('');
	const [nameErr, setNameErr] = useState('');
	const nameRef = useRef<HTMLInputElement>(null);

	const [phoneNum, onChangePhoneNum, setPhoneNum] = useInput('');
	const [phoneNumErr, setPhoneNumErr] = useState('');
	const phoneNumRef = useRef<HTMLInputElement>(null);

	const [group, setGroup] = useState<string[]>([]);
	const [selected, setSelected] = useState('');

	const [note, onChangeNote, setNote] = useInput('');

	useEffect(() => {
		const isGroup = localStorage.getItem(LOCAL_STORAGE_GROUP);
		const initialGroup = isGroup ? JSON.parse(isGroup) : INIT_GROUP_LIST;

		setGroup(initialGroup);

		if (!isGroup) {
			localStorage.setItem(
				LOCAL_STORAGE_GROUP,
				JSON.stringify(INIT_GROUP_LIST),
			);
		}

		setSelected(initialGroup[0]);
	}, []);

	const validateName = useCallback(() => {
		if (name.trim() === '' || !VALIDATE_REGEX.name.test(name)) {
			setNameErr('이름은 한글로 두 글자 이상 입력해주세요.');
			return false;
		} else {
			setNameErr('');
			return true;
		}
	}, [name]);

	const validatePhoneNum = useCallback(() => {
		if (phoneNum.trim() === '' || !VALIDATE_REGEX.phoneNum.test(phoneNum)) {
			setPhoneNumErr('전화번호는 010-0000-0000 형식으로 입력해주세요.');
			return false;
		} else {
			setPhoneNumErr('');
			return true;
		}
	}, [phoneNum]);

	const onChangeGroup = useCallback((value: string) => {
		setSelected(value);
	}, []);

	const onSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			const isNameValid = validateName();
			const isPhoneNumValid = validatePhoneNum();

			if (isNameValid && isPhoneNumValid) {
				setData((prev) => {
					const data: IData = {
						id: Date.now(),
						name,
						phoneNum,
						group: selected,
						note,
					};
					localStorage.setItem(
						LOCAL_STORAGE_PHONE_BOOK,
						JSON.stringify([...prev, data]),
					);
					return [...prev, data];
				});

				setName('');
				setPhoneNum('');
				setNote('');
				setSelected(group[0]);
				nameRef.current?.focus();
			} else if (!isNameValid) {
				nameRef.current?.focus();
			} else if (!isPhoneNumValid) {
				phoneNumRef.current?.focus();
			}
		},
		[
			validateName,
			validatePhoneNum,
			name,
			phoneNum,
			note,
			setData,
			selected,
			setName,
			setNote,
			group,
			setPhoneNum,
		],
	);

	return (
		<Container onSubmit={onSubmit}>
			<Input
				state="이름"
				onChange={(e) => {
					onChangeName(e);
					if (nameErr) validateName();
				}}
				value={name}
				ref={nameRef}
				error={nameErr}
			/>
			<Input
				state="전화번호"
				onChange={(e) => {
					onChangePhoneNum(e);
					if (phoneNumErr) validatePhoneNum();
				}}
				value={phoneNum}
				ref={phoneNumRef}
				error={phoneNumErr}
			/>
			<Group
				groups={group}
				setGroups={setGroup}
				selected={selected}
				onChange={onChangeGroup}
			/>
			<Input state="간단한 기록" onChange={onChangeNote} value={note} />
			<button type="submit">저장</button>
		</Container>
	);
};

export default Form;

const Container = styled.form`
	max-width: 430px;
	padding: 1rem;
	border: 2px solid lightgray;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	& > button {
		background-color: #20639b;
		color: white;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
`;
