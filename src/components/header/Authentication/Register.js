import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
            <Button color="danger" onClick={this.toggle} style={{cursor: "pointer"}}>Sign up</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email"  placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">User Name</Label>
                        <Input type="username" name="username"  placeholder="User Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password"  placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input type="confirm" name="confirm" placeholder="Confirm Password" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Sign up</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}