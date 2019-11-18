var traySolution = require('../tray-solution.js');
var assert = require("assert");

describe('given test example', function(){
    it('should have final hoover position of (1,3) and final patch count of 1', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\nNNESEESWNWW";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 1);
        assert.equal(test.finalHooverPosition_Y, 3);
        assert.equal(test.finalPatchCount, 1);
    });
});

describe('invalid input', function(){
    it('should throw error for invalid room dimensions', function(){
        var data = "22\n0 1\n0 1\n1 1\n0 0\n1 0\nSENW";
        assert.throws(function(){ traySolution.main(data)}, Error);
    });
    it('should throw error for not having enough lines in data', function(){
        var data = "22";
        assert.throws(function(){ traySolution.main(data)}, Error);
    });
    it('should throw error for invalid hoover starting point', function(){
        var data = "2 2\n-1 1\n0 1\n1 1\n0 0\n1 0\nSENW";
        assert.throws(function(){ traySolution.main(data)}, Error);
    });
    it('ignores completely any letters that are not "N" "S" "W" "E"', function(){
        var data = "2 2\n0 1\n0 1\n1 1\n0 0\n1 0\nSENWMMMMMMMMMMM";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 0);
        assert.equal(test.finalHooverPosition_Y, 1);
        assert.equal(test.finalPatchCount, 4);
    });
    it('should throw error if initial hoover position is not in room', function(){
        var data = "1 1\n0 0\n5 5\n6 6\n7 7\nNWSE";
        assert.throws(function(){ traySolution.main(data)}, Error);
    });
    it('should throw error if any patch positions are not in room', function(){
        var data = "1 1\n1 2\n5 5\n6 6\n7 7\nNWSE";
        assert.throws(function(){ traySolution.main(data)}, Error);
    });
    it('should throw error if initial room size is 0', function(){
        var data = "0 0\n1 2\n5 5\n6 6\n7 7\nNWSE";
        assert.throws(function(){ traySolution.main(data)}, Error);
    });
});

describe('every single box is a patch', function(){
    it('should have final hoover position of (0,1) and final patch count of 4', function(){
        var data = "2 2\n0 1\n0 1\n1 1\n0 0\n1 0\nSENW";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 0);
        assert.equal(test.finalHooverPosition_Y, 1);
        assert.equal(test.finalPatchCount, 4);
    });
});


describe('hoover has no moves', function(){
    it('should have final hoover position of (1,2) and final patch count of 0', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\n";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 1);
        assert.equal(test.finalHooverPosition_Y, 2);
        assert.equal(test.finalPatchCount, 0);
    });
});

describe('hoover goes over patch area twice and should only count one patch', function(){
    it('should have final hoover position of (1,0) and final patch count of 1', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\nSSNSNSNS";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 1);
        assert.equal(test.finalHooverPosition_Y, 0);
        assert.equal(test.finalPatchCount, 1);
    });
});

describe('hoover goes into left wall', function(){
    it('should have final hoover position of (0,2) and final patch count of 0', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\nWWWWWWWWWWWW";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 0);
        assert.equal(test.finalHooverPosition_Y, 2);
        assert.equal(test.finalPatchCount, 0);
    });
});


describe('hoover goes into top wall', function(){
    it('should have final hoover position of (1,4) and final patch count of 0', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\nNNNNNNNNNN";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 1);
        assert.equal(test.finalHooverPosition_Y, 4);
        assert.equal(test.finalPatchCount, 0);
    });
});

describe('hoover goes into right wall', function(){
    it('should have final hoover position of (4,2) and final patch count of 1', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\nEEEEEEEEEE";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 4);
        assert.equal(test.finalHooverPosition_Y, 2);
        assert.equal(test.finalPatchCount, 1);
    });
});

describe('hoover starts with patch on same location', function(){
    it('should have final hoover position of (0,2) and final patch count of 1', function(){
        var data = "5 5\n1 2\n1 2\n2 2\n2 3\nW";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 0);
        assert.equal(test.finalHooverPosition_Y, 2);
        assert.equal(test.finalPatchCount, 1);
    });
});
describe('hoover goes into bottom wall', function(){
    it('should have final hoover position of (1,0) and final patch count of 1', function(){
        var data = "5 5\n1 2\n1 0\n2 2\n2 3\nSSSSSSSSS";
        var test = traySolution.main(data);
        assert.equal(test.finalHooverPosition_X, 1);
        assert.equal(test.finalHooverPosition_Y, 0);
        assert.equal(test.finalPatchCount, 1);
    });
});
