import React from "react";
import "./table.css";

export interface TableProps {
	headers: string[];
	rows: React.ReactNode[][];
}

export default function TableComponent(params: TableProps) {
	return (
		<table>
			<thead>
				<tr>
					{params.headers.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{params.rows.map((row, index1) => (
					<tr key={index1}>
						{row.map((cell, index2) => (
							<td key={index1 + " " + index2}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}