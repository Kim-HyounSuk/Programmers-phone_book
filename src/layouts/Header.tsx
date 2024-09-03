import styled from '@emotion/styled';

const Header = () => {
	return (
		<Container>
			<h1>연락처 리스트</h1>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	width: 100%;

	& > h1 {
		font-size: 2rem;
		font-weight: 900;
		text-align: center;
	}
`;
