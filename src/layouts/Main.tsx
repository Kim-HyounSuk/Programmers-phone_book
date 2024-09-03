import styled from '@emotion/styled';
import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => {
	return <Container>{children}</Container>;
};

export default Main;

const Container = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	gap: 1.5rem;
	padding: 0 1rem;
	margin-top: 4rem;
`;
