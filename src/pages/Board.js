import React from 'react';
import BoardList from '../components/BoardList';
import BoardInfo from '../components/BoardInfo';
import BoardCreate from '../components/BoardCreate';
import update from 'react-addons-update';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableHead } from '@material-ui/core';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKey: -1,
      keyword: '',

      memberData: [{
        name: 'Jake',
        rank: 'CEO',
        department: 'dd'
      }, {
        name: 'hansol',
        rank: 'SW Engineer',
        department: 'development'
      }, {
        name: 'aaa',
        rank: 'manager',
        department: 'dd'
      }, {
        name: 'bb',
        rank: 'SW Engineer',
        department: 'development'
      }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

  }

  componentWillMount() {
    const memberData = localStorage.memberData;
    if(memberData) {
      this.setState({
        memberData: JSON.parse(memberData)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevState.memberData) != JSON.stringify(this.state.memberData)) {
      localStorage.memberData = JSON.stringify(this.state.memberData);
    }
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleClick(key) {
    this.setState({
        selectedKey: key
    });
  }

  handleCreate(member) {
    this.setState({
      memberData: update(this.state.memberData, { $push: [member] })
    });
  }

  handleRemove() {
    if(this.state.selectedKey < 0) {
      return;
    }

    this.setState({
      memberData: update(this.state.memberData,
        { $splice: [[this.state.selectedKey, 1]] }
      ),
      selectedKey: -1
    });
  }

  handleEdit(name, rank, department) {
    this.setState({
      memberData: update(this.state.memberData,
        {
          [this.state.selectedKey]: {
              name: { $set: name },
              rank: { $set: rank },
              department: { $set: department }
          }
        }
      )
    });
  }

  render() {
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter(
        (member) => {
          return member.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
        }
      );
      return data.map((member, i) => {
        return (<BoardList
          member={member}
          key={i}
          onClick={() => this.handleClick(i)}/>);
      });
    };

    return(
      <div className="board-container">
        <div className="member-search">
          <input
            name="keyword"
            placeholder="Search"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
        </div>
        <BoardCreate
          onCreate={this.handleCreate}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col">name</TableCell>
              <TableCell align="right" scope="col">rank</TableCell>
              <TableCell align="right" scope="col">department</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {mapToComponents(this.state.memberData)}
        <BoardInfo
            isSelected={this.state.selectedKey !== -1}
            member={this.state.memberData[this.state.selectedKey]}
            onRemove={this.handleRemove}
            onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default Board;