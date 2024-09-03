import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

interface IProps {
	state: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
	({ state, value, onChange, error }, ref) => {
		return (
			<Container>
				<div>
					<label htmlFor={state}>{state}</label>
					<input
						id={state}
						type="text"
						value={value}
						onChange={onChange}
						placeholder={state}
						ref={ref}
					/>
				</div>
				{error && <p>{error}</p>}
			</Container>
		);
	},
);

export default Input;

const Container = styled.div`
	& > div {
		display: flex;
		align-items: center;

		& > label {
			flex: 1;
			font-weight: 700;
		}

		& > input {
			flex: 2;
			padding: 0.25rem;
		}
	}

	& > p {
		color: red;
		font-size: 0.5rem;
		text-align: right;
	}
`;
