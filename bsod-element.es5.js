var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BsodElement = /** @class */ (function (_super) {
    __extends(BsodElement, _super);
    function BsodElement() {
        var _this = _super.call(this) || this;
        var shadowRoot = _this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(BsodElement.style);
        _this.close = _this.close.bind(_this);
        return _this;
    }
    Object.defineProperty(BsodElement, "is", {
        get: function () {
            return 'bsod-element';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsodElement, "style", {
        get: function () {
            var style = document.createElement('style');
            style.textContent = "\n            .bsod {\n                display: flex;\n                text-align: center;\n                z-index: 9999;\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100vw;\n                height: 100vh;\n                align-items: center;\n                justify-content: center;\n                color: #fff;\n                font-family: 'Lucida Console', Monaco, monospace;\n                font-size: 16px;\n                background: radial-gradient(ellipse at center, #093e9e 0%, #061c43 100%);\n                flex-direction: column;\n            }\n            \n            .link {\n                color: #fff;\n            }\n            .title {\n                color: #061c43;\n                background-color: #fff;\n                font-size: 16px;\n                line-height: 18px;\n                display: inline;\n                margin: 0 0 40px;\n                text-align: center;\n            }\n            .text {\n                text-align: left;\n                max-width: 720px;\n                margin: 0 auto;\n            }\n            .cursor {\n                animation: blink 1s infinite cubic-bezier(1, 0, 0, 1);\n            }\n            @keyframes blink {\n                0% {\n                    opacity: 1;\n                }\n                50% {\n                    opacity: 0;\n                }\n                100% {\n                    opacity: 1;\n                }\n            }\n        ";
            return style;
        },
        enumerable: true,
        configurable: true
    });
    BsodElement.prototype.template = function (_a) {
        var title = _a.title, message = _a.message, filename = _a.filename, lineno = _a.lineno;
        return "\n            <div class=\"bsod\">\n                <h1 class=\"title\">" + title + "</h1>\n                <div class=\"text\">\n                    <p>\n                        A fatal exception \"" + message + "\" has occurred at line\n                        " + lineno + " in \"<a href=\"" + filename + "\" target=\"_blank\" class=\"link\">" + filename + "</a>\". \n                        The current application will be terminated.\n                    </p>\n                    <p>\n                        * Press any key to terminate the current application. <br /> \n                        * Press F5 again to restart your Browser. You will lose any unsaved information in all applications.\n                    </p>\n                    <p>Press any key to continue\n                        <span class=\"cursor\">_</span>\n                    </p>\n                </div>\n            </div>\n        ";
    };
    Object.defineProperty(BsodElement.prototype, "title", {
        get: function () {
            return this.getAttribute('title') || 'Error';
        },
        set: function (value) {
            if (value) {
                this.setAttribute('title', value);
            }
            else {
                this["this"].removeAttribute('title');
            }
        },
        enumerable: true,
        configurable: true
    });
    BsodElement.prototype.close = function () {
        var bsod = this.shadowRoot.querySelector('.bsod');
        if (bsod)
            this.shadowRoot.removeChild(bsod);
        window.document.removeEventListener('keypress', this.close);
    };
    BsodElement.prototype.handleError = function (_a) {
        var message = _a.message, filename = _a.filename, lineno = _a.lineno;
        var template = document.createElement('template');
        template.innerHTML = this.template({
            title: this.title,
            message: message,
            filename: filename,
            lineno: lineno
        });
        this.close();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        window.document.addEventListener('keypress', this.close);
    };
    BsodElement.prototype.connectedCallback = function () {
        window.addEventListener('error', this.handleError.bind(this));
    };
    return BsodElement;
}(HTMLElement));
window.customElements.define(BsodElement.is, BsodElement);
