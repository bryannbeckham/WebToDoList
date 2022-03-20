import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import './index.css';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [
        {
          id: Math.floor(Math.random() * 100000),
          title: "Tugas Sejarah",
          todo: "Membuat Infografis masa penjajahan",
          status: false
        },
        {
          id: Math.floor(Math.random() * 100000),
          title: "Membuat CV",
          todo: "Mengirim CV ke PT. Shopee Indonesia untuk magang",
          status: false
        },
        
      ],
      id: "",
      title: "",
      todo: "",
      status: false,
      action: "",
      selectedItem: null,
      isModalOpen: false,
      filterTodos: [],
      search: ""
    }
    this.state.filterTodos = this.state.todos
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = (e) => {
    e.preventDefault()
    let tempTodos = this.state.todos

    if (this.state.action === "insert") {
      tempTodos.unshift({
        id: this.state.id,
        title: this.state.title,
        todo: this.state.todo,
        status: this.state.status
      })
    }
    else if (this.state.action === "update") {
      let index = tempTodos.indexOf(this.state.selectedItem)
      tempTodos[index].id = this.state.id
      tempTodos[index].title = this.state.title
      tempTodos[index].todo = this.state.todo
    }

    this.setState({
      todos: tempTodos,
      filterTodos: tempTodos,
      isModalOpen: false
    })
  }

  add = () => {
    this.setState({
      isModalOpen: true,
      id: Math.floor(Math.random() * 100000),
      title: "",
      todo: "",
      status: false,
      action: "insert"
    })
  }

  edit = (item) => {
    this.setState({
      isModalOpen: true,
      id: item.id,
      title: item.title,
      todo: item.todo,
      action: "update",
      selectedItem: item
    })
  }

  drop = (item) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
      let tempTodos = this.state.todos
      let index = tempTodos.indexOf(item)
      tempTodos.splice(index, 1)
      this.setState({
        todos: tempTodos, 
        filterTodos: tempTodos
      })
    }
  }

  check = (item) => {
    let tempTodos = this.state.todos
    let index = tempTodos.indexOf(item)
    if (tempTodos[index].status === false) {
      tempTodos[index].status = true
    }
    else if (tempTodos[index].status === true) {
      tempTodos[index].status = false
    }
    this.setState({
      todos: tempTodos
    })
  }

  all = () => {
    let tempTodos = this.state.todos
    this.setState({
      filterTodos: tempTodos
    })
  }
  completed = () => {
    let tempTodos = this.state.todos
    this.setState({
      filterTodos: tempTodos.filter(item => item.status === true)
    })
  }
  uncompleted = () => {
    let tempTodos = this.state.todos
    this.setState({
      filterTodos: tempTodos.filter(item => item.status === false)
    })
  }

  render() {
    return (
      <div className='bg'> 
      <div className='container  pt-5'>
        <div className="card  p-3">
          <div className="alert mb-2 m-1"><h1 className='text-center'>To Do List</h1></div>
          <Button variant="outline-dark mb-2 m-1" onClick={() => this.add()}>
            Add 
          </Button>{' '}
          <div className="d-flex justify-content-around">
            <Button variant="dark mb-3 w-100 m-1" name="all" onClick={this.all}>
              All
            </Button>{' '}
            <Button variant="success mb-3 w-100 m-1" name="completed" onClick={this.completed}>
            Complete
            </Button>{' '}
            <Button variant="danger mb-3 w-100 m-1" name="uncompleted" onClick={this.uncompleted}>
              Have Work
            </Button>{' '}
          </div>
          {this.state.filterTodos.map((item, index) => (
            <ul className="list-group list-group-horizontal rounded-5 bg-transparent m-1 mt-2" key={item.id}>
              <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 m-2 rounded-0 border-0 bg-transparent">
                <button className="btn btn-outline" onClick={() => this.check(item)}>
                  {item.status ? <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> : <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>}
                </button>
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 m-5 rounded-0 border-0 bg-transparent w-100">
                <div className="d-flex flex-row justify-content-start mb-1">
                  <h5>{item.title}</h5>
                </div>
                <div className="d-flex flex-row justify-content-start mb-1">
                  <p>{item.todo}</p>
                </div>
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 m-5 rounded-0 border-0 bg-transparent w-100">
                <div className="d-flex flex-row justify-content-end mb-1">
                  {/* <Edit onClick={() => this.edit(item)} fontSize="large" color="primary" /> */}
                  {/* <DeleteOutlined onClick={() => this.drop(item)} fontSize="large"  color="{{ color: pink[500] }}"/> */}
                </div>
              </li>
            </ul>
          ))}

          <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
            <Modal.Header className="bgm" closeButton>
              <Modal.Title>Todo List</Modal.Title>
            </Modal.Header>
            <Form onSubmit={e => this.handleSave(e)}>
              <Modal.Body >
                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>ID Todo</Form.Label>
                  <Form.Control type="text" name="id" placeholder="Todo's ID"
                    value={this.state.id} onChange={this.handleChange} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Judul Todo </Form.Label>
                  <Form.Control type="text" name="title" placeholder="enter a title todo..."
                    value={this.state.title} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="todo">
                  <Form.Label>Keterangan Todo</Form.Label>
                  <Form.Control type="text" name="todo" placeholder="enter a content todo..."
                    value={this.state.todo} onChange={this.handleChange} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer className="bgm">
                <Button variant="outline-dark" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="success" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div >
      </div>
    )
  }
}