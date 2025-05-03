// src/App.js
import { useStore } from "./store";
import "./App.css";

const styles = {
  container: {
    width: "40%",
    margin: "0 auto",
    background: "#ecf0f1",
    borderRadius: "4px",
  },
  item_done: {
    textDecoration: "line-through",
    color: "gray",
    fontStyle: "italic",
  },
};

function Header({ count }) {
  return (
    <div className="p-4">
      <h1>Todos</h1>
      <p>{count}</p>
    </div>
  );
}

function Footer({ archive, filter, isVisible }) {
  return (
    <div
      className="d-flex justify-content-between p-2"
      style={{ background: "#bdc3c7" }}
    >
      <form
        className="d-flex justify-content-start align-self-center"
        style={{ height: "auto" }}
        onChange={(e) => filter(e.target.value)}
      >
        <input
          className="form-check-input"
          value="all"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault1"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          &nbsp; all &nbsp;
        </label>

        <input
          className="form-check-input"
          value="active"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault2"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          &nbsp; active &nbsp;
        </label>

        <input
          className="form-check-input"
          value="completed"
          type="radio"
          name="radioFilter"
          id="flexRadioDefault3"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
          &nbsp; completed &nbsp;
        </label>
      </form>
      <button
        onClick={archive}
        className="btn btn-sm btn-danger"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        clear completed
      </button>
    </div>
  );
}

function App() {
  const items = useStore((state) => state.items);
  const filter = useStore((state) => state.filter);
  const input = useStore((state) => state.input);
  const addTask = useStore((state) => state.addTask);
  const toggleTask = useStore((state) => state.toggleTask);
  const archiveTasks = useStore((state) => state.archiveTasks);
  const setFilter = useStore((state) => state.setFilter);
  const setInput = useStore((state) => state.setInput);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input) return false;
    addTask(input);
  };

  const isVisible = items.some((item) => item.done);

  const allItems = items.filter((item) =>
    filter === "completed"
      ? item.done
      : filter === "active"
        ? !item.done
        : true
  );

  const count = items.length > 1 ? `${items.length} items` : `${items.length} item`;

  return (
    <div className="mt-5" style={styles.container}>
      <Header count={count} />
      <form onSubmit={onSubmit} className="mb-4 px-4">
        <input
          className="form-control mb-4"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <ul className="px-5">
        {allItems.map((item) => (
          <li
            key={item.id}
            style={item.done ? styles.item_done : {}}
            onClick={() => toggleTask(item.id)}
          >
            {item.task}
          </li>
        ))}
      </ul>
      <Footer archive={archiveTasks} filter={setFilter} isVisible={isVisible} />
    </div>
  );
}

export default App;
