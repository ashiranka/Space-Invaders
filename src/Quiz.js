import { Scene, Entity } from 'aframe-react'
import 'aframe-look-at-component'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import 'aframe-layout-component'
import _ from 'lodash'

export default withRouter(
	connect(
		state => ({}),
		dispatch => ({
			go: to => dispatch(push(to))
		})
	)(
		class Quiz extends React.Component {
			state = {
				data: null,
				current: null,
				correct: [],
				wrong: []
			}

			goHome = () => this.props.go('/')

			componentDidMount() {
				fetch(`/${this.props.match.params.level}.json`)
					.then(resp => resp.json())
					.then(data => this.setState({ data: data, current: 0 }))
			}

			render() {
				return (
					<Scene style={{ position: "absolute", height: "100%", width: "100%" }}>
						{this.state.data !== null &&
							this.state.current !== null && (
								<a-entity
									position="0 3 -3"
									scale="5 5 5"
									text={`value:${
										this.state.data[this.state.current].question
										}; color:white; align:center; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/roboto/Roboto-Regular.json;`}
								/>
							)}

						<a-sound src="src:https://ucarecdn.com/9a9238ca-87e4-4959-b271-b9adfa76ab71/" autoplay="true" volume="0.5" />

						<Entity
							events={{ click: this.goHome }}
							primitive="a-image"
							src="https://ucarecdn.com/6b42884b-fd88-40c5-8afb-ebe1fb349aa9/"
							position="0 -0.5 -2"
						/>

						<a-entity
							layout="type: box; columns: 1; margin: 0.5;"
							position="0 1.7 -3"
						>
							{this.state.data !== null &&
								this.state.current !== null &&
								this.state.data[this.state.current].options.map(
									(option, index) => (
										<Entity
											key={index}
											events={{
												click: () => {
													let nextQuestions = _.difference(
														Array.from(Array(this.state.data.length).keys()),
														this.state.correct.concat(this.state.wrong)
													)
													let nextCurrent =
														nextQuestions.length > 0
															? _.sample(nextQuestions)
															: null

													if (
														this.state.data[this.state.current].correct ===
														option
													) {
														this.setState({
															correct: this.state.correct.concat(
																this.state.current
															),
															current: nextCurrent
														})
													} else {
														this.setState({
															wrong: this.state.wrong.concat(
																this.state.current
															),
															current: nextCurrent
														})
													}
												}
											}}
											material="color:white;"
											geometry="primitive:plane;height:0.35;"
											text={`value:${option}; width:2.5;align:center;color:white; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/roboto/Roboto-Regular.json;`}
										/>
									)
								)}
						</a-entity>

						<a-entity light="color: #ffffff; groundColor: #79a8bb; intensity: 0.3; type: hemisphere" />
						<a-entity position="0 50 0" light="intensity: 0.9; type: point" />
						<a-entity position="0 -50 0" light="intensity: 0.5; type: point" />

						<a-entity
							id="sky"
							rotation="0 90 0"
							geometry="primitive: sphere; radius: 600; segmentsHeight: 32; segmentsWidth: 32"
							material="shader: flat; fog: false; side: back; src:url(assets/images/sky.jpg)"
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
								this.state.correct.length
								}; color:green; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json;`}
						/>

						<a-entity
							position="0.478 -0.5 -4.775"
							scale="5 5 5"
							text={`value:${
								this.state.wrong.length
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
		}
	)
)
