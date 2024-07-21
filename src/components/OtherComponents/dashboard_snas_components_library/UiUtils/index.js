export const LoadingElement = (props) => {
    if (props.show) {
        if (props.stickyTop) {
            return (
                <div id="ajaxRequestRunningInfiniteProgressBar"
                    className="progress progress-infinite progress-bar-sticky-top ajax-loading-progress-infinite ">
                    <div className="progress-bar-rainbow"></div>
                </div>
            )
        }
        else {
            return (
                <div id="ajaxRequestRunningInfiniteProgressBar position-absolute"
                    className="progress progress-infinite  ajax-loading-progress-infinite ">
                    <div className="progress-bar-rainbow"></div>
                </div>
            )
        }
    }
    else {
        return null
    }
}