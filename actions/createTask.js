exports.action = {
  name:                   'createTask',
  description:            'createTask',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {},

  run: function(api, data, next){
    var error = null;

    api.log("Action: createTask - Action invoked!", {data: data});
      api.taskmanager.createTask("test", data, "default")
          .then(function(task){
              api.log("Action: createTask - Task created successfully!", {task: task});
              next();
          }, function(err){
              api.log("Action: createTask - Error creating task!", "error" , err);
              next(err);
          });
  }
};