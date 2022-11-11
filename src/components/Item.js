import React from 'react'
// We'll need quite a few imports from react-router-dom
import {
  Route,
  NavLink,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom'
import ItemDetails from './ItemDetails'

export default function Item(props) {
  // We get ALL items through props. We'll use the URL to find out which item is the one to show.
  const { items } = props

  // 👉 STEP 7 - We need to pull item from items, using a parameter in the URL (:itemID)
  // Beware! The ids are integers, whereas URL parameters are strings.
  // Beware! The JSX is expecting 'item' to exist instantly!
  // we use this hook to grab they dynamic parts of the path (:itemID).
  const { itemID } = useParams()
  const item = items.find(item => item.id === parseInt(itemID));
  console.log(itemID);

  // We use this hook to grab information about the way React Router matched this route.
  const { path, url } = useRouteMatch();

  // This guards against a crash (the data is not available instantaneously)
  if (!items.length) return 'Getting your item...'

  return (
    <div className='item-wrapper'>
      <div className='item-header'>
        <div className='image-wrapper'>
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className='item-title-wrapper'>
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>

      <nav className='item-sub-nav'>
        <NavLink to={`${url}/description`}>Description</NavLink>
        <NavLink to={`${url}/shipping`}>Shipping</NavLink>
      </nav>
      <Switch>
        <Route path={`${path}/shipping`}>
          <ItemDetails text={item.shipping} />
        </Route>
        <Route path={`${path}/description`}>
          <ItemDetails text={item.description} />
        </Route>
      </Switch>
    </div>
  )
}
