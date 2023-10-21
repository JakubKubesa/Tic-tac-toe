let move=0;
let CrossesArray = [];
let CirclesArray = [];
let arrayFor5Winnings = [5];
let clicked;
let tile;
let win = false;


window.onload = function() {
    setGame();
}


function setGame(){
    let i=0; 
    while(i < 100){
        tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
        i+=1;
    }    
    let resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
}



//setting reset for game
function resetGame() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    CrossesArray = [];
    CirclesArray = [];
    win = false;
    move = 0;

    document.getElementById("win").innerText = "";
    setGame();
}



function selectTile() {
    //validation against field overwriting
    let j=0;
    clicked = false;
    while(j < 50){
        if(CrossesArray[j] == this.id || CirclesArray[j] == this.id){
            clicked = true;
        }
        j+=1;
    }

    if (win) {
        console.log("Hra již skončila, nelze klikat na další políčka.");
        return;
    }
    
    //writing circles and crosses into board
    if(clicked == false){
        console.log(this);
        if(move % 2 == 0){
            this.innerHTML = '<img src="cross.png" height="48px" width="48px">';
            CrossesArray[CrossesArray.length] = this.id; 
        }else{
            this.innerHTML = '<img src="circle.png" height="48px" width="48px">'; 
            CirclesArray[CirclesArray.length] = this.id; 
        } 
        move = move + 1; 
    }

    CrossesArray = CrossesArray.map(str => parseInt(str, 10));
    CirclesArray = CirclesArray.map(str => parseInt(str, 10));

    // Kontrol win for crosses
    checkDiagonals(CrossesArray, 'X');
    checkRowsAndColumns(CrossesArray, 'X');

    // Kontrol win for circles
    checkDiagonals(CirclesArray, 'O');
    checkRowsAndColumns(CirclesArray, 'O');
}




//algorthm for checking rows and columns
function checkRowsAndColumns(array, symbol){
    for (let a = 0; a < array.length; a++) {    
        let countUD = 0, countLR = 0, FirstDigitA = 0, SecondDigitA = 0, FirstDigitB = 0, SecondDigitB = 0;
        let RowArray = Array(10).fill(null);
        let ColumnArray = Array(10).fill(null);

        FirstDigitA = Math.floor(array[a] / 10);
        SecondDigitA = array[a] % 10;
    
        for (let b = 0; b < array.length; b++) {
            FirstDigitB = Math.floor(array[b] / 10);
            SecondDigitB = array[b] % 10;
    
            //Counting on row
            if (array[a] <= array[b] + 4 && FirstDigitA === FirstDigitB && array[a] >= array[b] - 4) {
                RowArray[SecondDigitB] = array[b];
    
                for (let i = 0; i < 10; i++) {
                    if (RowArray[i] !== null) {
                        arrayFor5Winnings[countLR] = RowArray[i];
                        countLR++;
                        if (countLR >= 5) {
                            document.getElementById("win").innerText = symbol + " win";
                            win = true;
                            winArray(arrayFor5Winnings, symbol);
                            return;
                            
                        }
                    } else {
                        countLR = 0;
                        arrayFor5Winnings = Array(10).fill(null);
                    }
                }
            }
            //Counting in column;
            if (array[a] <= array[b] + 40 && array[a] >= array[b] - 40 && SecondDigitA === SecondDigitB) {
                ColumnArray[FirstDigitB] = array[b];
    
                for (let i = 0; i < 10; i++) {
                    if (ColumnArray[i] !== null) {
                        arrayFor5Winnings[countUD] = ColumnArray[i];
                        countUD++;
                        if (countUD >= 5) {
                            document.getElementById("win").innerText = symbol + " win";
                            win = true;
                            winArray(arrayFor5Winnings, symbol);
                            return;
                        }
                    } else {
                        countUD = 0;
                        arrayFor5Winnings = Array(10).fill(null);
                    }
                }
            }

        }
        RowArray = Array(10).fill(null);
        ColumnArray = Array(10).fill(null);
    }
}




//algorithm for diagonal
function checkDiagonals(array, symbol) {
    const rows = 10;
    const cols = 10;
    let arrayFor5Winnings = Array(10).fill(null);

    // Control diagonal \
    for (let i = 0; i < rows - 4; i++) {
        for (let j = 0; j < cols - 4; j++) {
            let winB = true;
            let count = 0;
            for (let k = 0; k < 5; k++) {
                const index = (i + k) * cols + j + k;
                arrayFor5Winnings[count] = index;
                if (!array.includes(index)) {
                    winB = false;
                    arrayFor5Winnings = Array(10).fill(null);
                    break;
                }
                count++;
            }
            if (winB) {
                win = true;
                document.getElementById("win").innerText = symbol + " win";
                winArray(arrayFor5Winnings, symbol);
            }
        }
    }

    // Control diagonal /
    for (let i = 0; i < rows - 4; i++) {
        for (let j = 4; j < cols; j++) {
            let winC = true;
            let count = 0;
            for (let k = 0; k < 5; k++) {
                const index = (i + k) * cols + j - k;
                arrayFor5Winnings[count] = index;
                if (!array.includes(index)) {
                    winC = false;
                    arrayFor5Winnings = Array(10).fill(null);
                    break;
                }
                count++;
            }
            if (winC) {
                win = true;
                document.getElementById("win").innerText = symbol + " win";
                winArray(arrayFor5Winnings, symbol);
            }
        }
    }
}




//function for five winning circles/crosses to change color
function winArray(array, symbol) {
    for (let i = 0; i < 5; i++) {
        const elementId = array[i];
        const element = document.getElementById(elementId);
        if (element) {
            if(symbol == 'O'){
                element.innerHTML = '<img src="circleWin.png" height="48px" width="48px">';
            }else{
                element.innerHTML = '<img src="crossWin.png" height="48px" width="48px">';
            }
            
        }
    }
}
