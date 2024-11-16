// Remove Splash screen
document.querySelector(".start-btn").onclick = () => {
document.querySelector(".start").remove();
document.getElementById("background-music").play();

// Run count down
setInterval(countDown, 1000);

};

// Remove Game over splash screen
let overlay = document.getElementById('overlay');
window.onload = () =>{
    overlay.style.display = "none";
    document.querySelector('.game-over').style.display = 'none';
    document.querySelector('.win').style.display = 'none';
}


//====================== Create Count Down Time ========================
function countDown() {
    
    const myCount = document.querySelector('.time');
    let counter = parseInt(myCount.innerText);
    counter--;

    if( counter >= 0 ) {
        myCount.innerText = counter;
    }

    if(counter === 0) {
        myCount.innerText = "time finshed";
        document.querySelector('.game-over').style.display = 'block';
        document.getElementById("background-music").remove();
    }

    if(counter <= 10) {
        myCount.style.color = "red";
    }
}

let blocksContainer = document.querySelector('.memory-game-blocks');

//make arrayfrom game blocks
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);


// =========================== Add Order Css Property To Game Blocks ==================
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    //Add click event
    block.addEventListener('click', function () {

        //Trigger the flip block function
        flipBlock(block);

    });

});

//========================== Flipp block function ===================================

function flipBlock(selectedBlock) {
    //Add class is-flipped
    selectedBlock.classList.add('is-flipped');

    //collect All flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //if there is two flipped blocks
    if(allFlippedBlocks.length === 2) {

        // stop clicking
        stopClicking();
        // check matched block
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

//========================== Stop clicking event ==========================

function stopClicking() {
    // add class no-clicking to main container
    blocksContainer.classList.add('no-clicking');

    // remove class no-clicking from main container
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, 1000);
}

// =================== Check Matched Block ===========================

function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries');
    let rightTries = document.querySelector('.matched');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        setTimeout(() => {

          firstBlock.classList.add("fade");
          secondBlock.classList.add("fade");
    
        }, 1000);
        
        rightTries.innerHTML = parseInt(rightTries.innerHTML) + 1;
        if(rightTries.innerHTML == 6) {
            document.querySelector('.win').style.display = "block";
            document.querySelector('.win-music').play();
            document.getElementById("background-music").remove();
            
        }

        // success sound
        document.getElementById('success').play();
    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        document.querySelector('.win-info').innerText = triesElement.innerHTML;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, 1000);
        
        // fail sound
        document.getElementById('fail').play();
    }
}

// ============================ Shuffle Function ==============================

function shuffle(array) {
    //Settings vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        //Get Random Number
        random = Math.floor(Math.random() * current);

        //Decreath Length
        current--;

        //1 Save Current Element on the stash

        temp = array[current];

        //2 current Element = Random Eement
        array[current] = array[random];

        //3 Random Element = Get Element from stash
        array[random] = temp;
    }
    return array;
}
