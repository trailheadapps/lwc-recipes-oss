import { createElement } from 'lwc';
import TodoList from 'recipe/todoList';

const TODOS = [
    { id: 1, description: 'Explore recipes', priority: false },
    { id: 2, description: 'Install Ebikes sample app', priority: false },
    { id: 3, description: 'Something with high priority', priority: true }
];
const PRIORITY_TODO_INDEX = 2;

describe('recipe-todo-list', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders without any list items as default', () => {
        // Create initial element
        const element = createElement('recipe-todo-list', {
            is: TodoList
        });
        document.body.appendChild(element);

        // Query for rendered list items
        const listItemEls = element.shadowRoot.querySelectorAll('li');
        expect(listItemEls.length).toBe(0);
    });

    it('renders multiple list items', () => {
        const todosLength = TODOS.length;

        // Create initial element
        const element = createElement('recipe-todo-list', {
            is: TodoList
        });
        // Set public properties
        element.todos = TODOS;
        document.body.appendChild(element);

        // Query list items for initial values
        const listItemEls = element.shadowRoot.querySelectorAll('li');
        expect(listItemEls.length).toBe(todosLength);
    });

    it('renders the content of the first todo item', () => {
        // Create initial element
        const element = createElement('recipe-todo-list', {
            is: TodoList
        });
        // Set public properties
        element.todos = TODOS;
        document.body.appendChild(element);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Validate rendered output for first todo object
            const outputEls = element.shadowRoot.querySelectorAll('p');
            expect(outputEls[0].textContent).toBe(TODOS[0].description);
            const msg = `Priority: ${TODOS[0].priority}`;
            expect(outputEls[1].textContent).toBe(msg);
        });
    });

    it('filters priority items', () => {
        // Create initial element
        const element = createElement('recipe-todo-list', {
            is: TodoList
        });
        // Set public properties
        element.todos = TODOS;
        document.body.appendChild(element);

        // Click filter checkbox
        const inputEl = element.shadowRoot.querySelector('ui-input');
        inputEl.checked = true;
        inputEl.dispatchEvent(new CustomEvent('change'));

        // Validate that we only render items with priority
        return Promise.resolve().then(() => {
            const todoItemsEls = element.shadowRoot.querySelectorAll(
                '.todo-content'
            );
            expect(todoItemsEls.length).toBe(1);
            const todoDescriptionEl = element.shadowRoot.querySelector(
                '.todo-content > p'
            );
            expect(todoDescriptionEl.textContent).toBe(
                TODOS[PRIORITY_TODO_INDEX].description
            );
        });
    });
});
