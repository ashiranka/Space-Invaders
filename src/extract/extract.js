const fs = require('fs')
const _ = require('lodash')

const exec = planet => {
	const csvFilePath = `./${planet} quiz - Sheet1.csv`
	const csv = require('csvtojson')
	let final = []
	return csv({ noheader: true })
		.fromFile(csvFilePath)
		.on('json', jsonObj => {
			// combine csv header row and csv line to a json object
			// jsonObj.a ==> 1 or 4
			final.push({
				question: _.upperFirst(jsonObj.field1),
				options: [jsonObj.field2, jsonObj.field3, jsonObj.field4],
				correct: jsonObj.field6
			})
		})
		.on('done', error => {
			console.log(final)
			final.map(
				(entry, index) =>
					!entry.options.includes(entry.correct) &&
					console.log('ProblemXXXXXXXXXXXXXX \n \n')
			)
			fs.writeFileSync(
				`./${planet}.json`,
				JSON.stringify(final, null, 2),
				'utf-8'
			)
		})
}

var x = [
	'mercury',
	'venus',
	'earth',
	'mars',
	'jupiter',
	'saturn',
	'uranus',
	'neptune'
]
x.forEach(planet => exec(planet))
