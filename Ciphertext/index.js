import {GameState} from "./scripts/classes/GameState.js";

const phraseList = ['This is an example cipher, to test the task idea! What do you think?', 'The quick brown fox jumps over lazy dogs.'];
const dictList = ['yplxmwvsfzrqonkjihagteducb', 'yplxmwvsfzrqonkjihagteducb'];
const wrongList = [[5, 15], [0, 5]];
const lettersList = [['g', 'q'], ['X', 'l']];

const g = new GameState(phraseList, false, dictList, wrongList, lettersList);