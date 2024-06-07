type SpinnerProps = {
    loading: boolean,
    size: string,
    borderColor: string,
    borderTopColor: string,
}

export default function LoadingSpinner(props: SpinnerProps) {
    return (
        <div className="spinner-container" style={{display:props.loading?'flex':'none'}}>
            <div className="animate-spin rounded-full" style={{width:props.size, height:props.size, border:`4px ${props.borderColor} solid`, borderTop:`4px ${props.borderTopColor} solid`}}>
            </div>
        </div>
    );
}