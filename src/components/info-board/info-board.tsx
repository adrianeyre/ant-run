import React, { FC } from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import antRight1 from '../../images/ant-right1.png';
import antLeft1 from '../../images/ant-left1.png';

import './styles/info-board.scss';

const InfoBoard: FC<IInfoBoardProps> = (props: IInfoBoardProps) => {
	const styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ props.containerHeight }px`,
	})

	return <div className="info-board" style={ styleInfoBoard() }>
		<div className="info-board-header">
			<img src={ antRight1 } alt="player" />
			<span className="header-text">Ant Run</span>
			<img src={ antLeft1 } alt="player" />
		</div>

		{ props.gameOver && <div className="game-over-area">
			<div className="game-over-title">Game Over</div>
			<div className="game-over-text">You scored { props.score }, better luck next time!</div>
		</div> }

		<div className="info-board-instructions">
			<p>You must navigate the ant around the board using the paths. Falling into an empty block will kill your ant. Use the holes around the edges of the board to jump to the opposite block.</p>
		</div>

		<div className="button-area">
			<button type="button" onClick={ props.startGame }>Play Game</button>
		</div>
	</div>
}

export default InfoBoard;
