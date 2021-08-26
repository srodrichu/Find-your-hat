const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let gameOn = false;

class Field {
  constructor(arr){
    this.arr = arr;
  }

  print(){
    const fieldHeight = this.arr.length;

    for (let i=0; i < fieldHeight; i++){
        console.log(this.arr[i].join(''))
      }
    }

  promptMove(){
    return prompt("What direction? ('wasd' controls): ")
  }

  newPosition(move, xP, yP){

    if (move === 'w'){
      yP -= 1;
    } else if (move === 'a'){
      xP -= 1;
    } else if (move === 's'){
      yP += 1;
    } else if (move === 'd'){
      xP += 1;
    }

    return [xP, yP];
  }

  checkWinLose(xP, yP){

    if (xP < 0 || xP >= this.arr[0].length || yP < 0 || yP >= this.arr.length) {
      console.log('You fell off the map! Game Over!')
      gameOn = false;
    } else if (this.arr[yP][xP] === hole){
      console.log('You fell into a hole! Game Over!');
      gameOn = false;
    } else if (this.arr[yP][xP] === hat){
      console.log('Congratulations! You have won the game!');
      gameOn = false;
    }
  }

  static generateField(fieldHeight, fieldLength, holePercentage){
    let arr = [];
    //const numHoles = Math.floor((fieldHeight * fieldLength) * (percentageOfHoles/100));

    for (let i = 0; i < fieldHeight; i++){
      let xArr = [];
      for (let j = 0;  j < fieldLength; j++){
        if (Math.random() * 100 < holePercentage){
          xArr.push(hole);
        }else{
          xArr.push(fieldCharacter);
        }
      }
      arr.push(xArr);
    }

    const num = fieldHeight * fieldLength;
    let hatPlace = Math.floor(Math.random() * num);
    
    while (hatPlace === 0){
      hatPlace = Math.floor(Math.random() * num);
    }

    const hatX = (hatPlace - 1) % fieldLength;
    const hatY = Math.floor((hatPlace - 1) / fieldLength);
    
    arr[hatY][hatX] = hat;
    return arr;
  }
  }

//const myField = new Field(Field.generateField(40, 20, 20));
//myField.print();

while (gameOn === false){
  let play = prompt("Would you like to start the game? 'y' or 'n'")

  if (play === 'y'){

      var fieldHeight = prompt('What height do you want the field to be?');
      var fieldLength = prompt('What width do you want the field to be?');
      var holePercentage = prompt('What percentage of the field do you want covered in holes?');
      gameOn = true;

  } else if (play === 'n'){
      gameOn = false;
  } else {
      console.log("Incorrect input. Please enter either 'y' or 'n'.")
  }
}

  if (gameOn === true){

    let arr = Field.generateField(fieldHeight, fieldLength, holePercentage)
    var newField = new Field(arr);

    newField.arr[0][0] = pathCharacter;
  }

let xP = 0;
let yP = 0;

  while (gameOn === true){

    newField.print();

    let move = newField.promptMove();

    xP = newField.newPosition(move, xP, yP)[0];

    yP = newField.newPosition(move, xP, yP)[1];

    console.log(xP, yP)

    newField.checkWinLose(xP, yP);
    newField.arr[yP][xP] = pathCharacter;

}

