import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { User, userSchema } from "../models/user";

export interface UsersProps {
	users?: User[] | null;
}

export default function UsersComponent({ users }: UsersProps) {

	return (
		<>
			{!users && "loading..."}
			{users &&
				<TableComponent headers={["Id", "Name"]}
					rows={z.array(userSchema).parse(users).map((user) =>
						[user.id?.toString() ?? "", user.name]) as string[][]} />
			}
		</>
	)
}