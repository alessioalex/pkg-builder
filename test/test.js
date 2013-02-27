var moduleBuilder = require('../index');

describe('module-builder', function() {

  describe('#parseJson(string)', function() {

    it('should return a valid json string', function() {
      var str, res;

      str = '{"a":1,"b":["t","d"],"c":{"e":1,"f":2}}';
      res = moduleBuilder.parseJson(str);

      Object.keys(res).should.eql(['a', 'b', 'c']);
    });

    it('should return an Error object when json invalid', function() {
      var str, res;

      str = '!@#';
      res = moduleBuilder.parseJson(str);

      res.should.be.an.instanceOf(Error);
    });

  });

  describe('#readIfExists(filePath, callback)', function() {

    it('should read file content', function(done) {
      moduleBuilder.readIfExists(__dirname + '/../package.json', function(err, content) {
        content.should.be.a('string');
        content.length.should.be.above(100);
        done();
      });
    });

    it('should throw an error when file does not exist', function(done) {
      moduleBuilder.readIfExists(__dirname + '/../sddfdfdfsdfsdfso.sdan', function(err, content) {
        err.should.be.an.instanceOf(Error);
        done();
      });
    });

  });

  describe('#getPackageDeps(filePath, callback)', function() {

    it('should return package.json dependencies', function(done) {
      moduleBuilder.getPackageDeps(__dirname + '/..', function(err, deps) {
        deps.should.have.property('debug');
        done();
      });
    });

  });

  describe('#getFormattedDeps(dependenciesObject)', function() {

    it('should format dependencies for cmd-line NPM usage', function() {
      var deps;

      deps = {
        express : '3.1.x',
        debug   : '*'
      };

      moduleBuilder.getFormattedDeps(deps).should.eql('express@3.1.x debug@*');
    });

  });

});
