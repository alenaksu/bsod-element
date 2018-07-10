class BsodElement extends HTMLElement {
    static get is() {
        return 'bsod-element';
    }

    static get style() {
        const style = document.createElement('style');
        style.textContent = `
            .bsod {
                --priamry-color-dark: #061c43;
                --priamry-color: #093e9e;
            
                display: flex;
                text-align: center;
                z-index: 9999;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-family: 'Lucida Console', Monaco, monospace;
                font-size: 16px;
                background: radial-gradient(ellipse at center, #093e9e 0%, #061c43 100%);
                flex-direction: column;
            }
            
            .link {
                color: #fff;
            }
            .title {
                color: #061c43;
                background-color: #fff;
                font-size: 16px;
                line-height: 18px;
                display: inline;
                margin: 40px 0px;
                text-align: center;
            }
            .text {
                text-align: left;
                max-width: 720px;
                margin: 0 auto;
            }
            .cursor {
                animation: blink 1s infinite cubic-bezier(1, 0, 0, 1);
            }
            @keyframes blink {
                0% {
                    opacity: 1;
                }
                50% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        `;

        return style;
    }

    template({ title, message, filename, lineno }) {
        return `
            <div class="bsod">
                <h1 class="title">${title}</h1>
                <div class="text">
                    <p>
                        A fatal exception "${message}" has occurred at line
                        ${lineno} in "<a href="${filename}" target="_blank" class="link">${filename}</a>". 
                        The current application will be terminated.
                    </p>
                    <p>
                        * Press any key to terminate the current application. <br /> 
                        * Press F5 again to restart your Browser. You will lose any unsaved information in all applications.
                    </p>
                    <p>Press any key to continue
                        <span class="cursor">_</span>
                    </p>
                </div>
            </div>
        `;
    }

    get title() {
        return this.getAttribute('title') || 'Error';
    }

    set title(value) {
        if (value) {
            this.setAttribute('title', value);
        } else {
            this.this.removeAttribute('title');
        }
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(BsodElement.style);

        this.close = this.close.bind(this);
    }

    close() {
        let bsod = this.shadowRoot.querySelector('.bsod');
        if( bsod) this.shadowRoot.removeChild(bsod);

        window.document.removeEventListener('keypress', this.close);
    }

    handleError({ message, filename, lineno }) {
        const template = document.createElement('template');
        template.innerHTML = this.template({
            title: this.title,
            message,
            filename,
            lineno
        });

        this.close();

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );
        window.document.addEventListener('keypress', this.close)
    }

    connectedCallback() {
        window.addEventListener('error', this.handleError.bind(this));
    }
}
window.customElements.define(BsodElement.is, BsodElement);
