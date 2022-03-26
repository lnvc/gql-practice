const { DataSource } = require('apollo-datasource');

class TodosAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async createTodo({ name }) {
    try {
      // sequelize
      // const todos = await this.store.todos.findAll();
      // const todo = await this.store.todos.create({ name: name, checked: false });
      await this.store.query(`
        INSERT INTO todos
        (name, checked)
        VALUES ('${name}', FALSE);
      `);
      const todo = await this.store.query(`
        SELECT *
        FROM todos
        WHERE id = (
          SELECT MAX(id) FROM todos
        );
      `)
      return todo.rows;
    } catch (err) {
      console.error(err);
      return 'error';
    }
  }

  async getAllTodos() {
    try {
      const todos = await this.store.query(`
        SELECT *
        FROM todos;
      `);
      return todos.rows;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

module.exports = TodosAPI;
