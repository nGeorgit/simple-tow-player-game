//##--------------------TO_DO-----------------##\\


rows = 8;        //8                                                   //rows in the talbe
collums = 18;   //18                                           //collums in the table
nodes = new Array();                                 //where every node(div) will be stored
maxPoint = 10                                       //at what score the game will end




if (window.innerHeight >= ((Math.floor(window.innerWidth / collums) * rows) + 116)) {
    nodeSize = Math.floor(window.innerWidth / collums)
} else {
    nodeSize = Math.floor((window.innerHeight - (116 + 1 * (rows * 2))) / rows)
}




function getRandomInt(max) {                    //get random
    return Math.floor(Math.random() * max);
}
 


for (let i = 0; i < rows; i++) {                    //we creat a list with all the nodes
    nodes[i] = new Array();
    for (let j =0; j < collums; j++) {       
        nodes[i][j] = new Array();
        nodes[i][j][0] = i + ',' + j;
        nodes[i][j][1] = 'DarkSeaGreen'
        nodes[i][j][2] = nodeSize + 'px'
    }
}



//Append the nodes at the DOM

    //loop through the nodes list
for (let i = 0; i < rows; i++) {    
    let divRow = document.createElement("DIV")           //create the row(div with class: 'container')
    divRow.className = 'container'                      //add a class 
    for (let j =0; j < collums; j++) {       
        let divCollume = document.createElement("DIV")   //create the collum(div with id: 'y,x' and class: 'node')
        divCollume.id = nodes[i][j][0];                 //add id
        divCollume.className = 'node'                  //add a class
        divRow.appendChild(divCollume)
    }
    document.body.appendChild(divRow); 
}



food = {                                           //the "food"
    pos : {                                        //it's position
        x : 9,
        y : 1
    },

    posCode : function() {                        //this function returns the position of the food
        return this.pos.y + "," + this.pos.x;},
    
    color : 'DarkSlateGrey',                   //it's color

    Spawn : function() {                         //spwan at a random location
        this.pos.x = getRandomInt(collums)
        this.pos.y = getRandomInt(rows)
    }
}








pl1 = {                                         //that is the "player2"
    pos : {                                     //position 
        x: Math.floor(collums / 2) + Math.floor(collums / 4),          //at the start set the pl1 right
        y: Math.floor(rows/2)
    },

    score : 0,
    
    posCode : function() {                        //this function returns the position of the player
        return this.pos.y + "," + this.pos.x;},   //in the form of "y,x" because thats how the ids of the divs are formed
    
    color : 'LightCoral',                   //the colore of the player(the box of his)
    
                                            //these functions move the pl1 

    moveRight : function() {                   //Right
        if (this.pos.x < collums - 1) {
            this.pos.x += 1;
        }
    },
    moveLeft : function() {                   //Left
        if (this.pos.x > 0) {
            this.pos.x -= 1;
        }
    },
    moveUp : function() {                    //Up
        if (this.pos.y > 0) {
            this.pos.y -= 1;
        }
    },
    moveDown : function() {                 //Down
        if (this.pos.y < rows - 1) {
            this.pos.y += 1;
        }
    }
}


pl2 = {                                         //that is the "player2"
    pos : {                                     //position 
        x: Math.floor(collums / 2) - Math.floor(collums / 4),         //at the start set the pl2 at the left   
        y: Math.floor(rows/2)
    },
    
    score : 0,

    posCode : function() {                        //this function returns the position of the player
        return this.pos.y + "," + this.pos.x;},   //in the form of "y,x" because thats how the ids of the divs are formed
    
    color : 'RoyalBlue',                   //the colore of the player(the box of his)
    
                                            //these functions move the pl1 

    moveRight : function() {                   //Right
        if (this.pos.x < collums - 1) {
            this.pos.x += 1;
        }
    },
    moveLeft : function() {                   //Left
        if (this.pos.x > 0) {
            this.pos.x -= 1;
        }
    },
    moveUp : function() {                    //Up
        if (this.pos.y > 0) {
            this.pos.y -= 1;
        }
    },
    moveDown : function() {                 //Down
        if (this.pos.y < rows - 1) {
            this.pos.y += 1;
        }
    }
}


function Draw() {              //this function Updates in a way the DOM

    if (!(pl1.score > maxPoint - 1 || pl2.score > maxPoint - 1)) {
        if (pl1.posCode() == food.posCode()) {         //if pl2 is in the same place as food respawn food and increse score
            food.Spawn()
            pl1.score += 1
        }else if (pl2.posCode() == food.posCode()) {         //if pl2 is in the same place as food respawn food and increse score
            food.Spawn()
            pl2.score += 1
        }
        for (let i = 0; i < nodes.length; i++) {            //this loop is going throu every node to updated it
            for (let j = 0; j < nodes[0].length; j++){
                let id = nodes[i][j][0]                  //the id of the node
                let div = document.getElementById(id)    //get the node from the DOM
                div.style.width = nodes[i][j][2]        //set size
                div.style.height = nodes[i][j][2]      //--//--


                if (pl1.posCode() == id) {          //if the player is in that node change the color
                    div.style.backgroundColor = pl1.color
                }else if (pl2.posCode() == id) {          //if the player is in that node change the color
                    div.style.backgroundColor = pl2.color
                } else if (food.posCode() == id) {
                    div.style.backgroundColor = food.color
                } else {
                    div.style.backgroundColor = nodes[i][j][1]      
                }
            }
        }
        document.getElementById('scorePl1').innerText = pl1.score
        document.getElementById('scorePl2').innerText = pl2.score
    }
    
    if (pl1.score == maxPoint) {
        document.getElementById("end").innerText = "Player 1 Won"
    } else if (pl2.score == maxPoint) {
        document.getElementById("end").innerText = "Player 2 Won"
    }
    


}






document.addEventListener('keydown', logKey);    //eventListener for key released

function logKey(e) {    
    
                                    //for player1(arrows)
    if (e.code == 'ArrowLeft') {               //if key released is Left Arrow move player left
        pl1.moveLeft()
        Draw()
    } else if (e.code == 'ArrowRight') {      //if key released is Right Arrow move player right
        pl1.moveRight()
        Draw()
    } else if (e.code == 'ArrowUp') {        //if key released is Up Arrow move player up
        pl1.moveUp()
        Draw()
    } else if (e.code == 'ArrowDown') {      //if key released is Down Arrow move player down
        pl1.moveDown()
        Draw()
    } else if (e.code == 'KeyA') {  //for player2(WASD)             //if key released is Left Arrow move player left
        pl2.moveLeft()
        Draw()
    } else if (e.code == 'KeyD') {      //if key released is Right Arrow move player right
        pl2.moveRight()
        Draw()
    } else if (e.code == 'KeyW') {        //if key released is Up Arrow move player up
        pl2.moveUp()
        Draw()
    } else if (e.code == 'KeyS') {      //if key released is Down Arrow move player down
        pl2.moveDown()
        Draw()
    } 
}




Draw()
