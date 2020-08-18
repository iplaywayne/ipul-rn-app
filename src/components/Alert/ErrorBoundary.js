import React from 'react'
import PropTypes from 'prop-types'
import { View, Button, Text } from 'react-native'
import { Divider } from 'react-native-paper'

import { StoreContext } from '../../contexts/StoreContext'
import { IS_ADMIN, IS_VERIFIED } from '../../constants'


class ErrorBoundary extends React.Component {

  static contextType = StoreContext

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidMount() {
    this.setState(state => ({
      ...state,
      admin: null
    }))
    const [storeState, storeDispatch] = this.context
    const email = storeState.user.email.toLowerCase()
    if (IS_ADMIN.includes(email)) this.setState({ admin: true })
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState(state => ({
      ...state,
      error,
      errorInfo
    }))
  }

  render() {
    const { caller } = this.props

    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', }}>
          <Divider />
          
          <Text style={{ margin: 20 }}>
            {this.state.admin && <Text style={{ fontSize: 11 }}>{this.state.error && this.state.error.toString()}</Text>}
          </Text>

          <View style={{ marginBottom: 20 }}>
            <Text role='img' aria-label='emoji' style={{ fontSize: 50 }}>🤪</Text>
          </View>

          <Text style={{ marginBottom: 10, fontWeight: '700' }}>
            Oops, something went wrong here
          </Text>
          <Text style={{ marginBottom: 20 }}>
            {this.state.admin &&
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'red', fontWeight: '700', marginRight: 5 }}>Inspect</Text>
                <Text>[{caller}]</Text>
              </View>}
          </Text>
        </View>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  caller: PropTypes.string.isRequired
}

export default ErrorBoundary