import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Star( { selected = false, onSelect = f => console.log(f) }) {
  return (
    <FontAwesomeIcon icon={faStar} className={ selected ? 'star selected' : 'star' } onClick={onSelect}/>
  )
}

export default Star