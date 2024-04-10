import "./table.css";

export interface TableProps {
	headers: string[];
	rows: string[][];
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
				{params.rows.map((row) => (
					<tr key={JSON.stringify(row)}>
						{row.map((cell, index) => (
							<td key={JSON.stringify(row) + JSON.stringify(cell) + index}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}