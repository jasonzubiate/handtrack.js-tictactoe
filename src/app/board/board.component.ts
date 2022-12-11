import { Component, Input } from "@angular/core";
import { read } from "fs";
import { PredictionEvent } from "../prediction-event";

@Component({
	selector: "app-board",
	templateUrl: "./board.component.html",
	styleUrls: ["./board.component.css"],
})
export class BoardComponent {
	squares: any[];
	userTurn: boolean;
	winner: any;
	gesture: String = "";

	ngOnInit() {
		this.newGame();
	}

	async prediction(event: PredictionEvent) {
		this.gesture = event.getPrediction();
		this.readMove();
		await new Promise(resolve => setTimeout(resolve, 3000))
	}

	newGame() {
		this.squares = [
			"Two Open Hands",
			"Open Hand",
			"Two Closed Hands",
			"Closed Hand",
			"Two Hands Pointing",
			"Hand Pointing",
			"Hand Pinching",
			"One Open Hand One Closed Hand",
			"One Open Hand One Hand Pointing"
		];
		this.winner = null;
		this.userTurn = true;
	}

	get player() {
		return this.userTurn ? "X" : "O";
	}

	// fills a square after reading the gesture of the prediction funciton
	readMove() {
		const squareIndex = this.squares.findIndex((square)=> square === this.gesture)
		if (!(squareIndex==-1)) {
			this.squares.splice(squareIndex,1,this.player)
			this.userTurn = !this.userTurn;
		}
		this.winner = this.calculateWinner();
	}

	// still allows the user to click the tile and will update to the board
	makeMove(index: number) {
		const tile: string = this.squares[index];
		if (tile.includes("Hand")) {
			this.squares.splice(index, 1, this.player);
			this.userTurn = !this.userTurn;
		}
		this.winner = this.calculateWinner();
	}

	calculateWinner() {
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let line = 0; line < winningLines.length; line++) {
			const [a, b, c] = winningLines[line];
			if (
				this.squares[a] &&
				this.squares[a] === this.squares[b] &&
				this.squares[a] === this.squares[c]
			) {
				return this.squares[a];
			}
		}
		return null;
	}
}
