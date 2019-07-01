import React, {Component} from 'react'
export default class TaskItem extends Component{
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id)
    }
    render(){
        var {task, index} = this.props;
        return(
            <tr>
                <td>{ index + 1 }</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={ task.status === true ? 'badge badge-danger' : 'badge badge-success'}
                          onClick={this.onUpdateStatus}>
                            {task.status === true ? 'kích hoạt' : 'Ẩn'}
                            </span>
                </td>
                <td className="text-center">
                    <button type="button" 
                            className="btn btn-warning"
                            onClick={this.onUpdate}
                          >
                    Sửa
                    </button>
                    &nbsp;
                    <button type="button" 
                            className="btn btn-danger"
                            onClick={this.onDelete}>
                    Xóa
                    </button>
                </td>
            </tr>
        );
    }
}