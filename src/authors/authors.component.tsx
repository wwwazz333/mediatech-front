import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { AuthorObserver } from "../lib/authorObserver";
import { Author, authorSchema } from "../models/author";

export interface AuthorsProps {
}

export default function AuthorsComponent(parms: AuthorsProps) {
	const [authors, setAuthors] = useState<Author[] | null>(null);

	const updateData = useCallback((data: Author[]) => {
		setAuthors(data);
	}, []);

	useEffect(() => {
		AuthorObserver.getInstance().unsubscribe(updateData);
		AuthorObserver.getInstance().subscribe(updateData);
	}, []);
	return (
		<>
			{!authors && "loading..."}
			{authors &&
				<TableComponent headers={["Id", "Name"]}
					rows={z.array(authorSchema).parse(authors).map((author) =>
						[author.id?.toString() ?? "", author.name])} />
			}
		</>
	)
}