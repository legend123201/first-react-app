const TodoItem = (props) => {
  return (
    <div
      className={
        props.item.id === props.currentTodoID
          ? "todo-item bg-change"
          : "todo-item"
      }
      key={props.item.id}
    >
      <p className={props.item.status === "inactive" ? "line-through" : ""}>
        {props.item.value}
      </p>
      <button
        disabled={props.isUpdate}
        onClick={() => {
          props.onDoneTodo(props.item.id);
        }}
      >
        Done
      </button>
      <button
        disabled={props.isUpdate}
        onClick={() => {
          props.onDeleteTodo(props.item.id);
        }}
      >
        Delete
      </button>
      <button
        disabled={props.isUpdate}
        onClick={() => {
          props.onStartUpdateTodo(props.item.id);
        }}
      >
        Update
      </button>
    </div>
  );
};

export default TodoItem;
