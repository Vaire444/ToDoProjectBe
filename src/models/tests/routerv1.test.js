const {
  getAllTasks,
  deleteTask,
  createTask,
  getTodoTasks,
  getDoneTasks,
  moveTask,
  downloadFile,
  getTasksByName,
  deleteDoneTask,
  deleteTodoTask,
} = require("../../controllers");

const spy = jest.fn();

jest.doMock("express", () => {
  return {
    Router() {
      return {
        get: spy,
        post: spy,
        delete: spy,
      };
    },
  };
});

describe("router", () => {
  require("../../router.js");
  test("should test GET todo-tasks", () => {
    expect(spy).toHaveBeenNthCalledWith(1, "/todo-tasks", getTodoTasks);
  });
  test("should test GET done-tasks", () => {
    expect(spy).toHaveBeenNthCalledWith(2, "/done-tasks", getDoneTasks);
  });
  test("should test GET all-tasks", () => {
    expect(spy).toHaveBeenNthCalledWith(3, "/all-tasks", getAllTasks);
  });
  test("should test GET move task", () => {
    expect(spy).toHaveBeenNthCalledWith(4, "/moveTask/:id/:toTask", moveTask);
  });
  test("should test POST createTask", () => {
    expect(spy).toHaveBeenNthCalledWith(5, "/createTask", createTask);
  });
  test("should test DELETE Done Task", () => {
    expect(spy).toHaveBeenNthCalledWith(6, "/:id/:toTask", deleteDoneTask);
  });
  test("should test DELETE Todo Task", () => {
    expect(spy).toHaveBeenNthCalledWith(7, "/:id/:toTask", deleteTodoTask);
  });
  test("should test DELETE deleteTask", () => {
    expect(spy).toHaveBeenNthCalledWith(8, "/deleteTask", deleteTask);
  });
  test("should test GET Tasks By Name", () => {
    expect(spy).toHaveBeenNthCalledWith(
      9,
      "/getTasksByName/:userName",
      getTasksByName
    );
  });
  test("should test POST downloadFile", () => {
    expect(spy).toHaveBeenNthCalledWith(10, "/downloadFile", downloadFile);
  });
  test("should test GET all-tasks", () => {
    expect(spy).toHaveBeenCalledTimes(10);
  });

  //   test('should use moveTask controller when "/moveTask/:id/:toTask" is triggered', () => {

  //     // expect here

  //   });

  //   test('should use createTask controller when "/createTask" is triggered', () => {

  //     // expect here

  //   });

  //   test('should call post method 1 time', () => {

  //     // expect here

  //   });

  //   test('should call get method 3 times', () => {

  //     // expect here

  //   });
});
