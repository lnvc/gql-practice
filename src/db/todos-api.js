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
      return {
        code: 200,
        message: 'success',
      };
    } catch (err) {
      console.error(err);
      return {
        code: 500,
        message: 'error',
      };
    }
  }

  async deleteTodo({ id }) {
    try {
      await this.store.query(`
        DELETE FROM todos
        WHERE id = ${id}
      `);

      const todos = await this.store.query(`
        SELECT * FROM todos;
      `);
      return {
        code: 200,
        message: 'success',
      };
    } catch (err) {
      console.error(err);
      return {
        code: 500,
        message: 'error',
      };
    }
  }

  async checkOrUncheck({ id }) {
    try {
      await this.store.query(`
        UPDATE todos
        SET checked = NOT checked
        WHERE id = ${id};
      `);

      return {
        code: 200,
        message: 'success',
      };
    } catch (err) {
      console.error(err);
      return {
        code: 500,
        message: 'error',
      };
    }
  }

  async getAllTodos() {
    try {
      const todos = await this.store.query(`
        SELECT *
        FROM todos
        ORDER BY id;
      `);
      return todos.rows;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

module.exports = TodosAPI;
