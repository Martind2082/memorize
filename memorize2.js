

//first screen
let visible = document.getElementById('visible');
//second screen with input boxes
let secret = document.getElementById('secret');
let button = document.querySelectorAll('button');

//divisor = number getting divided, determines amount of words in each group
let divisor = 0;




button.forEach(element => {
    //get divisor depending on difficulty mode
    element.onclick = function() {
        document.getElementById('goback').style.display = 'block';
        if (event.target.id === 'easy') {
            divisor = 5;
        }
        else if (event.target.id === 'medium') {
            divisor = 3;
        }
        else if (event.target.id === 'hard') {
            divisor = 2;
        }
        checkLength();
    }
});

function checkLength() {
    let input = document.getElementById('input').value;
    input = input.trim().split(' ');
    let length = input.length;
        if (length < divisor) {
            let div = document.createElement('div');
            div.classList.add('short');
            div.textContent = 'Input is too short';
            document.body.append(div);
            setTimeout(() => {
                div.remove();
            }, 6000);
        } else {
            clicked();
        }
}

document.getElementById('goback').addEventListener('click', () => {
    visible.style.display = 'block';
    secret.style.display = 'none';
})

function clicked() {
    //get user input
    let input = document.getElementById('input').value;
    visible.style.display = 'none';
    secret.style.display = 'flex'; //turns on second screen
    input = input.trim();
    input = input.split('');
    let regex = /[,;:]/;
    //removes , ; and : from user input
    let newinput = input.filter(value => {
        return regex.test(value) === false;
    });
    input = newinput.join('');

    let array = input.split(' '); //splits user input into words group
    let copy = input.split(' '); //this array will be modified with _____
    let length = array.length;
    let amount = Math.floor(length/divisor); //amount is number of groups



    let counter = 0;
    for (let i = 0; i < amount; i++) {
        let number = Math.floor(Math.random() * divisor); //selected removed word in each group
        number += counter;
        copy[number] = `<input class="check" type="text" id="${number}"></input> <span class="after" id="span${number}"></span> <span class="error" id="error${number}"></span>`;
        counter += divisor;
    }

    document.querySelector('#up').innerHTML = copy.join(' '); //loads in 2nd page ready for user input





    //after user finishes, this scores and corrects the user
    document.getElementById('finish').onclick = function() {
        let input = document.querySelectorAll('input');
        let span = document.querySelectorAll('span');
        
        let counter = 0; //counter keeps track of user's correct answers
        input.forEach(element => {
            if (element.value.toLowerCase().trim() === array[element.id].toLowerCase()) {
                document.getElementById(`span${element.id}`).innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png"></img>';
                document.getElementById(`span${element.id}`).background = 'transparent';
                document.getElementById(`${element.id}`).style.backgroundColor = '#42f55d';
                counter++;
                document.getElementById(`error${element.id}`).style.display = 'none';
            } else {
                document.getElementById(`span${element.id}`).innerHTML = '<img src="https://toppng.com/uploads/preview/red-x-in-circle-x-ico-11563249170jvl0jhe7df.png"></img>';
                document.getElementById(`span${element.id}`).background = 'transparent';
                document.getElementById(`${element.id}`).style.backgroundColor = '#f53b31';
                document.getElementById(`error${element.id}`).textContent = 'reveal answer';
                document.getElementById(`error${element.id}`).style.backgroundColor = 'gray';
                document.getElementById(`error${element.id}`).style.display = 'inline-block';
            }
        })

        //display score
        document.getElementById('score').style.display = 'block';
        document.getElementById('score').style.borderBottom = '2px solid #195e94';
        document.getElementById('score').textContent = `${counter} out of ${amount} correct`;

        //if correct amount = total amount of input boxes, then allow for play again
        if (counter === amount) {
            setTimeout(() => {
                document.getElementById('play').style.display = 'block';
                document.getElementById('goback').style.display = 'none';
            }, 800); 
        }

        //if user gets the answer wrong
        let error = document.querySelectorAll('.error');
        error.forEach(element => {
            element.onclick = function() {
                if (element.textContent === 'reveal answer') {
                    let num = event.target.id.slice(5);
                    element.innerHTML = array[num];
                } else {
                    element.textContent = 'reveal answer'
                }
            }
        })
    }


    //this function removes all the boxes ready for user to play again
    document.getElementById('play').onclick = function() {
        document.getElementById('score').style.display = 'none';
        visible.style.display = 'block';
        secret.style.display = 'none';
        let input = document.querySelectorAll('input');
        let span = document.querySelectorAll('span');
        let ol = document.querySelectorAll('ol');
        document.getElementById('play').style.display = 'none';

        input.forEach(element => {
            element.remove();
        });
        span.forEach(element => {
            element.remove();
        });
        ol.forEach(element => {
            element.remove();
        });
    }
}