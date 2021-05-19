// const {getAllTasks, deleteTask, createTask} = require('../../controllers');

const getSpy = jest.fn()
const postSpy = jest.fn()
const deleteSpy = jest.fn()


jest.doMock('express', ()=>{
 return {
   Router(){
     return{
       get:getSpy,
       post: postSpy,
       delete: deleteSpy
     }
   }

  }
});

describe('router', () => {

    require('../../router.js');
     
    test('should test GET all-tasks', () => {
        expect(getSpy).toHaveBeenCalledTimes(5)
  
    });
  //   test('should test POST createTask', () => {
  //     expect(spy).toHaveBeenNthCalledWith(5,'/createTask', createTask)

  // });
    
  //   test('should test DELETE deleteTask', () => {
  //     expect(spy).toHaveBeenNthCalledWith(8,'/deleteTask', deleteTask);
  
  //   });

    
  
    
  
   
  
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