// select dom elements
const allScoreContainer = document.getElementById("allScoreContainer");
const resetButton = document.getElementById("resetButton");
const addMatch = document.getElementById("addMatch");

// action types
const INCREMENT = "score/increment";
const DECREMENT = "score/decrement";
const RESET = "score/reset";
const ADDMATCH = "score/addMatch";

// initial State
const initialState = [
  {
    id: Date.now() + Math.random() * Math.random(),
    initialScore: 0,
  },
];

// create input element
const createInputEl = (className, inputName) => {
  const input = document.createElement("input");
  input.type = "number";
  input.name = inputName;
  input.classList.add(className);

  return input;
};

// create score reducer function
const scoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT:
      return state.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              initialScore:
                item.initialScore + +payload.value < 0
                  ? 0
                  : item.initialScore + +payload.value,
            }
          : item
      );

    case DECREMENT:
      return state.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              initialScore:
                item.initialScore - +payload.value < 0
                  ? 0
                  : item.initialScore - +payload.value,
            }
          : item
      );

    case RESET:
      const copiedState = [...state];
      copiedState.forEach((item) => (item.initialScore = 0));
      return copiedState;

    case ADDMATCH:
      return [
        ...state,
        {
          id: Date.now() + Math.random() * Math.random(),
          initialScore: 0,
        },
      ];

    default:
      return state;
  }
};

// create store
const store = Redux.createStore(scoreReducer);

const render = () => {
  allScoreContainer.innerHTML = "";
  const state = store.getState();

  state.map((item, index) => {
    const topEl = document.createElement("div");
    topEl.classList.add("match");

    topEl.innerHTML = `
    <div class="wrapper">
      <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${index + 1}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm">
        <h4>Increment</h4>
      </form>
      <form class="decrementForm">
        <h4>Decrement</h4>
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">${item.initialScore}</h2>
    </div>
    `;

    const incrementInput = createInputEl("lws-increment", "increment");
    topEl.querySelector(".incrementForm").append(incrementInput);
    incrementInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        store.dispatch({
          type: INCREMENT,
          payload: {
            id: item.id,
            value: event.target.value,
          },
        });
      }
    });

    const decrementInput = createInputEl("lws-decrement", "decrement");
    topEl.querySelector(".decrementForm").append(decrementInput);
    decrementInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        store.dispatch({
          type: DECREMENT,
          payload: {
            id: item.id,
            value: event.target.value,
          },
        });
      }
    });

    allScoreContainer.append(topEl);
  });
};

// update UI initially
render();

store.subscribe(render);

// reset scores
resetButton.addEventListener("click", function () {
  store.dispatch({ type: RESET });
});

// add another match
addMatch.addEventListener("click", function () {
  store.dispatch({ type: ADDMATCH });
});
