import { z } from "zod";

export interface Borrow {
	idBook: number;
	idUser: number;
	dateBorrow: Date;
}


export const borrowSchema = z.object({
	idBook: z.number(),
	idUser: z.number(),
	dateBorrow: z.string().transform((str) => {
		return new Date(str)
	}).or(z.date()),
})
