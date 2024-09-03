import { IData } from '@/types';
import { useCallback, useState } from 'react';
import DetailModal from '../DetailModal';
import styled from '@emotion/styled';

interface IProps {
	item: IData;
	onRemoveItem: (id: number) => void;
}

const Item = ({ item, onRemoveItem }: IProps) => {
	const [modal, setModal] = useState(false);

	const onClickRemoveBtn = useCallback(() => {
		onRemoveItem(item.id);
	}, [item, onRemoveItem]);

	const onClickDetailBtn = useCallback(() => {
		setModal((prev) => !prev);
	}, []);

	return (
		<>
			{modal && <DetailModal setModal={setModal} item={item} />}
			<Container>
				<div>
					<span>{item.name}</span>
					<span>{item.phoneNum}</span>
					<span>{item.group}</span>
				</div>
				<div>
					<button onClick={onClickDetailBtn}>세부사항</button>
					<button onClick={onClickRemoveBtn}>삭제</button>
				</div>
			</Container>
		</>
	);
};

export default Item;

const Container = styled.li`
	display: flex;
	align-items: center;
	padding: 0.75rem 0;
	border-bottom: 1px solid lightgray;

	& > div:nth-of-type(1) {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		& > span {
			font-size: 1.125rem;
		}
	}

	& > div:nth-of-type(2) {
		display: flex;
		gap: 0.5rem;
	}

	& > div:nth-of-type(2) button {
		padding: 0.25rem;
		border: 1px solid black;
		background-color: lightgray;
	}
`;
