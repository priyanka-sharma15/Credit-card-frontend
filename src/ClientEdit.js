import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ClientEdit extends Component {

    emptyItem = {
        name: '',
        limit: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/cards/${this.props.match.params.id}`)).json();
            this.setState({item: client});
        }
    }

    
    handleChange(event) {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

async handleSubmit(event) {
    //alert((await this.validateCard(this.state.item.ccNumber)));

      
    event.preventDefault();
    const {item} = this.state;

    await fetch('/cards' + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/cards');
}

    render() {
        const {item} = this.state;
        const titleAdd = <h3>Credit Card system</h3>;
        const title = <h4>{item.id ? 'Edit ' : 'Add '}</h4>;

        return <div>
            <AppNavbar/>
            <Container>
                {titleAdd}
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange}  autoComplete="name"/>
                    </FormGroup>
                   
                    <FormGroup>
                        <Label for="ccNumber">Credit Card Number</Label>
                        <Input type="text" name="ccNumber" id="ccNumber" value={item.ccNumber || ''}
                               onChange={this.handleChange} autoComplete="limit"/>
                            
                    </FormGroup>
                    <FormGroup>
                        <Label for="limit">Limit</Label>
                        <Input type="text" name="limit" id="limit" value={item.limit || ''}
                               onChange={this.handleChange} autoComplete="limit"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/cards">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ClientEdit);