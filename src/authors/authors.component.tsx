import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { Author, authorSchema } from "../models/author";

export interface AuthorsProps {
	authors?: Author[] | null;
}

export default function AuthorsComponent({ authors }: AuthorsProps) {

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