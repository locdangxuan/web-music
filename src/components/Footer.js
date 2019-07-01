import React, {Component} from 'react';
import './Body.css';
import TaskForm from './footer/TaskForm'
import Control from './footer/Control'
import TaskList from './footer/TaskList'
// import { Container, Row, Col } from 'reactstrap';

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            isDisplayedForm: false,
            taskEditing: null
        }
    }

    // onGenerateData = () => {
    //     var tasksToDo = [
    //         {
    //             id : this.generateId(),
    //             name : 'học',
    //             status: false
    //         },
    //         {
    //             id : this.generateId(),
    //             name : 'ngủ',
    //             status: false
    //         },
    //         {
    //             id : this.generateId(),
    //             name : 'bơii',
    //             status: true
    //         },
    //     ];
    //     this.setState({
    //         tasks: tasksToDo
    //     })
    //     localStorage.setItem('tasks', JSON.stringify(tasksToDo));
    // }

    s4(){
        return Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1);
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasksWillMount = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasksWillMount
            })
        }
    }
    generateId(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() 
            + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4()
    }

    onToggleForm = () => {
        this.setState({
            isDisplayedForm: !this.state.isDisplayedForm,
        });
    }

    onCloseForm = () => {
        this.setState({
            isDisplayedForm: !this.state.isDisplayedForm,
        });
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        data.id = this.generateId();
        tasks.push(data);
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var index =  this.findIndex(id);
        // console.log(index);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditings = tasks[index]
        console.log(this.state.taskEditing)
    }

    findIndex = (id) => {
        var {tasks}  = this.state;
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id === id){
                result =  index;
            }
        });
        return result;
    }

    render(){
        var { tasks, isDisplayedForm } = this.state; // var tasks = this.state.tasks
        var elementTaskForm = isDisplayedForm 
                            ? <TaskForm onSubmit = {this.onSubmit} onCloseForm={this.onCloseForm}/> 
                            : '';
        return(
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisplayedForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" 
                                                    : "" }>
                        {elementTaskForm}
                    </div>
                    <div className={isDisplayedForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" 
                                                    : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick = {this.onToggleForm}>
                            Thêm Công Việc
                        </button>
                        {/* <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.onGenerateData} 
                            style = {{marginLeft: '20px'}}>
                            Generate Data
                        </button> */}
                        <div className="row mt-15" style = {{marginTop: '20px'}}>
                            <Control/>
                        </div>
                        <div className="row mt-15" style = {{marginTop: '20px'}}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks={tasks} 
                                          onUpdateStatus={this.onUpdateStatus}
                                          onDelete={this.onDelete}
                                          onUpdate={this.onUpdate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;