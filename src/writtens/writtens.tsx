import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { Written, writtenSchema } from "../models/written";

export interface WrittensProps {
	writtens?: Written[] | null;
}

export default function WrittensComponent({ writtens }: WrittensProps) {

	return (
		<>
			{!writtens && "loading..."}
			{writtens &&
				<TableComponent headers={["IdBook", "IdAuthor", "Publication"]}
					rows={z.array(writtenSchema).parse(writtens).map((written) =>
						[written.idBook?.toString() ?? "", written.idAuthor?.toString() ?? "", written.publication.toDateString()]) as string[][]} />
			}
		</>
	)
}