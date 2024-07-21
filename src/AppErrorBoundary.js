import { Typography } from '@mui/material'
import React, { Component } from 'react'

export default class AppErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        }
    }

    // static getDerivedStateFromError(error){
    //     return {
    //         hasError: true,
    //         error:error
    //     }
    // }

    componentDidCatch(error, errorInfo) {
        console.log("Error caught!")
        console.error(error)
        console.error(errorInfo)
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo,
        })
    }

    render() {
        if (this.state.hasError) {
            return <div className='p-4 '>
                <div className='border border-2 rounded border-danger'>
                    <div className='row'>
                        <Typography variant='h4' color='danger'>
                            Error Occurred
                        </Typography>
                    </div>
                    {
                        !window.production
                            ? <div>Something went wrong</div>
                            : <>
                                <div className='row'>
                                    <p>{JSON.stringify(this.state.error)}</p>
                                </div>
                                <div className='row'>
                                    <p> {JSON.stringify(this.state.errorInfo)}</p>
                                </div>
                            </>
                    }

                </div>
            </div>
        } else {
            return this.props.children;
        }
    }
}
