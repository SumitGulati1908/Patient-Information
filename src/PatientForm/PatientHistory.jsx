import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'dob', label: 'DOB', minWidth: 100 },
  { id: 'phone', label: 'Phone', minWidth: 170},
];

function createData(name, dob, phone) {
  return { name, dob, phone };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [rows,setRowsState] =React.useState([]);

  React.useEffect(()=>{
    const rowsData=[];
    props.pHistory && props.pHistory.map((item)=>{
        rowsData.push(createData(`${item.firstName} ${item.lastName}`, item.dob , item.phone))
    })
    setRowsState(rowsData);
  },[props.pHistory])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? rows.map((row) => {
              return (
                <TableRow tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              )
            }): <div style={{ textAlign:'center' }}>
            No Patient History Found.
        </div>}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
