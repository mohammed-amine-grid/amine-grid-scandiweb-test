import { useParams,  useLocation} from "react-router-dom";
import { useState } from "react";
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