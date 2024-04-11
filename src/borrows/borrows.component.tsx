import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { Borrow, borrowSchema } from "../models/borrow";

export interface BorrowsProps {
	borrows?: Borrow[] | null;
}

export default function BorrowsComponent({ borrows }: BorrowsProps) {

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