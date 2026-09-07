import React from 'react';
import PlayerResultEnum from 'classes/enums/player-result-enum';

import Game from '../../classes/game';
import ISprite from '../../classes/interfaces/sprite';
import IAntRunProps from './interfaces/ant-run-props';
import IAntRunState from './interfaces/ant-run-state';
import GameStatusTop from '../game-status-top/game-status-top';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';

import './styles/ant-run.scss';

export default class AntRun extends React.Component<IAntRunProps, IAntRunState> {
	private SPRITE_BLOCKS_WIDTH: number = 41;
	private SPRITE_BLOCKS_HEIGHT: number = 30;
	private container: HTMLDivElement | null = null;

	constructor(props: IAntRunProps) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			containerMargin: 0,
			timerInterval: 0,
			game: new Game(this.props),
		};

		this.styleContainer = this.styleContainer.bind(this);
	}

	public override componentDidMount(): void {
		this.updatePlayerArea();
		window.addEventListener('resize', this.updatePlayerArea);
	}

	public override componentWillUnmount(): void {
		this.stopTimer();
		window.removeEventListener('resize', this.updatePlayerArea);
	}

	public override render() {
		return (
			<div
				className="ant-run-play-container"
				ref={(d) => {
					this.container = d;
				}}
				style={this.styleContainer()}
			>
				<div style={this.styleStatusTop()}>
					<GameStatusTop
						score={this.state.game.player.score}
						lives={this.state.game.player.lives}
					/>
				</div>

				{!this.state.game.isGameInPlay && (
					<InfoBoard
						gameOver={this.state.game.player.lives < 1}
						startGame={this.startGame}
						score={this.state.game.player.score}
						containerHeight={this.state.containerHeight}
					/>
				)}

				{this.state.game.isGameInPlay && (
					<div className="play-area">
						{this.state.game.sprites?.map((sprite: ISprite) => (
							<DrawSprite
								key={sprite.key}
								sprite={sprite}
								handleClick={this.handleClick}
								height={this.state.spriteHeight}
								width={this.state.spriteWidth}
								containerWidth={this.state.containerWidth}
							/>
						))}

						<DrawSprite
							sprite={this.state.game.player}
							handleClick={this.handleClickPlayer}
							height={this.state.spriteHeight}
							width={this.state.spriteWidth}
							containerWidth={this.state.containerWidth}
						/>
					</div>
				)}
			</div>
		);
	}

	private styleContainer = (): React.CSSProperties => ({
		maxWidth: `${this.state.containerHeight}px`,
		marginLeft: `${this.state.containerMargin}px`,
	});

	private styleStatusTop = (): React.CSSProperties => ({
		position: 'absolute',
		width: `100%`,
		maxWidth: `${this.state.containerHeight}px`,
	});

	private startGame = (): void => {
		const game = new Game(this.props);
		game.isGameInPlay = true;
		this.startTimer();
		this.setState(() => ({ game }));
		this.updatePlayerArea();
	};

	private updatePlayerArea = (): void => {
		const containerHeight = this.container ? this.container.getBoundingClientRect().height : 0;
		let containerWidth = this.container ? this.container.getBoundingClientRect().width : 0;
		const containerMargin = (window.innerWidth - containerHeight) / 2;
		if (containerWidth > containerHeight) containerWidth = containerHeight;
		const spriteWidth = containerWidth / this.SPRITE_BLOCKS_WIDTH;
		const spriteHeight = ((containerWidth / 100) * 85) / this.SPRITE_BLOCKS_HEIGHT;
		this.setState(() => ({
			spriteWidth,
			spriteHeight,
			containerWidth,
			containerHeight,
			containerMargin,
		}));
	};

	private startTimer = (): void => {
		const timerInterval = this.state.game.timerInterval;
		const timer = setInterval(this.myTimer, this.state.game.timerInterval);

		this.setState(() => ({ timer, timerInterval }));
	};

	private stopTimer = (): void => {
		clearInterval(this.state.timer);

		this.setState(() => ({ timer: undefined }));
	};

	private myTimer = (): void => {
		const game = this.state.game;
		game.handleTimer();
		this.handleTimerUpdates();

		this.setState(() => ({ game }));
		if (!this.state.game.isGameInPlay) this.stopTimer();
	};

	private handleTimerUpdates = (): void => {
		if (this.state.timerInterval === this.state.game.timerInterval) return;

		this.stopTimer();
		this.startTimer();
	};

	private handleClick = (sprite: ISprite): void => {
		const game = this.state.game;
		game.handleInput(PlayerResultEnum.MOVE, sprite);

		this.setState(() => ({ game }));
	};

	// The player sprite is drawn with the same component as the blocks, and that
	// component wants a click handler; clicking the ant itself does nothing.
	private handleClickPlayer = (_sprite: ISprite): void => {};
}
