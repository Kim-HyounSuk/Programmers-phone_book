import { IData } from '@/types';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface IProps {
	item: IData;
	setModal: Dispatch<SetStateAction<boolean>>;
}

const DetailModal = ({ setModal, item }: IProps) => {
	const handleCloseModal = useCallback(() => {
		setModal((prev) => !prev);
	}, [setModal]);

	return (
		<Container>
			<button onClick={handleCloseModal}>닫기</button>
			<Content>
				<h2>연락처 상세 정보</h2>
				<div>
					<span>
						<strong>이름: </strong>
						{item.name}
					</span>
					<span>
						<strong>전화번호: </strong>
						{item.phoneNum}
					</span>
					<span>
						<strong>그룹: </strong>
						{item.group}
					</span>
					<span>
						<strong>메모: </strong>
						{item.note}
					</span>
				</div>
			</Content>
		</Container>
	);
};

export default DetailModal;

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
	aspect-ratio: 1/1;
	padding: 1rem;

	& > h2 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	& > div {
		display: flex;
		flex-direction: column;
	}
`;
