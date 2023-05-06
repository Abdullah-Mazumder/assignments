// select dom elements
const allScoreContainer = document.getElementById("allScoreContainer");
const resetButton = document.getElementById("resetButton");
const addMatch = document.getElementById("addMatch");

// action types
const INCREMENT = "score/increment";
const DECREMENT = "score/decrement";
const RESET = "score/reset";
const ADDMATCH = "score/addMatch";

// action creators
const incrementByValue = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};

const decrementByValue = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};

// initial State
const initialState = [
  {
    id: Date.now() + Math.random() * Math.random(),
    initialScore: 0,
  },
];

// create score reducer function
const scoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT:
      return state.map((item) =>
        item.id == payload.id
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
        item.id == payload.id
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
  const state = store.getState();

  let html = "";

  state.map((item, index) => {
    html += `
    <div class="match">
          <div class="wrapper">
            <button class="lws-delete">
              <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="lws-matchName">Match ${index + 1}</h3>
          </div>
          <div class="inc-dec">
            <form class="incrementForm">
              <h4>Increment</h4>
              <input
                type="number"
                name="increment"
                class="lws-increment"
                id="inc"
                data-selector=${item.id}
              />
            </form>
            <form class="decrementForm">
              <h4>Decrement</h4>
              <input type="number" name="decrement" class="lws-decrement" data-selector=${
                item.id
              } />
            </form>
          </div>
          <div class="numbers">
            <h2 class="lws-singleResult">${item.initialScore}</h2>
          </div>
        </div>
    `;
  });

  allScoreContainer.innerHTML = html;
};

// update UI initially
render();

store.subscribe(render);

// listening event from increment and decrement fields with event delegation
allScoreContainer.addEventListener("keydown", function (event) {
  const targetInputField = event.target;
  const dataSelector = targetInputField.getAttribute("data-selector");

  if (targetInputField.name === "increment" && event.key === "Enter") {
    event.preventDefault();
    store.dispatch(
      incrementByValue({ id: dataSelector, value: event.target.value })
    );
    return;
  }

  if (targetInputField.name === "decrement" && event.key === "Enter") {
    event.preventDefault();
    store.dispatch(
      decrementByValue({ id: dataSelector, value: event.target.value })
    );
    return;
  }
});

// reset scores
resetButton.addEventListener("click", function () {
  store.dispatch({ type: RESET });
});

// add another match
addMatch.addEventListener("click", function () {
  store.dispatch({ type: ADDMATCH });
});
