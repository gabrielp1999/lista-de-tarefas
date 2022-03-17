import React from 'react';
import PropTypes from 'prop-types';
import './Tarefas.css'
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default function Tarefas({ tarefas, concluidos, handleEdit, handleDelete, handleCheckbox }) {

  return(
    <ul className="tarefas">
    {tarefas.map((tarefa, index) => (
      <li key={tarefa}>{tarefa}
        <span>
          <input 
            onChange={(e) => handleCheckbox(e, index)}
            checked={concluidos.some(item => item === index)}
            value="resultado"
            className='checkbox'
            type="checkbox"/>
          <FaEdit onClick={(e)=> handleEdit(e, index)} className="edit"/>
          <FaWindowClose onClick={(e)=> handleDelete(e, index)} className="delete"/>
        </span>
      </li>
    ))}
  </ul>
  )
}

Tarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
