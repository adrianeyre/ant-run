import React from 'react';
import { range } from 'lodash';

import IGameStatusTopProps from './interfaces/game-status-top-props';

import lives from '../../images/lives.png';

import './styles/game-status-top.scss';

export default class GameStatusTop extends React.Component<IGameStatusTopProps, {}> {

	public render() {
		return <div className="game-status-top">
			<div className="game-status-left">1-UP <span className="variable-text">{ this.props.score }</span></div>
			<div className="game-status-right">LIVES { this.props.lives > 0 && range(this.props.lives).map((livesIndex: number) => <img className="player-lives" key={ `lives-image-${ livesIndex }` } src={ lives } alt="lives" />) }</div>
		</div>
	}
}
