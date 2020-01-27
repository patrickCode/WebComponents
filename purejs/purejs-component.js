class MyComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                p {
                    color: red;
                }
            </style>
            <p>Web Component</p>
        `;
    }
}

window.customElements.define("my-component", MyComponent);