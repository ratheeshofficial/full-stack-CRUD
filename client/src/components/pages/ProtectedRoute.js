import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, Login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Login {...props} />;
        // if (auth) return <Login {...props} />;
        if (!auth)
          return (
            <Navigate
              to={{ path: "/signup", state: { from: props.location } }}
            />
          );
      }}
    />
  );
};

export default ProtectedRoute;
