'use client';

import Todo from '@/components/Todo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await axios('/api');
    setTodos(response.data.todos);
  };

  const deleteTodo = async (mongoId) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId,
      },
    });
    toast.success(response.data.msg);
    getTodos();
  };

  const completeTodo = async (mongoId) => {
    const response = await axios.put(
      '/api',
      {},
      {
        params: {
          mongoId,
        },
      }
    );
    toast.success(response.data.msg);
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  const changeHandler = (e) => {
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({
        title: '',
        description: '',
      });
      await getTodos();
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-start gap-2  w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          onChange={changeHandler}
          value={formData.title}
          type="text"
          name="title"
          placeholder="Enter task title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          onChange={changeHandler}
          value={formData.description}
          name="description"
          placeholder="Enter task Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Task
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 mx-auto w-[60%]">
        <table className="w-full text-sm mb-[100px] text-left rtl:text-right ">
          <thead className="text-xs  uppercase  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                SNO
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((item, index) => {
              return (
                <Todo
                  key={index}
                  deleteTodo={deleteTodo}
                  index={index}
                  item={item}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;
