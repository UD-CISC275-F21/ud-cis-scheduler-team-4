import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import React from 'react';

export const SemesterTable = (): JSX.Element => {
 
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>
						1st semester
					</th>
					<th>
						2nd semester
					</th>
					<th>
						3rd semester
					</th>
					<th>
						4th semester
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					this
				</tr>
				<tr>
					is
				</tr>
				<tr>
					a
				</tr>
				<tr>
					table
				</tr>
			</tbody>
			
		</Table>
	);

};
