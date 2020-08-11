import React from 'react'


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidMount() {
    this.setState(state => ({
      ...state,
      admin: null
    }))
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
      return <View style={{ marginTop: '4rem', textAlign: 'center' }}>
        <Text variant='h4'>
          <Text style={{ marginBottom: 20 }}>
            <Text role='img' aria-label='emoji' style={{ marginRight: 10 }}>⚙️</Text>
            Something went wrong {this.state.admin && `at [${caller}]`}
          </Text>
          <Text>
            <Text>It's not your fault, we're working on this issue</Text>
          </Text>

          <Text style={{ margin: 20 }}>
            {this.state.admin && <Text style={{ fontSize: 11 }}>{this.state.error && this.state.error.toString()}</p>}
          </Text>
        </View>
        <View m='auto' paddingTop={5} style={{ flex: 1, alignContent: 'center' }}>
          <View style={{ marginBottom: '2rem' }}>
            <Text role='img' aria-label='emoji' style={{ fontSize: 50 }}>🤪</Text>
          </View>

            <Button variant='contained' color='primary'>Continue</Button>
        </View>
      </View >
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  caller: PropTypes.string.isRequired
}

export default ErrorBoundary