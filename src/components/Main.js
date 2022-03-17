import React, { Component } from "react";
import Form from './Form';
import Tarefas from './Tarefas';
import './Main.css';

export default class Main extends Component {

    state = {
      novaTarefa: '',
      concluidos: [],
      tarefas: [],
      index: -1
    };

    componentDidMount() {
      const tarefas = JSON.parse(localStorage.getItem('tarefas'));
      const concluidos = JSON.parse(localStorage.getItem('concluidos'));
      if(!tarefas) return;
      this.setState({ tarefas, concluidos });
    }

    componentDidUpdate(prevProps, prevState) {
      const { tarefas, concluidos } = this.state;

      if(tarefas === prevState.tarefas && concluidos === prevState.concluidos) return;

       localStorage.setItem('tarefas', JSON.stringify(tarefas));
       localStorage.setItem('concluidos', JSON.stringify( concluidos));
    }


    handleSubmit = (e) => {
      e.preventDefault();
      const { tarefas, index } = this.state;
      let { novaTarefa } = this.state;
      novaTarefa = novaTarefa.trim();

      if(tarefas.indexOf(novaTarefa) !== -1) return;

      const novasTarefas = [...tarefas];

      if(index === -1){
        this.setState({
          tarefas: [...novasTarefas, novaTarefa],
          novaTarefa:'',
        });
      } else{
        novasTarefas[index] = novaTarefa;
        this.setState({
          tarefas:[...novasTarefas],
          index: -1,
          novaTarefa:'',
        })
      }
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleEdit = (e, index) => {
    const { tarefas } =  this.state;
    this.setState({
      index,
      novaTarefa:tarefas[index],
    })
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];

    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    })
  }

  handleCheckbox = (e, index) => {
    const { concluidos } = this.state;
    const existe = concluidos.some(item => item === index);
    if(existe) {
      this.setState({
        concluidos: concluidos.filter(item => item !== index)
      });
    }else {
      this.setState({
        concluidos: [...concluidos, index]
      });
    }
  }

  render() {
    const { novaTarefa, tarefas, concluidos } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

      <Form
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        novaTarefa={novaTarefa}
      />

      <Tarefas
        concluidos={concluidos}
        handleCheckbox={this.handleCheckbox}
        tarefas={tarefas}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />


      </div>
    );
  }
}
