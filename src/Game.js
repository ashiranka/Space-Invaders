import { Scene, Entity } from 'aframe-react'
import 'aframe-look-at-component'
import 'aframe-event-set-component'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'aframe-effects'

export default withRouter(
	connect(
		state => ({}),
		dispatch => ({
			go: to => dispatch(push(to))
		})
	)(
		class Game extends React.Component {
			handleClick = e => console.log(e, 'click')

			handleMouseEnter = e => console.log(e, 'mouseenter')

			handleMouseLeave = e => console.log(e, 'mouseleave')

			state = {
				reading: true,
				score: 0,
				difficulty: {
					mercury: 1,
					venus: 2,
					earth: 3,
					mars: 4,
					jupiter: 5,
					saturn: 6,
					uranus: 7,
					neptune: 8
				}[this.props.match.params.level],
				timer:
					100 -
					{
						mercury: 1,
						venus: 2,
						earth: 3,
						mars: 4,
						jupiter: 5,
						saturn: 6,
						uranus: 7,
						neptune: 8
					}[this.props.match.params.level] *
					10,
				explosion: false,
				lost: false,
				win: false,
				audio: false
			}

			componentDidMount() {
				this.readingTimer = setTimeout(() => {
					this.setState({ reading: false })
					this.countDownTimer()
				}, 100000)
			}

			countDownTimer = () => {
				setTimeout(() => {
					if (this.state.timer > 0) {
						if (!this.state.win) {
							this.setState({ timer: this.state.timer - 1 })
							this.countDownTimer()
						}
					} else {
						this.setState({ lost: true })
					}
				}, 1000)
			}

			componentWillMount() {
				if (this.readingTimer) {
					this.readingTimer()
				}
			}

			goHome = () => this.props.go('/')
			goQuiz = () => this.props.go(`/${this.props.match.params.level}/quiz`)

			updateScore = () => {
				let newScore = this.state.lost
					? this.state.score
					: this.state.score + this.state.difficulty * 10

				this.setState({
					score: newScore,
					explosion: true,
					win: newScore >= this.state.difficulty * 10 * 10 ? true : false
				})
				setTimeout(() => this.setState({ explosion: false }), 1000)
			}

			render = () => (
				<Scene style={{ position: "absolute", height: "100%", width: "100%" }}
					effects="glitch"
					glitch={this.state.explosion ? 'true' : 'false'}
					events={{ click: () => !this.state.audio && this.setState({ audio: true }) }}
				>
					{this.state.win && (
						<Entity
							events={{ click: this.goQuiz }}
							primitive="a-image"
							src="url(quiz.gif)"
							position="0 1.7 -2"
						/>
					)}
					{this.state.audio && <a-sound src="src: url(music.ogg)" autoplay="true" volume="0.5" />}
					{this.state.audio && this.state.explosion && (
						<a-sound
							src="src: url(explosion3.ogg)"
							autoplay="true"
							volume="2"
						/>
					)}
					{this.state.lost && (
						<a-entity
							position="2.6 2 -2"
							scale="7 7 7"
							text={`value:You LOSE!; color:red; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json;`}
						/>
					)}
					{this.state.win && (
						<a-entity
							position="2.7 2 -2"
							scale="7 7 7"
							text={`value:You WIN!; color:green; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json;`}
						/>
					)}
					<Entity
						events={{
							click: this.handleClick,
							mouseenter: this.handleMouseEnter,
							mouseleave: this.handleMouseLeave
						}}
						primitive="a-box"
						color="red"
						position="0 0 -5"
					/>

					<Entity
						events={{ click: this.goHome }}
						primitive="a-image"
						src="url(solar.jpg)"
						position="0 -0.5 -2"
					/>

					<a-curvedimage
						src={`${this.props.match.params.level}_info.png`}
						material=""
						position="0 2.528 -4.443"
						rotation="0 102.21567065133887 0"
						geometry="thetaLength:150;segmentsRadial:50;segmentsHeight:5;radius:3;height:4"
						visible={this.state.reading}
					/>

					{!this.state.reading && (
						<React.Fragment>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="0.5 4.2 -6"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="5000"
										fill="forwards"
										to="0.65 4.3 -6"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>

							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="5 3.8 -5"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="5500"
										fill="forwards"
										to="5.2 3.5 -5"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>

							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="-1 2.6 -6.8"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="5000"
										fill="forwards"
										to="-0.8 2.5 -6.8"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="-4 5 -5"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="500"
										fill="forwards"
										to="-4.2 5.1 -5"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="-3.1 2.6 -5"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="10000"
										fill="forwards"
										to="-3.2 2.7 -5"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="-5 3 -4"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="8000"
										fill="forwards"
										to="-5.1 3.2 -4"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="2.2 2 -5"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="7000"
										fill="forwards"
										to="2.4 2.2 -5"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="3.4 0.5 -5"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="9000"
										fill="forwards"
										to="3.6 0.8 -5"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="1.25 4 -4"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="9000"
										fill="forwards"
										to="1.5 4.5 -4"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>

							<Entity
								event-set__click="visible:false;"
								events={{ click: this.updateScore }}
							>
								<a-entity
									gltf-model="/enemy.gltf"
									scale="0.02 0.02 0.02"
									position="-4 1.5 -4"
									look-at="[camera]"
								>
									<a-animation
										attribute="position"
										dur="9000"
										fill="forwards"
										to="-4.2 1.6 -4"
										direction="alternate"
										repeat="indefinite"
									/>
								</a-entity>
							</Entity>
						</React.Fragment>
					)}

					<a-entity light="color: #ffffff; groundColor: #79a8bb; intensity: 0.3; type: hemisphere" />
					<a-entity position="0 50 0" light="intensity: 0.9; type: point" />
					<a-entity position="0 -50 0" light="intensity: 0.5; type: point" />

					<a-entity
						id="sky"
						rotation="0 90 0"
						geometry="primitive: sphere; radius: 600; segmentsHeight: 32; segmentsWidth: 32"
						material="shader: flat; fog: false; side: back; src: url(assets/images/sky.jpg)"
					/>

					<a-entity
						camera="userHeight: 1.6"
						wasd-controls="enabled:false;"
						look-controls
					>
						<Entity
							id="cursor"
							cursor="fuse: false"
							geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.01"
							material="color: white"
							position="0 0 -0.5"
							raycaster=""
						/>
					</a-entity>

					<a-entity
						id="ring0"
						json-model="src:url(/assets/models/ring.json); singleModel:true)"
						position="0 0 0"
						rotation="0 0 0"
						scale="1.3 1.3 1.3"
					>
						<a-animation
							id="ring0anim"
							attribute="rotation"
							to="0 360 180"
							repeat="indefinite"
							dur="50000"
							easing="linear"
						/>
					</a-entity>

					<a-entity
						position="3.807 -0.5 -2.671"
						scale="5 5 5"
						rotation="0 -28 0"
						text={`value:${
							this.state.score
							}; color:green; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json;`}
					/>

					<a-entity
						position="0.478 -0.5 -4.775"
						scale="5 5 5"
						text={`value:${
							this.state.timer
							};color:red;shader:msdf;font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json`}
						rotation="-5.557690612768986 25.66850922186088 0"
					/>

					<a-entity
						id="ring1"
						json-model="src:url(/assets/models/ring.json); singleModel:true"
						position="0 0 0"
						rotation="90 0 0"
					>
						<a-animation
							id="ring1anim"
							attribute="rotation"
							to="90 360 180"
							repeat="indefinite"
							dur="30000"
							easing="linear"
						/>
					</a-entity>

					<a-entity
						id="border"
						json-model="src:url(/assets/models/border.json)"
						position="0 0 0"
					/>
				</Scene>
			)
		}
	)
)
