// JSX : JS with XML
import PropTypes from 'prop-types'

function Message({ name = 'Ana', color = 'blue', fontFamiliy }) {
  //PascalCase
  return (
    <h1
      style={{
        color: color,
        fontFamily: fontFamiliy,
      }}
    >
      Hello, {name}
    </h1>
  )
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamiliy: PropTypes.string,
}

export default Message
