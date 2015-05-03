var Q = require('q');
var _ = require('lodash');

exports.action = {
  name:                   'createTask',
  description:            'createTask',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {
      payload: {
          required: false
      }
  },

  run: function(api, data, next){
      'use strict';
    var error = null;

    api.log("Action: createTask - Action invoked!", "debug", {params: data.params});

      var parentTask, dependentTasks;

      //api.taskmanager.createTask("test", data.params.payload, "default")
      //    .then(function(task){
      //        api.log("Action: createTask - Task created successfully!", {task: task});
      //        data.response.task = task;
      //        next();
      //    }, function(err){
      //        api.log("Action: createTask - Error creating task!", "error" , err);
      //        next(err);
      //    });

      api.taskmanager.createTask("parent", {data: "parent"}, "default")
          .then(function(_parentTask){
              parentTask = _parentTask;
              return api.taskmanager.createTask("child1", {data: "child1"}, "default");
          })
          .then(function(_dependentTask){
              dependentTasks = [];
              dependentTasks.push(_dependentTask);
              return api.taskmanager.createTask("child2", {data: "child2"}, "default");
          })
          .then(function(_dependentTask){
              dependentTasks.push(_dependentTask);
              return Q.allSettled(_.map(dependentTasks, function(dependentTask){
                  return api.taskmanager.linkTask(parentTask, dependentTask, api.taskmanager.links.CHILD);
              }));
          })
          .then(function(result){
              data.response.result = result;
          })
          .catch(function(_error){
              api.log("Action: createTask - Task linking failed!", "error", _error);
             error = _error;
          })
          .finally(function(){
              next(error);
          })
  }
};