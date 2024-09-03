import styled from '@emotion/styled';

const NonItem = () => {
	return (
		<Container>
			<i className="fa-regular fa-clipboard"></i>
			<span>등록된 번호가 없습니다.</span>
		</Container>
	);
};

export default NonItem;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
