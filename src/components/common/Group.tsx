import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useState,
} from 'react';
import GroupModal from '../GroupModal';
import styled from '@emotion/styled';

interface IProps {
	groups: string[];
	selected: string;
	onChange: (value: string) => void;
	setGroups: Dispatch<SetStateAction<string[]>>;
}

const Group = ({ groups, selected, onChange, setGroups }: IProps) => {
	const [modal, setModal] = useState(false);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			onChange(e.target.value);
		},
		[onChange],
	);

	const handleModal = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setModal((prev) => !prev);
	}, []);

	return (
		<>
			{modal && (
				<GroupModal setModal={setModal} setGroups={setGroups} groups={groups} />
			)}
			<Container>
				<label htmlFor="group">그룹</label>
				<div>
					<select id="group" value={selected} onChange={handleChange}>
						{groups.map((group) => (
							<option key={group} value={group}>
								{group}
							</option>
						))}
					</select>
					<button onClick={handleModal}>조직추가</button>
				</div>
			</Container>
		</>
	);
};

export default Group;

const Container = styled.div`
	display: flex;
	align-items: center;

	& > label {
		flex: 1;
		font-weight: 700;
	}

	& > div {
		flex: 2.1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	& > div > select {
		flex: 1;
		padding: 0.25rem;
	}

	& > div > button {
		padding: 0.25rem;
		border: 1px solid black;
		background-color: lightgray;
	}
`;
