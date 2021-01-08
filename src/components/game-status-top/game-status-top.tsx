import React, { FC } from 'react';
import { range } from 'lodash';

import IGameStatusTopProps from './interfaces/game-status-top-props';

import lives from '../../images/lives.png';

import './styles/game-status-top.scss';

const GameStatusTop: FC<IGameStatusTopProps> = (props: IGameStatusTopProps) => {
	return <div className="game-status-top">
		<div className="game-status-left">1-UP <span className="variable-text">{ props.score }</span></div>
		<div className="game-status-right">LIVES { props.lives > 0 && range(props.lives).map((livesIndex: number) => <img className="player-lives" key={ `lives-image-${ livesIndex }` } src={ lives } alt="lives" />) }</div>
	</div>
}

export default GameStatusTop;
