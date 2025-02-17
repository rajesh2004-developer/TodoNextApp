const Todo = ({ index: id, deleteTodo, item, completeTodo }) => {
  console.log(item);
  const { description, isCompleted: complete, title, _id: mongoId } = item;

  return (
    <tr className="bg-white border-b border-gray-200">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${complete ? 'line-through' : ''}`}>{title}</td>
      <td className={`px-6 py-4 ${complete ? 'line-through' : ''}`}>
        {description}
      </td>
      <td className={`px-6 py-4 ${complete ? 'line-through' : ''}`}>
        {complete ? 'Completed' : 'Pending'}
      </td>
      <td className="px-6 py-4 flex gap-1">
        <button
          onClick={() => deleteTodo(mongoId)}
          className="text-white py-2 px-4 bg-red-500"
        >
          Delete
        </button>
        {complete ? (
          ''
        ) : (
          <button
            onClick={() => completeTodo(mongoId)}
            className="text-white py-2 px-4 bg-green-500"
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
