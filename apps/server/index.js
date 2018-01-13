const express = require('express')
const faker = require('faker')
const _ = require('lodash')
const bodyParser = require('body-parser')
const cors = require('cors')

const USER_COUNT = 100
const PORT = 7777
const DEFAULT_SEARCH_LIMIT = 20
const DEFAULT_SEARCH_OFFSET = 0

const USERS = _.times(USER_COUNT, () => ({
	id: _.uniqueId(),
	name: faker.name.findName(),
	avatarUrl: faker.image.avatar()
}))

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/api/users', (req, res) => {
	const offset = parseInt(req.query.offset || DEFAULT_SEARCH_OFFSET)
	const nextPageUrl = offset + DEFAULT_SEARCH_LIMIT < USER_COUNT
		? `/api/users?offset=${ offset + DEFAULT_SEARCH_LIMIT }`
		: null
	const prevPageUrl = offset - DEFAULT_SEARCH_LIMIT >= 0
		? `/api/users?offset=${ offset - DEFAULT_SEARCH_LIMIT }`
		: null
	res.json({
		result: USERS.slice(offset, offset + DEFAULT_SEARCH_LIMIT),
		nextPageUrl,
		prevPageUrl
	})
})

app.get('/api/user/:id', (req, res) => {
	res.json({
		result: _.find(USERS, { id: req.params.id })
	})
})

app.post('/api/user/:id', (req, res) => {
	const user = _.find(USERS, { id: req.params.id })
	user.name = req.body.name
	res.json({
		result: user
	})
})

app.listen(PORT, () => {
	console.log(`listening on ${ PORT }`)
})