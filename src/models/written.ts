import { z } from "zod";


export interface Written {
	idBook: number;
	idAuthor: number;
	publication: Date;
}


export const writtenSchema = z.object({
	idBook: z.number(),
	idAuthor: z.number(),
	publication: z.string().transform((str) => {
		return new Date(str)
	}).or(z.date())
})
