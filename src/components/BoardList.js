import React from 'react'; 
import 'App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

class BoardList extends React.Component {
  render() {
    console.log(this.props.member);
    return (
      <div onClick={this.props.onClick}>
        <Table>
          <TableBody>
            <TableRow hover>
              <TableCell component="th" scope="row">{this.props.member.name}</TableCell>
              <TableCell align="right">{this.props.member.rank}</TableCell>
              <TableCell align="right">{this.props.member.department}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default BoardList;