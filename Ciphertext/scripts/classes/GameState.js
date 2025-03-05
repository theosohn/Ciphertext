import {Cipher} from "./Cipher.js";
import {arrayEquals} from "../utils/arrayEquals.js";
import readlineSync from 'readline-sync';

export class GameState {
    constructor (phraseList, randomize = true, dictList=[], wrongList=[], lettersList=[]) {
        this.c = new Cipher(phraseList, randomize, dictList, wrongList, lettersList);
        for (let i = 0; i < phraseList.length; i++) {
            GameState.round(this.c.phraseList[i], this.c.cipherList[i], this.c.dictList[i], this.c.wrongList[i]);
        }
    }

    static round(phrase, cipher, dict, wrong) {
        let attempt = [-1];
        while (!arrayEquals(attempt, wrong)) {
            console.log('The original string is: ' + phrase);
            console.log('The ciphertext string is: ' + cipher);
            console.log('The regular alphabet: ' + Cipher.abc);
            console.log('Corresponds to the cipher alphabet: ' + dict.substring(0,26));
            console.log();
            //console.log(wrong);
            attempt = [];
            while (true) {
                let index = readlineSync.question('Please enter the indices of the characters you believe are wrong (in any order, there might be nothing wrong!). To remove a number, type the same number again. When you are finished, type "done"');
                if (index.toLowerCase() == 'done') {
                    attempt.sort((a, b) => a - b);
                    break;
                }
                index = parseInt(index);
                if (attempt.includes(index)) {
                    attempt.splice(attempt.indexOf(index), 1);
                }
                else {
                    attempt.push(index);
                }
                console.log('This is your current list of indices: ' + attempt);
            }
            if (!arrayEquals(attempt, wrong)) {
                console.log('Sorry, that was incorrect, please try again!');
                attempt = [-1];
            }
        }
        console.log('Congratulations! You got that right!');
    }
}
