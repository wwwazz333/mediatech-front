import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { BorrowObserver } from "../lib/borrowObserver";
import { Borrow, borrowSchema } from "../models/borrow";

export interface BorrowsProps {
}

export default function BorrowsComponent(params: BorrowsProps) {
	const [borrows, setBorrows] = useState<Borrow[] | null>(null);

	const updateData = useCallback((data: Borrow[]) => {
		setBorrows(data);
	}, []);

	useEffect(() => {
		BorrowObserver.getInstance().unsubscribe(updateData);
		BorrowObserver.getInstance().subscribe(updateData);
	}, []);
	return (
		<>
			{!borrows && "loading..."}
			{borrows &&
				<TableComponent headers={["IdBook", "IdUser", "DateBorrow"]}
					rows={z.array(borrowSchema).parse(borrows).map((borrow) =>
						[borrow.idBook?.toString() ?? "", borrow.idUser?.toString() ?? "", borrow.dateBorrow.toDateString()])} />
			}
		</>
	)
}