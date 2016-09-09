class paramsRoute {
  constructor() {
    this.handleMap = {};
  }

  add(param, handle) {
    (this.handleMap)[param] = handle;
    return this;
  }

  route() {
    return (req, res, next) => {
      Object.keys(this.handleMap)
        .map(key => {
          const paramPattern = key.split('=');
          return {
            name: paramPattern[0],
            value: paramPattern.length > 1 ? paramPattern[1] : null,
            handle: (this.handleMap)[key],
          };
        })
        .forEach(param => {
          const isExist = param.name in (req.query);
          if (!isExist) return;

          const value = (req.query)[param.name];
          if (param.value != null && param.value !== value) return;

          param.handle(req, res, next);
        });
    };
  }

}

export default paramsRoute;