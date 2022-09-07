import { useParams,  useLocation} from "react-router-dom";
export const withRouter = WrappedComponent => props => {
    const params = useParams();
    const location = useLocation()
    return (
        <WrappedComponent
            {...props}
            params={params}
            location={location}
        />
    );
};