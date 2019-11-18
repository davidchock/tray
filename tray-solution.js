function main(data){
    var lines = data.trim().split("\n");
    if (lines.length < 3){
        throw Error("malformed input, need at least room size, hoover location, and directions in 3 different lines");
    }
    
    //Get and validate room dimensions
    var roomDimensions = lines[0].trim().split(" "); 
    validateLineForRoomDimensions(roomDimensions);

    var roomDimension_X = parseInt(roomDimensions[0]);
    var roomDimension_Y = parseInt(roomDimensions[1]);
    
    //Get and validate initial hoover position
    var hooverPosition = lines[1].trim().split(" ");
    validateLineForDimensions(hooverPosition);

    var hooverPosition_X = parseInt(hooverPosition[0]);
    var hooverPosition_Y = parseInt(hooverPosition[1]);

    validateDimensionsAreInsideRoom(hooverPosition_X, hooverPosition_Y, roomDimension_X, roomDimension_Y);
    
    // Create room matrix as 2D array
    var roomMatrix = new Array(roomDimension_X);
    for (var i = 0; i < roomDimension_X; i++){
        roomMatrix[i] = new Array(roomDimension_Y);
    }
    
    
    // Place patches of dirt as a "p"
    for (var i = 2; i < lines.length - 1; i++){
        //Get and validate patch position
        var patchPosition = lines[i].trim().split(" ");
        validateLineForDimensions(patchPosition);

        var patchPosition_X = parseInt(patchPosition[0]);
        var patchPosition_Y = parseInt(patchPosition[1]);
    
        validateDimensionsAreInsideRoom(patchPosition_X, patchPosition_Y, roomDimension_X, roomDimension_Y);
        roomMatrix[patchPosition_X][patchPosition_Y] = 'p';
    }
    
    var directions = lines[lines.length-1];
    var patchCount = 0;
    var currentHoover_X = hooverPosition_X;
    var currentHoover_Y = hooverPosition_Y;
    
    //check freebie if hoover start on patch
    if (roomMatrix[currentHoover_X][currentHoover_Y] == 'p'){
        patchCount += 1;
        roomMatrix[currentHoover_X][currentHoover_Y] = '';
    }
    
    //go through directions one by one
    for (var i = 0; i < directions.length; i++){
        switch(directions[i]){
            case 'N':
                currentHoover_Y = Math.min(currentHoover_Y+1, roomDimension_Y-1);
                break;
            case 'S':
                currentHoover_Y = Math.max(currentHoover_Y-1, 0);
                break;
            case 'E':
                currentHoover_X = Math.min(currentHoover_X+1, roomDimension_X-1);
                break;
            case 'W':
                currentHoover_X = Math.max(currentHoover_X-1, 0);
                break;
        }

        //count patch if hoover has gone over it
        if (roomMatrix[currentHoover_X][currentHoover_Y] == 'p'){
            patchCount += 1;
            roomMatrix[currentHoover_X][currentHoover_Y] = '';
        }
    }
    
    console.log(currentHoover_X + " " + currentHoover_Y);
    console.log(patchCount);

    // return for unit tests
    return {
        finalHooverPosition_X: currentHoover_X,
        finalHooverPosition_Y: currentHoover_Y,
        finalPatchCount: patchCount
    }
    
}

function validateDimensionsAreInsideRoom(dimension_X, dimension_Y, roomDimension_X, roomDimension_Y){
    if (dimension_X >= roomDimension_X && dimension_Y >= roomDimension_Y){
        throw Error("hoover or patch dimension not in room");
    }
}

function validateLineForRoomDimensions(patchPosition){
    validateLineForDimensions(patchPosition);
    if (patchPosition[0] == 0 || patchPosition[1] == 0){
        throw Error("room dimensions must be bigger than 0");
    }
}
function validateLineForDimensions(patchPosition){
    // validates that each dimension has two non negative numbers with a space in between
    if (patchPosition.length != 2 || isNaN(parseInt(patchPosition[0])) || isNaN(parseInt(patchPosition[1])) || parseInt(patchPosition[0]) < 0 || parseInt(patchPosition[1]) < 0){
        throw Error("invalid dimensions provided: "+ patchPosition[0] + " " + patchPosition[1]);
    }
};

module.exports = {
    main: main
};
