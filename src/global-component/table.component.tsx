
export interface TableProps {
	headers: string[];
	rows: string[][];
}

export default function TableComponent(params: TableProps) {

	return (
		<table>
			<header>
				<tr>
					{params.headers.map((header) => (
						<th>{header}</th>
					))}
				</tr>
			</header>
			<tbody>
				{params.rows.map((row) => (
					<tr>
						{row.map((cell) => (
							<td>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}