class RwPoll extends HTMLElement {
    constructor() {
        super();
        this._attached = false;
        this._data = null;
        this._selected = null;

        // Elements
        this._$question = null;
        this._$answers = null;

        // Shadow Root
        this._root = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this._attached = true;
        // this.innerHTML = ---> This will not attach the HTML to the shadow root
        this._root.innerHTML = `
            <style>
                .selected {
                    color: green;
                }
            </style>
            <div class="rw-poll-container">
                <h3 id="question"></h3>
                <ul id="answers"></ul>
            </div>
        `;

        // this._$question = document.getElementById("question"); -> Won't be attached to the Shadow DOM
        this._$question = this._root.getElementById("question");
        // this._$answers = document.getElementById("answers");
        this._$answers = this._root.getElementById("answers");
        this._$answers.addEventListener("click", (event) => {
            this._$answers.querySelectorAll("li").forEach(($li, index) => {
                $li.classList.remove("selected");
                if ($li === event.target) {
                    this._selected = index;
                    $li.classList.add("selected");
                }
            });
        });
        this._render();
    }

    _render() {
        if (this._attached && this._data !== null) {
            this._$answers.innerHTML = "";
            this._$question.innerHTML = this._data.question;
            this._data.answers.forEach(answer => {
                const $li = document.createElement("li");
                $li.innerHTML = answer;
                this._$answers.appendChild($li);
            })
        }
    }

    set data(data) {
        if (this._data === data) return;
        this._data = data;
        this._render();
    }

    get data() {
        return this._data;
    }
}

window.customElements.define("rw-poll", RwPoll);