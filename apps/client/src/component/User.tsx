import * as React from 'react'
import { Link } from 'react-router'
import { Item } from 'semantic-ui-react'
import { IUserState } from './../store/reducer'
import ProgressiveImage from 'react-progressive-image'

/* tslint:disable */
export const placeholder = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPScjMDAwMDAwJyBoZWlnaHQ9JzQ4JyB2aWV3Qm94PScwIDAgMjQgMjQnIHdpZHRoPSc0OCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PHBhdGggZD0nTTIxIDE5VjVjMC0xLjEtLjktMi0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnpNOC41IDEzLjVsMi41IDMuMDFMMTQuNSAxMmw0LjUgNkg1bDMuNS00LjV6Jy8+PC9zdmc+'
/* tslint:enable */

export default ({ id, name, avatarUrl }: IUserState) => (
	<Item.Group className='user'>
		<Item>
			<ProgressiveImage src={ avatarUrl } placeholder={ placeholder }>
				{ (src: string) => <Item.Image size='mini' src={ src } /> }
			</ProgressiveImage>
			<Item.Content>
				<Item.Header as='h5'>
					<Link to={ `/user/${ id }` } >{ name }</Link>
				</Item.Header>
				<Item.Description>ID: { id }</Item.Description>
			</Item.Content>
		</Item>
	</Item.Group>
)
