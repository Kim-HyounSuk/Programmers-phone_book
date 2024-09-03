import { LOCAL_STORAGE_PHONE_BOOK } from '@/Constants';
import { IData } from '@/types';
import { Dispatch, SetStateAction, useCallback } from 'react';
import Item from '@/components/common/Item';
import NonItem from '@/components/common/NonItem';

interface IProps {
	data: IData[];
	setData: Dispatch<SetStateAction<IData[]>>;
}

const List = ({ data, setData }: IProps) => {
	const onRemoveItem = useCallback(
		(id: number) => {
			setData((prev) => {
				const updated = prev.filter((item) => item.id !== id);
				localStorage.setItem(LOCAL_STORAGE_PHONE_BOOK, JSON.stringify(updated));

				return updated;
			});
		},
		[setData],
	);
	return (
		<div>
			{data.length > 0 ? (
				data.map((item) => (
					<Item key={item.id} item={item} onRemoveItem={onRemoveItem} />
				))
			) : (
				<NonItem />
			)}
		</div>
	);
};

export default List;
