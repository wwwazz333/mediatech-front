import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { writtenObserver } from "../lib/writtenObserver";
import { Written, writtenSchema } from "../models/written";

export interface WrittensProps {
}

export default function WrittensComponent(params: WrittensProps) {
	const [writtens, setWrittens] = useState<Written[] | null>(null);

	const updateData = useCallback((data: Written[]) => {
		setWrittens(data);
	}, []);

	useEffect(() => {
		writtenObserver.getInstance().unsubscribe(updateData);
		writtenObserver.getInstance().subscribe(updateData);
	}, []);
	return (
		<>
			{!writtens && "loading..."}
			{writtens &&
				<TableComponent headers={["IdBook", "IdAuthor", "Publication"]}
					rows={z.array(writtenSchema).parse(writtens).map((written) =>
						[written.idBook?.toString() ?? "", written.idAuthor?.toString() ?? "", written.publication.toDateString()])} />
			}
		</>
	)
}