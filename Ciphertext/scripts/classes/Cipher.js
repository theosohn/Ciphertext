import {shuffle} from "../utils/shuffle.js";
import {randomInteger} from "../utils/randomInteger.js";

export class Cipher {
    static abc = 'abcdefghijklmnopqrstuvwxyz';
    static abcu = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static abcf = Cipher.abc + Cipher.abcu;

    constructor (phraseList, randomize, dictList, wrongList, lettersList) {
        this.num = phraseList.length;
        this.phraseList = phraseList;
        this.dictList = dictList;
        this.wrongList = wrongList;
        this.lettersList = lettersList;
        this.cipherList = [];

        //tweakable values
        const wrongPortion = 0.1;
        
        if (randomize) {
            for (let i = 0; i < this.num; i++) {
                this.dictList.push(Cipher.generateDict());
                this.wrongList.push(Cipher.generateWrong(this.phraseList[i], wrongPortion));
                this.lettersList.push(Cipher.generateLetters(this.wrongList[i], this.phraseList[i], this.dictList[i]));
            }
        }
        else {
            for (let i = 0; i < dictList.length; i++) {
                dictList[i] = dictList[i] + dictList[i].toUpperCase();
            }
        }
        for (let i = 0; i < this.num; i++) {
            this.cipherList.push(Cipher.generateCipher(this.phraseList[i], this.dictList[i], this.wrongList[i], this.lettersList[i]));
        }
    }

    static generateDict() {
        let dict = shuffle(Cipher.abc);
        return dict + dict.toUpperCase();
    }

    static generateWrong(phrase, wrongPortion) {
        let wrong = [];
        for (let i = 0; i < phrase.length*wrongPortion; i++) {
            let w = randomInteger(0, phrase.length);
            while (wrong.includes(w)) {
                w = randomInteger(0, phrase.length);
            }
            wrong.push(w);
        }
        return wrong;
    }

    static generateLetters(wrong, phrase, dict) {
        let letters = [];
        let letter = 'a';
        for (let i = 0; i < wrong.length; i++) {
            if (Cipher.abc.indexOf(phrase.charAt(wrong[i])) != -1) {
                letter = Cipher.abc.charAt(randomInteger(0, 26));
            }
            else {
                letter = Cipher.abcu.charAt(randomInteger(0, 26));
            }
            while (letter == dict.charAt(Cipher.abcf.indexOf(phrase.charAt(wrong[i])))) {
                if (Cipher.abc.indexOf(phrase.charAt(wrong[i])) != -1) {
                    letter = Cipher.abc.charAt(randomInteger(0, 26));
                }
                else {
                    letter = Cipher.abcu.charAt(randomInteger(0, 26));
                }
            }
            letters.push(letter);
        }
        return letters;
    }

    static generateCipher(phrase, dict, wrong, letters) {
        let cipher = '';
        for (let i = phrase.length-1; i >= 0; i--) {
            if (wrong.includes(i)) {
                cipher = letters.pop() + cipher;
            }
            else if (Cipher.abcf.indexOf(phrase.charAt(i)) != -1){
                cipher = dict.charAt(Cipher.abcf.indexOf(phrase.charAt(i))) + cipher;
            }
            else {
                cipher = phrase.charAt(i) + cipher;
                phrase = phrase.substring(0, i);
            }
        }
        return cipher;
    }
}